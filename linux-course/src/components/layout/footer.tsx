import Link from "next/link";
import { ArrowUpRight, Github, Mail, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(103,232,249,0.08),transparent_35%)]" />
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Terminal className="h-6 w-6 text-amber-200" />
            </span>
            <div>
              <p className="font-display text-2xl text-white">Linux Course</p>
              <p className="text-sm text-slate-400">Маршруты и практики под продакшен.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/course"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
            >
              Перейти к курсу <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
            >
              Сертификаты <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Навигация</p>
            <div className="grid gap-2 text-sm text-slate-200/80">
              <Link href="/course" className="hover:text-white">Курс</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
              <Link href="/about" className="hover:text-white">О проекте</Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Поддержка</p>
            <div className="grid gap-2 text-sm text-slate-200/80">
              <Link href="/contact" className="hover:text-white">Контакты</Link>
              <Link href="/privacy" className="hover:text-white">Политика</Link>
              <Link href="/terms" className="hover:text-white">Условия</Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Связаться</p>
            <div className="flex flex-col gap-3 text-sm text-slate-200/80">
              <a
                href="mailto:hello@linux-course.dev"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-200"
              >
                <Mail className="h-4 w-4" />
                hello@linux-course.dev
              </a>
              <Link
                href="https://github.com"
                className="inline-flex items-center gap-2 text-slate-200 hover:text-amber-200"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Linux Course. Без воды — только практика.</p>
          <p className="text-slate-500">Stay sharp. Stay shell.</p>
        </div>
      </div>
    </footer>
  );
}
