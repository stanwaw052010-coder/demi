"use client";

import * as React from "react";
import Image from "next/image";
import { cases } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { LogoWatermark } from "@/components/ui/logo-watermark";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Cases are shown as two frames side by side, labelled «До» and «Після».
 * A drag-to-compare slider looked better but relied on the visitor working
 * out that the handle moves — and the clinic reported that not everyone did.
 */
export function BeforeAfter() {
  const [active, setActive] = React.useState(0);
  const item = cases[active];

  const frames = [
    { src: item.before, label: "До", tone: "dark" as const },
    { src: item.after, label: "Після", tone: "light" as const },
  ];

  return (
    <section id="results" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="До / Після"
          title={
            <>
              Результати, які видно{" "}
              <span className="accent text-clay">без пояснень</span>
            </>
          }
          description={`${cases.length} реальних клінічних випадки. Кейс перемикається плиткою внизу.`}
        />

        <Reveal className="mt-14 md:mt-20" y={40}>
          <div className="mx-auto grid max-w-[980px] gap-4 sm:grid-cols-2 md:gap-5">
            {frames.map((frame) => (
              <figure
                key={frame.src}
                className="overflow-hidden rounded-[24px] bg-mist shadow-[0_40px_100px_-70px_rgba(17,17,17,0.6)]"
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: item.ratio }}
                >
                  <Image
                    src={frame.src}
                    alt={`${item.title} — ${frame.label.toLowerCase()} лікування`}
                    fill
                    sizes="(max-width: 640px) 92vw, 480px"
                    className="object-cover"
                  />
                  {frame.tone === "light" && (
                    <LogoWatermark className="bottom-4 right-4" />
                  )}
                </div>

                <figcaption
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]",
                    frame.tone === "dark"
                      ? "bg-mist text-graphite"
                      : "bg-ink text-white",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full",
                      frame.tone === "dark" ? "bg-graphite/50" : "bg-white",
                    )}
                  />
                  {frame.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mx-auto mt-5 max-w-[980px] text-[15px] text-graphite">
            <span className="font-medium text-ink">{item.title}</span> ·{" "}
            {item.detail}
          </p>
        </Reveal>

        {/* How the finished work looks outside the surgery */}
        {item.result && (
          <Reveal className="mx-auto mt-5 max-w-[980px]" y={30} delay={0.08}>
            <figure className="flex flex-col gap-5 overflow-hidden rounded-[24px] bg-mist p-5 sm:flex-row sm:items-center md:p-6">
              <div
                className="relative w-full shrink-0 overflow-hidden rounded-[16px] sm:w-[46%]"
                style={{ aspectRatio: item.result.ratio }}
              >
                <Image
                  src={item.result.src}
                  alt={item.result.caption}
                  fill
                  sizes="(max-width: 640px) 92vw, 420px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-[15px] leading-relaxed text-graphite md:text-[16px]">
                <span className="eyebrow block text-clay">Результат</span>
                <span className="mt-3 block">{item.result.caption}</span>
              </figcaption>
            </figure>
          </Reveal>
        )}

        {/* Case switcher. Thumbnails, not a row of words — otherwise the
            strip reads as a caption and the other cases go unnoticed. */}
        <p className="mx-auto mt-10 max-w-[980px] text-[14px] font-semibold uppercase tracking-[0.16em] text-clay">
          Усі {cases.length} кейси — натисніть, щоб подивитись
        </p>

        <div className="mx-auto mt-4 grid max-w-[980px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {cases.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn(
                "group overflow-hidden rounded-[18px] border bg-white text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
                active === i
                  ? "border-ink shadow-[0_18px_40px_-28px_rgba(17,17,17,0.6)]"
                  : "border-ink/10 hover:border-ink/30",
              )}
            >
              <span className="relative block aspect-4/3 overflow-hidden bg-mist">
                <Image
                  src={c.after}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 45vw, 220px"
                  className={cn(
                    "object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105",
                    active === i ? "grayscale-0" : "grayscale-[45%]",
                  )}
                  loading="lazy"
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    active === i ? "opacity-0" : "bg-white/25",
                  )}
                />
              </span>

              <span className="flex items-baseline gap-2.5 p-3.5 md:p-4">
                <span
                  aria-hidden
                  className={cn(
                    "font-mono text-[11px] tabular-nums",
                    active === i ? "text-ink" : "text-ink/50",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-[13px] font-medium leading-snug tracking-[-0.01em] transition-colors duration-500 md:text-[14px]",
                    active === i ? "text-ink" : "text-graphite",
                  )}
                >
                  {c.short ?? c.title}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
