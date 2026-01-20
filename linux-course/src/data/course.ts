export type LessonTask = {
  id: string;
  description: string;
  command: string;
  expectedOutput: string;
  hint: string;
  validationCmd?: string;
};

export type LessonSummary = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  nextLessonId?: string;
};

export type LessonDetail = LessonSummary & {
  content: string;
  tasks: LessonTask[];
};

export type ModuleItem = {
  id: string;
  title: string;
  description: string;
  lessons: LessonSummary[];
  completed?: boolean;
  locked?: boolean;
};

export const modules: ModuleItem[] = [
  {
    id: "1",
    title: "Введение в Linux",
    description:
      "Что такое дистрибутив, как открыть терминал, базовые команды и ориентация в файловой системе.",
    completed: false,
    locked: false,
    lessons: [
      {
        id: "1-1",
        moduleId: "1",
        title: "Что такое Linux",
        description: "Разбираемся с ядром, дистрибутивами и областями применения.",
        completed: false,
        locked: false,
        nextLessonId: "1-2",
      },
      {
        id: "1-2",
        moduleId: "1",
        title: "Навигация и пути",
        description: "Абсолютные и относительные пути, pwd, ls, базовые переходы.",
        completed: false,
        locked: false,
        nextLessonId: "1-3",
      },
      {
        id: "1-3",
        moduleId: "1",
        title: "Первый запуск терминала",
        description: "Горячие клавиши, справка, выход и базовая ориентация.",
        completed: false,
        locked: true,
      },
      {
        id: "1-4",
        moduleId: "1",
        title: "Графические окружения",
        description: "GNOME, KDE, XFCE — что внутри и как переключаться.",
        completed: false,
        locked: true,
      },
      {
        id: "1-5",
        moduleId: "1",
        title: "Где читать и искать",
        description: "Ман-страницы, info и источники справки.",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: "2",
    title: "Файловая система и навигация",
    description: "Переходы по каталогам, поиск, просмотр содержимого, скрытые файлы.",
    completed: false,
    locked: true,
    lessons: [
      {
        id: "2-1",
        moduleId: "2",
        title: "Пути и директории",
        description: "Рабочая директория, абсолютные и относительные пути.",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: "3",
    title: "Права и пользователи",
    description: "Права доступа, группы, sudo, смена владельца и базовая безопасность.",
    completed: false,
    locked: true,
    lessons: [
      {
        id: "3-1",
        moduleId: "3",
        title: "Права доступа",
        description: "rwx, chmod, владельцы и группы.",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: "4",
    title: "Службы и процессы",
    description: "systemd, логи, мониторинг, управление сервисами.",
    completed: false,
    locked: true,
    lessons: [
      {
        id: "4-1",
        moduleId: "4",
        title: "Процессы и службы",
        description: "ps, systemctl status, журнал.",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: "5",
    title: "Сеть и безопасность",
    description: "SSH, firewall, диагностика соединений.",
    completed: false,
    locked: true,
    lessons: [
      {
        id: "5-1",
        moduleId: "5",
        title: "Базовая сеть",
        description: "ping, ss/netstat, проверка доступности.",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: "6",
    title: "Bash-скрипты и автоматизация",
    description: "Переменные, условия, циклы, cron/timers.",
    completed: false,
    locked: true,
    lessons: [
      {
        id: "6-1",
        moduleId: "6",
        title: "Первый скрипт",
        description: "echo, переменные окружения, shebang.",
        completed: false,
        locked: true,
      },
    ],
  },
];

export const lessons: Record<string, LessonDetail> = {
  "1-1": {
    id: "1-1",
    moduleId: "1",
    title: "Что такое Linux",
    description: "Разбираемся, что такое ядро, дистрибутивы и где используется Linux.",
    completed: false,
    locked: false,
    nextLessonId: "1-2",
    content: `
      <h1>Что такое Linux</h1>
      <p>Linux — ядро и семейство систем, на которых строятся дистрибутивы: Ubuntu, Debian, Fedora, Arch и другие.</p>
      <h2>Базовые понятия</h2>
      <ul>
        <li>Дистрибутив = ядро + утилиты + менеджер пакетов.</li>
        <li>Терминал (shell) — оболочка для выполнения команд.</li>
        <li>Ман-страницы — встроенная справка: <code>man ls</code>.</li>
      </ul>
      <h2>Ключевые директории</h2>
      <ul>
        <li><code>/bin</code> — базовые утилиты.</li>
        <li><code>/etc</code> — конфигурация.</li>
        <li><code>/home</code> — домашние каталоги.</li>
        <li><code>/var</code> — логи и данные сервисов.</li>
      </ul>
    `,
    tasks: [
      {
        id: "1",
        description: "Покажи информацию о системе командой uname -a.",
        command: "uname -a",
        expectedOutput: "Linux",
        hint: "Выполни команду uname -a в терминале.",
      },
    ],
  },
  "1-2": {
    id: "1-2",
    moduleId: "1",
    title: "Навигация по системе",
    description: "Работа с путями и содержимым каталогов.",
    completed: false,
    locked: false,
    nextLessonId: "1-3",
    content: `
      <h1>Навигация по системе</h1>
      <p>Понимаем абсолютные и относительные пути. Абсолютные начинаются с <code>/</code>, относительные — от текущего каталога.</p>
      <ul>
        <li><code>pwd</code> — покажи текущий путь.</li>
        <li><code>ls</code> — список файлов, <code>ls -a</code> — включая скрытые.</li>
        <li><code>cd /</code> — перейти в корень.</li>
      </ul>
    `,
    tasks: [
      {
        id: "2",
        description: "Посмотри содержимое корня файловой системы.",
        command: "ls /",
        expectedOutput: "bin",
        hint: "Выполни команду ls / в терминале.",
      },
    ],
  },
  "3-1": {
    id: "3-1",
    moduleId: "3",
    title: "Права доступа",
    description: "rwx, chmod, владельцы и группы.",
    completed: false,
    locked: false,
    content: `
      <h1>Права доступа</h1>
      <p>У файлов и директорий есть владелец, группа и набор прав: чтение (r), запись (w), исполнение (x).</p>
      <ul>
        <li><code>ls -l</code> — показать права.</li>
        <li><code>chmod</code> — изменить права.</li>
        <li><code>chown</code> — изменить владельца.</li>
      </ul>
    `,
    tasks: [
      {
        id: "3",
        description: "Узнай своего текущего пользователя.",
        command: "whoami",
        expectedOutput: "user",
        hint: "Выполни команду whoami.",
      },
    ],
    nextLessonId: "4-1",
  },
  "4-1": {
    id: "4-1",
    moduleId: "4",
    title: "Процессы и службы",
    description: "ps, systemctl status, журнал.",
    completed: false,
    locked: false,
    content: `
      <h1>Процессы и службы</h1>
      <p>Сервисы управляются через systemd, процессы можно посмотреть командой <code>ps</code> или <code>top</code>.</p>
    `,
    tasks: [
      {
        id: "4",
        description: "Покажи процессы текущего пользователя.",
        command: "ps",
        expectedOutput: "PID",
        hint: "Выполни команду ps.",
      },
    ],
    nextLessonId: "5-1",
  },
  "5-1": {
    id: "5-1",
    moduleId: "5",
    title: "Базовая сеть",
    description: "ping, ss/netstat, проверка доступности.",
    completed: false,
    locked: false,
    content: `
      <h1>Базовая сеть</h1>
      <p>Проверяем связь и порты: <code>ping</code>, <code>ss</code>/<code>netstat</code>.</p>
    `,
    tasks: [
      {
        id: "5",
        description: "Проверь доступность локальной машины.",
        command: "ping -c 1 localhost",
        expectedOutput: "1 packets transmitted",
        hint: "Выполни ping -c 1 localhost.",
      },
    ],
    nextLessonId: "6-1",
  },
  "6-1": {
    id: "6-1",
    moduleId: "6",
    title: "Первый скрипт",
    description: "echo, переменные окружения, shebang.",
    completed: false,
    locked: false,
    content: `
      <h1>Первый скрипт</h1>
      <p>Создаём простой скрипт и выводим переменные окружения.</p>
    `,
    tasks: [
      {
        id: "6",
        description: "Покажи текущую оболочку.",
        command: "echo $SHELL",
        expectedOutput: "bash",
        hint: "Выполни echo $SHELL.",
      },
    ],
  },
};
