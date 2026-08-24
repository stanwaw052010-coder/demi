"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Lightbox } from "../ui/Lightbox";
import { gallery } from "@/data/content";
import { cn } from "@/lib/utils";

/** Пропорції плиток задають ритм колонки: висока / широка / квадратна. */
const ratios: Record<string, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="gallery" className="scroll-mt-24 bg-soft py-24 md:py-32">
      <div className="shell flex flex-col gap-14">
        <SectionHeading
          eyebrow="Галерея"
          lines={["Простір клініки"]}
          description="Атмосфера, у якій візит до стоматолога відчувається спокійно."
        />

        {/* CSS-колонки дають асиметричну розкладку без порожнеч */}
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {gallery.map((item, i) => (
            <motion.li
              key={item.src}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.85, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn("mb-4 break-inside-avoid", ratios[item.ratio])}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block size-full overflow-hidden rounded-md bg-second"
                aria-label={`Відкрити зображення: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  );
}
