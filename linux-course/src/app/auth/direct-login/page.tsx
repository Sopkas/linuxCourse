import { redirect } from "next/navigation";

export default function DirectLoginPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_DIRECT_LOGIN !== "true") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-bold">Режим прямого входа включён</h1>
        <p className="text-gray-600">
          Эта страница доступна только в отладочных целях. Установите переменную окружения
          NEXT_PUBLIC_ENABLE_DIRECT_LOGIN=false, чтобы закрыть доступ.
        </p>
      </div>
    </div>
  );
}
