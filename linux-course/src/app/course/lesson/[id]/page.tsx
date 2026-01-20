import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lessons } from "@/data/course";
import { getLessonTasks } from "@/app/actions/validate-task";
import { LessonClientWrapper } from "@/components/course/lesson-client-wrapper";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: lessonId } = await params;
  const lesson = lessons[lessonId];

  if (!lesson) {
    return (
      <div className="container mx-auto py-20 text-center text-slate-50">
        <h1 className="text-3xl font-display">Урок не найден</h1>
        <p className="mt-2 text-slate-300/80">Проверьте ссылку или вернитесь к списку модулей.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/course">
            <Button className="bg-amber-300 text-slate-900 hover:bg-amber-200">Назад к курсу</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Load tasks from database
  const dbTasks = await getLessonTasks(lessonId);
  const firstTask = dbTasks[0];

  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(251,191,36,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/40 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 py-14 lg:py-18">
        <div className="mb-6">
          <Link href={`/course/module/${lesson.moduleId}`} className="inline-flex items-center gap-2 text-slate-200">
            <ArrowLeft className="h-4 w-4" />
            Назад к модулю
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25">
              <h1 className="font-display text-3xl text-slate-50">{lesson.title}</h1>
              <p className="mt-2 text-slate-200/80">{lesson.description}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25">
              <h2 className="font-display text-xl text-slate-50">Задание</h2>
              <div className="mt-3 text-slate-200/80">
                <p className="mt-1 text-sm">{firstTask?.description || "Задание не найдено"}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div />
              {lesson.nextLessonId && (
                <Link href={`/course/lesson/${lesson.nextLessonId}`}>
                  <Button className="flex items-center gap-1 bg-amber-300 text-slate-900 hover:bg-amber-200">
                    Следующий урок
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {firstTask && <LessonClientWrapper lessonId={lesson.id} taskId={firstTask.id} />}
          </div>
        </div>
      </section>
    </div>
  );
}

