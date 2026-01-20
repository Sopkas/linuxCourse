import { BookLock, Cookie, Mail, ShieldCheck, ShieldQuestion } from "lucide-react";

const highlights = [
  { label: "Дата обновления", value: "02.12.2025" },
  { label: "Контакты", value: "hello@linux-course.dev" },
  { label: "Доступ", value: "Владелец — Linux Course" },
];

const sections = [
  {
    title: "1. Общие положения",
    text: [
      "Политика описывает, какие данные мы получаем при использовании сервиса Linux Course, как их обрабатываем и какие права есть у пользователей.",
      "Используя сайт и курс, вы соглашаетесь с этой политикой. Если не согласны — прекратите использование и свяжитесь с нами.",
    ],
  },
  {
    title: "2. Какие данные мы собираем",
    text: [
      "Идентификаторы: имя, email, учетная запись, токены сессии.",
      "Технические данные: IP-адрес, User-Agent, время входа, события в продукте.",
      "Учебные данные: прогресс по урокам, выполненные задания, ответы на контрольные вопросы.",
    ],
  },
  {
    title: "3. Зачем используем данные",
    text: [
      "Оказание услуг курса: авторизация, доступ к урокам, фиксация прогресса.",
      "Улучшение сервиса: аналитика анонимизированных метрик, предотвращение сбоев.",
      "Коммуникация: важные уведомления об оплате, доступе, обновлениях и поддержке.",
    ],
  },
  {
    title: "4. Правовые основания",
    text: [
      "Необходимость исполнения договора-оферты (оказание услуг курса).",
      "Законный интерес — поддержка безопасности, предотвращение злоупотреблений.",
      "Согласие пользователя — на отправку уведомлений и применение cookie.",
    ],
  },
  {
    title: "5. Хранение и защита",
    text: [
      "Данные хранятся на защищенных серверах. Доступ ограничен сотрудниками по необходимости.",
      "Используем шифрование для передачи, аутентификацию по паролю/ключу, аудит доступа.",
      "Срок хранения — пока действует учетная запись или требуется по закону. По запросу удаляем, если нет обязательств хранить.",
    ],
  },
  {
    title: "6. Передача третьим лицам",
    text: [
      "Можем передавать сервисным провайдерам (хостинг, почта, аналитика) только минимальный объем данных под договор конфиденциальности.",
      "Передача возможна по закону или по запросу государственных органов при наличии правового основания.",
      "Мы не продаем персональные данные.",
    ],
  },
  {
    title: "7. Cookie и аналитика",
    text: [
      "Технические cookie — для входа, сохранения сессии и настроек.",
      "Аналитические cookie — для улучшения интерфейса и стабильности. Можно ограничить в настройках браузера.",
      "Отключение cookie может повлиять на работу отдельных функций.",
    ],
  },
  {
    title: "8. Права пользователя",
    text: [
      "Получать информацию о данных, исправлять неточности, требовать удаление или ограничение обработки.",
      "Отозвать согласие на коммуникации и cookie (кроме необходимых).",
      "Написать нам, если хотите реализовать эти права: hello@linux-course.dev.",
    ],
  },
  {
    title: "9. Изменения политики",
    text: [
      "Мы можем обновлять документ. Актуальная версия публикуется на этой странице с датой обновления.",
      "Существенные изменения сопровождаем уведомлением по email или внутри кабинета.",
    ],
  },
  {
    title: "10. Контакты",
    text: [
      "Email: hello@linux-course.dev",
      "Для правовых запросов: info@linux-course.dev",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative isolate min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950" />
      </div>

      <section className="relative container mx-auto px-4 py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-100">
              политика
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              конфиденциальность
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Политика конфиденциальности</h1>
              <p className="text-lg text-slate-200/80">
                Читаемый документ о том, какие данные мы собираем, зачем это делаем и как их защищаем. Подходит
                для юристов, пользователей и командных закупок.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-200/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-300/20 ring-1 ring-amber-200/40">
                  <BookLock className="h-6 w-6 text-amber-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">вкратце</p>
                  <h2 className="font-display text-2xl text-white">Мы защищаем ваши данные</h2>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <p>— Собираем только то, что нужно для работы курса.</p>
                <p>— Не продаем данные и не передаем без основания.</p>
                <p>— Можно запросить удаление или исправление информации.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-200" />
                  Шифрование и ограниченный доступ.
                </div>
                <div className="flex items-center gap-2">
                  <Cookie className="h-4 w-4 text-amber-200" />
                  Cookie только для сессии и аналитики.
                </div>
                <div className="flex items-center gap-2">
                  <ShieldQuestion className="h-4 w-4 text-amber-200" />
                  Вопросы — hello@linux-course.dev.
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-200" />
                  Уведомляем об изменениях.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 lg:pb-20">
        <div className="grid gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/25"
            >
              <h3 className="font-display text-xl text-white">{section.title}</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-200/80">
                {section.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
