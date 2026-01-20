'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SimpleUser = {
  name: string;
  email: string;
  loginTime: string | number;
  loggedIn: boolean;
};

export default function SimpleCourse() {
  const router = useRouter();
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData) as Partial<SimpleUser>;
        if (
          parsedUser.loggedIn &&
          parsedUser.name &&
          parsedUser.email &&
          parsedUser.loginTime
        ) {
          setUser({
            name: parsedUser.name,
            email: parsedUser.email,
            loginTime: parsedUser.loginTime,
            loggedIn: true,
          });
        } else {
          router.push('/auth/direct-login');
        }
      } catch (error) {
        console.error('Ошибка парсинга данных пользователя:', error);
        router.push('/auth/direct-login');
      }
    } else {
      router.push('/auth/direct-login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Перенаправление происходит в useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Linux Course</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Добро пожаловать, {user.name}!</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Поздравляем! Вы успешно вошли в систему!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Добро пожаловать в курс изучения Linux. Здесь вы найдете все необходимые материалы для освоения операционной системы Linux.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-3">📚 Теория</h3>
                  <p className="text-gray-600 mb-4">Изучите основы Linux, команды терминала и принципы работы системы.</p>
                  <Button className="w-full" disabled>
                    Скоро доступно
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-3">💻 Практика</h3>
                  <p className="text-gray-600 mb-4">Выполняйте практические задания в интерактивном терминале.</p>
                  <Button className="w-full" disabled>
                    Скоро доступно
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-3">🏆 Сертификат</h3>
                  <p className="text-gray-600 mb-4">Получите сертификат о прохождении курса после выполнения всех заданий.</p>
                  <Button className="w-full" disabled>
                    Скоро доступно
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Информация о вашем входе:</h4>
                <div className="text-sm text-blue-800">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Время входа:</strong> {new Date(user.loginTime).toLocaleString('ru-RU')}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/">
                  <Button variant="outline">
                    ← Вернуться на главную
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
