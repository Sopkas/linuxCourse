import Link from "next/link";
import { AlertTriangle, Home, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";

const errorMap: Record<string, string> = {
  CredentialsSignin: "Неверный email или пароль. Проверьте данные и попробуйте снова.",
  AccessDenied: "Доступ запрещен. Проверьте права или обратитесь в поддержку.",
  Configuration: "Ошибка конфигурации авторизации. Сообщите админу.",
};

type ErrorPageProps = {
  searchParams?: Promise<Record<string, string>>;
};

export default async function AuthErrorPage({ searchParams }: ErrorPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const code = params?.error ?? "unknown";
  const message = errorMap[code] ?? "Не удалось войти. Попробуйте снова или напишите нам.";

  return (
    <div className="relative isolate min-h-[60vh] bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative container mx-auto flex flex-col items-center px-4 py-16 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-400/40">
          <AlertTriangle className="h-7 w-7 text-red-200" />
        </div>
        <h1 className="font-display text-3xl text-white sm:text-4xl">Ошибка авторизации</h1>
        <p className="mt-3 max-w-xl text-slate-200/80">{message}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">код: {code}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-amber-300 text-slate-900 hover:bg-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.35)]"
          >
            <Link href="/auth/login">
              Повторить вход <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border border-white/10 bg-white/5 text-slate-100 hover:border-amber-200/50 hover:bg-white/10"
          >
            <Link href="/">
              На главную <Home className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
