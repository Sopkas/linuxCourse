import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle, Clock, Shield, User } from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { modules as courseModules } from "@/data/course";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  // Fetch user from database
  const dbUser = user?.email
    ? await prisma.user.findUnique({
      where: { email: user.email },
    })
    : null;

  // Fetch user progress from database
  const userProgressRecords = dbUser
    ? await prisma.progress.findMany({
      where: { userId: dbUser.id },
    })
    : [];

  // Calculate completed lessons
  const completedLessonIds = new Set(
    userProgressRecords
      .filter((p) => p.completed && !p.taskId)
      .map((p) => p.lessonId)
  );

  // Total lessons from course data
  const totalLessons = courseModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessonsCount = completedLessonIds.size;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Calculate module progress
  const modulesProgress = courseModules.map((mod) => {
    const completed = mod.lessons.filter((l) => completedLessonIds.has(l.id)).length;
    const value = mod.lessons.length > 0 ? Math.round((completed / mod.lessons.length) * 100) : 0;
    return {
      id: mod.id,
      title: mod.title,
      value,
    };
  });

  // Format dates
  const joinedDate = dbUser?.createdAt
    ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(dbUser.createdAt)
    : "неизвестно";

  const lastActiveDate = dbUser?.updatedAt
    ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(dbUser.updatedAt)
    : "неизвестно";

  // Count certificates
  const certificatesCount = dbUser
    ? await prisma.certificate.count({ where: { userId: dbUser.id } })
    : 0;

  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative container mx-auto px-4 py-14 lg:py-18">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <User className="h-10 w-10 text-amber-200" />
            </div>
            <div>
              <h1 className="font-display text-3xl text-white">{user?.name || "Имя не указано"}</h1>
              <p className="text-slate-200/80">{user?.email || "email не указан"}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  С нами: {joinedDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Последняя активность: {lastActiveDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              className="bg-amber-300 text-slate-900 hover:bg-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.35)]"
            >
              <Link href="/course">
                Продолжить обучение <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/5 text-slate-100 hover:border-amber-200/60 hover:bg-white/10"
            >
              <Link href="/certificates">Сертификаты</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Прогресс</p>
                <h2 className="font-display text-2xl text-white">Общий прогресс курса</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-amber-200">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="mt-4 h-2" />

            <div className="mt-6 space-y-4">
              {modulesProgress.map((mod) => (
                <div key={mod.id}>
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>{mod.title}</span>
                    <span>{mod.value}%</span>
                  </div>
                  <Progress value={mod.value} className="mt-2 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/25">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <CheckCircle className="h-6 w-6 text-amber-200" />
                </div>
                <div>
                  <p className="text-sm text-slate-200">Уроки</p>
                  <p className="text-lg font-semibold text-white">
                    {completedLessonsCount} / {totalLessons}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/25">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-300/20 ring-1 ring-emerald-200/40">
                  <Shield className="h-6 w-6 text-emerald-200" />
                </div>
                <div>
                  <p className="text-sm text-slate-200">Сертификаты</p>
                  <p className="text-lg font-semibold text-white">{certificatesCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
