import { useState, useCallback, useEffect } from "react";
import { getTaskValidationCmd, markTaskCompleted, type ValidationResult } from "@/app/actions/validate-task";

interface UseLessonValidationProps {
    worker: Worker | null;
    taskId: string;
}

export function useLessonValidation({ worker, taskId }: UseLessonValidationProps) {
    const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState<string | null>(null);

    const validate = useCallback(async () => {
        if (!worker) return;

        setStatus('checking');
        setMessage(null);

        try {
            // 1. Get validation command from DB
            const validationCmd = await getTaskValidationCmd(taskId);

            if (!validationCmd) {
                setStatus('error');
                setMessage("У этого задания нет команды проверки");
                return;
            }

            // 2. Setup listener for worker response
            const handleMessage = async (e: MessageEvent) => {
                const { action, payload } = e.data;

                if (action === "VALIDATION_RESULT") {
                    const isSuccess = payload;

                    if (isSuccess) {
                        // 3. Mark as completed in DB
                        await markTaskCompleted(taskId);
                        setStatus('success');
                        setMessage("Задание выполнено! 🎉");
                    } else {
                        setStatus('error');
                        setMessage("Задание не выполнено. Попробуй ещё раз!");
                    }

                    // Cleanup listener
                    worker.removeEventListener("message", handleMessage);
                }
            };

            worker.addEventListener("message", handleMessage);

            // 3. Send validation command to worker
            worker.postMessage({
                action: "VALIDATE",
                payload: { script: validationCmd }
            });

        } catch (error) {
            console.error("Validation error:", error);
            setStatus('error');
            setMessage("Ошибка при проверке задания");
        }
    }, [worker, taskId]);

    return {
        status,
        message,
        validate
    };
}
