"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 sm:py-40">
      <div className="container-lux grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <p className="overline mb-6">FAQ · Питання</p>
          </Reveal>
          <h2 className="h-section font-display text-fg">
            <TextReveal text="Часті" />
            <br />
            <TextReveal text="питання" delay={0.08} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-muted-2">
              Не знайшли відповідь? Зателефонуйте нам — ми завжди на зв&apos;язку.
            </p>
          </Reveal>
        </div>

        <div className="divide-y divide-white/8 border-t border-white/8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="hover"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-display text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                      isOpen ? "text-gold" : "text-fg"
                    }`}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-2"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 leading-relaxed text-muted-2">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
