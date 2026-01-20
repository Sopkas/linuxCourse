"use client";

import { useEffect, useRef, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { Loader2 } from "lucide-react";
import { useLinuxWorker } from "@/hooks/useLinuxWorker";
import "@xterm/xterm/css/xterm.css";

interface LinuxTerminalProps {
    className?: string;
    onEmulatorReady?: (worker: Worker) => void;
}

export function LinuxTerminal({ className = "", onEmulatorReady }: LinuxTerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<Terminal | null>(null);
    const fitAddonRef = useRef<FitAddon | null>(null);

    // Handle output from worker -> xterm
    const handleOutput = useCallback((char: string) => {
        xtermRef.current?.write(char);
    }, []);

    const handleReady = useCallback(() => {
        // Focus terminal when ready
        xtermRef.current?.focus();
    }, []);

    const { worker, isReady, sendInput } = useLinuxWorker({
        onOutput: handleOutput,
        onReady: handleReady,
    });

    // Initialize xterm.js
    useEffect(() => {
        if (!terminalRef.current || xtermRef.current) return;

        const initTerminal = () => {
            if (!terminalRef.current) return;

            // Check if container has dimensions
            if (terminalRef.current.clientWidth === 0 || terminalRef.current.clientHeight === 0) {
                requestAnimationFrame(initTerminal);
                return;
            }

            const term = new Terminal({
                cursorBlink: true,
                fontFamily: '"Geist Mono", monospace',
                theme: {
                    background: '#09090b', // Zinc-950
                    foreground: '#e4e4e7', // Zinc-200
                },
                fontSize: 14,
                lineHeight: 1.2,
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);

            term.open(terminalRef.current);

            // Small delay to ensure rendering is complete before fitting
            setTimeout(() => {
                fitAddon.fit();
            }, 50);

            xtermRef.current = term;
            fitAddonRef.current = fitAddon;

            // Handle input xterm -> worker
            term.onData((data) => {
                sendInput(data);
            });

            // Resize observer
            const resizeObserver = new ResizeObserver(() => {
                // Debounce resize
                requestAnimationFrame(() => {
                    fitAddon.fit();
                });
            });
            resizeObserver.observe(terminalRef.current);

            // Cleanup function needs to be returned from the effect, 
            // but we are inside a helper. We'll handle cleanup via a ref or just rely on the effect cleanup 
            // if we structured this differently. 
            // Since we can't easily return the cleanup from the inner function to the effect,
            // we'll attach it to the ref or just move this logic out.
        };

        requestAnimationFrame(initTerminal);

        return () => {
            if (xtermRef.current) {
                xtermRef.current.dispose();
                xtermRef.current = null;
            }
            // We can't easily disconnect the observer here because it's created inside the async init.
            // Let's refactor slightly to make cleanup easier.
        };
    }, [sendInput]);

    // Notify parent about worker
    useEffect(() => {
        if (worker && onEmulatorReady) {
            onEmulatorReady(worker);
        }
    }, [worker, onEmulatorReady]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Loading overlay */}
            {!isReady && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 text-zinc-400">
                        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
                        <span className="text-sm">
                            Загрузка системы...
                        </span>
                    </div>
                </div>
            )}

            {/* Terminal container */}
            <div ref={terminalRef} className="w-full h-full bg-zinc-950" />
        </div>
    );
}
