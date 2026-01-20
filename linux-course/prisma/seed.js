/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const modules = [
  {
    id: "1",
    title: "Введение в Linux",
    lessons: [
      {
        id: "1-1",
        title: "Что такое Linux",
        content: "Разбираемся с ядром, дистрибутивами и областями применения.",
        order: 1,
      },
      {
        id: "1-2",
        title: "Навигация и пути",
        content: "Абсолютные и относительные пути, pwd, ls, базовые переходы.",
        order: 2,
      },
      {
        id: "1-3",
        title: "Первый запуск терминала",
        content: "Горячие клавиши, справка, выход и базовая ориентация.",
        order: 3,
      },
      {
        id: "1-4",
        title: "Графические окружения",
        content: "GNOME, KDE, XFCE — что внутри и как переключаться.",
        order: 4,
      },
      {
        id: "1-5",
        title: "Где читать и искать",
        content: "Ман-страницы, info и источники справки.",
        order: 5,
      },
    ],
  },
  {
    id: "2",
    title: "Файловая система и навигация",
    lessons: [
      {
        id: "2-1",
        title: "Пути и директории",
        content: "Рабочая директория, абсолютные и относительные пути.",
        order: 6,
      },
    ],
  },
  {
    id: "3",
    title: "Права и пользователи",
    lessons: [
      {
        id: "3-1",
        title: "Права доступа",
        content: "rwx, chmod, владельцы и группы.",
        order: 7,
      },
    ],
  },
  {
    id: "4",
    title: "Службы и процессы",
    lessons: [
      {
        id: "4-1",
        title: "Процессы и службы",
        content: "ps, systemctl status, журнал.",
        order: 8,
      },
    ],
  },
  {
    id: "5",
    title: "Сеть и безопасность",
    lessons: [
      {
        id: "5-1",
        title: "Базовая сеть",
        content: "ping, ss/netstat, проверка доступности.",
        order: 9,
      },
    ],
  },
  {
    id: "6",
    title: "Bash-скрипты и автоматизация",
    lessons: [
      {
        id: "6-1",
        title: "Первый скрипт",
        content: "echo, переменные окружения, shebang.",
        order: 10,
      },
    ],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      id: "user-student",
      name: "Student",
      email: "student@example.com",
      password: passwordHash,
      image: null,
    },
  });

  // Create the main course
  const course = await prisma.course.upsert({
    where: { id: "1" }, // Matches the courseId used in frontend
    update: {},
    create: {
      id: "1",
      title: "Linux Course",
      description: "Linux, как на работе: консоль, сервисы и защита за 30 дней",
      image: "/images/courses/linux-basics.jpg",
    },
  });

  // Create lessons
  for (const module of modules) {
    for (const lesson of module.lessons) {
      await prisma.lesson.upsert({
        where: { id: lesson.id },
        update: {
          title: lesson.title,
          content: lesson.content,
          order: lesson.order,
          courseId: course.id,
        },
        create: {
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          order: lesson.order,
          courseId: course.id,
        },
      });
    }
  }

  // Create tasks with validation commands
  await prisma.task.upsert({
    where: { id: "task-uname" },
    update: {
      validationCmd: "uname -a | grep -i linux && echo PASS",
    },
    create: {
      id: "task-uname",
      title: "Check system info",
      description: "Покажи информацию о системе командой uname -a.",
      solution: "uname -a",
      validationCmd: "uname -a | grep -i linux && echo PASS",
      lessonId: "1-1",
    },
  });

  await prisma.task.upsert({
    where: { id: "task-ls" },
    update: {
      validationCmd: "ls / | grep -E '(bin|etc|home)' && echo PASS",
    },
    create: {
      id: "task-ls",
      title: "List root",
      description: "Посмотри содержимое корня файловой системы.",
      solution: "ls /",
      validationCmd: "ls / | grep -E '(bin|etc|home)' && echo PASS",
      lessonId: "1-2",
    },
  });

  // Add more tasks for other lessons
  await prisma.task.upsert({
    where: { id: "task-whoami" },
    update: {
      validationCmd: "whoami && echo PASS",
    },
    create: {
      id: "task-whoami",
      title: "Current user",
      description: "Узнай своего текущего пользователя командой whoami.",
      solution: "whoami",
      validationCmd: "whoami && echo PASS",
      lessonId: "2-1",
    },
  });

  await prisma.task.upsert({
    where: { id: "task-pwd" },
    update: {
      validationCmd: "pwd | grep '/' && echo PASS",
    },
    create: {
      id: "task-pwd",
      title: "Current directory",
      description: "Покажи текущую рабочую директорию командой pwd.",
      solution: "pwd",
      validationCmd: "pwd | grep '/' && echo PASS",
      lessonId: "2-1",
    },
  });

  console.log("Seed data applied.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
