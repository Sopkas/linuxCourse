"use client";

import dynamic from "next/dynamic";

const LessonClient = dynamic(
    () => import("./lesson-client").then((mod) => mod.LessonClient),
    {
        ssr: false,
        loading: () => <div className="h-[450px] w-full animate-pulse rounded-2xl bg-white/5" />,
    }
);

export function LessonClientWrapper(props: { lessonId: string; taskId: string }) {
    return <LessonClient {...props} />;
}
