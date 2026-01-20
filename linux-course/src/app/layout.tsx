import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AppSessionProvider } from "@/components/providers/session-provider";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["500", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "600"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Linux Course — практический Linux за 30 дней",
  description:
    "Прокачайте Linux: консоль, сервисы, сеть и автоматизация через короткие сессии и практические лабораторные. Получайте понятные результаты для резюме и интервью.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plexSans.variable} ${unbounded.variable} ${jetBrains.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppSessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppSessionProvider>
      </body>
    </html>
  );
}
