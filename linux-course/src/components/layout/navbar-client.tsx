'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

type NavItem = {
  name: string;
  href: string;
};

type UserInfo = {
  name?: string | null;
  email?: string | null;
};

interface NavbarClientProps {
  navigation: NavItem[];
  user?: UserInfo | null;
}

export function NavbarClient({ navigation, user: initialUser }: NavbarClientProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Use session user if available, otherwise fall back to initialUser (for server-side rendering)
  const user = session?.user || initialUser;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActive = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-14 lg:flex-wrap">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`group relative text-xs uppercase tracking-[0.25em] transition ${isActive(item.href) ? "text-amber-200" : "text-slate-300 hover:text-white"
              }`}
          >
            {item.name}
            <span
              className={`absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-amber-300 transition ${isActive(item.href) ? "opacity-90" : "opacity-0 group-hover:opacity-60"
                }`}
            />
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-3 lg:flex lg:flex-shrink-0">
        {user ? (
          <>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
            >
              <User className="h-4 w-4 text-amber-200" />
              <span className="text-slate-100">{user.name || "Профиль"}</span>
            </Link>
            <Button
              type="button"
              variant="outline"
              className="border-white/20 bg-white/5 text-slate-100 hover:border-amber-300/60 hover:bg-amber-300 hover:text-slate-900"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-sm text-slate-200 transition hover:text-white"
            >
              Войти
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-full bg-amber-300 px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.4)] transition hover:bg-amber-200"
            >
              Начать
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 lg:hidden">
        {user ? (
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100"
          >
            <User className="h-4 w-4 text-amber-200" />
            {user.name || "Профиль"}
          </Link>
        ) : null}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-slate-100"
          onClick={toggleMenu}
        >
          <span className="sr-only">Открыть меню</span>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-[76px] border-b border-white/10 bg-slate-950/95 px-4 pb-6 pt-4 backdrop-blur">
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm ${isActive(item.href)
                    ? "bg-white/10 text-amber-200"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-3 space-y-2">
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:border-amber-300/60 hover:bg-amber-300 hover:text-slate-900"
                  >
                    <LogOut className="h-4 w-4" />
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-slate-100 hover:bg-white/10"
                    onClick={toggleMenu}
                  >
                    Войти
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block w-full rounded-lg bg-amber-300 px-3 py-2 text-center text-sm font-medium text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:bg-amber-200"
                    onClick={toggleMenu}
                  >
                    Начать
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
