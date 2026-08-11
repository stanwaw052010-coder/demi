"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/**
 * Акордеон FAQ.
 * Розкриття зроблене переходом grid-template-rows 0fr → 1fr:
 * плавно, з реальною висотою контенту й без JS-анімації.
 */
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
          <div
            key={item.q}
            data-reveal="up"
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

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-7 text-[0.98rem] leading-relaxed text-graphite-600 text-pretty md:px-8 md:pr-20">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
