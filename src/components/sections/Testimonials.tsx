"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSectionTheme } from "@/lib/hooks";
import { Magnetic } from "@/components/ui/Magnetic";
import { Pic } from "@/components/ui/Pic";
import { SplitReveal } from "@/components/ui/Split";
import { TESTIMONIALS } from "@/data/content";

const SPRING = { type: "spring", stiffness: 210, damping: 26 } as const;

/**
 * A deck of ink cards on ivory. The top card can be thrown aside —
 * spring physics included — or the deck deals itself every few
 * seconds. Portraits open through an iris mask; quotes arrive
 * word by word.
 */
export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  useSectionTheme(rootRef, "light");

  const len = TESTIMONIALS.length;
  const advance = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + len) % len);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => advance(1), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44"
    >
      {/* ghost quotation mark */}
      <span
        aria-hidden
        className="font-serif-display pointer-events-none absolute -top-[6vw] right-[4vw] text-[38vw] leading-none italic opacity-[0.045] select-none"
      >
        ”
      </span>

      <div className="hairline-t mb-8 flex items-baseline justify-between pt-6">
        <span className="label-mono">— Guest book</span>
        <span className="label-mono hidden md:block">their words, kept verbatim</span>
      </div>

      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SplitReveal
            as="h2"
            className="h-display mb-8 block text-[clamp(2.6rem,5.5vw,5.4rem)]"
          >
            Spoken softly, meant entirely
          </SplitReveal>
          <p className="mb-12 max-w-sm text-sm leading-relaxed opacity-60">
            Entries from the atelier’s guest book. Throw the card, or let the
            deck deal itself.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: "←", d: -1, name: "Previous" },
              { label: "→", d: 1, name: "Next" },
            ].map((b) => (
              <Magnetic key={b.name} strength={0.45}>
                <button
                  onClick={() => advance(b.d)}
                  aria-label={b.name}
                  data-cursor
                  data-cursor-text={b.name}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--hairline)] transition-colors duration-500 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {b.label}
                </button>
              </Magnetic>
            ))}
            <span className="font-mono text-[11px] tracking-[0.3em] opacity-50">
              {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* the deck */}
        <div
          className="relative mx-auto h-[430px] w-full max-w-md md:h-[460px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence custom={dir}>
            {TESTIMONIALS.map((t, i) => {
              const pos = (i - index + len) % len;
              if (pos > 2) return null;
              const top = pos === 0;
              return (
                <motion.div
                  key={t.name}
                  custom={dir}
                  initial={{ y: 60, scale: 0.9, opacity: 0 }}
                  animate={{
                    y: pos * 22,
                    x: pos === 1 ? 14 : pos === 2 ? -10 : 0,
                    scale: 1 - pos * 0.05,
                    rotate: pos === 0 ? 0 : pos === 1 ? 3.6 : -2.8,
                    opacity: 1 - pos * 0.12,
                    zIndex: len - pos,
                  }}
                  variants={{
                    exit: (d: number) => ({
                      x: d * 420,
                      rotate: d * 16,
                      opacity: 0,
                      transition: { duration: 0.45 },
                    }),
                  }}
                  exit="exit"
                  transition={SPRING}
                  drag={top ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 110) advance(info.offset.x > 0 ? 1 : -1);
                  }}
                  data-cursor
                  data-cursor-text={top ? "Throw" : ""}
                  className="absolute inset-0 flex cursor-grab flex-col justify-between bg-ink p-8 text-ivory shadow-[0_30px_80px_-20px_rgba(11,10,8,0.45)] active:cursor-grabbing md:p-10"
                  style={{ borderRadius: 6 }}
                >
                  <div className="flex items-start justify-between">
                    <motion.div
                      key={`iris-${top}-${t.name}`}
                      initial={false}
                      animate={{ clipPath: top ? "circle(75% at 50% 50%)" : "circle(30% at 50% 50%)" }}
                      transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
                      className="relative h-20 w-20 overflow-hidden rounded-full"
                    >
                      <Pic src={t.photo} alt={t.name} sizes="80px" className="h-full w-full" />
                    </motion.div>
                    <span className="font-serif-display text-4xl text-champagne/60 italic">”</span>
                  </div>

                  {top ? (
                    <motion.blockquote
                      key={`q-${t.name}-${index}`}
                      initial="hidden"
                      animate="show"
                      variants={{ show: { transition: { staggerChildren: 0.02, delayChildren: 0.15 } } }}
                      className="font-serif-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug"
                    >
                      {t.quote.split(" ").map((w, wi) => (
                        <motion.span
                          key={wi}
                          variants={{
                            hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                            show: { opacity: 1, y: 0, filter: "blur(0px)" },
                          }}
                          className="inline-block"
                        >
                          {w}&nbsp;
                        </motion.span>
                      ))}
                    </motion.blockquote>
                  ) : (
                    <blockquote className="font-serif-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug opacity-30">
                      {t.quote}
                    </blockquote>
                  )}

                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-[0.24em] text-champagne uppercase">
                      {t.name}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-45">
                      {t.role}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
