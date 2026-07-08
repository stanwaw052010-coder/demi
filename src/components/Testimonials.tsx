"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { REVIEWS } from "@/lib/site";
import { Eyebrow, Reveal } from "./Reveal";

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const x = el.scrollLeft + 40;
      let idx = 0;
      cards.forEach((c, i) => {
        if (c.offsetLeft - el.offsetLeft <= x) idx = i;
      });
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Відгуки</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl">
                Нам довіряють{" "}
                <em className="font-normal italic text-olive">найцінніше</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="flex gap-3">
              <button
                onClick={() => scrollTo(Math.max(0, active - 1))}
                aria-label="Попередній відгук"
                className="flex size-13 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => scrollTo(Math.min(REVIEWS.length - 1, active + 1))}
                aria-label="Наступний відгук"
                className="flex size-13 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.14} y={44}>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <article
              key={r.name + r.service}
              className="relative flex w-[86%] shrink-0 snap-start flex-col rounded-[2rem] border border-ink/8 bg-white/80 p-8 shadow-[0_24px_60px_-40px_rgba(52,66,31,0.35)] sm:w-[440px] lg:p-10"
            >
              <Quote
                className="size-9 text-brand/50"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="mt-5 flex-1 text-[17px] leading-relaxed text-ink/85">
                {r.text}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-ink/8 pt-6">
                <div>
                  <p className="font-display text-lg text-ink">{r.name}</p>
                  <p className="mt-0.5 text-sm text-stone">{r.service}</p>
                </div>
                <div className="flex gap-1" aria-label="Оцінка 5 з 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-brand text-brand"
                      strokeWidth={1}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="mt-4 flex justify-center gap-2">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Відгук ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === active ? "w-8 bg-brand" : "w-3 bg-ink/15 hover:bg-ink/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
