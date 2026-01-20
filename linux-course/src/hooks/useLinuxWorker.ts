import { useEffect, useRef, useState, useCallback } from "react";

interface UseLinuxWorkerProps {
    onOutput?: (char: string) => void;
    onReady?: () => void;
}

export function useLinuxWorker({ onOutput, onReady }: UseLinuxWorkerProps = {}) {
    const workerRef = useRef<Worker | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        console.log("Hook: Initializing worker...");
        // Create worker
        const worker = new Worker(new URL("../workers/linux-worker.ts", import.meta.url));
        workerRef.current = worker;

        // Handle worker errors
        worker.onerror = (err) => {
            console.error("Hook: Worker error:", err);
            // Try to log more details if available
            if (err instanceof ErrorEvent) {
                console.error("Hook: Worker error details:", err.message, err.filename, err.lineno);
            }
        };

        // Handle messages
        worker.onmessage = (e) => {
            const { action, payload } = e.data;
            console.log("Hook: Received message from worker:", action);

            switch (action) {
                case "OUTPUT":
                    onOutput?.(payload);
                    break;
                case "READY":
                    console.log("Hook: Emulator is ready");
                    setIsReady(true);
                    onReady?.();
                    break;
                case "BOOTING":
                    console.log("Hook: Emulator is booting");
                    // Optional: handle booting state
                    break;
                case "ERROR":
                    console.error("Hook: Worker reported error:", payload);
                    break;
            }
        };

        // Boot emulator
        worker.postMessage({ action: "BOOT" });

        return () => {
            worker.terminate();
            workerRef.current = null;
        };
    }, []); // Empty dependency array to run once on mount

    const sendInput = useCallback((input: string) => {
        workerRef.current?.postMessage({ action: "INPUT", payload: input });
    }, []);

    const validate = useCallback((script: string) => {
        workerRef.current?.postMessage({ action: "VALIDATE", payload: { script } });
    }, []);

    return {
        worker: workerRef.current,
        isReady,
        sendInput,
        validate,
    };
}
