"use client";

import { GraduationCap, Check, Clock3, BadgeCheck, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { site } from "@/lib/site";
import { LotusMark } from "./Decor";

const included = [
  "Повна теоретична база та анатомія",
  "Відпрацювання техніки на моделях",
  "Робота з апаратами LPG та Ендосфера",
  "Сертифікат після завершення",
  "Підтримка та супровід після курсу",
];

const courses = [
  {
    title: "Курс LPG-масажу",
    meta: "Апаратна методика",
    duration: "2 дні",
    level: "з нуля",
    Icon: Users,
  },
  {
    title: "Курс Ендосфера-терапії",
    meta: "Компресійна мікровібрація",
    duration: "2 дні",
    level: "з нуля",
    Icon: GraduationCap,
  },
];

export function Courses() {
  return (
    <section id="courses" className="relative overflow-hidden bg-cream-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left copy */}
          <div>
            <Reveal>
              <span className="eyebrow text-rose-deep">Навчання</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Курси масажу{" "}
                <em className="text-rose-gradient not-italic">LPG та Ендосфера</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                Опануйте професію, яка приносить дохід і задоволення. Навчаю з
                нуля — від теорії до впевненої роботи руками та на апаратах.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 space-y-3.5" stagger={0.07}>
              {included.map((item) => (
                <RevealItem key={item} direction="right" className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose/15 text-rose-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={site.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:bg-rose-deep"
                >
                  Дізнатися про курс
                </a>
                <span className="text-sm text-ink-soft">
                  Напишіть мені — розповім деталі та ціни
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right cards */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-6 -top-10 h-24 w-24 text-gold/30">
              <LotusMark className="h-full w-full animate-floaty" />
            </div>
            <RevealGroup className="space-y-5" stagger={0.12}>
              {courses.map((c) => (
                <RevealItem key={c.title} direction="left">
                  <div className="group flex items-center gap-5 rounded-3xl bg-cream p-6 shadow-[0_2px_20px_-12px_rgba(34,26,21,0.25)] ring-1 ring-gold/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(140,74,90,0.35)]">
                    <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-cream shadow-lg">
                      <c.Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-rose-deep">
                        {c.meta}
                      </div>
                      <h3 className="mt-1 font-display text-2xl text-ink">{c.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-soft">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-4 w-4 text-gold" /> {c.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <BadgeCheck className="h-4 w-4 text-gold" /> навчання {c.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}

              {/* Certificate highlight */}
              <RevealItem direction="left">
                <div className="grain relative overflow-hidden rounded-3xl bg-ink p-7 text-cream">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-rose/25 blur-2xl" />
                  <div className="relative flex items-center gap-4">
                    <BadgeCheck className="h-9 w-9 flex-none text-gold-soft" />
                    <div>
                      <div className="font-display text-xl">Офіційний сертифікат</div>
                      <p className="mt-1 text-sm text-cream/70">
                        Документ про проходження курсу — впевнений старт у професії.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
