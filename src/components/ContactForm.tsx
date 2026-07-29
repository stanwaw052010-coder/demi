"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Instagram } from "@/components/ui/icons";
import { ArrowRight, CheckCircle2, Loader2, Phone, TriangleAlert } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "delivered" | "received" | "error";

const fieldClass =
  "h-13 w-full rounded-2xl border border-graphite-200 bg-white px-5 text-[0.95rem] font-medium text-ink transition-all duration-300 outline-none placeholder:text-graphite-400 hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(json.error ?? "Не вдалося надіслати заявку.");
        return;
      }

      form.reset();
      setStatus(json.delivered ? "delivered" : "received");
    } catch {
      setStatus("error");
      setMessage("Немає зв'язку з сервером. Перевірте інтернет або зателефонуйте нам.");
    }
  }

  const done = status === "delivered" || status === "received";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-start gap-5 rounded-4xl border border-brand-100 bg-brand-50/70 p-8 md:p-10"
          >
            <span className="grid size-14 place-items-center rounded-3xl bg-linear-to-br from-brand-600 to-brand-900 text-white shadow-glow">
              <CheckCircle2 className="size-7" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-[1.3rem] font-extrabold tracking-[-0.03em] text-ink">
                {status === "delivered" ? "Заявку надіслано" : "Заявку прийнято"}
              </h3>
              <p className="mt-2.5 max-w-md text-[0.94rem] leading-relaxed text-graphite-600 text-pretty">
                {status === "delivered"
                  ? "Дякуємо! Ми зв'яжемося з вами найближчим часом, щоб підтвердити зручний час візиту."
                  : "Форма поки не під'єднана до месенджера студії, тому найшвидший спосіб — зателефонувати або написати нам напряму. Ми на зв'язку."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={site.phone.href} size="md">
                <Phone className="size-[1.05rem]" strokeWidth={2.4} />
                Подзвонити
              </Button>
              <Button href={site.instagram.url} variant="outline" size="md">
                <Instagram className="size-[1.05rem]" strokeWidth={2.2} />
                Написати
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="cursor-pointer text-[0.85rem] font-bold text-brand-700 underline-offset-4 hover:underline"
            >
              Надіслати ще одну заявку
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col gap-4"
            noValidate={false}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ваше ім'я" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Наприклад, Олена"
                  className={fieldClass}
                />
              </Field>

              <Field label="Телефон" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+380 __ ___ __ __"
                  pattern="[+0-9()\s-]{9,20}"
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="Послуга" htmlFor="service">
              <select id="service" name="service" defaultValue="" className={cn(fieldClass, "cursor-pointer")}>
                <option value="">Не знаю, потрібна консультація</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Коментар" htmlFor="comment" optional>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                maxLength={800}
                placeholder="Що вас турбує або коли вам зручно прийти?"
                className={cn(fieldClass, "h-auto resize-none py-4 leading-relaxed")}
              />
            </Field>

            {/* Пастка для ботів */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute -left-[9999px] size-0 opacity-0"
            />

            <Button size="lg" className="mt-2 w-full" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="size-5 animate-spin" strokeWidth={2.4} />
                  Надсилаємо…
                </>
              ) : (
                <>
                  Замовити консультацію
                  <ArrowRight
                    className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                    strokeWidth={2.4}
                  />
                </>
              )}
            </Button>

            {status === "error" && (
              <p className="flex items-start gap-2.5 rounded-2xl bg-red-50 px-4 py-3 text-[0.85rem] font-medium text-red-700">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={2.4} />
                {message}
              </p>
            )}

            <p className="text-center text-[0.78rem] leading-relaxed text-graphite-400">
              Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних для запису на візит.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="pl-1 text-[0.78rem] font-bold tracking-[0.08em] text-graphite-500 uppercase">
        {label}
        {optional && <span className="ml-1.5 font-medium normal-case text-graphite-400">(необов&apos;язково)</span>}
      </label>
      {children}
    </div>
  );
}
