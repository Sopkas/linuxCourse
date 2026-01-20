import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const question = (body?.question as string | undefined)?.trim();

    if (!question) {
      return NextResponse.json({ error: "Укажите вопрос" }, { status: 400 });
    }

    const answer =
      "Привет! Я могу помочь с вопросами по Linux: сервисы, логи, сеть, автоматизация. Сформулируйте задачу конкретно, например: «Почему systemd не стартует сервис nginx?» или «Как настроить firewall для порта 443».";

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}
