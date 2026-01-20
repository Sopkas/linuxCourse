import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Registration is temporarily disabled
  return NextResponse.json(
    {
      error: "Извините, сервис временно приостановил свою работу. Регистрация и авторизация временно недоступны."
    },
    { status: 503 }
  );
}
