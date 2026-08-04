"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { kids } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const points = [
  "Перший візит — знайомство без лікування",
  "Пояснюємо кожен крок мовою дитини",
  "Батьки поруч упродовж усього прийому",
  "Профілактика, щоб лікувати було нічого",
];

export function Kids() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const step = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 20 : 0;
  };

  const onScroll = () => {
    const el = trackRef.current;
    const s = step();
    if (el && s) setIndex(Math.round(el.scrollLeft / s));
  };

  const scrollBy = (dir: -1 | 1) =>
    trackRef.current?.scrollBy({ left: step() * dir, behavior: "smooth" });

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: step() * i, behavior: "smooth" });

  return (
    <section id="kids" className="grain relative bg-cream py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="font-mono text-[11px] tabular-nums text-ink/50">
                  06
                </span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="eyebrow">Дитяча стоматологія</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display-tight mt-6 font-display text-[32px] font-light text-ink sm:text-[44px] lg:text-[50px]">
                Перший візит —{" "}
                <span className="accent text-clay">без сліз</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-graphite md:text-[18px]">
                З дітьми ми ніколи не поспішаємо. Спершу знайомство з кабінетом і
                кріслом, потім огляд — і лише тоді, коли дитина готова,
                лікування. Саме так формується спокійне ставлення до
                стоматолога на роки вперед.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3.5">
              {points.map((point, i) => (
                /* The reveal rides on the <li> so the list stays valid */
                <li
                  key={point}
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${0.12 + i * 0.05}s`,
                    } as React.CSSProperties
                  }
                  className="reveal flex items-start gap-3 text-[16px] text-graphite"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ink"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <ButtonLink href="#booking" size="lg" className="mt-10 font-semibold">
                Записати дитину
              </ButtonLink>
            </Reveal>
          </div>

          {/* Carousel */}
          <Reveal delay={0.1} y={36}>
            <div className="relative">
              <div
                ref={trackRef}
                onScroll={onScroll}
                className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
              >
                {kids.map((item) => (
                  <figure
                    key={item.src}
                    className="relative aspect-4/5 w-[78%] shrink-0 snap-start overflow-hidden rounded-[24px] bg-mist shadow-[0_30px_80px_-50px_rgba(17,17,17,0.5)] sm:w-[58%] lg:w-[calc(50%-10px)]"
                  >
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, 30vw"
                      className="object-cover"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                    />
                    <figcaption className="absolute inset-x-5 bottom-5 text-[14px] font-medium leading-snug text-white md:text-[15px]">
                      {item.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  {kids.map((item, i) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Фото ${i + 1}`}
                      aria-current={i === index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === index ? "w-9 bg-ink" : "w-3 bg-ink/25 hover:bg-ink/50",
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    aria-label="Попереднє фото"
                    className="flex size-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <ArrowLeft className="size-4" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    aria-label="Наступне фото"
                    className="flex size-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
