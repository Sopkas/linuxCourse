1. Архитектура данных (Prisma)
Вам нужно хранить валидационный скрипт для каждого урока. Это обычный Bash-код, который должен вернуть кодовое слово, если всё ок.

schema.prisma:

Фрагмент кода

model Lesson {
  id             String @id @default(cuid())
  title          String
  // ...остальные поля...
  
  // Скрипт проверки. Например:
  // "if [ -f '/root/hello.txt' ]; then echo '__PASS_SECRET__'; else echo '__FAIL__'; fi"
  validationScript String 
}
2. Модификация Web Worker (The Spy)
Нам нужно научить воркер не просто транслировать нажатия клавиш, а выполнять "служебные задания" и перехватывать их результат.

В worker.ts добавляем новый тип сообщения VALIDATE:

TypeScript

// worker.ts

// Уникальный токен, который мы будем ждать в stdout
const SUCCESS_TOKEN = "__LESSON_PASSED_v86__";

self.onmessage = (e) => {
  const { action, payload } = e.data;

  // ... (код инициализации BOOT) ...

  if (action === 'VALIDATE') {
    const userScript = payload.script; // Скрипт из БД
    
    // 1. Оборачиваем скрипт, чтобы он точно напечатал наш Токен при успехе
    // Мы добавляем "clear", чтобы очистить визуальный мусор, если нужно
    const wrapper = `
      (${userScript}) && echo "${SUCCESS_TOKEN}" || echo "__FAIL__"
    `;

    // 2. Флаг, чтобы воркер начал "слушать" вывод именно на предмет токена
    let buffer = "";
    
    // Создаем временный лиснер
    const checkListener = (char: string) => {
      buffer += char;
      
      if (buffer.includes(SUCCESS_TOKEN)) {
        // УРА! Проверка пройдена
        self.postMessage({ action: 'VALIDATION_RESULT', payload: true });
        emulator.remove_listener("serial0-output-char", checkListener);
      } else if (buffer.includes("__FAIL__")) {
        // Провал
        self.postMessage({ action: 'VALIDATION_RESULT', payload: false });
        emulator.remove_listener("serial0-output-char", checkListener);
      }
    };

    emulator.add_listener("serial0-output-char", checkListener);

    // 3. Отправляем команду в терминал (как будто пользователь очень быстро напечатал)
    emulator.serial0_send(wrapper + "\n");
  }
};
3. Frontend Логика (React Hook)
В компоненте урока мы связываем кнопку "Проверить" с этим механизмом.

TypeScript

// hooks/useLessonValidation.ts
import { useState } from 'react';

export function useLessonValidation(worker: Worker | null, lessonId: string, validationScript: string) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

  const validate = () => {
    if (!worker) return;

    setStatus('checking');

    // 1. Подписываемся на ответ от воркера
    const handleMessage = (e: MessageEvent) => {
      if (e.data.action === 'VALIDATION_RESULT') {
        const isSuccess = e.data.payload;
        
        if (isSuccess) {
          setStatus('success');
          // Тут вызываем Server Action для сохранения прогресса в БД
          // await completeLesson(lessonId); 
        } else {
          setStatus('error');
        }
        
        // Убираем лиснер, чтобы не засорять память
        worker.removeEventListener('message', handleMessage);
      }
    };

    worker.addEventListener('message', handleMessage);

    // 2. Отправляем команду на проверку
    worker.postMessage({
      action: 'VALIDATE',
      payload: { script: validationScript }
    });
  };

  return { status, validate };
}
4. Примеры Валидационных Скриптов (Bash Magic)
Самое мощное в этом подходе — гибкость Bash. Вот что вы будете класть в базу данных в поле validationScript:

Урок 1: Создай файл Задача: Создать файл notes.txt с любым текстом. Script:

Bash

[ -f "notes.txt" ]
(Моя обертка в воркере превратит это в [ -f "notes.txt" ] && echo "__PASS__"...)

Урок 2: Grep и Pipe Задача: Найти слово "Error" в логах и сохранить в errors.log. Script:

Bash

grep "Error" server.log > reference.log && diff reference.log errors.log
(Если diff ничего не выведет (файлы идентичны) и вернет exit code 0 — урок сдан).

Урок 3: Права доступа Задача: Сделать скрипт исполняемым (chmod +x). Script:

Bash

[ -x "script.sh" ]
5. UX Проблема: "Мусор в терминале"
Когда вы отправите команду валидации, она отобразится в терминале пользователя (xterm), потому что v86 посылает эхо всех символов обратно. Студент увидит: $ ( [ -f "test" ] ) && echo "__LESSON_PASSED_v86__" || echo "__FAIL__"

Это выглядит непрофессионально.

Решение: "Приглушение" xterm

В Terminal.tsx или в вашем хуке нужно временно отключать запись в xterm, пока идет валидация.

В момент отправки VALIDATE посылаем сигнал в UI: VALIDATION_START.

Компонент терминала ставит флаг isValidating = true.

В обработчике xterm.write() делаем проверку:

TypeScript

// Внутри компонента TerminalWrapper
useEffect(() => {
  // ... setup xterm ...

  const handleOutput = (char: string) => {
    // ХИТРОСТЬ: Если мы знаем, что идет валидация, мы НЕ пишем в xterm,
    // но мы по-прежнему анализируем этот текст в Worker'е.
    if (!isValidatingRef.current) {
      term.write(char);
    }
  };
  
  // ...
}, []);
Более простой вариант (UX Hack): Просто добавьте в начало валидационного скрипта команду clear, а в конце тоже clear. clear && [ -f test ] && echo PASS && sleep 1 && clear Терминал мигнет, но студент вряд ли успеет прочитать длинную страшную команду.

6. Защита от читерства (Security Reality Check)
Важно понимать: Поскольку валидация идет на клиенте, продвинутый студент может:

Открыть DevTools.

Найти запрос к API /api/complete-lesson.

Скопировать его и отправить вручную через cURL.

Как с этим бороться (и надо ли?):

JWT/CSRF Tokens: Стандартная защита NextAuth уже убережет от школьников.

Rate Limiting: Не давать сдавать 100 уроков за 1 минуту.

Философия: Это образовательный проект. Если студент читерит — он обманывает себя. В отличие от финансовых приложений, здесь нет смысла строить "Fort Knox".

Резюме реализации
БД: Хранит Bash-скрипты "условий победы".

Worker: Принимает скрипт -> Выполняет в Linux -> Ловит секретное слово __PASS__.

UI: Блокирует вывод в xterm на секунду (чтобы не пугать юзера кодом проверки) и показывает красивый спиннер.

Result: При успехе дергает Server Action для записи галочки в базу.