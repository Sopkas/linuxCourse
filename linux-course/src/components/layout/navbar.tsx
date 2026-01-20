import Link from "next/link";
import { Terminal } from "lucide-react";

import { auth } from "@/auth";
import { NavbarClient } from "./navbar-client";

const navigation = [
  { name: "Курс", href: "/course" },
  { name: "Сертификаты", href: "/certificates" },
  { name: "FAQ", href: "/faq" },
  { name: "Контакты", href: "/contact" },
];

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="h-px w-full bg-gradient-to-r from-amber-300 via-cyan-300 to-amber-300" />
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:py-5">
        <div className="flex items-center gap-3 lg:flex-1">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:ring-amber-300/60">
              <Terminal className="h-5 w-5 text-amber-200" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg text-slate-50">Linux Course</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">lab-ready</p>
            </div>
          </Link>
        </div>

        <NavbarClient navigation={navigation} user={user} />
      </nav>
    </header>
  );
}
