"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./Button";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import {
  submitBooking,
  validateBooking,
  type BookingErrors,
  type BookingRequest,
} from "@/lib/booking";

const emptyForm: BookingRequest = {
  name: "",
  phone: "",
  service: "",
  date: "",
  comment: "",
  source: "website",
};

const fieldClass =
  "w-full rounded-sm border border-line bg-white px-4 py-3.5 text-[0.9375rem] text-graphite transition-colors duration-300 placeholder:text-muted/70 focus:border-graphite focus:outline-none";

export function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<BookingRequest>(emptyForm);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "not-configured" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateBooking(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState("sending");
    const result = await submitBooking(form);

    if (result.status === "sent") {
      setState("sent");
      setForm(emptyForm);
      return;
    }

    if (result.status === "not-configured") {
      // Бекенду немає — не вдаємо, що заявка пішла.
      setState("not-configured");
      return;
    }

    setErrorMessage(result.message);
    setState("error");
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-md border border-line bg-white p-8"
      >
        <Check className="size-6 text-accent" strokeWidth={1.25} aria-hidden />
        <p className="text-[1.125rem] text-graphite">
          Дякуємо! Ми звʼяжемося з вами найближчим часом.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link-underline text-sm text-muted"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-name`} className="eyebrow">
            Імʼя
          </label>
          <input
            id={`${id}-name`}
            name="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            placeholder="Ваше імʼя"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${id}-name-error`} className="text-xs text-accent">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-phone`} className="eyebrow">
            Номер телефону
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
            placeholder="+380 __ ___ __ __"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
            className={fieldClass}
          />
          {errors.phone ? (
            <p id={`${id}-phone-error`} className="text-xs text-accent">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-service`} className="eyebrow">
            Бажана послуга
          </label>
          <select
            id={`${id}-service`}
            name="service"
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
            className={fieldClass}
          >
            <option value="">Оберіть послугу</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Масаж">Масаж</option>
          </select>
          {errors.service ? (
            <p id={`${id}-service-error`} className="text-xs text-accent">
              {errors.service}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-date`} className="eyebrow">
            Зручна дата
          </label>
          <input
            id={`${id}-date`}
            name="date"
            type="date"
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${id}-comment`} className="eyebrow">
          Коментар
        </label>
        <textarea
          id={`${id}-comment`}
          name="comment"
          rows={4}
          value={form.comment}
          onChange={(event) => update("comment", event.target.value)}
          placeholder="Що вас турбує або про що хочете запитати"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={state === "sending"} className="w-full sm:w-auto">
          {state === "sending" ? "Надсилаємо…" : "Надіслати заявку"}
          <ArrowRight
            className="size-4 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden
          />
        </Button>

        <p className="text-xs leading-relaxed text-muted">
          Або зателефонуйте:{" "}
          <a href={site.phone.href} className="link-underline text-graphite">
            {site.phone.label}
          </a>
        </p>
      </div>

      {state === "not-configured" ? (
        <p role="status" className="rounded-sm border border-line bg-soft p-4 text-sm leading-relaxed text-ink">
          Онлайн-запис ще не підключено до системи клініки, тож заявку не буде надіслано. Щоб
          записатися просто зараз, зателефонуйте{" "}
          <a href={site.phone.href} className="link-underline text-graphite">
            {site.phone.label}
          </a>{" "}
          або напишіть у{" "}
          <a
            href={site.instagram.clinic}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-graphite"
          >
            Instagram Direct
          </a>
          .
        </p>
      ) : null}

      {state === "error" ? (
        <p role="alert" className="rounded-sm border border-line bg-soft p-4 text-sm text-ink">
          {errorMessage} Спробуйте ще раз або зателефонуйте{" "}
          <a href={site.phone.href} className="link-underline text-graphite">
            {site.phone.label}
          </a>
          .
        </p>
      ) : null}

    </form>
  );
}
