"use client";

import { useRef, useState } from "react";

import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { WhatsAppIcon, ViberIcon } from "@/components/shared/SocialIcons";

type Messenger = "whatsapp" | "viber";

function buildMessage(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const serviceSlug = String(data.get("service") ?? "");
  const date = String(data.get("date") ?? "").trim();
  const comment = String(data.get("comment") ?? "").trim();
  const serviceTitle = SERVICES.find((s) => s.slug === serviceSlug)?.shortTitle;

  const lines = [
    `Запис до ${SITE.name}`,
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    serviceTitle ? `Послуга: ${serviceTitle}` : null,
    date ? `Бажана дата: ${date}` : null,
    comment ? `Коментар: ${comment}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sentVia, setSentVia] = useState<Messenger | null>(null);

  async function handleMessenger(messenger: Messenger) {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;

    const message = buildMessage(form);

    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // clipboard access can fail (e.g. insecure context) — deep link still opens
    }

    const phoneDigits = SITE.phoneHref.replace(/\D/g, "");
    const url =
      messenger === "whatsapp"
        ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
        : `viber://chat?number=%2B${phoneDigits}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSentVia(messenger);
  }

  return (
    <section className="section-y section-x bg-navy-950" id="booking">
      <div className="container-lux grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="flex flex-col items-start gap-6">
          <span className="kicker">Запис онлайн</span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] text-white">
            Забронюйте свій час турботи
          </h2>
          <div className="gold-divider" />
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-white/70">
            Заповніть форму та надішліть заявку у зручний месенджер — WhatsApp чи
            Viber. Наш адміністратор одразу побачить повідомлення та зв&rsquo;яжеться
            з вами для підтвердження часу візиту.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-5 border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white/70">
                  Ім&rsquo;я
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Ваше ім'я"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="text-white/70">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+38 (0__) ___ __ __"
                  className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="service" className="text-white/70">
                  Послуга
                </Label>
                <Select name="service">
                  <SelectTrigger
                    id="service"
                    className="border-white/15 bg-white/5 text-white data-[placeholder]:text-white/40"
                  >
                    <SelectValue placeholder="Оберіть напрям" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((service) => (
                      <SelectItem key={service.slug} value={service.slug}>
                        {service.shortTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date" className="text-white/70">
                  Бажана дата
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  className="border-white/15 bg-white/5 text-white [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="comment" className="text-white/70">
                Коментар
              </Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Побажання щодо запису"
                className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
              />
            </div>

            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                onClick={() => handleMessenger("whatsapp")}
                className="w-full bg-[#25D366] text-navy-950 hover:bg-[#1ebe5a]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Написати у WhatsApp
              </Button>
              <Button
                type="button"
                size="lg"
                onClick={() => handleMessenger("viber")}
                className="w-full bg-[#7360F2] text-white hover:bg-[#5f4fd6]"
              >
                <ViberIcon className="h-5 w-5" />
                Написати у Viber
              </Button>
            </div>

            {sentVia ? (
              <p className="text-sm text-gold-400">
                Повідомлення скопійовано і {sentVia === "whatsapp" ? "WhatsApp" : "Viber"}{" "}
                відкрито в новій вкладці — залишилось натиснути «Надіслати» у чаті. Якщо
                текст не підставився автоматично — просто вставте його (він вже в
                буфері обміну).
              </p>
            ) : null}

            <p className="text-xs text-white/40">
              Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
