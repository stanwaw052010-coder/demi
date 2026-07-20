"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { MessengerRow } from "./MessengerButtons";
import { InstagramIcon } from "./icons/BrandIcons";
import { site } from "@/lib/site";

const services = [
  "Ендосфера-терапія",
  "LPG-масаж",
  "Антицелюлітний масаж",
  "Вакуумний масаж",
  "Лімфодренаж",
  "Корекція фігури",
  "Курси навчання",
];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]);
  const [note, setNote] = useState("");

  const buildMessage = () =>
    encodeURIComponent(
      `Вітаю! Хочу записатися 💆‍♀️\n` +
        `Ім'я: ${name || "—"}\n` +
        `Телефон: ${phone || "—"}\n` +
        `Послуга: ${service}` +
        (note ? `\nПобажання: ${note}` : ""),
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${site.phoneDigits}?text=${buildMessage()}`, "_blank");
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-gold-soft">Контакти</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Запишіться на свій{" "}
              <em className="not-italic text-gold-soft">сеанс краси</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-cream/70">
              Оберіть зручний месенджер або заповніть форму — і я підберу для вас
              найкращий час.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Left: details + messengers + map */}
          <Reveal direction="right" className="flex flex-col gap-6">
            <div className="glass-dark rounded-3xl p-7">
              <h3 className="font-display text-2xl">Напишіть у месенджер</h3>
              <p className="mt-2 text-sm text-cream/60">
                Відповім швидко в будь-якому зручному для вас застосунку.
              </p>
              <MessengerRow className="mt-6" />

              <div className="mt-7 space-y-4 border-t border-cream/10 pt-6">
                <a href={site.links.tel} className="flex items-center gap-4 transition-colors hover:text-gold-soft">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream/10">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-semibold">{site.phonePretty}</span>
                </a>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 transition-colors hover:text-gold-soft"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream/10">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-cream/85">{site.address}</span>
                </a>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream/10">
                    <Clock className="h-5 w-5" />
                  </span>
                  <span className="text-cream/85">
                    Пн–Сб: 9:00 – 20:00
                    <br />
                    <span className="text-cream/55">Нд — за домовленістю</span>
                  </span>
                </div>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 transition-colors hover:text-gold-soft"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream/10">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <span className="text-cream/85">@{site.instagramHandle}</span>
                </a>
              </div>
            </div>

            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-64 overflow-hidden rounded-3xl ring-1 ring-cream/10"
            >
              {/* stylised map backdrop */}
              <div className="absolute inset-0 bg-[#2b2620]" />
              <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                <defs>
                  <pattern id="mapgrid" width="46" height="46" patternUnits="userSpaceOnUse">
                    <path d="M46 0H0V46" fill="none" stroke="rgba(203,176,131,0.25)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapgrid)" />
              </svg>
              {/* route line */}
              <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
                <path
                  d="M20 220 C120 210 130 120 210 120 S330 90 380 40"
                  fill="none"
                  stroke="var(--rose)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 10"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              {/* pin */}
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose/60" />
                  <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose ring-4 ring-cream/30">
                    <MapPin className="h-2.5 w-2.5 text-white" />
                  </span>
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <div className="font-display text-lg text-cream">{site.city}</div>
                  <div className="text-xs text-cream/70">{site.addressShort}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Маршрут
                </span>
              </div>
            </a>
          </Reveal>

          {/* Right: booking form */}
          <Reveal direction="left">
            <form
              onSubmit={submit}
              className="glass-dark flex h-full flex-col rounded-3xl p-7"
            >
              <h3 className="font-display text-2xl">Форма запису</h3>
              <p className="mt-2 text-sm text-cream/60">
                Заповніть — і повідомлення відкриється у WhatsApp готовим до
                відправки.
              </p>

              <div className="mt-6 space-y-4">
                <Field label="Ваше ім'я">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Анна"
                    className="input"
                  />
                </Field>
                <Field label="Телефон">
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+380 __ ___ __ __"
                    className="input"
                  />
                </Field>
                <Field label="Послуга">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="input"
                  >
                    {services.map((s) => (
                      <option key={s} value={s} className="text-ink">
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Побажання (необов'язково)">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Зручний день, час чи запитання"
                    className="input resize-none"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Надіслати заявку
              </button>
              <p className="mt-3 text-center text-xs text-cream/45">
                Натискаючи, ви переходите у WhatsApp з готовим повідомленням.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-cream/55">
        {label}
      </span>
      {children}
    </label>
  );
}
