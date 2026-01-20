import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { modules } from "@/data/course";

const moduleMap = Object.fromEntries(modules.map((m) => [m.id, m]));

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: moduleId } = await params;
  const moduleData = moduleMap[moduleId];
  const firstOpen = moduleData?.lessons.find((lesson) => !lesson.locked);

  if (!moduleData) {
    return (
      <div className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.12),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(251,191,36,0.12),transparent_32%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/40 to-slate-950" />
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl text-slate-50">Модуль не найден</h1>
          <p className="mt-3 text-slate-300/80">Проверьте ссылку или вернитесь к списку модулей.</p>
          <div className="mt-6 flex justify-center">
            <Link href="/course">
              <Button size="lg" className="bg-amber-300 text-slate-900 hover:bg-amber-200">
                Назад к курсу
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(251,191,36,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/40 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 pb-12 pt-10 lg:pb-16 lg:pt-14">
        <div className="mb-6">
          <Link href="/course" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-slate-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Назад к курсу
          </Link>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-100 shadow-lg shadow-amber-200/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.25)]" />
              Модуль {moduleData.id}
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-[0.25em] text-slate-200">
                {moduleData.lessons.length} уроков
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl leading-[1.05] text-slate-50 sm:text-5xl">{moduleData.title}</h1>
              <p className="max-w-3xl text-lg text-slate-200/80">{moduleData.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Что узнаете</p>
                <ul className="mt-3 space-y-2 text-slate-200/80">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Как устроена тема модуля и где применять на практике.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Мини-практики в каждом уроке и проверка команд.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Контроль доступа: блокировка следующих уроков до выполнения.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">Статус</p>
                <div className="mt-3 space-y-2 text-slate-200/80">
                  <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
                    <div>
                      <p className="text-sm text-slate-300/80">Уроков в модуле</p>
                      <p className="text-lg font-semibold text-slate-50">{moduleData.lessons.length}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-amber-200" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
                    <div>
                      <p className="text-sm text-slate-300/80">Первый доступный</p>
                      <p className="text-lg font-semibold text-slate-50">
                        {firstOpen ? firstOpen.title : "Заблокирован"}
                      </p>
                    </div>
                    {firstOpen ? (
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/40">
                        открыт
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-400/15 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
                        locked
                      </span>
                    )}
                  </div>
                  {firstOpen && (
                    <Link href={`/course/lesson/${firstOpen.id}`} className="block">
                      <Button
                        size="lg"
                        className="w-full bg-amber-300 text-slate-900 hover:bg-amber-200 border border-amber-200/60 shadow-[0_0_25px_rgba(251,191,36,0.35)]"
                      >
                        Продолжить: {firstOpen.title}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Уроки модуля</p>
                <h2 className="font-display text-2xl text-slate-50">План и доступ</h2>
              </div>
            </div>

            <div className="space-y-4">
              {moduleData.lessons.map((lesson, index) => {
                const status = lesson.completed ? "done" : lesson.locked ? "locked" : "open";
                return (
                  <div
                    key={lesson.id}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/25 ${
                      status === "locked" ? "opacity-70" : ""
                    }`}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300 via-cyan-300 to-amber-300" />
                    <div className="grid gap-4 md:grid-cols-[auto,1fr,auto] md:items-start">
                      <div className="flex items-center gap-3 md:pt-1">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-slate-50 ring-1 ring-white/15">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-lg text-slate-50">{lesson.title}</h3>
                          <p className="text-sm text-slate-200/80">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-3 md:col-span-1">
                        {status === "done" && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-300/40">
                            <CheckCircle className="h-4 w-4" /> Пройдено
                          </span>
                        )}
                        {status === "locked" && (
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-400/15 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10">
                            <Lock className="h-4 w-4" /> Заблокировано
                          </span>
                        )}
                        {status === "open" && (
                          <Link href={`/course/lesson/${lesson.id}`}>
                            <Button size="sm" className="bg-amber-300 text-slate-900 hover:bg-amber-200">
                              Перейти к уроку
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
