"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "./Reveal";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;

        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            className={cn(
              "group overflow-hidden rounded-4xl border transition-colors duration-400",
              isOpen
                ? "border-brand-200 bg-white shadow-lift"
                : "border-graphite-200/70 bg-white/70 hover:border-brand-200 hover:bg-white",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-500 md:px-8"
              >
                <span
                  className={cn(
                    "text-[1.02rem] font-bold tracking-[-0.02em] transition-colors md:text-[1.15rem]",
                    isOpen ? "text-brand-800" : "text-ink group-hover:text-brand-700",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full transition-all duration-400",
                    isOpen
                      ? "rotate-45 bg-linear-to-br from-brand-600 to-brand-900 text-white shadow-glow"
                      : "bg-brand-50 text-brand-700 group-hover:bg-brand-100",
                  )}
                >
                  <Plus className="size-[1.15rem]" strokeWidth={2.4} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 text-[0.98rem] leading-relaxed text-graphite-600 text-pretty md:px-8 md:pr-20">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
