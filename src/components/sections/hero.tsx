"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDownRight, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";
import { useScrollHandler } from "@/lib/use-scroll-value";
import { ButtonLink } from "@/components/ui/button";
import { RevealText } from "@/components/ui/reveal";

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
      className="relative overflow-hidden bg-white pt-28 md:pt-32 lg:pt-36"
    >
      {/* Soft light behind the composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,52,59,0.07),transparent)]"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16 xl:gap-24">
          {/* ── Left: copy ─────────────────────────────── */}
          <div ref={copyRef} className="will-change-transform">
            <div
              className="enter inline-flex items-center gap-2.5 rounded-full border border-ink/[0.08] bg-white py-2 pl-3 pr-4 text-[12px] font-medium text-graphite/80 shadow-[0_1px_2px_rgba(17,17,17,0.03)]"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/40" />
                <span className="relative inline-flex size-1.5 rounded-full bg-ink" />
              </span>
              <MapPin className="size-3.5 text-ink/60" strokeWidth={1.75} />
              {site.addressLatin}
            </div>

            <h1 className="display-tight mt-8 font-display text-[40px] font-light text-ink sm:text-[54px] lg:text-[62px] xl:text-[72px]">
              <RevealText text="Створюємо здорові" />
              <br className="hidden sm:block" />{" "}
              <RevealText text="та красиві усмішки" delay={0.1} />
              <br className="hidden sm:block" />{" "}
              <span className="text-graphite/55">
                <RevealText text="вже понад 20 років" delay={0.2} />
              </span>
            </h1>

            <p
              className="mt-8 max-w-[34rem] text-[16px] leading-relaxed text-graphite/70 md:text-[18px]"
            >
              Сучасна стоматологія у Тернополі. Лікування під мікроскопом,
              художня реставрація, імплантація та професійне відбілювання.
            </p>

            <div
              style={{ animationDelay: "0.32s" }}
              className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href="#contacts" size="lg">
                Записатися
                <ArrowDownRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="#services" variant="secondary" size="lg">
                Наші послуги
              </ButtonLink>
            </div>

            <div
              style={{ animationDelay: "0.44s" }}
              className="enter mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/[0.07] pt-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-ink text-ink" />
                  ))}
                </div>
                <span className="text-[13px] text-graphite/70">
                  5.0 — оцінка пацієнтів
                </span>
              </div>
              <div className="hidden h-4 w-px bg-ink/10 sm:block" aria-hidden />
              <span className="text-[13px] text-graphite/70">
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
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
              />

              {/* Floating credential card */}
              <div
                style={{ animationDelay: "0.5s" }}
                className="enter absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-[20px] glass p-4 shadow-[0_20px_60px_-30px_rgba(17,17,17,0.6)] sm:left-6 sm:right-auto sm:bottom-6 sm:pr-8"
              >
                <div>
                  <p className="font-display text-[15px] font-semibold tracking-[-0.01em] text-ink">
                    {site.doctor}
                  </p>
                  <p className="mt-1 text-[12px] text-graphite/75">
                    Лікар-стоматолог · 20+ років практики
                  </p>
                </div>
              </div>
            </div>

            {/* Micro-stat, offset outside the frame */}
            <div
              style={{ animationDelay: "0.62s" }}
              className="enter absolute -left-3 top-8 hidden rounded-[20px] border border-ink/[0.06] bg-white px-5 py-4 shadow-[0_24px_60px_-32px_rgba(17,17,17,0.45)] xl:block"
            >
              <p className="font-display text-[26px] font-light leading-none tracking-[-0.03em] text-ink">
                25×
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ink/60">
                Мікроскоп
              </p>
            </div>
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
              className="flex items-center gap-10 text-[12px] font-medium uppercase tracking-[0.18em] text-ink/60"
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
