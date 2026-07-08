"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/site";

export default function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? card.clientWidth + 24 : 420;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-7" data-reveal="up">
              Відгуки
            </p>
            <h2
              className="h-display max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)]"
              data-reveal="blur"
            >
              Нам довіряють{" "}
              <span className="italic text-brand-deep">найцінніше</span>
            </h2>
          </div>
          <div className="flex gap-3" data-reveal="up" data-reveal-delay="0.15">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Попередній відгук"
              className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Наступний відгук"
              className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div data-reveal="up" data-reveal-delay="0.1">
        <div
          ref={track}
          className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))]"
        >
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="group relative flex w-[85vw] max-w-[420px] shrink-0 snap-start flex-col rounded-[32px] border border-line bg-white/80 p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_30px_70px_rgba(34,39,25,0.1)]"
            >
              <Quote
                className="absolute right-8 top-8 h-9 w-9 text-brand/20"
                aria-hidden
              />
              <div className="flex gap-1 text-brand">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 flex-1 leading-relaxed text-ink/85">
                {r.text}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-display italic text-brand-deep">
                  R
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Клієнтка Rayskaya
                  </p>
                  <p className="text-[13px] text-olive">{r.tag}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
