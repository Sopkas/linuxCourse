"use client";

import { useCallback, useState } from "react";
import { getTaskValidationCmd, markTaskCompleted, type ValidationResult } from "@/app/actions/validate-task";

interface UseTaskValidationProps {
    emulatorRef: React.MutableRefObject<any>;
}

export function useTaskValidation({ emulatorRef }: UseTaskValidationProps) {
    const [isValidating, setIsValidating] = useState(false);
    const [lastResult, setLastResult] = useState<ValidationResult | null>(null);

    /**
     * Execute a command in v86 and capture output
     * Returns promise that resolves with the command output
     */
    const executeCommand = useCallback((command: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!emulatorRef.current) {
                reject(new Error("Emulator not ready"));
                return;
            }

            let output = "";
            let outputStarted = false;
            let lineBuffer = "";
            const marker = `__VALIDATE_${Date.now()}__`;
            const endMarker = `__END_${marker}__`;

            // Listen for serial output
            const listener = (char: string) => {
                // Log raw output for debugging (limited to avoid spamming too much)
                if (lineBuffer.length < 1000) {
                    // console.log("RAW:", JSON.stringify(char)); 
                }

                lineBuffer += char;

                // Check if output has started (after our echo marker)
                if (lineBuffer.includes(marker) && !outputStarted) {
                    console.log("Marker found, starting capture");
                    outputStarted = true;
                    lineBuffer = "";
                    return;
                }

                if (outputStarted) {
                    // Check for end marker
                    if (lineBuffer.includes(endMarker)) {
                        console.log("End marker found, stopping capture");
                        // Remove end marker from output
                        output = lineBuffer.replace(endMarker, "").trim();
                        emulatorRef.current.remove_listener("serial0-output-char", listener);
                        resolve(output);
                        return;
                    }
                    output = lineBuffer;
                }
            };

            emulatorRef.current.add_listener("serial0-output-char", listener);

            // Send Ctrl+C to clear any existing input, then newline
            console.log("Clearing input...");
            emulatorRef.current.serial0_send("\x03"); // Ctrl+C

            // Wait a bit before sending command
            setTimeout(() => {
                // Send command with markers
                const fullCommand = `echo "${marker}" && ${command} && echo "${endMarker}"\n`;
                console.log("Validating with command:", fullCommand.trim());
                emulatorRef.current.serial0_send(fullCommand);
            }, 500);

            // Timeout after 15 seconds
            setTimeout(() => {
                emulatorRef.current.remove_listener("serial0-output-char", listener);
                if (!output && !outputStarted) {
                    console.warn("Validation timed out. Buffer content:", lineBuffer.slice(-200));
                }
                resolve(output || "");
            }, 15000);
        });
    }, [emulatorRef]);

    /**
     * Validate a task by running its validation command
     */
    const validateTask = useCallback(async (taskId: string): Promise<ValidationResult> => {
        setIsValidating(true);
        setLastResult(null);

        try {
            // Get validation command from database
            const validationCmd = await getTaskValidationCmd(taskId);
            console.log("Validation cmd from DB:", validationCmd);

            if (!validationCmd) {
                const result: ValidationResult = {
                    success: false,
                    message: "У этого задания нет команды проверки",
                    passed: false,
                };
                setLastResult(result);
                return result;
            }

            // Execute validation command in v86
            const output = await executeCommand(validationCmd);
            console.log("Validation output:", output);

            // Check if output contains "PASS"
            const passed = output.includes("PASS");
            console.log("Validation passed:", passed);

            if (passed) {
                // Mark task as completed in database
                const result = await markTaskCompleted(taskId);
                setLastResult(result);
                return result;
            } else {
                const result: ValidationResult = {
                    success: true,
                    message: "Задание не выполнено. Попробуй ещё раз!",
                    passed: false,
                };
                setLastResult(result);
                return result;
            }
        } catch (error) {
            console.error("Validation error:", error);
            const result: ValidationResult = {
                success: false,
                message: "Ошибка при проверке задания",
                passed: false,
            };
            setLastResult(result);
            return result;
        } finally {
            setIsValidating(false);
        }
    }, [executeCommand]);

    return {
        validateTask,
        isValidating,
        lastResult,
    };
}
