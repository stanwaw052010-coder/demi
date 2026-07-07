"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";

const services = [
  {
    emoji: "💗",
    title: "Пахви",
    duration: "~15 хв",
    price: "від 250 ₴",
    desc: "Швидка та акуратна депіляція з мінімальним подразненням шкіри.",
  },
  {
    emoji: "🌸",
    title: "Руки",
    duration: "~25 хв",
    price: "від 350 ₴",
    desc: "Повна довжина або окремі зони — кисті, передпліччя, повністю рука.",
  },
  {
    emoji: "🦵",
    title: "Ноги",
    duration: "~40 хв",
    price: "від 500 ₴",
    desc: "Гладкі ніжки без вросків — до коліна, від коліна або повністю.",
  },
  {
    emoji: "✨",
    title: "Бікіні (глибоке)",
    duration: "~30 хв",
    price: "від 450 ₴",
    desc: "Делікатна процедура з дотриманням усіх норм гігієни та комфорту.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
            Послуги
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Що я роблю
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-500">
            Ціни орієнтовні — точну вартість озвучу після уточнення зони та стану волосся.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="group relative bg-rose-50/60 border border-rose-100 rounded-3xl p-7 hover:bg-white hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl mb-5 shadow-md shadow-pink-500/20">
                {s.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1.5">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                <span className="text-xs text-gray-400">{s.duration}</span>
                <span className="text-base font-bold text-pink-600">{s.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
