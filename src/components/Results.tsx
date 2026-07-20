"use client";

import { Sparkles, Droplets, Ruler, Feather, HeartPulse, Sun } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PhotoArt } from "./Decor";
import { Counter } from "./Counter";

const benefits: { title: string; desc: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { title: "Мінус целюліт", desc: "Розгладжуємо «апельсинову кірку» та вирівнюємо рельєф шкіри.", Icon: Sparkles },
  { title: "Менше набряків", desc: "Виводимо зайву рідину — тіло стає легшим уже після перших сеансів.", Icon: Droplets },
  { title: "Мінус в об'ємі", desc: "Скорочуємо сантиметри у проблемних зонах та формуємо силует.", Icon: Ruler },
  { title: "Пружна шкіра", desc: "Стимулюємо колаген — шкіра стає гладенькою та підтягнутою.", Icon: Sun },
  { title: "Легкість у тілі", desc: "Покращуємо крово- та лімфообіг, знімаємо втому й важкість.", Icon: Feather },
  { title: "Тонус і енергія", desc: "Активуємо обмінні процеси — більше сил і гарний настрій.", Icon: HeartPulse },
];

export function Results() {
  return (
    <section id="results" className="grain relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-rose/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Before / after diptych */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-2xl">
                <PhotoArt variant="sand" motif="wave" className="aspect-[3/4] w-full" />
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold tracking-wider text-cream">
                  ДО
                </span>
              </div>
              <div className="relative mt-8 overflow-hidden rounded-2xl ring-2 ring-gold-soft/40">
                <PhotoArt variant="mauve" motif="lotus" className="aspect-[3/4] w-full" />
                <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wider text-ink">
                  ПІСЛЯ
                </span>
              </div>
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream font-display text-2xl italic text-rose-deep shadow-xl">
                →
              </div>
            </div>
          </Reveal>

          {/* Copy + benefits */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="eyebrow text-gold-soft">Результати</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Що ви отримаєте вже{" "}
                <em className="not-italic text-gold-soft">за курс</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-cream/70">
                Результат помітний і на дотик, і на фото. Ось що відчувають мої
                клієнтки після проходження програми.
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2" stagger={0.08}>
              {benefits.map((b) => (
                <RevealItem key={b.title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream/10 text-gold-soft ring-1 ring-gold-soft/20">
                    <b.Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{b.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-cream/60">{b.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Stats band */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-cream/10 pt-12 md:grid-cols-4">
          {[
            { to: 12000, suffix: "+", label: "проведених сеансів" },
            { to: 7, prefix: "−", suffix: " см", label: "середнє в талії за курс" },
            { to: 98, suffix: "%", label: "повертаються знову" },
            { to: 10, suffix: " днів", label: "перші видимі зміни" },
          ].map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="font-display text-4xl text-cream sm:text-5xl">
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-cream/50">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
