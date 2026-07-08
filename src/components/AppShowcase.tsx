"use client";

import { Bell, CalendarCheck2, ChevronRight, UserRound } from "lucide-react";
import { LINKS } from "@/lib/site";
import { Eyebrow, Reveal } from "./Reveal";

function AppleBadge() {
  return (
    <a
      href={LINKS.appStore}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-deep"
    >
      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden>
        <path d="M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-1-1.94.03-3.72 1.13-4.72 2.86-2.01 3.49-.51 8.66 1.45 11.49.96 1.39 2.1 2.94 3.6 2.89 1.45-.06 1.99-.93 3.74-.93s2.24.93 3.77.9c1.56-.03 2.54-1.41 3.49-2.8 1.1-1.61 1.55-3.17 1.58-3.25-.03-.02-3.03-1.16-3.06-4.59zM14.16 4.06c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide opacity-70">
          Завантажити в
        </span>
        <span className="block text-lg font-semibold">App Store</span>
      </span>
    </a>
  );
}

function PlayBadge() {
  return (
    <a
      href={LINKS.googlePlay}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-ink/20 bg-white/70 px-5 py-3 text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand"
    >
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path d="M4 2.7v18.6c0 .5.55.8.97.53l.13-.08L15.9 12 5.1 2.25a.62.62 0 0 0-1.1.45z" fill="#8db748" />
        <path d="M15.9 12 5.1 2.25l10.5 6.06L18.85 10c1.53.88 1.53 3.12 0 4l-3.24 1.87L15.9 12z" fill="#5e7a34" opacity=".8" />
        <path d="m5.1 21.75 10.8-9.74.71 3.87-10.4 6a.63.63 0 0 1-1.11-.13z" fill="#34421f" opacity=".7" />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide opacity-60">
          Доступно в
        </span>
        <span className="block text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}

function PhoneMockup() {
  return (
    <div className="animate-float relative mx-auto w-[280px] sm:w-[300px]">
      {/* frame */}
      <div className="relative rounded-[3rem] border border-white/40 bg-ink p-2.5 shadow-[0_60px_120px_-40px_rgba(52,66,31,0.6)]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-cream">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
          {/* app screen */}
          <div className="flex h-[560px] flex-col px-5 pt-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-olive">
              Rayskaya Beauty Space
            </p>
            <p className="mt-2 font-display text-[26px] leading-tight text-ink">
              Вітаємо,
              <br />
              Даріє 🌿
            </p>

            <div className="mt-5 rounded-3xl bg-brand p-4 text-white shadow-[0_16px_36px_-16px_rgba(141,183,72,0.9)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide opacity-90">
                <CalendarCheck2 className="size-3.5" strokeWidth={2} />
                Найближчий візит
              </div>
              <p className="mt-2 font-display text-lg leading-snug">
                Доглядова процедура
              </p>
              <p className="mt-1 text-[13px] opacity-90">Завтра · 14:30</p>
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { icon: CalendarCheck2, t: "Записатися онлайн" },
                { icon: UserRound, t: "Обрати спеціаліста" },
                { icon: Bell, t: "Нагадування про візити" },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white px-4 py-3.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand-mist text-olive">
                    <row.icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <span className="flex-1 text-[13.5px] font-semibold text-ink">
                    {row.t}
                  </span>
                  <ChevronRight className="size-4 text-stone" strokeWidth={2} />
                </div>
              ))}
            </div>

            <div className="mt-auto pb-6 pt-4">
              <div className="rounded-full bg-ink py-3.5 text-center text-[13px] font-semibold text-white">
                Новий запис
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section id="app" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-ink/8 bg-white/70 px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
          {/* decorative lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="appLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#8db748" stopOpacity="0" />
                <stop offset="0.5" stopColor="#8db748" stopOpacity="0.5" />
                <stop offset="1" stopColor="#8db748" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 490 Q 300 380, 550 470 T 1000 400"
              fill="none"
              stroke="url(#appLine)"
              strokeWidth="1.25"
            />
            <path
              d="M0 530 Q 320 430, 580 510 T 1000 450"
              fill="none"
              stroke="url(#appLine)"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-[380px] rounded-full bg-brand-mist blur-3xl"
          />

          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow>Мобільний застосунок</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl">
                  Власний мобільний{" "}
                  <em className="font-normal italic text-olive">застосунок</em>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-stone">
                  Записуйтеся онлайн, обирайте спеціаліста, отримуйте
                  нагадування та керуйте своїми візитами в одному застосунку.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <AppleBadge />
                  <PlayBadge />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} y={56}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -z-10 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/30"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -z-10 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15"
                />
                <PhoneMockup />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
