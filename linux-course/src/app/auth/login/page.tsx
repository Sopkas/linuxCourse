'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle =
    "w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/40";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profile",
      });

      if (result?.error) {
        setError("Проверьте email и пароль — что-то не сходится.");
        return;
      }

      router.push("/profile");
    } catch (err) {
      setError("Что-то пошло не так. Попробуйте снова или напишите в поддержку.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-[calc(100vh-140px)] bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100">
              доступ в курс
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]" />
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">
                Вход в лабораторию Linux Course
              </h1>
              <p className="text-lg text-slate-200/80">
                Авторизуйтесь, чтобы продолжить практики: журнал ошибок, сервисы, сеть и проверки
                безопасности. Если вы только пришли — зарегистрируйтесь и начинайте с модуля 1.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-300/20 p-2 ring-1 ring-amber-200/40">
                    <Lock className="h-4 w-4 text-amber-200" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-100">Безопасное подключение</p>
                    <p className="text-xs text-slate-400">Данные шифруются, логины не протекают.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-300/20 p-2 ring-1 ring-cyan-200/40">
                    <ShieldCheck className="h-4 w-4 text-cyan-200" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-100">Доступ к прогрессу</p>
                    <p className="text-xs text-slate-400">Сохраняем чек-листы и статус задач.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Вход</p>
                  <h2 className="font-display text-2xl text-white">Продолжайте оттуда, где остановились</h2>
                </div>
                <KeyRound className="h-6 w-6 text-amber-200" />
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-slate-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputStyle}
                    placeholder="ops@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm text-slate-200">
                    Пароль
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputStyle}
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-slate-300">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/20 bg-slate-900/60 text-amber-200 focus:ring-amber-300"
                    />
                    Запомнить меня
                  </label>
                  <Link href="/auth/help" className="text-amber-200 hover:text-amber-100">
                    Нужна помощь?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-amber-300 text-slate-900 hover:bg-amber-200"
                >
                  {isLoading ? "Входим..." : "Войти"}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Button>
              </form>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Нет аккаунта?
                </div>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p>Создайте профиль и получите доступ к модулям и сертификату.</p>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200 transition hover:border-amber-200/50 hover:bg-white/10"
                  >
                    Регистрация
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
