"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDownRight, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";
import { useScrollHandler } from "@/lib/use-scroll-value";
import { ButtonLink } from "@/components/ui/button";
import { ViberIcon } from "@/components/ui/icons";
import { RotatingBadge } from "@/components/ui/rotating-badge";


const marquee = [
  "Лікування під мікроскопом",
  "Художня реставрація",
  "Імплантація",
  "Відбілювання",
  "Професійна гігієна",
  "Дитяча стоматологія",
  "Естетична стоматологія",
];

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);

  /* Parallax: the copy drifts up and fades, the portrait drifts down. */
  useScrollHandler((y) => {
    const section = ref.current;
    if (!section) return;

    const progress = Math.min(Math.max(y / section.offsetHeight, 0), 1);

    if (copyRef.current) {
      copyRef.current.style.transform = `translate3d(0, ${progress * 60}px, 0)`;
      copyRef.current.style.opacity = `${Math.max(1 - progress / 0.75, 0)}`;
    }
    if (imageRef.current) {
      imageRef.current.style.transform = `translate3d(0, ${progress * 14}%, 0) scale(${1 + progress * 0.12})`;
    }
  });

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative overflow-hidden bg-white pt-44 md:pt-40 lg:pt-44"
    >
      {/* Two soft lights: a cool one behind the type, a warm one behind the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[760px] w-[1150px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,52,59,0.06),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(47,52,59,0.10),transparent)]"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 xl:gap-24">
          {/* ── Left: contacts first, then the copy ────── */}
          <div
            ref={copyRef}
            className="text-center will-change-transform lg:text-left"
          >
            <div className="enter inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white py-2.5 pl-3.5 pr-5 text-[14px] font-semibold text-ink shadow-[0_1px_2px_rgba(17,17,17,0.04)]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-clay/50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-clay" />
              </span>
              Сімейна стоматологія у Тернополі
            </div>

            {/* The card the eye should land on: where we are, the number,
                and the one action — before any headline. */}
            <div
              style={{ animationDelay: "0.14s" }}
              className="enter mt-8 rounded-[24px] border border-ink/10 bg-white p-6 shadow-[0_30px_80px_-56px_rgba(17,17,17,0.5)] sm:p-8"
            >
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-ink"
              >
                <MapPin className="size-[18px] shrink-0" strokeWidth={2.25} />
                <span className="text-[17px] font-semibold tracking-[-0.01em] underline-offset-4 group-hover:underline md:text-[19px]">
                  {site.address}
                </span>
              </a>

              <a
                href={site.phoneHref}
                className="mt-3 block font-display text-[30px] font-bold tabular-nums leading-none tracking-[-0.03em] text-ink underline-offset-[6px] hover:underline sm:text-[36px] md:text-[42px]"
              >
                {site.phone}
              </a>

              <p className="mt-3.5 text-[15px] font-medium text-graphite">
                Пн–Пт 09:00 — 19:00
                <span className="text-ink/25"> · </span>
                Сб за записом
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <ButtonLink href="#booking" size="lg" className="font-semibold">
                  Записатися
                  <ArrowDownRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
                </ButtonLink>
                <ButtonLink
                  href={site.viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                  className="font-semibold"
                >
                  <ViberIcon className="size-[18px]" />
                  Написати у Viber
                </ButtonLink>
              </div>
            </div>

            {/* The headline is the supporting act now, so it fades in as one
                block — a word-by-word reveal above the LCP text cost more
                than it was worth. */}
            <h1
              style={{ animationDelay: "0.22s" }}
              className="enter display-tight mt-10 font-display text-[28px] font-light text-ink sm:text-[34px] lg:text-[40px] xl:text-[46px]"
            >
              Створюємо здорові та красиві усмішки{" "}
              <span className="accent text-clay">вже понад 20 років</span>
            </h1>

            <p className="mx-auto mt-5 max-w-[34rem] text-[16px] leading-relaxed text-graphite md:text-[17px] lg:mx-0">
              Сучасна стоматологія у Тернополі. Лікування під мікроскопом,
              художня реставрація, імплантація та професійне відбілювання.
            </p>

            <div
              style={{ animationDelay: "0.5s" }}
              className="enter mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6 lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-clay text-clay" />
                  ))}
                </div>
                <span className="text-[14px] text-graphite">
                  5.0 — оцінка пацієнтів
                </span>
              </div>
              <div className="hidden h-4 w-px bg-ink/10 sm:block" aria-hidden />
              <span className="text-[14px] text-graphite">
                1000+ усмішок · сімейна стоматологія
              </span>
            </div>
          </div>

          {/* ── Right: portrait ────────────────────────── */}
          <div className="enter-scale relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-mist shadow-[0_40px_120px_-60px_rgba(17,17,17,0.55)] sm:aspect-3/4 lg:aspect-4/5">
              <div ref={imageRef} className="absolute inset-0">
                <Image
                  src="/images/hero.jpg"
                  alt={`${site.doctor} — лікар-стоматолог, ${site.name}`}
                  fill
                  /* The LCP element is the copy, and on a phone this portrait
                     sits below the fold — preloading it only steals bandwidth
                     from the text and the fonts. */
                  fetchPriority="low"
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
              />

              {/* Hairline frame inside the photograph */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-[18px] border border-white/20 md:inset-4"
              />

              {/* Floating credential card */}
              <div
                style={{ animationDelay: "0.5s" }}
                className="enter absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-[20px] glass p-4 shadow-[0_20px_60px_-30px_rgba(17,17,17,0.6)] sm:bottom-6 sm:left-auto sm:right-6 sm:pl-8"
              >
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    {site.doctor}
                  </p>
                  <p className="mt-1 text-[12px] text-graphite">
                    Лікар-стоматолог · 20+ років практики
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden h-8 w-px bg-gradient-to-b from-transparent via-clay/60 to-transparent sm:block"
                />
              </div>
            </div>

            {/* Micro-stat, offset outside the frame */}
            <div
              style={{ animationDelay: "0.62s" }}
              className="enter absolute -left-3 top-8 hidden rounded-[20px] border border-ink/[0.06] bg-white px-5 py-4 shadow-[0_24px_60px_-32px_rgba(17,17,17,0.45)] xl:block"
            >
              <p className="font-display text-[26px] font-light leading-none tracking-[-0.03em] text-ink">
                25<span className="accent text-clay">×</span>
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink/85">
                Мікроскоп
              </p>
            </div>

            {/* Rotating call to action, anchored to the frame's corner */}
            <RotatingBadge
              className="enter absolute -bottom-9 left-2 hidden sm:grid lg:-left-14"
              style={{ animationDelay: "0.7s" }}
            />
          </div>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────── */}
      {/* The keywords repeat the services section, so they stay decorative */}
      <div
        aria-hidden
        className="relative mt-20 overflow-hidden border-y border-ink/[0.07] py-5 md:mt-28"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[12px] font-medium uppercase tracking-[0.18em] text-ink/85"
            >
              {item}
              <span className="size-1 rounded-full bg-ink/20" aria-hidden />
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent"
        />
      </div>
    </section>
  );
}
