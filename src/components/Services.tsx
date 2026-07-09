"use client";

import { SERVICES } from "@/lib/site";
import { Eyebrow, Reveal, SectionTitle } from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="bg-cream px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <Eyebrow>Послуги</Eyebrow>
          <SectionTitle>Наші послуги</SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="hairline mt-14 grid overflow-hidden border-[0.5px] sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                role="listitem"
                className="hairline border-[0.25px] bg-warm px-8 py-10 transition-colors duration-200 hover:bg-mist/40"
              >
                <span className="mb-5 block text-[11px] uppercase tracking-[0.2em] text-brand-deep opacity-75">
                  0{i + 1}
                </span>
                <div className="mb-3.5 font-display text-[23px] leading-[1.25] font-light text-ink">
                  {s.title}
                </div>
                <p className="text-[13px] leading-[1.75] text-muted">
                  {s.text}
                </p>
              </div>
            ))}

            <a
              href="#booking"
              className="hairline flex flex-col items-center justify-center border-[0.25px] bg-mist px-8 py-10 text-center transition-colors duration-200 hover:bg-brand-soft/40"
              aria-label="Записатися на консультацію"
            >
              <div className="mb-2.5 font-display text-[22px] font-light text-ink">
                Не знаєте з чого почати?
              </div>
              <p className="mb-6 text-xs tracking-[0.04em] text-muted">
                Підберемо процедуру
                <br />
                під ваш тип шкіри
              </p>
              <span className="bg-brand px-7 py-3 text-[11px] uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-brand-deep">
                Записатися на консультацію
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
