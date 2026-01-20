'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthHelpPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Помощь с авторизацией</h1>
      
      <div className="space-y-6 max-w-2xl">
        <div className="p-4 border rounded bg-blue-50">
          <h2 className="text-xl font-bold mb-3">Проблемы с входом?</h2>
          <p className="mb-4">
            Если у вас возникли проблемы с входом в систему, воспользуйтесь одним из следующих способов:
          </p>
          
          <h3 className="font-bold mb-2">Способ 1: Быстрый вход с тестовым аккаунтом</h3>
          <p className="mb-4">
            Мы подготовили тестовый аккаунт для быстрого входа. Просто нажмите кнопку ниже:
          </p>
          <div className="mb-6">
            <Link href="/auth/easy-login">
              <Button>Быстрый вход с тестовым аккаунтом</Button>
            </Link>
          </div>
          
          <h3 className="font-bold mb-2">Способ 2: Вход с вашими данными</h3>
          <p className="mb-4">
            Если вы уже зарегистрированы, используйте свой email и пароль для входа:
          </p>
          <div className="mb-6">
            <Link href="/auth/login">
              <Button variant="outline">Перейти на страницу входа</Button>
            </Link>
          </div>
          
          <h3 className="font-bold mb-2">Способ 3: Регистрация нового аккаунта</h3>
          <p className="mb-4">
            Если у вас еще нет аккаунта, вы можете зарегистрироваться:
          </p>
          <div className="mb-6">
            <Link href="/auth/register">
              <Button variant="outline">Перейти на страницу регистрации</Button>
            </Link>
          </div>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-3">Тестовые данные для входа</h2>
          <p className="mb-4">Вы можете использовать следующие данные для входа в систему:</p>
          
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p><strong>Email:</strong> di.ag.54@mail.ru</p>
            <p><strong>Пароль:</strong> U6B-7RX-9Sw-txr</p>
          </div>
          
          <p className="text-sm text-gray-600">
            Примечание: Эти данные предназначены только для тестирования и демонстрации.
          </p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-3">Дополнительные инструменты</h2>
          <div className="space-y-2">
            <div>
              <Link href="/auth/check-auth">
                <Button variant="outline" size="sm">Проверить статус авторизации</Button>
              </Link>
            </div>
            <div>
              <Link href="/auth/test-login">
                <Button variant="outline" size="sm">Тестовая страница входа</Button>
              </Link>
            </div>
            <div>
              <Link href="/">
                <Button variant="outline" size="sm">На главную</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}