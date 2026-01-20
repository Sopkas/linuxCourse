import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Terminal,
    title: "Практика, а не теории",
    text: "Каждый блок — консольные команды, конфиги и разбор ошибок. Без воды, только рабочие сценарии.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность по умолчанию",
    text: "SSH-ключи, firewall, базовый hardening и чтение журналов. Учимся не бояться продакшена.",
  },
  {
    icon: Clock,
    title: "Темп 20–40 минут",
    text: "Короткие уроки, чек-листы и контроль прогресса. Стабильный ритм без выгорания.",
  },
  {
    icon: Users,
    title: "Сообщество и поддержка",
    text: "FAQ, подсказки и обратная связь. Помогаем закрыть пробелы и дойти до результата.",
  },
];

const highlights = [
  { label: "30 дней", text: "4 модуля + финальный чекпоинт" },
  { label: "20+ практик", text: "systemd, сеть, безопасность, бэкапы" },
  { label: "Сертификат", text: "готов для резюме и LinkedIn" },
];

export default function AboutPage() {
  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100">
              О курсе
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              Linux практикум
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">
                Курс для тех, кто хочет уверенно работать в Linux
              </h1>
              <p className="text-lg text-slate-200/80">
                Мы собрали практику админа и инженера: навигация, сервисы, сеть, бэкапы и защита.
                Каждый шаг — через консоль, журналы и реальные ситуации. 20–40 минут в день, чтобы
                без перегруза дойти до результата и забрать сертификат.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-amber-300 text-slate-900 hover:bg-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.35)]"
              >
                <Link href="/course">
                  Смотреть программу <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border border-white/10 bg-white/5 text-slate-100 hover:border-amber-200/50 hover:bg-white/10"
              >
                <Link href="/auth/register">Начать бесплатно</Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative grid gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <Sparkles className="h-6 w-6 text-amber-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Почему работает</p>
                  <h2 className="font-display text-2xl text-white">Метод «делать руками»</h2>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <p>— Живые сценарии: «не стартует сервис», «ssh не пускает», «журналы шумят».</p>
                <p>— Команды и конфиги рядом: копируйте, правьте, проверяйте статус.</p>
                <p>— Чек-листы: видно, что сделали, и где остановились.</p>
                <p>— Переиспользуемые шпаргалки: помогли сегодня — пригодятся на работе.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 lg:pb-20">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Layers className="h-6 w-6 text-amber-200" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Опоры курса</p>
            <h2 className="font-display text-3xl text-white">Что делает обучение сильным</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(251,191,36,0.12),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.1),transparent_40%)]" />
              </div>
              <div className="relative flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <pillar.icon className="h-6 w-6 text-amber-200" />
                </span>
                <h3 className="font-display text-xl text-white">{pillar.title}</h3>
              </div>
              <p className="relative mt-3 text-sm text-slate-200/80">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-8 text-center shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.12),transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>
          <div className="relative space-y-4">
            <h3 className="font-display text-2xl text-white">Готовы зайти в маршрут?</h3>
            <p className="text-slate-200/80">
              Подключайтесь к курсу, закрывайте практики и забирайте сертификат. Доступ остаётся, чтобы
              можно было вернуться к урокам и обновлениям.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                К программе <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
