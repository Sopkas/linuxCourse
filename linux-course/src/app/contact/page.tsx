'use client';

import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Phone, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    // Имитация отправки
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "general",
        message: "",
      });
    }, 1200);
  };

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
              связь
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              поддержка
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-4xl text-white sm:text-5xl">Свяжитесь с нами</h1>
              <p className="text-lg text-slate-200/80">
                Напишите, если нужна помощь по курсу, оплате или командному доступу. Отвечаем быстро и
                по делу.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Email</p>
                <p className="mt-2 text-sm text-slate-200/80">hello@linux-course.dev</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Телеграм</p>
                <p className="mt-2 text-sm text-slate-200/80">@linuxcourse</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">График</p>
                <p className="mt-2 text-sm text-slate-200/80">Пн–Пт, 10:00–19:00 МСК</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-300/20 p-2 ring-1 ring-amber-200/40">
                    <Sparkles className="h-4 w-4 text-amber-200" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-100">Быстрые ответы</p>
                    <p className="text-xs text-slate-400">По оплате и доступу — в течение рабочего дня.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-cyan-300/20 p-2 ring-1 ring-cyan-200/40">
                    <MessageSquare className="h-4 w-4 text-cyan-200" />
                  </span>
                  <div>
                    <p className="text-sm text-slate-100">По курсу</p>
                    <p className="text-xs text-slate-400">Советы по маршруту, прогрессу, сертификату.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-300/10 via-transparent to-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Форма</p>
                  <h2 className="font-display text-2xl text-white">Напишите нам</h2>
                </div>
                <Send className="h-6 w-6 text-amber-200" />
              </div>

              {submitted && (
                <div className="mb-4 rounded-lg border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                  Сообщение отправлено. Мы ответим на указанный email.
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Как вас зовут"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Тема</Label>
                  <RadioGroup value={formData.subject} onValueChange={handleRadioChange} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="general" id="general" />
                      <span className="text-sm text-slate-200">Общий вопрос</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="technical" id="technical" />
                      <span className="text-sm text-slate-200">По курсу/технический</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="billing" id="billing" />
                      <span className="text-sm text-slate-200">Оплата и доступ</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="team" id="team" />
                      <span className="text-sm text-slate-200">Командный доступ</span>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Опишите, что хотите решить или спросить..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-amber-300 text-slate-900 hover:bg-amber-200" disabled={isSubmitting}>
                  {isSubmitting ? "Отправляем..." : "Отправить сообщение"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-slate-200/80">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Другие каналы
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Mail className="h-4 w-4 text-amber-200" />
                    hello@linux-course.dev
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Phone className="h-4 w-4 text-amber-200" />
                    +7 (999) 123-45-67
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
