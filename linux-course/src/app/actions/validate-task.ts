"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export interface ValidationResult {
    success: boolean;
    message: string;
    passed: boolean;
}

/**
 * Get the validation command for a specific task
 */
export async function getTaskValidationCmd(taskId: string): Promise<string | null> {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { validationCmd: true },
    });

    return task?.validationCmd || null;
}

/**
 * Mark a task as completed after successful validation
 */
export async function markTaskCompleted(taskId: string): Promise<ValidationResult> {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Необходимо войти в систему",
                passed: false,
            };
        }

        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: { lesson: true },
        });

        if (!task) {
            return {
                success: false,
                message: "Задание не найдено",
                passed: false,
            };
        }

        // Find existing progress or create new
        const existingProgress = await prisma.progress.findFirst({
            where: {
                userId: session.user.id,
                lessonId: task.lessonId,
                taskId: taskId,
            },
        });

        if (existingProgress) {
            await prisma.progress.update({
                where: { id: existingProgress.id },
                data: { completed: true },
            });
        } else {
            await prisma.progress.create({
                data: {
                    userId: session.user.id,
                    lessonId: task.lessonId,
                    taskId: taskId,
                    completed: true,
                },
            });
        }

        return {
            success: true,
            message: "Задание выполнено! 🎉",
            passed: true,
        };
    } catch (error) {
        console.error("Failed to mark task completed:", error);
        return {
            success: false,
            message: "Ошибка при сохранении прогресса",
            passed: false,
        };
    }
}

/**
 * Get all tasks for a lesson with their validation commands
 */
export async function getLessonTasks(lessonId: string) {
    const tasks = await prisma.task.findMany({
        where: { lessonId },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            title: true,
            description: true,
            validationCmd: true,
        },
    });

    return tasks;
}
