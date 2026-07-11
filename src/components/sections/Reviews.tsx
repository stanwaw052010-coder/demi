"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { reviews } from "@/lib/content";
import { site } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function Reviews() {
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const idx = ((page % reviews.length) + reviews.length) % reviews.length;

  const paginate = useCallback((d: number) => {
    setPage(([p]) => [p + d, d]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [paused, paginate]);

  const review = reviews[idx];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden py-28 sm:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-lux">
        <div className="mb-16 flex flex-col items-center text-center">
          <Reveal>
            <p className="overline mb-6">Відгуки · Google</p>
          </Reveal>
          <h2 className="h-section max-w-3xl font-display text-fg">
            <TextReveal text="Що кажуть наші гості" />
          </h2>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Quote
            className="mx-auto mb-8 h-10 w-10 text-gold/40"
            strokeWidth={1.2}
          />
          <div className="relative min-h-[260px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-balance font-display text-2xl font-medium leading-snug tracking-tight text-fg sm:text-3xl">
                  “{review.text}”
                </p>
                <div className="mt-8">
                  <p className="font-medium text-fg">{review.name}</p>
                  <p className="mt-1 text-sm text-muted">{review.meta}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              aria-label="Попередній відгук"
              data-cursor="hover"
              onClick={() => paginate(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 hover:text-gold"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Відгук ${i + 1}`}
                  onClick={() => setPage([i, i > idx ? 1 : -1])}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === idx ? "w-8 bg-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Наступний відгук"
              data-cursor="hover"
              onClick={() => paginate(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 hover:text-gold"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="link-underline text-sm text-muted-2 hover:text-gold"
          >
            Дивитися всі відгуки в Google
          </a>
        </div>
      </div>
    </section>
  );
}
