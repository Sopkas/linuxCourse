'use client';

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { ModuleCard } from "@/components/course/module-card";
import { LinuxTerminal } from "@/components/course/linux-terminal";
import { AiAssistant } from "@/components/course/ai-assistant";
import { ProgressTracker } from "@/components/course/progress-tracker";
import { TaskChecker } from "@/components/course/task-checker";
import { modules as initialModules } from "@/data/course";

interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  taskId: string | null;
  completed: boolean;
}

export default function CoursePage() {
  const [courseModules, setCourseModules] = useState(initialModules);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch("/api/progress");
        if (!response.ok) return;

        const data = await response.json();
        const progress: UserProgress[] = data.progress;

        const completedLessonIds = new Set(
          progress
            .filter((p) => p.completed && !p.taskId)
            .map((p) => p.lessonId)
        );

        const updatedModules = initialModules.map((module, moduleIndex) => {
          // Update lessons status
          const updatedLessons = module.lessons.map((lesson, lessonIndex) => {
            const isCompleted = completedLessonIds.has(lesson.id);

            // Determine if lesson is locked
            // First lesson of first module is always unlocked
            // Otherwise, it's locked if the previous lesson (in this module or previous module) is not completed
            let isLocked = true;

            if (moduleIndex === 0 && lessonIndex === 0) {
              isLocked = false;
            } else if (lessonIndex > 0) {
              // Check previous lesson in same module
              const prevLessonId = module.lessons[lessonIndex - 1].id;
              if (completedLessonIds.has(prevLessonId)) {
                isLocked = false;
              }
            } else if (moduleIndex > 0) {
              // Check last lesson of previous module
              const prevModule = initialModules[moduleIndex - 1];
              const lastLessonId = prevModule.lessons[prevModule.lessons.length - 1].id;
              if (completedLessonIds.has(lastLessonId)) {
                isLocked = false;
              }
            }

            return {
              ...lesson,
              completed: isCompleted,
              locked: isLocked,
            };
          });

          const isModuleCompleted = updatedLessons.every((l) => l.completed);

          // Module is locked if previous module is not completed
          // (Simplified logic: module is locked if its first lesson is locked)
          const isModuleLocked = updatedLessons.length > 0 ? updatedLessons[0].locked : true;

          return {
            ...module,
            lessons: updatedLessons,
            completed: isModuleCompleted,
            locked: isModuleLocked,
          };
        });

        setCourseModules(updatedModules);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(251,191,36,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/40 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 pb-14 pt-12 lg:pb-20 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-100 shadow-lg shadow-amber-200/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.25)]" />
              Linux курс
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-[0.25em] text-slate-200">
                практика + терминал
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-[1.05] text-slate-50 sm:text-5xl lg:text-6xl">
                Терминал, права, сервисы — уверенно за один курс
              </h1>
              <p className="max-w-3xl text-lg text-slate-200/80 lg:text-xl">
                От навигации и прав до systemd и сетевой диагностики. Учитесь на коротких уроках, сразу проверяйте
                команды в встроенном терминале и отслеживайте прогресс.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Модулей", value: "6" },
                { label: "Практик", value: "20+" },
                { label: "Время", value: "от 15 мин/день" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{stat.label}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Фокус курса</p>
                <ul className="mt-3 space-y-2 text-slate-200/80">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Освоить навигацию, права, работу с конфигами и логами.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Настроить ssh, firewall, мониторинг сервисов и бэкапы.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Автоматизировать рутину: cron, timers, базовые скрипты.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">Как учимся</p>
                <ul className="mt-3 space-y-2 text-slate-200/80">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>Короткие уроки с интерактивными заданиями в терминале.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>План в одном месте: модули, прогресс, проверки.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>AI-помощник отвечает на вопросы по шагам курса.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative" id="terminal">
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 via-transparent to-amber-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">live terminal</p>
                    <p className="font-display text-lg text-slate-50">Практика в браузере</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  интерактив
                </span>
              </div>
              <div className="h-[500px] overflow-auto bg-black/70">
                <LinuxTerminal />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="relative border-t border-white/5 bg-slate-900/40">
        <div className="container mx-auto px-4 py-14 lg:py-18">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Программа</p>
              <h2 className="font-display text-3xl text-slate-50 sm:text-4xl">Модули курса</h2>
              <p className="mt-2 max-w-2xl text-slate-200/75">
                Проходим линейно от базовой ориентации до автоматизации. Разблокируйте модули после выполнения заданий.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-200">
              20–40 минут на урок
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            {courseModules.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                lessonsCount={module.lessons.length}
                completed={module.completed ?? false}
                locked={module.locked ?? false}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 py-14 lg:py-18">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Динамика</p>
                  <h3 className="font-display text-2xl text-slate-50">Ваш прогресс</h3>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/40">
                  обновляется автоматически
                </div>
              </div>
              <div className="mt-4">
                <ProgressTracker courseId="1" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Проверка навыков</p>
                  <h3 className="font-display text-2xl text-slate-50">Задания в терминале</h3>
                </div>
                <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-xs text-cyan-100 ring-1 ring-cyan-200/40">
                  lesson 2
                </span>
              </div>
              <div className="mt-4">
                <TaskChecker lessonId="2" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-black p-6 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-300/15 p-3 ring-1 ring-cyan-200/30">
                  <Sparkles className="h-6 w-6 text-cyan-200" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">AI-помощник</p>
                  <h3 className="font-display text-2xl text-slate-50">Спрашивайте по ходу курса</h3>
                </div>
              </div>
              <div className="mt-4">
                <AiAssistant />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/25">
              <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Совет</p>
              <p className="mt-2 text-slate-200/80">
                Если застряли, вернитесь к терминалу выше — каждое задание можно отрабатывать прямо в браузере. Команды
                из истории доступны стрелками ↑/↓.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
