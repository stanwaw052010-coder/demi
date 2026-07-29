"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/motion";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (dir: number) => setState(([i]) => [(i + dir + total) % total, dir]),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go, paused]);

  const active = testimonials[index];

  return (
    <section id="reviews" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <div className="container-x relative z-10">
        <SectionHeading
          align="center"
          eyebrow="Відгуки"
          title="Що кажуть"
          accent="наші клієнти"
          text="Живі враження після візитів у ProfiTime — про результат, атмосферу та ставлення."
          className="mx-auto"
        />

        <Reveal direction="scale" delay={0.15} className="mt-14 md:mt-16">
          <div
            className="relative mx-auto max-w-4xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="relative overflow-hidden rounded-6xl border border-graphite-200/70 bg-graphite-50 p-8 shadow-soft sm:p-12 md:p-16">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand-200/40 blur-[90px]"
              />
              <Quote
                aria-hidden
                className="absolute top-8 right-8 size-16 text-brand-200/70 sm:size-24"
                strokeWidth={1.4}
              />

              <div className="relative z-10 min-h-[19rem] sm:min-h-[15rem]" aria-live="polite">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -48 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex gap-1" aria-label={`Оцінка ${active.rating} з 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-[1.1rem]",
                            i < active.rating ? "fill-brand-500 text-brand-500" : "text-graphite-200",
                          )}
                          strokeWidth={2}
                        />
                      ))}
                    </div>

                    <p className="mt-7 text-[1.15rem] leading-relaxed font-medium tracking-[-0.015em] text-ink text-pretty sm:text-[1.4rem] sm:leading-[1.55]">
                      «{active.text}»
                    </p>

                    <footer className="mt-auto flex items-center gap-4 pt-9">
                      <span className="grid size-13 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-900 text-[1.05rem] font-extrabold text-white shadow-glow">
                        {active.name.charAt(0)}
                      </span>
                      <span className="flex flex-col">
                        <cite className="text-[1rem] font-extrabold tracking-[-0.02em] text-ink not-italic">
                          {active.name}
                        </cite>
                        <span className="mt-0.5 text-[0.82rem] font-medium text-graphite-500">
                          {active.role}
                        </span>
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>

            {/* керування */}
            <div className="mt-8 flex items-center justify-between gap-6">
              <div className="flex items-center gap-2.5" role="tablist" aria-label="Обрати відгук">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Відгук ${i + 1}`}
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className={cn(
                      "h-1.5 cursor-pointer rounded-full transition-all duration-500",
                      i === index
                        ? "w-10 bg-linear-to-r from-brand-600 to-brand-400"
                        : "w-4 bg-graphite-200 hover:bg-brand-300",
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <SliderButton label="Попередній відгук" onClick={() => go(-1)}>
                  <ArrowLeft className="size-5" strokeWidth={2.3} />
                </SliderButton>
                <SliderButton label="Наступний відгук" onClick={() => go(1)}>
                  <ArrowRight className="size-5" strokeWidth={2.3} />
                </SliderButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SliderButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-12 cursor-pointer place-items-center rounded-full border border-graphite-200 bg-white text-brand-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-500"
    >
      {children}
    </button>
  );
}
