// Web Worker for v86 Linux Emulator
// This worker runs the emulator in a separate thread to avoid blocking the UI

// Shim for v86 in worker environment
const globalSelf = self as any;
globalSelf.window = self;
globalSelf.document = {
    getElementById: () => null,
    addEventListener: () => { },
    removeEventListener: () => { },
    createElement: () => ({ style: {} }),
};
globalSelf.screen = { width: 1024, height: 768 };

// Shim module.exports to capture the library export if it uses CommonJS
globalSelf.module = {};
globalSelf.exports = {};

// Web Worker globals
declare function importScripts(...urls: string[]): void;
declare let V86Starter: any;

let emulator: any = null;
let isHiddenMode = false;
let hiddenOutputBuffer = "";

// Import v86 library
try {
    // Try loading the new library version
    importScripts("/os/libv86-new.js");
    console.log("Worker: libv86-new.js loaded");
} catch (e) {
    console.error("Worker: Failed to load libv86-new.js:", e);
    // Fallback to old one if needed, or just fail
}

// Logic to find V86Starter
if (typeof V86Starter === "undefined") {
    console.log("Worker: V86Starter not in global scope, checking alternatives...");

    if (globalSelf.module.exports && globalSelf.module.exports.V86Starter) {
        V86Starter = globalSelf.module.exports.V86Starter;
        console.log("Worker: Found V86Starter in module.exports");
    } else if (globalSelf.V86Starter) {
        V86Starter = globalSelf.V86Starter;
        console.log("Worker: Found V86Starter in self.V86Starter");
    } else if (globalSelf.V86) {
        V86Starter = globalSelf.V86;
        console.log("Worker: Found V86 in global, using as V86Starter");
    } else {
        // Last ditch effort: log all globals to see what we have
        const globals = Object.keys(self).filter(k => !k.startsWith("on") && !k.startsWith("web") && !k.startsWith("webkit"));
        console.error("Worker: V86Starter still not defined. Available globals:", globals);
    }
} else {
    console.log("Worker: V86Starter is available in global scope");
}

self.onmessage = (e: MessageEvent) => {
    const { action, payload } = e.data;

    switch (action) {
        case "BOOT":
            bootEmulator(payload?.state);
            break;

        case "INPUT":
            if (emulator) {
                emulator.serial0_send(payload);
            }
            break;

        case "SAVE_STATE":
            if (emulator) {
                emulator.save_state((error: Error | null, newState: ArrayBuffer) => {
                    if (error) {
                        self.postMessage({ action: "ERROR", payload: error.message });
                    } else {
                        self.postMessage({ action: "STATE_SAVED", payload: newState });
                    }
                });
            }
            break;

        case "VALIDATE":
            if (emulator) {
                const userScript = payload.script;
                const SUCCESS_TOKEN = "__LESSON_PASSED_v86__";

                const wrapper = `(${userScript}) && echo "${SUCCESS_TOKEN}" || echo "__FAIL__"`;

                let buffer = "";

                const checkListener = (char: string) => {
                    buffer += char;

                    if (buffer.includes(SUCCESS_TOKEN)) {
                        self.postMessage({ action: "VALIDATION_RESULT", payload: true });
                        emulator.remove_listener("serial0-output-char", checkListener);
                    } else if (buffer.includes("__FAIL__")) {
                        self.postMessage({ action: "VALIDATION_RESULT", payload: false });
                        emulator.remove_listener("serial0-output-char", checkListener);
                    }
                };

                emulator.add_listener("serial0-output-char", checkListener);
                emulator.serial0_send(wrapper + "\n");
            }
            break;

        case "DESTROY":
            if (emulator) {
                emulator.destroy();
                emulator = null;
            }
            break;
    }
};

function bootEmulator(savedState?: ArrayBuffer) {
    if (emulator) {
        emulator.destroy();
    }

    const config: any = {
        wasm_path: "/os/v86.wasm",
        memory_size: 64 * 1024 * 1024, // 64MB RAM
        vga_memory_size: 2 * 1024 * 1024, // 2MB VRAM
        bios: { url: "/os/seabios.bin" },
        vga_bios: { url: "/os/vgabios.bin" },
        cdrom: { url: "/os/linux-new.iso" },
        cmdline: "console=ttyS0 root=/dev/ram0 rw", // Standard v86 linux.iso config
        autostart: true,
        disable_keyboard: true, // We use serial port only
        disable_mouse: true,
        disable_speaker: true,
    };

    if (savedState) {
        config.initial_state = savedState;
    }

    // Send boot started
    self.postMessage({ action: "BOOTING" });
    console.log("Worker: Booting v86 with config:", config);

    if (typeof V86Starter === "undefined") {
        console.error("Worker: Cannot boot, V86Starter is missing");
        self.postMessage({ action: "ERROR", payload: "V86Starter library not loaded correctly" });
        return;
    }

    try {
        emulator = new V86Starter(config);
        console.log("Worker: V86 instance created");
    } catch (e) {
        console.error("Worker: Failed to create V86 instance:", e);
        self.postMessage({ action: "ERROR", payload: String(e) });
        return;
    }

    // Listen for serial output (terminal)
    emulator.add_listener("serial0-output-char", (char: string) => {
        if (isHiddenMode) {
            hiddenOutputBuffer += char;
        } else {
            self.postMessage({ action: "OUTPUT", payload: char });
        }
    });

    // Notify when emulator is ready
    emulator.add_listener("emulator-ready", () => {
        console.log("Worker: Emulator ready event fired");
        self.postMessage({ action: "READY" });
    });

    emulator.add_listener("download-progress", (e: any) => {
        console.log("Worker: Download progress", e);
    });

    emulator.add_listener("emulator-loaded", () => {
        console.log("Worker: Emulator loaded");
    });
}
