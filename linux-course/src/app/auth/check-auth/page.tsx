'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function CheckAuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Проверка статуса авторизации</h1>
      
      <div className="space-y-4 max-w-md">
        <div className="p-4 border rounded">
          <h2 className="font-bold mb-2">Статус авторизации:</h2>
          <p className="mb-2">
            {status === 'loading' && 'Загрузка...'}
            {status === 'authenticated' && 'Вы авторизованы'}
            {status === 'unauthenticated' && 'Вы не авторизованы'}
          </p>
          
          {status === 'authenticated' && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Данные сессии:</h3>
              <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          {status === 'authenticated' ? (
            <Button onClick={handleSignOut}>Выйти</Button>
          ) : (
            <Button onClick={() => router.push('/auth/login')}>Войти</Button>
          )}
          
          <Button onClick={() => router.push('/auth/test-login')} variant="outline">
            Тестовая страница входа
          </Button>
          
          <Button onClick={() => router.push('/')} variant="outline">
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}