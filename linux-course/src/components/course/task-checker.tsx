'use client';

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
  solution: string;
  lessonId: string;
}

interface TaskCheckerProps {
  lessonId: string;
}

const fallbackTasks: Record<string, Task[]> = {
  "1": [
    {
      id: "t1",
      title: "Print working directory",
      description: "Show your current directory path.",
      solution: "pwd",
      lessonId: "1",
    },
    {
      id: "t2",
      title: "List files",
      description: "List files in the current directory.",
      solution: "ls",
      lessonId: "1",
    },
    {
      id: "t3",
      title: "Change directory",
      description: "Move into the documents directory.",
      solution: "cd documents",
      lessonId: "1",
    },
  ],
  "2": [
    {
      id: "t4",
      title: "Go to home",
      description: "Return to your home directory.",
      solution: "cd ~",
      lessonId: "2",
    },
    {
      id: "t5",
      title: "Show hidden files",
      description: "List all files including hidden ones.",
      solution: "ls -a",
      lessonId: "2",
    },
  ],
};

export function TaskChecker({ lessonId }: TaskCheckerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastCommand, setLastCommand] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/lessons/${lessonId}/tasks`);

        if (!response.ok) {
          const fallback = fallbackTasks[lessonId] || [];
          if (fallback.length > 0) {
            setTasks(fallback);
            setError(null);
          } else {
            setTasks([]);
            setError("Не удалось загрузить задачи. Попробуйте обновить страницу.");
          }
          return;
        }

        const data = await response.json();
        setTasks(data.tasks);
        setError(null);
      } catch (err) {
        console.error("Task load error:", err);
        const fallback = fallbackTasks[lessonId] || [];
        if (fallback.length > 0) {
          setTasks(fallback);
          setError(null);
        } else {
          setError("Не удалось загрузить задачи. Попробуйте обновить страницу.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [lessonId]);

  useEffect(() => {
    const checkCommand = (command: string) => {
      if (!tasks.length || currentTaskIndex >= tasks.length) return;

      const currentTask = tasks[currentTaskIndex];
      setLastCommand(command);

      const isCorrect = command.trim() === currentTask.solution.trim();

      if (isCorrect) {
        setTaskStatus("success");
        saveProgress(currentTask.id, true);
        setTimeout(() => {
          setCurrentTaskIndex((prev) => prev + 1);
          setTaskStatus("idle");
        }, 2000);
      } else {
        setTaskStatus("error");
        setTimeout(() => {
          setTaskStatus("idle");
        }, 2000);
      }
    };

    const listener = (e: CustomEvent<{ command: string }>) => checkCommand(e.detail.command);
    window.addEventListener("terminal-command", listener as EventListener);
    return () => window.removeEventListener("terminal-command", listener as EventListener);
  }, [tasks, currentTaskIndex]);

  const saveProgress = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId,
          taskId,
          completed,
        }),
      });

      if (!response.ok) {
        console.error("Не удалось сохранить прогресс");
      }
    } catch (err) {
      console.error("Ошибка при сохранении прогресса:", err);
    }
  };

  const skipTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      setTaskStatus("idle");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Загрузка задач...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ошибка</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-200">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Задачи не найдены</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Для этого урока нет задач. Попробуйте обновить страницу или выбрать другой урок.</p>
        </CardContent>
      </Card>
    );
  }

  if (currentTaskIndex >= tasks.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Все задачи пройдены!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Вы завершили все задания. Можно повторить или перейти к следующему уроку.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setCurrentTaskIndex(0)}>Повторить</Button>
        </CardFooter>
      </Card>
    );
  }

  const currentTask = tasks[currentTaskIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Задача {currentTaskIndex + 1} из {tasks.length}: {currentTask.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{currentTask.description}</p>

          {taskStatus !== "idle" && (
            <div className={`rounded-md p-3 ${taskStatus === "success" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
              <div className="flex items-center gap-2">
                {taskStatus === "success" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <p className="text-emerald-100">Верно! Переходим к следующему шагу.</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-300" />
                    <p className="text-red-100">Команда не совпала с ожидаемой. Попробуйте ещё раз.</p>
                  </>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-200">
                Введено: <code>{lastCommand}</code>
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-slate-400">Прогресс: {currentTaskIndex + 1} / {tasks.length}</div>
        <Button variant="outline" onClick={skipTask}>
          Пропустить
        </Button>
      </CardFooter>
    </Card>
  );
}
