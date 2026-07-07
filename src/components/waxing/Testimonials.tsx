"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

const reviews = [
  {
    name: "Аліна",
    zone: "Бікіні + пахви",
    text: "Дуже акуратно і швидко, набагато менш боляче, ніж я очікувала. Майстер весь час пояснює, що робить — почуваєшся спокійно.",
  },
  {
    name: "Марина",
    zone: "Ноги повністю",
    text: "Ходжу вже пів року, волосся стає все рідшим. У кабінеті чисто і затишно, завжди вчасно приймає.",
  },
  {
    name: "Тетяна",
    zone: "Руки",
    text: "Шкіра після процедури гладенька без жодного подразнення. Рекомендую всім подругам.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
            Відгуки
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Що кажуть клієнтки
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              className="relative bg-rose-50/60 border border-rose-100 rounded-3xl p-7"
            >
              <Quote className="w-8 h-8 text-pink-300 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{r.name}</div>
                  <div className="text-xs text-gray-400">{r.zone}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
