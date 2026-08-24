"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { GalleryItem } from "@/data/content";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** Повноекранний перегляд із клавіатурною навігацією (←/→/Esc). */
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    // Блокуємо скрол фону, поки відкрито перегляд.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, next, prev]);

  const item = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд зображення"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col bg-graphite/96 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-10">
            <span className="text-xs tracking-[0.2em] text-white/50">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити перегляд"
              autoFocus
              className="rounded-sm p-2 text-white/70 transition-colors duration-300 hover:text-white"
            >
              <X className="size-6" strokeWidth={1.25} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16">
            <button
              type="button"
              onClick={prev}
              aria-label="Попереднє зображення"
              className="absolute left-2 z-10 rounded-sm p-3 text-white/60 transition-colors duration-300 hover:text-white md:left-6"
            >
              <ChevronLeft className="size-7" strokeWidth={1.25} />
            </button>

            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full max-w-5xl"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={next}
              aria-label="Наступне зображення"
              className="absolute right-2 z-10 rounded-sm p-3 text-white/60 transition-colors duration-300 hover:text-white md:right-6"
            >
              <ChevronRight className="size-7" strokeWidth={1.25} />
            </button>
          </div>

          <p className="px-5 pb-6 text-center text-xs text-white/45 md:px-10">{item.alt}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
