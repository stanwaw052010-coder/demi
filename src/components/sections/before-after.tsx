"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { cases } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const clamp = (n: number) => Math.min(100, Math.max(0, n));

export function BeforeAfter() {
  const [active, setActive] = React.useState(0);
  const [pos, setPos] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);
  const frameRef = React.useRef<HTMLDivElement>(null);
  const item = cases[active];

  const update = React.useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  return (
    <section id="results" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="До / Після"
          title={
            <>
              Результати, які видно
              <span className="text-ink/50"> без пояснень</span>
            </>
          }
          description="Реальні клінічні випадки. Потягніть роздільник, щоб побачити зміну."
        />

        <Reveal className="mt-14 md:mt-20" y={40}>
          <div
            ref={frameRef}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
              update(e.clientX);
            }}
            onPointerMove={(e) => dragging && update(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            className={cn(
              "relative aspect-4/5 w-full touch-none select-none overflow-hidden rounded-[24px] bg-mist shadow-[0_50px_120px_-70px_rgba(17,17,17,0.6)] sm:aspect-16/10",
              dragging ? "cursor-grabbing" : "cursor-grab",
            )}
          >
            {/* After (base layer) */}
            <motion.div
              key={`after-${item.id}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={item.after}
                alt={`${item.title} — після лікування`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </motion.div>

            {/* Before (clipped layer) */}
            <motion.div
              key={`before-${item.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute inset-0",
                !dragging &&
                  "transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              )}
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={item.before}
                alt={`${item.title} — до лікування`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </motion.div>

            {/* Labels */}
            <span className="pointer-events-none absolute left-5 top-5 rounded-full glass-dark px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 md:left-7 md:top-7">
              До
            </span>
            <span className="pointer-events-none absolute right-5 top-5 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink md:right-7 md:top-7">
              Після
            </span>

            {/* Handle */}
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_24px_rgba(0,0,0,0.35)]",
                !dragging &&
                  "transition-[left] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              )}
              style={{ left: `${pos}%` }}
            >
              <button
                type="button"
                role="slider"
                aria-label="Роздільник до / після"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setPos((p) => clamp(p - 4));
                  if (e.key === "ArrowRight") setPos((p) => clamp(p + 4));
                }}
                className="pointer-events-auto absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_30px_-8px_rgba(17,17,17,0.5)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:size-14"
              >
                <MoveHorizontal className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Case caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 pt-16 md:p-8 md:pt-24">
              <p className="font-display text-[19px] font-light tracking-[-0.02em] text-white md:text-[24px]">
                {item.title}
              </p>
              <p className="mt-1.5 text-[12px] uppercase tracking-[0.14em] text-white/55">
                {item.detail}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Case switcher */}
        <div className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-ink/[0.08] bg-ink/[0.08] sm:grid-cols-3">
          {cases.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActive(i);
                setPos(50);
              }}
              aria-pressed={active === i}
              className={cn(
                "group flex items-center gap-4 bg-white p-5 text-left transition-colors duration-500 hover:bg-mist md:p-6",
                active === i && "bg-mist",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] tabular-nums transition-colors duration-500",
                  active === i ? "text-ink" : "text-ink/60",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-[14px] font-medium tracking-[-0.01em] transition-colors duration-500",
                  active === i ? "text-ink" : "text-graphite/70",
                )}
              >
                {c.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
