"use client";

import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Eyebrow, Reveal } from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12%] top-1/3 size-[460px] rounded-full bg-brand-mist/80 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Наші послуги</Eyebrow>
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]">
              Естетика, підібрана{" "}
              <em className="font-normal italic text-olive">під вас</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-md text-lg leading-relaxed text-stone">
              Пʼять напрямів — один принцип: природний результат без
              компромісів щодо безпеки.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i} y={28}>
              <a
                href="#booking"
                className="group grid gap-4 border-b border-ink/10 py-8 transition-colors duration-500 hover:bg-white/60 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:gap-8 lg:py-10"
              >
                <span className="font-display text-lg text-brand transition-colors duration-300 group-hover:text-olive">
                  0{i + 1}
                </span>
                <div className="max-w-3xl">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-[2.1rem]">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stone">{s.text}</p>
                </div>
                <span className="hidden size-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:flex">
                  <ArrowUpRight className="size-5" strokeWidth={1.5} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
