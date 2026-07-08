"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PHONE_RAW, SERVICES } from "@/lib/site";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceLabel = SERVICES.find((s) => s.id === service)?.title ?? "не вказано";
    const message = [
      "Запис на консультацію з сайту Rayskaya Beauty Space",
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      `Послуга: ${serviceLabel}`,
    ].join("\n");

    const waNumber = PHONE_RAW.replace(/\D/g, "");
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-lg border border-line bg-warm p-8 md:p-10">
      <h3 className="font-display text-2xl text-ink">Форма запису</h3>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
            Ваше ім&rsquo;я
          </span>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше ім'я"
            className="mt-2.5 w-full rounded-md border border-line bg-warm-deep/50 px-4 py-3.5 text-[15px] text-ink placeholder:text-body/50 outline-none transition-colors focus:border-green"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
            Номер телефону
          </span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380"
            className="mt-2.5 w-full rounded-md border border-line bg-warm-deep/50 px-4 py-3.5 text-[15px] text-ink placeholder:text-body/50 outline-none transition-colors focus:border-green"
          />
        </label>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
            Послуга
          </span>
          <div className="relative mt-2.5">
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full appearance-none rounded-md border border-line bg-warm-deep/50 px-4 py-3.5 text-[15px] text-ink outline-none transition-colors focus:border-green"
            >
              <option value="" disabled>
                Оберіть послугу
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-body"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </label>

        <MagneticButton
          className="mt-2 w-full bg-green-dark text-warm hover:bg-ink"
        >
          {sent ? (
            <>
              Заявку надіслано <Check size={16} />
            </>
          ) : (
            <>
              Надіслати заявку <ArrowRight size={16} />
            </>
          )}
        </MagneticButton>

        <p className="text-center text-[12.5px] leading-relaxed text-body">
          Ми передзвонимо протягом 15 хвилин у робочий час
        </p>
      </form>
    </div>
  );
}
