"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  CITY,
  LINKS,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";
import { Eyebrow, Reveal, SectionTitle } from "./Reveal";

const ITEMS = [
  {
    icon: MapPin,
    label: "Адреса",
    value: (
      <>
        {ADDRESS}
        <br />
        {CITY}, Україна
      </>
    ),
  },
  {
    icon: Phone,
    label: "Телефон",
    value: (
      <a
        href={`tel:${PHONE_TEL}`}
        className="text-brand-deep transition-opacity hover:opacity-75"
      >
        {PHONE_DISPLAY}
      </a>
    ),
  },
  {
    icon: Clock3,
    label: "Графік роботи",
    value: (
      <>
        Пн–Пт: 08:00–20:00
        <br />
        <span className="text-[#c97b7b]">Субота — Неділя: зачинено</span>
      </>
    ),
  },
];

export default function MapSection() {
  return (
    <section id="contacts" className="bg-cream px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <Eyebrow>Контакти</Eyebrow>
          <SectionTitle>Як нас знайти</SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            {ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={0.07 * i}>
                <div className="mb-9 flex items-start gap-5">
                  <div className="hairline flex size-10 shrink-0 items-center justify-center border-[0.5px] text-brand-deep">
                    <item.icon className="size-4.5" strokeWidth={1.25} />
                  </div>
                  <div>
                    <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-muted-light">
                      {item.label}
                    </div>
                    <div className="text-[15px] leading-relaxed font-light text-ink">
                      {item.value}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <a
                href={LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-[0.5px] border-ink/30 px-7 py-3.5 text-[12px] uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:border-brand-deep hover:text-brand-deep"
              >
                Прокласти маршрут
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="hairline relative h-[280px] overflow-hidden border-[0.5px] lg:h-[340px]">
              <iframe
                src={LINKS.mapsEmbed}
                title="Rayskaya Beauty Space на карті Google"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
