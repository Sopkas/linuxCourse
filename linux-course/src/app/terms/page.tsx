import { ClipboardList, FileText, Mail, ShieldAlert, ShieldCheck, Timer, Wallet } from "lucide-react";

const highlights = [
  { label: "Документ", value: "Публичная оферта" },
  { label: "Дата обновления", value: "02.12.2025" },
  { label: "Контакты", value: "info@linux-course.dev" },
];

const sections = [
  {
    title: "1. Предмет",
    text: [
      "Linux Course предоставляет доступ к образовательным материалам, практикам и сервисам курса «Linux Course».",
      "Используя сервис, вы заключаете договор-оферту и подтверждаете согласие с условиями.",
    ],
  },
  {
    title: "2. Доступ и учетная запись",
    text: [
      "Для доступа требуется регистрация и сохранение учетных данных в тайне.",
      "Мы вправе ограничивать доступ при нарушении условий или подозрении на злоупотребления.",
    ],
  },
  {
    title: "3. Оплата и возвраты",
    text: [
      "Стоимость и порядок оплаты указаны на сайте. Доступ предоставляется после подтверждения платежа.",
      "Возвраты возможны в течение 7 дней после покупки при отсутствии существенного использования материалов (по запросу на поддержку).",
    ],
  },
  {
    title: "4. Контент и лицензия",
    text: [
      "Материалы курса предоставляются для личного использования. Передача, публикация или продажа третьим лицам запрещены.",
      "Исключительные права на материалы принадлежат Linux Course или правообладателям.",
    ],
  },
  {
    title: "5. Поведение и безопасность",
    text: [
      "Запрещены действия, нарушающие закон, авторские права, безопасность сервиса или мешающие другим пользователям.",
      "Мы можем приостановить или прекратить доступ при нарушении правил.",
    ],
  },
  {
    title: "6. Отказ от гарантий",
    text: [
      "Сервис предоставляется «как есть». Мы стремимся к бесперебойной работе, но не гарантируем отсутствие сбоев.",
      "Мы не отвечаем за успех трудоустройства или иные результаты, зависящие от пользователя.",
    ],
  },
  {
    title: "7. Ограничение ответственности",
    text: [
      "Мы не отвечаем за косвенные убытки, упущенную выгоду и последствия использования материалов не по назначению.",
      "Наша совокупная ответственность ограничена суммой, уплаченной за доступ за последние 6 месяцев, если иное не установлено законом.",
    ],
  },
  {
    title: "8. Изменения условий",
    text: [
      "Мы можем обновлять документ. Актуальная версия всегда на этой странице; о существенных изменениях уведомляем.",
      "Продолжая пользоваться сервисом после обновления, вы принимаете новые условия.",
    ],
  },
  {
    title: "9. Применимое право и споры",
    text: [
      "Документ регулируется правом РФ. Споры решаются путем переговоров; при отсутствии согласия — в компетентном суде по месту регистрации владельца сервиса.",
    ],
  },
  {
    title: "10. Контакты",
    text: [
      "Email по правовым вопросам: info@linux-course.dev",
      "Поддержка по продукту: hello@linux-course.dev",
    ],
  },
];

export default function TermsPage() {
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
              условия
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              использование
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Условия использования</h1>
              <p className="text-lg text-slate-200/80">
                Правила доступа к курсу, оплаты, лицензии на материалы и ответственности. Написано простым языком,
                но подходит для договоров.
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
                  <FileText className="h-6 w-6 text-amber-200" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">кратко</p>
                  <h2 className="font-display text-2xl text-white">Оферта и правила сервиса</h2>
                </div>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <p>— Доступ к материалам курса после оплаты или по доступу команд.</p>
                <p>— Личная лицензия: нельзя публиковать, передавать, продавать материалы.</p>
                <p>— Возврат в течение 7 дней при отсутствии существенного использования.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-200" />
                  Мы защищаем сервис и пользователей.
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-200" />
                  Может быть ограничен доступ при нарушениях.
                </div>
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-amber-200" />
                  Оплата на сайте, возврат по заявке.
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-amber-200" />
                  Актуальная версия — на этой странице.
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

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 px-6 py-8 text-center shadow-2xl shadow-black/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.12),transparent_35%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.12),transparent_35%)]" />
          </div>
          <div className="relative space-y-4">
            <h3 className="font-display text-2xl text-white">Вопросы по условиям?</h3>
            <p className="text-slate-200/80">
              Напишите нам — поясним детали оферты, возвратов и лицензий. Будем на связи в рабочее время.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:info@linux-course.dev"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_25px_rgba(251,191,36,0.35)] transition hover:bg-amber-200"
              >
                info@linux-course.dev
              </a>
              <a
                href="mailto:hello@linux-course.dev"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-100 transition hover:border-amber-200/50 hover:bg-white/10"
              >
                hello@linux-course.dev
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
