import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Layers,
  LifeBuoy,
  ShieldCheck,
  TimerReset,
  LucideIcon,
} from "lucide-react";

type FAQGroup = {
  title: string;
  icon: LucideIcon;
  items: { question: string; answer: string }[];
};

const highlightCards = [
  { title: "30 дней", desc: "4 модуля, 20+ практик и чек-листы" },
  { title: "20–40 минут", desc: "Укладываем занятия в рабочий ритм" },
  { title: "Сертификат", desc: "Готов для резюме и LinkedIn" },
];

const faqGroups: FAQGroup[] = [
  {
    title: "О курсе",
    icon: Layers,
    items: [
      {
        question: "Что за формат Linux Course?",
        answer:
          "Практический маршрут на 30 дней: от базовой навигации в CLI до работы с сервисами, сетью, бэкапами и безопасностью. Каждая тема — короткое видео + команды + лабораторка.",
      },
      {
        question: "Сколько времени нужно в день?",
        answer:
          "20–40 минут. Уроки и практики разбиты на короткие блоки, чтобы учиться без перегруза и возвращаться даже после пауз.",
      },
      {
        question: "Подойдёт ли новичку в Linux?",
        answer:
          "Да. Начинаем с основы терминала и прав доступа, быстро переходим к systemd, журналам, сети и автоматизации — без лишней теории.",
      },
    ],
  },
  {
    title: "Практика и прогресс",
    icon: TimerReset,
    items: [
      {
        question: "Как устроены практики?",
        answer:
          "Лабы с реальными задачами: читаем логи, перезапускаем сервисы, настраиваем firewall, собираем бэкап и health-checkи. Всё с готовыми командами и подсказками.",
      },
      {
        question: "Как отслеживается прогресс?",
        answer:
          "Внутри — чек-листы по модулям и контрольные вопросы. Видно, что уже сделали и что ещё осталось закрыть.",
      },
      {
        question: "Нужен ли свой сервер?",
        answer:
          "Достаточно локальной Linux-среды или любой VPS. Главное — чтобы была консоль и права запускать systemd/cron.",
      },
    ],
  },
  {
    title: "Доступ и сертификат",
    icon: ShieldCheck,
    items: [
      {
        question: "Сколько действует доступ?",
        answer:
          "Доступ остаётся после прохождения. Можно возвращаться к урокам, обновлениям и чек-листам.",
      },
      {
        question: "Как получить сертификат?",
        answer:
          "Закройте финальный чекпоинт: основные команды, настройка сервиса, бэкап и элементарный hardening. Сертификат можно добавить в резюме и LinkedIn.",
      },
      {
        question: "Есть ли поддержка?",
        answer:
          "Да, внутри раздел «Помощь» и формы для вопросов. Можно написать, если что-то не работает или нужна подсказка по шагам.",
      },
    ],
  },
  {
    title: "Оплата и возврат",
    icon: LifeBuoy,
    items: [
      {
        question: "Что если курс не подойдёт?",
        answer:
          "Напишите нам в течение 7 дней после старта — вернём оплату. Хотим, чтобы учёба была честной и полезной.",
      },
      {
        question: "Как оплатить?",
        answer:
          "Поддерживаем банковские карты и основные платёжные сервисы. После оплаты доступ появляется сразу.",
      },
      {
        question: "Можно купить для команды?",
        answer:
          "Да, оформляем групповые доступы. Напишите на почту, обсудим состав и скидку.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100">
              FAQ
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              ответы на главное
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Вопросы о Linux Course</h1>
              <p className="text-lg text-slate-200/80">
                Собрали ответы, чтобы вы быстро поняли формат, нагрузку и результат. Если чего-то не
                хватает — пишите, поможем.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{card.title}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <HelpCircle className="h-6 w-6 text-amber-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Коротко</p>
                  <h2 className="font-display text-2xl text-white">Главное о курсе в двух словах</h2>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-200/80">
                <p>— 30 дней практики: сервисы, логи, сеть, автоматизация, безопасность.</p>
                <p>— Формат без перегруза: 20–40 минут в день, чек-листы и контроль прогресса.</p>
                <p>— Сертификат и понятный чекпоинт по навыкам в конце.</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/course"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
                >
                  Смотреть программу <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
                >
                  Задать вопрос
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 lg:pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {faqGroups.map((group) => (
            <div
              key={group.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(251,191,36,0.12),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.1),transparent_40%)]" />
              </div>
              <div className="relative flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <group.icon className="h-5 w-5 text-amber-200" />
                </span>
                <h3 className="font-display text-xl text-white">{group.title}</h3>
              </div>
              <div className="relative mt-4 space-y-4">
                {group.items.map((item) => (
                  <div key={item.question} className="rounded-xl border border-white/5 bg-black/30 p-4">
                    <p className="text-sm font-semibold text-slate-50">{item.question}</p>
                    <p className="mt-2 text-sm text-slate-200/80">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-8 text-center shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.12),transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>
          <div className="relative space-y-4">
            <h3 className="font-display text-2xl text-white">Не нашли ответ?</h3>
            <p className="text-slate-200/80">
              Напишите нам — подскажем, как лучше пройти маршрут или подготовим командный доступ.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                Связаться с нами <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
              >
                Войти в кабинет
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
