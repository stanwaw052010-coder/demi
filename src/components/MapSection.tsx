"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import { LINKS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { Eyebrow, Reveal } from "./Reveal";

export default function MapSection() {
  return (
    <section id="contacts" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Як нас знайти</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl">
              Чекаємо на вас у{" "}
              <em className="font-normal italic text-olive">
                Rayskaya Beauty Space
              </em>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.14} y={44}>
          <div className="mt-12 grid overflow-hidden rounded-[2.5rem] border border-ink/8 bg-white/80 shadow-[0_36px_80px_-40px_rgba(52,66,31,0.45)] lg:grid-cols-[0.95fr_1.55fr]">
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-10">
              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-mist text-olive">
                    <MapPin className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone">
                      Адреса
                    </p>
                    <a
                      href={LINKS.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block font-display text-xl leading-snug text-ink transition-colors hover:text-olive"
                    >
                      Rayskaya Beauty Space
                      <span className="mt-1 block font-sans text-sm text-stone">
                        Відкрити в Google Maps →
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-mist text-olive">
                    <Phone className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone">
                      Телефон
                    </p>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="mt-1.5 block font-display text-xl text-ink transition-colors hover:text-olive"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-mist text-olive">
                    <Clock3 className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-stone">
                      Графік
                    </p>
                    <p className="mt-1.5 font-display text-xl text-ink">
                      Пн–Сб · 08:00–20:00
                    </p>
                    <p className="mt-1 text-sm text-stone">Неділя — зачинено</p>
                  </div>
                </div>
              </div>

              <a
                href={LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-8 py-4 text-[15px] font-semibold text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                Прокласти маршрут
              </a>
            </div>

            <div className="relative min-h-[360px] lg:min-h-[480px]">
              <iframe
                src={LINKS.mapsEmbed}
                title="Rayskaya Beauty Space на карті Google"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
