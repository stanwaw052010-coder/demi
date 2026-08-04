"use client";

import * as React from "react";
import { ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/button";
import { InstagramIcon, ViberIcon } from "@/components/ui/icons";

/**
 * Set NEXT_PUBLIC_FORM_ENDPOINT to a form service (Formspree, a Telegram bot
 * proxy, …) and requests are posted there. Without it the form still works:
 * it hands the patient's details to Viber with everything pre-written.
 */
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type State = "idle" | "sending" | "sent" | "handoff";

export function Booking() {
  const [state, setState] = React.useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const service = String(data.get("service") ?? "");
    const note = String(data.get("note") ?? "");

    const message = [
      "Запис на прийом",
      `Ім'я: ${name}`,
      `Телефон: ${phone}`,
      service && `Послуга: ${service}`,
      note && `Коментар: ${note}`,
    ]
      .filter(Boolean)
      .join("\n");

    if (endpoint) {
      setState("sending");
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, service, note }),
        });
        setState("sent");
        form.reset();
        return;
      } catch {
        /* fall through to the messenger hand-off */
      }
    }

    try {
      await navigator.clipboard.writeText(message);
    } catch {
      /* clipboard is a nicety, not a requirement */
    }
    window.open(site.viber, "_blank", "noopener");
    setState("handoff");
    form.reset();
  }

  const field =
    "h-14 w-full rounded-[16px] border border-ink/15 bg-white px-5 text-[16px] font-medium text-ink placeholder:font-normal placeholder:text-graphite/70 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15";

  return (
    <section id="booking" className="bg-ink py-20 text-white md:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Contacts, stated as plainly as possible */}
          <div>
            <Image
              src="/logo-light.png"
              alt="Dental Clinic Nataly Zhylan"
              width={480}
              height={592}
              sizes="150px"
              className="mb-8 h-28 w-auto md:h-32"
            />
            <span className="eyebrow text-white/70">Запис на прийом</span>
            <h2 className="display-tight mt-5 font-display text-[32px] font-light sm:text-[42px] lg:text-[50px]">
              Зателефонуйте або{" "}
              <span className="accent text-white">залиште номер</span>
            </h2>

            <a
              href={site.phoneHref}
              className="mt-10 flex items-center gap-4 text-white transition-opacity duration-300 hover:opacity-80"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-ink md:size-16">
                <Phone className="size-6" strokeWidth={2.25} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Телефон
                </span>
                <span className="mt-1 block font-display text-[28px] font-bold tabular-nums leading-none tracking-[-0.02em] md:text-[38px]">
                  {site.phone}
                </span>
              </span>
            </a>

            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-4 text-white transition-opacity duration-300 hover:opacity-80"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/25 md:size-16">
                <MapPin className="size-6" strokeWidth={2} />
              </span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Адреса
                </span>
                <span className="mt-1 block font-display text-[20px] font-semibold leading-tight md:text-[24px]">
                  {site.address}
                </span>
              </span>
            </a>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink
                href={site.viber}
                target="_blank"
                rel="noopener noreferrer"
                variant="inverted"
                size="md"
                className="font-semibold"
              >
                <ViberIcon className="size-[18px]" />
                Написати у Viber
              </ButtonLink>
              <ButtonLink
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="border border-white/25 bg-transparent font-semibold text-white shadow-none hover:bg-white/10"
              >
                <InstagramIcon className="size-[18px]" strokeWidth={1.75} />
                Instagram
              </ButtonLink>
            </div>
          </div>

          {/* Callback form */}
          <div className="rounded-[24px] bg-white p-6 text-ink md:p-9">
            {state === "sent" || state === "handoff" ? (
              <div className="flex h-full min-h-[380px] flex-col items-start justify-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="size-6" strokeWidth={2.5} />
                </span>
                <h3 className="mt-6 font-display text-[26px] font-semibold tracking-[-0.02em]">
                  {state === "sent" ? "Заявку надіслано" : "Дані скопійовано"}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[16px] leading-relaxed text-graphite">
                  {state === "sent"
                    ? "Ми зателефонуємо протягом робочого дня, щоб узгодити зручний час."
                    : "Ми відкрили Viber і скопіювали ваші дані — вставте їх у повідомлення. Або просто зателефонуйте нам."}
                </p>
                <ButtonLink
                  href={site.phoneHref}
                  size="lg"
                  className="mt-8 font-semibold tabular-nums"
                >
                  <Phone className="size-4" strokeWidth={2.25} />
                  {site.phone}
                </ButtonLink>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <h3 className="font-display text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]">
                  Зворотний дзвінок
                </h3>
                <p className="-mt-2 text-[15px] text-graphite">
                  Заповніть форму — передзвонимо та підберемо час.
                </p>

                <label className="sr-only" htmlFor="booking-name">
                  Ваше ім&apos;я
                </label>
                <input
                  id="booking-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ваше ім'я"
                  className={field}
                />

                <label className="sr-only" htmlFor="booking-phone">
                  Номер телефону
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+380 __ ___ __ __"
                  className={cn(field, "tabular-nums")}
                />

                <label className="sr-only" htmlFor="booking-service">
                  Послуга
                </label>
                <select
                  id="booking-service"
                  name="service"
                  defaultValue=""
                  className={cn(field, "appearance-none bg-white")}
                >
                  <option value="">Оберіть послугу (необов&apos;язково)</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Консультація">Консультація</option>
                </select>

                <label className="sr-only" htmlFor="booking-note">
                  Коментар
                </label>
                <textarea
                  id="booking-note"
                  name="note"
                  rows={3}
                  placeholder="Що вас турбує або зручний час"
                  className={cn(field, "h-auto py-4 leading-relaxed")}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={state === "sending"}
                  className="mt-2 w-full font-semibold"
                >
                  {state === "sending" ? "Надсилаємо…" : "Записатися на прийом"}
                  <ArrowUpRight className="size-4" strokeWidth={2.25} />
                </Button>

                <p className="text-center text-[13px] text-graphite">
                  Або зателефонуйте:{" "}
                  <a
                    href={site.phoneHref}
                    className="font-bold tabular-nums text-ink underline underline-offset-4"
                  >
                    {site.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
