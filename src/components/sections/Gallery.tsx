"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskText } from "@/components/ui/motion";
import { gallery } from "@/data/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Masonry на CSS-колонках: різні пропорції дають ритм без дірок у сітці. */
const spanClass = {
  tall: "aspect-[3/4] arch",
  wide: "aspect-[4/3] rounded-[var(--r-lg)]",
  square: "aspect-square rounded-[var(--r-lg)]",
} as const;

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) => setOpenIndex((current) => (current === null ? null : (current + delta + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : gallery[openIndex];

  return (
    <Section id="galereya" tone="espresso" curveTop>
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-5">
          <SectionLabel>Г А Л Е Р Е Я</SectionLabel>
          <MaskText
            parts={[{ text: "Атмосфера" }, { text: "студії", className: "italic text-gold-light" }]}
            className="text-balance text-[2.1rem] leading-[1.08] text-sand sm:text-5xl md:text-[3.4rem]"
          />
        </div>

        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline label-spaced group inline-flex shrink-0 items-center gap-2 px-6 py-3.5"
        >
          Більше в Instagram
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
            aria-hidden
          />
        </a>
      </div>

      <ul className="mt-14 gap-4 sm:columns-2 lg:columns-3">
        {gallery.map((item, index) => (
          <li key={item.src + index} className="mb-4 break-inside-avoid">
            <motion.button
              type="button"
              onClick={() => setOpenIndex(index)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
              className={cn(
                "group relative block w-full overflow-hidden shadow-[var(--shadow-soft)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 focus-visible:outline-offset-4",
                spanClass[item.span],
              )}
            >
              <span className="absolute inset-0 block">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-85 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-100"
                />
              </span>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-[var(--r-md)] border border-gold/0 transition-colors duration-500 group-hover:border-gold/60"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 to-transparent p-4 pt-12 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                <span className="label-spaced inline-block rounded-[var(--r-pill)] border border-gold/40 bg-espresso/70 px-4 py-2 text-gold-light backdrop-blur-sm">
                  Дивитися
                </span>
              </span>
              <span className="sr-only">{item.alt}</span>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && openIndex !== null ? (
          <motion.div
            key="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Перегляд фото студії"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-md sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-espresso/60 text-gold backdrop-blur-md transition-colors hover:border-gold hover:bg-gold/15 sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" strokeWidth={1.25} aria-hidden />
              <span className="sr-only">Закрити</span>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/25 bg-espresso/50 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/15 sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1} aria-hidden />
              <span className="sr-only">Попереднє фото</span>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/25 bg-espresso/50 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold/15 sm:right-6"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1} aria-hidden />
              <span className="sr-only">Наступне фото</span>
            </button>

            <figure
              onClick={(event) => event.stopPropagation()}
              className="flex w-full max-w-4xl flex-col items-center"
            >
              <div className="relative aspect-[4/3] w-full">
                {/* key без exit: ремонт без «зависання» виходу в AnimatePresence */}
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-[var(--r-lg)]"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>

              <figcaption className="mt-6 rounded-[var(--r-pill)] border border-gold/20 bg-espresso/60 px-6 py-3 text-center text-sm text-beige backdrop-blur-md">
                {active.alt}
                <span className="label-spaced ml-3 text-gold">
                  {openIndex + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
