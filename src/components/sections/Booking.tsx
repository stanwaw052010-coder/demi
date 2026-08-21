"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Check, Copy, Phone, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { MaskText } from "@/components/ui/motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InstagramIcon } from "@/components/ui/icons";
import { allServices, priceCategories } from "@/data/services";
import { messengerLinks, site } from "@/lib/site";
import { cn, normalizePhone } from "@/lib/utils";

type Errors = Partial<Record<"name" | "phone" | "service", string>>;

const fieldClass =
  "w-full rounded-[var(--r-sm)] border border-gold/25 bg-espresso/70 px-5 py-4 text-sand placeholder:text-beige/50 transition-colors duration-300 focus:border-gold focus:outline-none";

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [master, setMaster] = useState<string>(site.masters[0].name);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const activeMaster = site.masters.find((item) => item.name === master) ?? site.masters[0];
  const links = useMemo(
    () => messengerLinks(activeMaster.phone, message ?? ""),
    [activeMaster.phone, message],
  );

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) {
      next.name = "Напишіть ім’я — так ми звернемося до вас у відповіді.";
    }
    if (!normalizePhone(phone)) {
      next.phone = "Номер має бути український: 050 123 45 67 або +380 50 123 45 67.";
    }
    if (!serviceId) {
      next.service = "Оберіть процедуру зі списку — якщо не визначилися, беріть «Ще не обрала».";
    }
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setMessage(null);
      return;
    }

    const service = allServices.find((item) => item.id === serviceId);
    const lines = [
      `Доброго дня! Хочу записатися до SISTER'S Beauty Studio.`,
      `Ім’я: ${name.trim()}`,
      `Телефон: ${normalizePhone(phone)}`,
      `Процедура: ${
        service
          ? service.categoryTitle === service.name
            ? service.name
            : `${service.name} (${service.categoryTitle})`
          : "ще не обрала"
      }`,
      time.trim() ? `Зручний час: ${time.trim()}` : null,
      comment.trim() ? `Коментар: ${comment.trim()}` : null,
    ].filter(Boolean);

    setMessage(lines.join("\n"));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="zapys" tone="cocoa" curveTop glow="left">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <div className="flex flex-col gap-5">
            <SectionLabel>З А П И С</SectionLabel>
            <MaskText
              parts={[{ text: "Запишіться" }, { text: "на процедуру", className: "italic text-gold-light" }]}
              className="text-balance text-[2.2rem] leading-[1.06] text-sand sm:text-5xl md:text-[3.5rem]"
            />
            <p className="max-w-[58ch] text-pretty text-[0.98rem] text-beige">
              Заповніть форму — вона збере ваші дані в готове повідомлення. Далі один дотик, і воно
              відкриється у вашому месенджері. Ми підтвердимо запис у відповідь.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label-spaced text-beige">
                  Ім’я
                </label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="given-name"
                  placeholder="Ірина"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(fieldClass, errors.name && "border-gold")}
                />
                {errors.name ? (
                  <p id="name-error" className="text-xs text-gold-light">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="label-spaced text-beige">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  placeholder="050 123 45 67"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={cn(fieldClass, errors.phone && "border-gold")}
                />
                {errors.phone ? (
                  <p id="phone-error" className="text-xs text-gold-light">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="service" className="label-spaced text-beige">
                Процедура
              </label>
              <select
                id="service"
                name="service"
                value={serviceId}
                onChange={(event) => setServiceId(event.target.value)}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
                className={cn(fieldClass, "appearance-none", errors.service && "border-gold")}
              >
                <option value="">Оберіть процедуру</option>
                <option value="undecided">Ще не обрала — потрібна порада</option>
                {priceCategories.map((category) => (
                  <optgroup key={category.id} label={category.title}>
                    {category.services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                        {service.price === null ? "" : ` — ${service.price} грн`}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errors.service ? (
                <p id="service-error" className="text-xs text-gold-light">
                  {errors.service}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="time" className="label-spaced text-beige">
                Зручний час
              </label>
              <input
                id="time"
                name="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                placeholder="Наприклад: будні після 17:00"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="comment" className="label-spaced text-beige">
                Коментар
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Що турбує, чи є обмеження за здоров’ям"
                className={cn(fieldClass, "resize-y")}
              />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="label-spaced mb-3 text-beige">Кому написати</legend>
              <div className="flex flex-wrap gap-3">
                {site.masters.map((item) => (
                  <label
                    key={item.phone}
                    className={cn(
                      "label-spaced cursor-pointer rounded-[var(--r-pill)] border px-6 py-3 transition-colors duration-300",
                      master === item.name
                        ? "border-gold bg-gold/10 text-gold-light"
                        : "border-gold/25 text-beige hover:border-gold/60",
                    )}
                  >
                    <input
                      type="radio"
                      name="master"
                      value={item.name}
                      checked={master === item.name}
                      onChange={() => setMaster(item.name)}
                      className="sr-only"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn btn-solid label-spaced mt-2 px-8 py-4"
            >
              Сформувати повідомлення
            </button>
          </form>

          {message ? (
            <div className="card mt-8 bg-espresso/50 p-6 sm:p-8" role="status">
              <p className="label-spaced text-gold">П О В І Д О М Л Е Н Н Я   Г О Т О В Е</p>
              <pre className="mt-5 whitespace-pre-wrap rounded-[var(--r-md)] border border-gold/15 bg-espresso/60 p-5 font-sans text-sm text-sand">
                {message}
              </pre>
              <p className="mt-5 text-xs text-beige">
                Оберіть месенджер — текст підставиться автоматично. Пишемо {activeMaster.nameDative}{" "}на{" "}
                {activeMaster.phoneLabel}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={links.viber}
                  className="btn btn-outline label-spaced px-6 py-3.5"
                >
                  Viber
                </a>
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline label-spaced px-6 py-3.5"
                >
                  Telegram
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline label-spaced px-6 py-3.5"
                >
                  WhatsApp
                </a>
                <a
                  href={links.sms}
                  className="btn btn-outline label-spaced px-6 py-3.5"
                >
                  SMS
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-outline label-spaced inline-flex items-center gap-2 px-6 py-3.5"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-gold" strokeWidth={1.25} aria-hidden />
                  ) : (
                    <Copy className="h-4 w-4 text-gold" strokeWidth={1.25} aria-hidden />
                  )}
                  {copied ? "Скопійовано" : "Скопіювати"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <p className="label-spaced text-beige">Швидше — напряму</p>
          {site.masters.map((item) => (
            <a
              key={item.phone}
              href={`tel:${item.phone}`}
              className="card card-hover group flex items-center justify-between gap-4 bg-espresso/45 px-7 py-6"
            >
              <span>
                <span className="block font-display text-2xl text-sand">
                  Подзвонити {item.nameDative}
                </span>
                <span className="mt-1 block text-sm text-beige">{item.phoneLabel}</span>
              </span>
              <Phone
                className="h-11 w-11 shrink-0 rounded-full border border-gold/25 p-3 text-gold transition-transform duration-500 group-hover:-rotate-12"
                strokeWidth={1.25}
                aria-hidden
              />
            </a>
          ))}
          <a
            href={site.instagram.directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 border border-gold/25 px-6 py-6 transition-colors duration-300 hover:border-gold hover:bg-gold/5"
          >
            <span>
              <span className="block font-display text-2xl text-sand">Написати в Direct</span>
              <span className="mt-1 block text-sm text-beige">{site.instagram.handle}</span>
            </span>
            <InstagramIcon className="h-11 w-11 shrink-0 rounded-full border border-gold/25 p-3 text-gold" />
          </a>
          <p className="mt-2 flex items-start gap-3 text-xs text-beige">
            <Send className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
            Сайт не зберігає ваші дані: повідомлення формується у браузері й відправляється лише
            тоді, коли ви натиснете месенджер.
          </p>
        </aside>
      </div>
    </Section>
  );
}
