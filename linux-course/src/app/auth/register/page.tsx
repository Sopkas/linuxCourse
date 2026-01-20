'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Layers, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle =
    "w-full rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/40";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Не удалось зарегистрироваться. Проверьте данные.");
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Вход сразу после регистрации не удался, попробуйте войти вручную.");
        return;
      }

      window.location.href = "/course";
    } catch (err) {
      setError("Ошибка на сервере. Попробуйте еще раз или позже.");
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Регистрация</p>
                <h2 className="font-display text-2xl text-white">Заполните данные, чтобы начать</h2>
                <p className="text-sm text-slate-300">
                  Уже есть аккаунт?{" "}
                  <Link href="/auth/login" className="text-amber-200 hover:text-amber-100">
                    Войти
                  </Link>
                </p>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-slate-200">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputStyle}
                    placeholder="DevOps инженер"
                  />
                </div>

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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputStyle}
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm text-slate-200">
                    Подтверждение пароля
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputStyle}
                    placeholder="••••••••"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-300">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900/60 text-amber-200 focus:ring-amber-300"
                  />
                  <span>
                    Я согласен с{" "}
                    <Link href="/terms" className="text-amber-200 hover:text-amber-100">
                      условиями использования
                    </Link>{" "}
                    и{" "}
                    <Link href="/privacy" className="text-amber-200 hover:text-amber-100">
                      политикой приватности
                    </Link>
                    .
                  </span>
                </label>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-amber-300 text-slate-900 hover:bg-amber-200"
                >
                  {isLoading ? "Создаём доступ..." : "Создать аккаунт"}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Button>
              </form>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Что получите
                </div>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    Доступ к модулям и чек-листам прогресса.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    Практики с journalctl, systemd, ssh, firewall, бэкапы.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                    Сертификат для резюме и LinkedIn.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
