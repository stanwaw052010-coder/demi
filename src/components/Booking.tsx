"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Phone, Send } from "lucide-react";
import {
  LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES,
} from "@/lib/site";
import MagneticButton from "./MagneticButton";
import { Eyebrow, Reveal } from "./Reveal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.55 2 2.1 6.44 2.1 11.93c0 1.75.46 3.46 1.33 4.97L2 22l5.23-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.49 0 9.94-4.44 9.94-9.93A9.87 9.87 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.21-8.24 8.21zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M21.94 4.35 18.9 18.66c-.23 1.01-.83 1.26-1.68.79l-4.63-3.42-2.24 2.15c-.25.25-.45.46-.93.46l.33-4.7 8.56-7.73c.37-.33-.08-.52-.58-.19L7.15 12.7 2.6 11.28c-.99-.31-1-1 .2-1.46l17.78-6.85c.83-.31 1.55.19 1.36 1.38z" />
    </svg>
  );
}

const CONTACT_CARDS = [
  {
    href: LINKS.whatsapp,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    icon: WhatsAppIcon,
    accent: "bg-brand-mist text-olive",
  },
  {
    href: LINKS.telegram,
    label: "Telegram",
    value: "Написати в Telegram",
    icon: TelegramIcon,
    accent: "bg-[#e3eef7] text-[#2f7bb5]",
  },
];

const SCHEDULE = [
  { day: "Понеділок — П'ятниця", time: "08:00–20:00", closed: false },
  { day: "Субота", time: "08:00–20:00", closed: false },
  { day: "Неділя", time: "Зачинено", closed: true },
];

export default function Booking() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const text = encodeURIComponent(
      `Вітаю! Хочу записатися.\nІм'я: ${name}\nТелефон: ${phone}${
        service ? `\nПослуга: ${service}` : ""
      }`,
    );
    window.open(`${LINKS.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <section id="booking" className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-24 size-[420px] rounded-full bg-brand-mist/70 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Онлайн-запис</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Запишіться{" "}
            <em className="font-normal italic text-olive">зараз</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          {/* form */}
          <Reveal delay={0.12} y={44}>
            <div className="relative h-full rounded-[2rem] border border-ink/8 bg-white/85 p-8 shadow-[0_30px_70px_-45px_rgba(52,66,31,0.5)] sm:p-10">
              {sent ? (
                <div className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-brand-mist text-olive">
                    <CheckCircle2 className="size-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-ink">
                    Дякуємо за заявку!
                  </h3>
                  <p className="mt-3 max-w-sm text-stone">
                    Ми передзвонимо протягом 15 хвилин у робочий час.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 text-sm font-semibold text-olive underline-offset-4 hover:underline"
                  >
                    Надіслати ще одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-ink">
                    Форма запису
                  </h3>
                  <form onSubmit={onSubmit} className="mt-8 space-y-6">
                    <label className="block">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone">
                        Ваше ім&rsquo;я
                      </span>
                      <input
                        name="name"
                        required
                        placeholder="Як до вас звертатися?"
                        className="mt-2.5 w-full rounded-2xl border border-ink/12 bg-cream px-5 py-4 text-ink outline-none transition-all duration-300 placeholder:text-stone/60 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone">
                        Номер телефону
                      </span>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+380 __ ___ __ __"
                        className="mt-2.5 w-full rounded-2xl border border-ink/12 bg-cream px-5 py-4 text-ink outline-none transition-all duration-300 placeholder:text-stone/60 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone">
                        Послуга
                      </span>
                      <select
                        name="service"
                        defaultValue=""
                        className="mt-2.5 w-full appearance-none rounded-2xl border border-ink/12 bg-cream px-5 py-4 text-ink outline-none transition-all duration-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
                      >
                        <option value="" disabled>
                          Оберіть послугу
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Консультація">Консультація</option>
                      </select>
                    </label>
                    <MagneticButton
                      type="submit"
                      className="w-full gap-2.5 rounded-full bg-brand py-4.5 text-base font-semibold text-white shadow-[0_18px_44px_-14px_rgba(141,183,72,0.95)] transition-colors duration-300 hover:bg-olive"
                    >
                      Надіслати заявку
                      <Send className="size-4.5" strokeWidth={1.75} />
                    </MagneticButton>
                    <p className="text-center text-sm text-stone">
                      Ми передзвонимо протягом 15 хвилин у робочий час
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* contacts + schedule */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.16}>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-olive">
                Або зв&rsquo;яжіться одразу
              </p>
            </Reveal>
            {CONTACT_CARDS.map((c, i) => (
              <Reveal key={c.label} delay={0.2 + i * 0.07}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-[1.75rem] border border-ink/8 bg-white/80 px-6 py-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_24px_50px_-30px_rgba(94,122,52,0.5)]"
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-full ${c.accent}`}
                  >
                    <c.icon className="size-6" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-stone">
                      {c.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.34}>
              <a
                href={`tel:${PHONE_TEL}`}
                className="group flex items-center gap-5 rounded-[1.75rem] border border-ink/8 bg-white/80 px-6 py-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-[0_24px_50px_-30px_rgba(94,122,52,0.5)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-[#fdeaea] text-[#c2564f]">
                  <Phone className="size-5.5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    Подзвонити
                  </span>
                  <span className="mt-0.5 block text-sm text-stone">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="rounded-[1.75rem] border border-ink/8 bg-white/80 px-6 py-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-olive">
                  Графік роботи
                </p>
                <dl className="mt-4 divide-y divide-ink/8">
                  {SCHEDULE.map((s) => (
                    <div
                      key={s.day}
                      className="flex items-center justify-between py-3.5"
                    >
                      <dt className="text-[15px] text-stone">{s.day}</dt>
                      <dd
                        className={`text-[15px] font-semibold ${
                          s.closed ? "text-[#c2564f]" : "text-ink"
                        }`}
                      >
                        {s.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
