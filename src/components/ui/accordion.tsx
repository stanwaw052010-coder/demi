"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-ink/[0.08] border-y border-ink/[0.08]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 md:py-9"
              >
                <span
                  className={cn(
                    "font-display text-[19px] leading-snug tracking-[-0.02em] transition-colors duration-300 md:text-[24px]",
                    isOpen ? "text-ink" : "text-graphite group-hover:text-ink",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:size-11",
                    isOpen
                      ? "rotate-[135deg] border-ink bg-ink text-white ring-1 ring-sand/60 ring-offset-2 ring-offset-mist"
                      : "border-sand/60 text-clay group-hover:border-clay group-hover:bg-cream",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.35 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-9 pr-12 text-[15px] leading-relaxed text-graphite md:text-[17px]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
