"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

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

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      service: data.get("service"),
      date: data.get("date"),
      comment: data.get("comment"),
    };

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Не вдалося надіслати заявку.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося надіслати заявку.");
    } finally {
      setSubmitting(false);
    }
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
            Залиште заявку — наш адміністратор зв&rsquo;яжеться з вами для підтвердження
            зручного часу візиту.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="flex flex-col items-center gap-4 border border-white/10 bg-white/[0.03] p-10 text-center">
              <CheckCircle2 className="h-10 w-10 text-gold-500" strokeWidth={1.25} />
              <h3 className="font-serif text-xl text-white">Дякуємо за заявку!</h3>
              <p className="max-w-sm text-sm text-white/70">
                Ми зв&rsquo;яжемося з вами найближчим часом, щоб узгодити зручний час
                візиту.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
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

              {error ? (
                <p className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={submitting}
                className="mt-2 w-full sm:w-auto"
              >
                {submitting ? "Надсилаємо…" : "Записатися"}
              </Button>
              <p className="text-xs text-white/40">
                Надсилаючи заявку, ви погоджуєтесь на обробку персональних даних.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
