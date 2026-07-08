"use client";

import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { Reveal } from "./Reveal";

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal y={48}>
          <div className="grain relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center shadow-[0_50px_100px_-40px_rgba(52,66,31,0.65)] sm:px-12 lg:py-28">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/cta-bg.jpg)" }}
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-deep/30 via-transparent to-deep/50"
              aria-hidden
            />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              aria-hidden
            >
              <g fill="none" stroke="#ffffff" strokeOpacity="0.25">
                <circle cx="120" cy="90" r="140" />
                <circle cx="900" cy="420" r="180" />
                <path d="M0 400 Q 260 300, 520 380 T 1000 330" />
              </g>
            </svg>

            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70">
                Rayskaya Beauty Space
              </p>
              <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.14] font-medium tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
                Готові зробити перший крок до{" "}
                <em className="font-normal italic text-brand-soft">
                  здорової шкіри?
                </em>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/80">
                Залиште заявку — ми підберемо процедуру та зручний час саме
                для вас.
              </p>
              <div className="mt-10">
                <MagneticButton
                  href="#booking"
                  className="gap-3 rounded-full bg-white px-10 py-5 text-base font-semibold text-deep shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-brand-mist"
                >
                  Записатися зараз
                  <ArrowRight className="size-5" strokeWidth={1.75} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
