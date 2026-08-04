"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const onScroll = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 20;
    setIndex(Math.round(el.scrollLeft / step));
  }, []);

  const scrollTo = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    el.scrollBy({ left: (card.offsetWidth + 20) * dir, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="bg-white py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Відгуки"
          title={
            <>
              Що кажуть про нас{" "}
              <span className="accent text-clay">пацієнти</span>
            </>
          }
          description="Понад тисяча візитів щороку — і майже кожен другий пацієнт приходить за рекомендацією друзів чи родини."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo(-1)}
                aria-label="Попередній відгук"
                className="flex size-12 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60"
              >
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollTo(1)}
                aria-label="Наступний відгук"
                className="flex size-12 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60"
              >
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          }
        />
      </div>

      <Reveal className="mt-14 md:mt-20" y={32}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar carousel-inset flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="group relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] border border-ink/[0.07] bg-mist p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_40px_90px_-60px_rgba(17,17,17,0.5)] sm:w-[62vw] md:p-10 lg:w-[38vw] xl:w-[30vw]"
            >
              <div>
                <span
                  aria-hidden
                  className="accent pointer-events-none absolute right-7 top-4 text-[70px] leading-none text-sand/50 transition-colors duration-700 group-hover:text-sand md:text-[90px]"
                >
                  &rdquo;
                </span>
                <div className="flex gap-1" role="img" aria-label="Оцінка 5 з 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-clay text-clay"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-7 font-display text-[19px] font-light leading-[1.45] tracking-[-0.02em] text-ink md:text-[22px]">
                  {review.text}
                </blockquote>
              </div>

              <figcaption className="mt-10 flex items-center gap-4 border-t border-ink/[0.08] pt-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-ink font-display text-[15px] font-medium text-white ring-1 ring-sand/70 ring-offset-2 ring-offset-transparent">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[15px] font-medium tracking-[-0.01em] text-ink">
                    {review.name}
                  </span>
                  <span className="mt-0.5 block text-[14px] text-graphite">
                    {review.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <div className="container-x">
        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            {reviews.map((review, i) => (
              <span
                key={review.name}
                className={cn(
                  "h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  i === index ? "w-8 bg-ink" : "w-2.5 bg-ink/15",
                )}
              />
            ))}
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-graphite underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline"
          >
            Більше історій в Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
