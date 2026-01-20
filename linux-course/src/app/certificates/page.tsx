'use client';

import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Download, Lock, Sparkles, Timer, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Certificate = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  progress: number;
  available: boolean;
};

const certificates: Certificate[] = [
  {
    id: "1",
    title: "Linux Fundamentals",
    description: "Базовые навыки CLI, система прав, работа с сервисами и логами. Подходит для начала карьеры.",
    requirements: [
      "Закрыть модули 1–2",
      "Показать работу с systemd и journalctl",
      "Пройти чекпоинт > 80%",
    ],
    progress: 45,
    available: false,
  },
  {
    id: "2",
    title: "Linux Operations",
    description: "Сеть, автоматизация, бэкапы и hardening. Готовит к задачам продакшена.",
    requirements: [
      "Выполнить практики по сети и SSH",
      "Собрать cron/timers для бэкапа и health-checkов",
      "Пройти финальный чекпоинт > 85%",
    ],
    progress: 0,
    available: false,
  },
  {
    id: "3",
    title: "Certificate of Completion",
    description: "Выдается после полного маршрута. Можно добавить в резюме и LinkedIn.",
    requirements: [
      "Закрыть все модули",
      "Сдать итоговый тест",
      "Подтвердить проект",
    ],
    progress: 0,
    available: false,
  },
];

export default function CertificatesPage() {
  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100">
              сертификаты
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              результат
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Подтвердите свой прогресс</h1>
              <p className="text-lg text-slate-200/80">
                Каждый сертификат опирается на практику: журналы, сервисы, сеть, автоматизация и безопасность.
                Закрывайте чекпоинты и фиксируйте результат в резюме.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Проверяем навыки</p>
                <p className="mt-2 text-sm text-slate-200/80">Чекпоинты по каждому модулю.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Практика в основе</p>
                <p className="mt-2 text-sm text-slate-200/80">systemd, ssh, сеть, бэкапы, hardening.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">PDF для резюме</p>
                <p className="mt-2 text-sm text-slate-200/80">Готовы для LinkedIn и откликов.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                Перейти к курсу <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
              >
                Войти в кабинет
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <Trophy className="h-6 w-6 text-amber-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Как открыть</p>
                  <h2 className="font-display text-2xl text-white">Чекпоинт → сертификат</h2>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <p>— Закрывайте практики и контрольные вопросы по модулям.</p>
                <p>— Достигните нужного процента: 80% для Fundamentals, 85% для Operations.</p>
                <p>— Получите PDF с верификацией и ссылкой для профиля.</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200/80">
                <Timer className="h-5 w-5 text-amber-200" />
                В среднем путь до первого сертификата занимает 2–3 недели при темпе 20–40 минут в день.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 lg:pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(251,191,36,0.12),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.1),transparent_40%)]" />
              </div>
              <div className="relative flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  {certificate.available ? (
                    <Award className="h-6 w-6 text-amber-200" />
                  ) : (
                    <Lock className="h-6 w-6 text-amber-200" />
                  )}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Сертификат</p>
                  <h3 className="font-display text-xl text-white">{certificate.title}</h3>
                </div>
              </div>
              <p className="relative mt-3 text-sm text-slate-200/80">{certificate.description}</p>

              <div className="relative mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Прогресс</span>
                  <span>{certificate.progress}%</span>
                </div>
                <Progress value={certificate.progress} className="h-2" />
              </div>

              <div className="relative mt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Требования</p>
                <ul className="space-y-2 text-sm text-slate-200/80">
                  {certificate.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-3">
                {certificate.available ? (
                  <Button className="flex items-center gap-2 bg-amber-300 text-slate-900 hover:bg-amber-200">
                    <Download className="h-4 w-4" />
                    Скачать PDF
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="flex items-center gap-2 border border-white/10 bg-white/5 text-slate-200"
                  >
                    <Lock className="h-4 w-4" />
                    Требуется прогресс
                  </Button>
                )}
                <Link
                  href="/course"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
                >
                  Открыть модуль
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-8 text-center shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.12),transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>
          <div className="relative space-y-4">
            <h3 className="font-display text-2xl text-white">Хотите сертификат быстрее?</h3>
            <p className="text-slate-200/80">
              Двигайтесь ежедневно 20–40 минут, отмечайте чек-листы и закрывайте контрольные. Сертификат откроется
              автоматически — мы пришлём письмо с ссылкой на PDF.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                К урокам
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
