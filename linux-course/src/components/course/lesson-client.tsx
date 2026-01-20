"use client";

import { useState, useRef } from "react";
import { LinuxTerminal } from "@/components/course/linux-terminal";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useLessonValidation } from "@/hooks/useLessonValidation";

export function LessonClient({
  lessonId,
  taskId,
}: {
  lessonId: string;
  taskId: string;
}) {
  const [worker, setWorker] = useState<Worker | null>(null);
  const { status, message, validate } = useLessonValidation({ worker, taskId });

  const handleEmulatorReady = (workerInstance: Worker) => {
    setWorker(workerInstance);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3">
        <div className="text-sm text-slate-300">Терминал Linux</div>
        <div className="text-xs text-slate-400">урок {lessonId}</div>
        <div className="text-xs">
          {status === 'success' ? (
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-200 ring-1 ring-emerald-300/40 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              выполнено
            </span>
          ) : (
            <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200 ring-1 ring-white/10">
              в процессе
            </span>
          )}
        </div>
      </div>

      {/* v86 Linux Terminal */}
      <div className="h-[450px]">
        <LinuxTerminal className="h-full" onEmulatorReady={handleEmulatorReady} />
      </div>

      {/* Validation bar */}
      <div className="border-t border-white/10 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">
            {message && (
              <span className={status === 'success' ? "text-emerald-400" : "text-amber-400"}>
                {message}
              </span>
            )}
          </div>
          <Button
            onClick={validate}
            disabled={status === 'checking' || status === 'success' || !worker}
            size="sm"
            className="bg-amber-300 text-slate-900 hover:bg-amber-200 disabled:opacity-50"
          >
            {status === 'checking' ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Проверка...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Выполнено
              </>
            ) : (
              "Проверить задание"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}