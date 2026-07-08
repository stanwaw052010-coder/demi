"use client";

import { useState } from "react";
import { Phone, Check } from "lucide-react";
import { WhatsAppIcon, TelegramIcon } from "./icons";
import { LINKS, PHONE_DISPLAY, SERVICES, HOURS } from "@/lib/site";

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Добрий день! Хочу записатися 🌿",
      name && `Ім’я: ${name}`,
      phone && `Телефон: ${phone}`,
      service && `Послуга: ${service}`,
    ].filter(Boolean);
    window.open(
      `${LINKS.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-mist/60 px-5 py-4 text-[15px] text-ink placeholder:text-olive/50 transition-all duration-300 focus:border-brand focus:bg-white focus:shadow-[0_0_0_4px_rgba(141,183,72,0.15)]";
  const labelCls =
    "mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep";

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-mist py-24 md:py-36"
    >
      <div
        className="pointer-events-none absolute -right-48 top-16 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.15)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <p className="eyebrow mb-7" data-reveal="up">
          Онлайн-запис
        </p>
        <h2
          className="h-display max-w-3xl text-[clamp(2rem,4.4vw,3.6rem)]"
          data-reveal="blur"
        >
          Запишіться <span className="italic text-brand-deep">зараз</span>
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Форма запису */}
          <div
            className="rounded-[36px] border border-line/70 bg-white p-9 shadow-[0_30px_70px_rgba(34,39,25,0.08)] md:p-12"
            data-reveal="up"
          >
            <h3 className="font-display text-3xl text-ink">Форма запису</h3>

            {sent ? (
              <div className="mt-10 flex flex-col items-start gap-5">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="h-7 w-7" />
                </span>
                <p className="text-lg font-semibold text-ink">
                  Дякуємо, {name || "з вами зв’яжуться"}!
                </p>
                <p className="leading-relaxed text-olive">
                  Ваша заявка сформована у WhatsApp — просто натисніть
                  «Надіслати» у чаті, і ми передзвонимо протягом 15 хвилин у
                  робочий час.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-[15px] font-semibold text-brand-deep underline-offset-4 hover:underline"
                >
                  Заповнити ще раз
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-9 space-y-7">
                <div>
                  <label htmlFor="bk-name" className={labelCls}>
                    Ваше ім’я
                  </label>
                  <input
                    id="bk-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Як до вас звертатися?"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelCls}>
                    Номер телефону
                  </label>
                  <input
                    id="bk-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+380 __ ___ __ __"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="bk-service" className={labelCls}>
                    Послуга
                  </label>
                  <select
                    id="bk-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`select-clean ${inputCls} ${
                      service ? "" : "text-olive/60"
                    }`}
                  >
                    <option value="">Оберіть послугу</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Консультація">Консультація</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-brand py-4.5 text-[13px] font-bold uppercase tracking-[0.24em] text-white shadow-[0_16px_40px_rgba(141,183,72,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
                >
                  Надіслати заявку
                </button>
                <p className="text-center text-[13px] text-olive/80">
                  Ми передзвонимо протягом 15 хвилин у робочий час
                </p>
              </form>
            )}
          </div>

          {/* Контакти + графік */}
          <div className="flex flex-col gap-8">
            <div>
              <p
                className="mb-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-deep"
                data-reveal="up"
              >
                Або зв’яжіться одразу
              </p>
              <div className="space-y-4">
                {[
                  {
                    href: LINKS.whatsapp,
                    icon: <WhatsAppIcon className="h-5.5 w-5.5" />,
                    iconCls: "bg-[#e7f6e9] text-[#25d366]",
                    title: "WhatsApp",
                    sub: PHONE_DISPLAY,
                  },
                  {
                    href: LINKS.telegram,
                    icon: <TelegramIcon className="h-5.5 w-5.5" />,
                    iconCls: "bg-[#e8f3fb] text-[#2aabee]",
                    title: "Telegram",
                    sub: "Написати в Telegram",
                  },
                  {
                    href: LINKS.phone,
                    icon: <Phone className="h-5 w-5" strokeWidth={1.8} />,
                    iconCls: "bg-brand-soft text-brand-deep",
                    title: "Подзвонити",
                    sub: PHONE_DISPLAY,
                  },
                ].map((c, i) => (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-reveal="up"
                    data-reveal-delay={`${i * 0.1}`}
                    className="group flex items-center gap-5 rounded-[28px] border border-line/70 bg-white px-7 py-5.5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_20px_50px_rgba(34,39,25,0.09)]"
                  >
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${c.iconCls} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {c.icon}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">
                        {c.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-olive">
                        {c.sub}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Графік роботи */}
            <div
              className="rounded-[28px] border border-line/70 bg-white px-8 py-7"
              data-reveal="up"
              data-reveal-delay="0.25"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-deep">
                Графік роботи
              </p>
              <dl>
                {HOURS.map((h, i) => (
                  <div
                    key={h.days}
                    className={`flex items-center justify-between py-4 ${
                      i > 0 ? "border-t border-line/70" : ""
                    }`}
                  >
                    <dt className="text-[15px] text-olive">{h.days}</dt>
                    <dd
                      className={`text-[15px] font-semibold ${
                        h.closed ? "text-[#c96a5b]" : "text-ink"
                      }`}
                    >
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
