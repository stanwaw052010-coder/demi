"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn, fadeUp, staggerContainer } from "@/lib/utils";

const faqs = [
  {
    q: "Через скільки часу приходити на наступну депіляцію?",
    a: "У середньому нове волосся відростає через 3–4 тижні. З кожною процедурою воно стає тоншим і рідшим, тому інтервали між візитами поступово збільшуються.",
  },
  {
    q: "Як підготуватися до процедури?",
    a: "Довжина волосся має бути від 4–5 мм. Бажано злегка відшкірити зону за день до візиту та прийти без автозасмаги й олій на шкірі.",
  },
  {
    q: "Чи боляче це?",
    a: "Відчуття індивідуальні, але якісний віск і правильна техніка роблять процедуру максимально комфортною. Для чутливих зон підбираю щадніший підхід.",
  },
  {
    q: "Що робити після депіляції?",
    a: "Перші 24 години уникайте гарячої ванни, сауни, засмаги та тісного синтетичного одягу — шкірі потрібен час на відновлення.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 bg-rose-50/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
            Питання
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Часті запитання
          </motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-white border border-rose-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900">{f.q}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-pink-500 shrink-0 transition-transform duration-200",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
