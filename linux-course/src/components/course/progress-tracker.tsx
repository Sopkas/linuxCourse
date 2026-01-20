'use client';

import { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  taskId: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
  courseId: string;
}

interface ProgressTrackerProps {
  courseId: string;
}

export function ProgressTracker({ courseId }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const lessonsResponse = await fetch(`/api/courses/${courseId}/lessons`);
        if (!lessonsResponse.ok) {
          setError("Не удалось получить список уроков.");
          setLessons([]);
          setProgress([]);
          return;
        }
        const lessonsData = await lessonsResponse.json();
        setLessons(lessonsData.lessons);

        const progressResponse = await fetch("/api/progress");
        if (!progressResponse.ok) {
          setError("Не удалось загрузить прогресс.");
          setProgress([]);
          return;
        }
        const progressData = await progressResponse.json();
        setProgress(progressData.progress);

        if (lessonsData.lessons.length > 0) {
          const completedLessons = new Set(
            progressData.progress
              .filter((p: UserProgress) => p.completed && !p.taskId)
              .map((p: UserProgress) => p.lessonId)
          );

          const percentage = (completedLessons.size / lessonsData.lessons.length) * 100;
          setCompletionPercentage(Math.round(percentage));
        }
      } catch (err) {
        console.error("Progress error:", err);
        setError("Не удалось загрузить прогресс. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const isLessonCompleted = (lessonId: string) => {
    return progress.some((p) => p.lessonId === lessonId && p.completed && !p.taskId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Загрузка прогресса...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ошибка</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-200">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваш прогресс</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Выполнено уроков</span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Уроки:</h4>
            <ul className="space-y-1">
              {lessons
                .sort((a, b) => a.order - b.order)
                .map((lesson) => (
                  <li key={lesson.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isLessonCompleted(lesson.id) ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-500" />
                      )}
                      <span>{lesson.title}</span>
                    </div>
                    {isLessonCompleted(lesson.id) && (
                      <Badge variant="outline" className="border-emerald-300/60 bg-emerald-500/10 text-emerald-100">
                        Готово
                      </Badge>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
