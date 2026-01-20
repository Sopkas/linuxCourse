import { redirect } from "next/navigation";

export default function TestLoginPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_DIRECT_LOGIN !== "true") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-3">
        <h1 className="text-2xl font-bold">Тестовый вход отключён</h1>
        <p className="text-gray-600">
          Для отладки установите NEXT_PUBLIC_ENABLE_DIRECT_LOGIN=true. В продакшене держите его выключенным.
        </p>
      </div>
    </div>
  );
}
