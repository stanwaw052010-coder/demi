"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
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
    const card = el.querySelector("figure");
    const w = card ? card.clientWidth + 24 : 460;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="space" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-6">
          <p className="eyebrow" data-reveal="up">
            Наш бюті простір
          </p>
          <div className="flex gap-3" data-reveal="up" data-reveal-delay="0.15">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Попереднє фото"
              className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:border-brand hover:text-brand-deep disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Наступне фото"
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
          {GALLERY.map((g, i) => (
            <figure
              key={i}
              className="group w-[85vw] max-w-[460px] shrink-0 snap-start"
            >
              <div className="overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(34,39,25,0.1)]">
                <SmartImage
                  src={g.src}
                  alt={g.alt}
                  className="h-[420px]"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
