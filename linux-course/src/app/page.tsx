import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarClock,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type TerminalEntry =
  | { type: "command"; prompt: string; command: string }
  | { type: "output"; lines: string[] };

const heroStats = [
  { label: "30 дней", value: "4 модуля + ревью навыков" },
  { label: "20+ практик", value: "systemd, сеть, безопасность, бэкапы" },
  { label: "Сертификат", value: "готов к LinkedIn и резюме" },
];

const featureCards = [
  {
    icon: Terminal,
    title: "Практика вместо теории",
    text: "Работаем с логами, сервисами и CLI как на проде: системные журналы, перезапуск сервисов, разбор ошибок.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность по умолчанию",
    text: "SSH-ключи, firewall, базовый hardening, разбор auth.log и контроль доступа без страха «сломать».",
  },
  {
    icon: CalendarClock,
    title: "Темп без перегруза",
    text: "Сессии по 20–40 минут, чек-листы и контроль прогресса. Учитесь без выгорания и пропусков.",
  },
  {
    icon: BookOpen,
    title: "Сжатые конспекты",
    text: "Шпаргалки команд и схемы, которые быстро возвращают в контекст даже после перерыва.",
  },
];

const roadmap = [
  {
    title: "Навигация и оболочка",
    period: "Дни 1–5",
    text: "Файловая система, потоки, пайпы, grep/awk, tmux, права и контроль версий конфигов.",
  },
  {
    title: "Сервисы и сеть",
    period: "Дни 6–12",
    text: "systemd и журналы, nginx, unit-файлы, открытые порты, SSL, SSH-ключи и наблюдение за входами.",
  },
  {
    title: "Автоматизация",
    period: "Дни 13–20",
    text: "bash-скрипты, cron и systemd timers, бэкапы, health-checkи и уведомления из логов.",
  },
  {
    title: "Надежность и выпуск",
    period: "Дни 21–30",
    text: "Мониторинг, разбор инцидентов, оптимизация конфигов, финальный проект и сертификат для портфолио.",
  },
];

const terminalFeed: TerminalEntry[] = [
  { type: "command", prompt: "ops@lab:~$", command: "sudo systemctl status nginx" },
  {
    type: "output",
    lines: [
      "● nginx.service - A high performance web server",
      "   Active: active (running) since 09:14:12; 3h 12min ago",
      "   Docs: man:nginx(8)",
    ],
  },
  { type: "command", prompt: "ops@lab:~$", command: "tail -n 3 /var/log/auth.log" },
  {
    type: "output",
    lines: [
      "Accepted publickey for deploy from 10.0.0.12 port 53822 ssh2",
      "Failed password for root from 185.23.1.44 port 41812 ssh2",
      "sshd[2048]: Connection closed by authenticating user deploy",
    ],
  },
  { type: "command", prompt: "ops@lab:~$", command: "crontab -l" },
  {
    type: "output",
    lines: [
      "0 3 * * * /usr/local/bin/backup.sh",
      "*/5 * * * * /usr/local/bin/healthcheck >> /var/log/health.log",
    ],
  },
];

const toolkit = [
  {
    title: "CLI и файловая система",
    items: ["bash, tmux, nano/vim", "grep/awk/sed", "права, ACL, sudo"],
  },
  {
    title: "Сеть и сервисы",
    items: ["systemd + journalctl", "nginx, ssh, firewall", "ss/netstat, tcpdump базово"],
  },
  {
    title: "Автоматизация и надежность",
    items: ["cron + timers", "бэкапы и health-checkи", "алерты из логов"],
  },
];

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.16),transparent_32%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.14),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,23,42,0.7),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/40 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 pb-16 pt-14 lg:pb-24 lg:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100 shadow-lg shadow-amber-200/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(251,191,36,0.25)]" />
              Linux практикум
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-[0.25em] text-slate-200">
                новый поток
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-[1.05] text-slate-50 sm:text-5xl lg:text-6xl">
                Linux, как на работе: консоль, сервисы и защита за 30 дней
              </h1>
              <p className="max-w-3xl text-lg text-slate-200/80 lg:text-xl">
                Маршрут с лабораторками и чек-листами. Заходите на 20–40 минут в день и закрывайте
                практические задачи: от базовой навигации в CLI до настройки сервисов, бэкапов,
                автоматизации и защиты входов.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{stat.label}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-300 text-slate-900 hover:bg-amber-200 border border-amber-200/60 shadow-[0_0_35px_rgba(251,191,36,0.35)]"
              >
                <Link href="/course">
                  Начать маршрут <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border border-cyan-200/60 bg-white/5 text-cyan-100 hover:bg-cyan-500/10"
              >
                <Link href="/course#program">Смотреть программу</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-slate-300 hover:bg-white/10">
                <Link href="/auth/login">Я уже учусь</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Что сделаете</p>
                <ul className="mt-3 space-y-2 text-slate-200/80">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Настроите SSH-ключи, firewall и поймёте, что происходит в auth.log.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Соберёте бэкап, health-checkи и автоматизацию через cron или timers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    <span>Научитесь читать логи, восстанавливать сервисы и не бояться продакшена.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">Формат</p>
                <ul className="mt-3 space-y-2 text-slate-200/80">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>Уроки и практики под 20–40 минут с готовыми командами.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>Чек-листы, чтобы не теряться и видеть прогресс.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>Сертификат и сухой чекпоинт по навыкам в конце.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 via-transparent to-amber-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">live lab</p>
                    <p className="font-display text-lg text-slate-50">lab-01: сервисы</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  online
                </span>
              </div>

              <div className="grid gap-3 border-b border-white/5 px-6 py-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">uptime</p>
                  <p className="font-display text-xl text-amber-200">03:12:26</p>
                  <p className="text-xs text-slate-400">нагрузка 0.35</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">активные</p>
                  <p className="font-display text-xl text-cyan-200">12</p>
                  <p className="text-xs text-slate-400">подключений</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400">планы</p>
                  <p className="font-display text-xl text-emerald-200">backup 03:00</p>
                  <p className="text-xs text-slate-400">cron + timers</p>
                </div>
              </div>

              <div className="mx-6 my-5 rounded-xl border border-white/5 bg-black/60 p-4 font-mono text-sm text-slate-100 shadow-inner shadow-black/30">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>session: prod-edge-01</span>
                  <span>ssh • sudo</span>
                </div>
                <div className="space-y-3">
                  {terminalFeed.map((entry, index) =>
                    entry.type === "command" ? (
                      <p key={index} className="text-cyan-100">
                        <span className="text-slate-500">{entry.prompt}</span>{" "}
                        <span className="text-cyan-200">{entry.command}</span>
                      </p>
                    ) : (
                      <div key={index} className="space-y-1 text-amber-100/80">
                        {entry.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 py-14 lg:py-20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-300/20 p-2">
                <Sparkles className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">что внутри</p>
                <h2 className="font-display text-3xl text-slate-50">Практики, которые закрепляют навык</h2>
              </div>
            </div>
            <Link
              href="/course"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
            >
              Смотреть курс <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_40%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_40%)]" />
                </div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-amber-300/15 text-amber-200 ring-1 ring-amber-200/40">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 font-display text-xl text-slate-50">{title}</h3>
                <p className="relative mt-2 text-sm text-slate-200/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 py-16 lg:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">маршрут</p>
            <h2 className="font-display text-3xl text-slate-50 sm:text-4xl">Четыре модуля, которые ведут к результату</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-amber-200">
            20–40 минут в день
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {roadmap.map((item, index) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300 via-cyan-300 to-amber-300" />
              <div className="grid items-start gap-4 md:grid-cols-[auto,1fr] md:gap-6">
                <div className="pl-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{item.period}</p>
                  <p className="font-display text-2xl text-slate-50">{item.title}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
                  <p className="text-slate-200/80">{item.text}</p>
                  <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-white/10 px-3 py-1">шаг {index + 1}</span>
                    <ArrowRight className="h-4 w-4 text-amber-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-black p-8 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-300/15 p-3 ring-1 ring-cyan-200/30">
                <Server className="h-6 w-6 text-cyan-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">стек навыков</p>
                <h3 className="font-display text-2xl text-slate-50">С чем вы выходите в работу</h3>
              </div>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
              сухой чекпоинт в конце модуля
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {toolkit.map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/25"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{block.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {block.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-black/40 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-12 text-center shadow-2xl shadow-black/40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.12),transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>
          <div className="relative mx-auto max-w-3xl space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl">Готовы зайти в лабу?</h2>
            <p className="text-lg text-slate-200/80">
              Получите доступ к маршруту, практикам и сертификату. Устанавливаем привычку работать в Linux
              уверенно, а не по шпаргалке в последний момент.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                href="/course"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-slate-900 shadow-[0_0_35px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                Стартовать сейчас <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/certificates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-slate-100 transition hover:bg-white/10"
              >
                Посмотреть сертификаты <Award className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-slate-400">Доступ и обновления остаются после завершения курса.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
