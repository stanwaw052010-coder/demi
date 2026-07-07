"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

const reviews = [
  {
    name: "Оксана",
    text: "Дуже акуратна робота, покриття тримається без сколів більше трьох тижнів. Атмосфера в студії затишна, завжди рада повернутись.",
  },
  {
    name: "Марина",
    text: "Ходжу вже рік і жодного разу не розчарувалась. Майстер завжди підбере дизайн під настрій і подію.",
  },
  {
    name: "Ірина",
    text: "Найкращий педикюр у Харкові! Стопи як після SPA, а манікюр — просто витвір мистецтва.",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
            Відгуки
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3">
            Що кажуть клієнтки
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {reviews.map((r) => (
            <motion.div key={r.name} variants={fadeUp} className="rounded-3xl border border-rose/12 bg-cream/40 p-7">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-ink/70 leading-relaxed mb-5">&laquo;{r.text}&raquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose/15 flex items-center justify-center text-rose-dark font-serif font-bold text-sm">
                  {r.name[0]}
                </div>
                <span className="text-sm font-semibold text-ink">{r.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
