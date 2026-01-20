'use client';

import Link from "next/link";
import { AlertCircle, BadgeCheck, Layers, ShieldCheck } from "lucide-react";

export default function RegisterPage() {

  return (
    <div className="relative isolate min-h-[calc(100vh-140px)] bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100">
              регистрация
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_6px_rgba(251,191,36,0.15)]" />
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Создайте доступ в курс</h1>
              <p className="text-lg text-slate-200/80">
                Получите маршрут, практики и сертификат. 30 дней по 20–40 минут: настройки сервисов,
                безопасность, автоматизация и бэкапы.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-300/20 p-2 ring-1 ring-amber-200/40">
                    <Layers className="h-4 w-4 text-amber-200" />
                  </span>
                  <div className="text-sm text-slate-100">
                    4 модуля
                    <p className="text-xs text-slate-400">CLI, сервисы, сеть, надёжность</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-300/20 p-2 ring-1 ring-cyan-200/40">
                    <ShieldCheck className="h-4 w-4 text-cyan-200" />
                  </span>
                  <div className="text-sm text-slate-100">
                    Практики
                    <p className="text-xs text-slate-400">journalctl, systemd, ssh, firewall</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-300/20 p-2 ring-1 ring-emerald-200/40">
                    <BadgeCheck className="h-4 w-4 text-emerald-200" />
                  </span>
                  <div className="text-sm text-slate-100">
                    Сертификат
                    <p className="text-xs text-slate-400">готов к резюме и LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-300/10 via-transparent to-amber-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Регистрация</p>
                  <h2 className="font-display text-2xl text-white">Регистрация временно недоступна</h2>
                </div>
                <AlertCircle className="h-6 w-6 text-amber-300" />
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-amber-300/40 bg-amber-500/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-amber-300/20 p-3 ring-2 ring-amber-200/40">
                      <AlertCircle className="h-6 w-6 text-amber-200" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-amber-100">
                        Извините, сервис временно приостановил свою работу
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-200/80">
                        В данный момент проводятся технические работы. Авторизация и регистрация временно недоступны.
                      </p>
                      <p className="text-sm text-slate-300/70">
                        Мы работаем над улучшением сервиса и скоро вернёмся. Спасибо за понимание!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/40 p-6 text-center">
                  <p className="text-sm text-slate-300">
                    Вы можете вернуться на главную страницу
                  </p>
                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-amber-200 transition hover:border-amber-200/50 hover:bg-white/10"
                  >
                    На главную
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
