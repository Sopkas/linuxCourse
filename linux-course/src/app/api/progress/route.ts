import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userProgress = await prisma.progress.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ progress: userProgress }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, taskId, completed } = body as {
      lessonId?: string;
      taskId?: string | null;
      completed?: boolean;
    };

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingProgress = await prisma.progress.findFirst({
      where: {
        userId: user.id,
        lessonId,
        taskId: taskId ?? null,
      },
    });

    const progress = existingProgress
      ? await prisma.progress.update({
          where: { id: existingProgress.id },
          data: { completed: Boolean(completed) },
        })
      : await prisma.progress.create({
          data: {
            userId: user.id,
            lessonId,
            taskId: taskId ?? null,
            completed: Boolean(completed),
          },
        });

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    console.error("Failed to upsert progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
