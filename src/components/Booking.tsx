"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Phone } from "lucide-react";
import { LINKS, PHONE_DISPLAY, PHONE_TEL, SCHEDULE, SERVICES } from "@/lib/site";
import { Eyebrow, Reveal, SectionTitle } from "./Reveal";

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

const inputCls =
  "w-full border-[0.5px] border-ink/15 bg-warm px-4 py-3.5 text-sm font-light text-ink outline-none transition-colors duration-200 placeholder:text-muted-light focus:border-brand";

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
    <section
      id="booking"
      className="px-6 py-24 sm:px-10"
      style={{
        background: "linear-gradient(135deg, #f7f8f2 0%, #e9efd7 100%)",
      }}
    >
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <Eyebrow>Онлайн-запис</Eyebrow>
          <SectionTitle>Запишіться зараз</SectionTitle>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal delay={0.08}>
            <div className="hairline border-[0.5px] bg-warm px-6 py-8 sm:px-10 sm:py-11">
              {sent ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <CheckCircle2
                    className="size-12 text-brand"
                    strokeWidth={1}
                  />
                  <div className="mt-6 font-display text-3xl font-light text-ink">
                    Дякуємо за заявку!
                  </div>
                  <p className="mt-3 max-w-xs text-sm text-muted">
                    Ми передзвонимо протягом 15 хвилин у робочий час.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 text-xs uppercase tracking-[0.14em] text-brand-deep hover:underline"
                  >
                    Надіслати ще одну заявку
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8 font-display text-[28px] font-light text-ink">
                    Форма запису
                  </div>
                  <form onSubmit={onSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="f-name"
                        className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-muted"
                      >
                        Ваше ім&rsquo;я
                      </label>
                      <input
                        id="f-name"
                        name="name"
                        required
                        placeholder="Ольга"
                        autoComplete="given-name"
                        className={inputCls}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="f-phone"
                        className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-muted"
                      >
                        Номер телефону
                      </label>
                      <input
                        id="f-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+380 63 000 0000"
                        autoComplete="tel"
                        className={inputCls}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="f-service"
                        className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-muted"
                      >
                        Послуга
                      </label>
                      <select
                        id="f-service"
                        name="service"
                        defaultValue=""
                        className={`${inputCls} cursor-pointer appearance-none`}
                      >
                        <option value="" disabled>
                          Оберіть послугу
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Консультація косметолога">
                          Консультація косметолога
                        </option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand py-4 text-[12px] uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-brand-deep"
                    >
                      Надіслати заявку
                    </button>
                    <p className="mt-3.5 text-center text-[11px] leading-relaxed text-muted-light">
                      Ми передзвонимо протягом 15 хвилин у робочий час
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.12}>
              <p className="mb-7 text-[10px] uppercase tracking-[0.24em] text-brand-deep">
                Або зв&rsquo;яжіться одразу
              </p>
            </Reveal>
            {[
              {
                href: LINKS.whatsapp,
                icon: <WhatsAppIcon className="size-5.5" />,
                iconCls: "bg-[#e8f5e9] text-[#2e7d32]",
                name: "WhatsApp",
                sub: PHONE_DISPLAY,
                label: "Написати у WhatsApp",
              },
              {
                href: LINKS.telegram,
                icon: <TelegramIcon className="size-5.5" />,
                iconCls: "bg-[#e3f2fd] text-[#1565c0]",
                name: "Telegram",
                sub: "Написати в Telegram",
                label: "Написати у Telegram",
              },
              {
                href: `tel:${PHONE_TEL}`,
                icon: <Phone className="size-5" strokeWidth={1.5} />,
                iconCls: "bg-[#fbe9e7] text-[#bf360c]",
                name: "Подзвонити",
                sub: PHONE_DISPLAY,
                label: "Подзвонити",
              },
            ].map((c, i) => (
              <Reveal key={c.name} delay={0.16 + i * 0.06}>
                <a
                  href={c.href}
                  target={c.href.startsWith("tel:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="hairline mb-3 flex items-center gap-4.5 border-[0.5px] bg-warm px-5.5 py-5 transition-all duration-200 hover:translate-x-[3px] hover:border-brand"
                >
                  <span
                    className={`flex size-10.5 shrink-0 items-center justify-center rounded-full ${c.iconCls}`}
                  >
                    {c.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-normal text-ink">
                      {c.name}
                    </span>
                    <span className="mt-0.5 text-xs text-muted">{c.sub}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.36}>
              <div className="hairline mt-6 border-[0.5px] bg-warm px-5.5 py-5.5">
                <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-brand-deep">
                  Графік роботи
                </div>
                {SCHEDULE.map((s, i) => (
                  <div
                    key={s.day}
                    className={`flex items-center justify-between py-2 text-[13px] text-muted ${
                      i < SCHEDULE.length - 1
                        ? "hairline-dark border-b-[0.5px]"
                        : ""
                    }`}
                  >
                    <span>{s.day}</span>
                    <span
                      className={
                        s.closed
                          ? "font-normal text-[#c97b7b]"
                          : "font-normal text-ink"
                      }
                    >
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
