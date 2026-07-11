"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { gallery } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    []
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + gallery.length) % gallery.length
      ),
    []
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  return (
    <section id="gallery" className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="overline mb-6">Галерея · Роботи</p>
            </Reveal>
            <h2 className="h-section max-w-2xl font-display text-fg">
              <TextReveal text="Результат, який" />
              <br />
              <TextReveal text="видно" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-muted-2">
              Живі роботи наших майстрів та атмосфера барбершопу. Наведіть, щоб
              наблизити.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[280px] lg:grid-cols-4">
          {gallery.map((item, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="hover"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/5 ${
                item.span ? "col-span-2 row-span-1 sm:row-span-2" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end p-5">
                <span className="translate-y-3 text-sm text-fg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.alt}
                </span>
              </div>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass border border-white/10 text-fg opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Plus size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/95 backdrop-blur-lg"
            onClick={close}
          >
            <button
              aria-label="Закрити"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 hover:text-gold"
              onClick={close}
            >
              <X size={20} />
            </button>
            <button
              aria-label="Попереднє"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 hover:text-gold sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              aria-label="Наступне"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 hover:text-gold sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-4 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[index].src}
                alt={gallery[index].alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-muted">
              {index + 1} / {gallery.length} · {gallery[index].alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
