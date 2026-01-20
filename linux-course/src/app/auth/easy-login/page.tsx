import { redirect } from "next/navigation";

export default function EasyLoginPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_DIRECT_LOGIN !== "true") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-bold">Упрощённый вход отключён</h1>
        <p className="text-gray-600">
          Включите NEXT_PUBLIC_ENABLE_DIRECT_LOGIN=true в окружении, если нужно протестировать быстрый вход.
        </p>
      </div>
    </div>
  );
}
