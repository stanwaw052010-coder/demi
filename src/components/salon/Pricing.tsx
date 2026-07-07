"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { site } from "@/lib/site";

const groups = [
  {
    title: "Манікюр",
    items: [
      { name: "Класичний манікюр (без покриття)", price: "250 ₴" },
      { name: "Апаратний манікюр + гель-лак", price: "500 ₴" },
      { name: "Комбінований манікюр + гель-лак", price: "450 ₴" },
      { name: "Зняття покриття", price: "150 ₴" },
    ],
  },
  {
    title: "Педикюр",
    items: [
      { name: "Класичний педикюр", price: "400 ₴" },
      { name: "Апаратний педикюр + гель-лак", price: "700 ₴" },
      { name: "Експрес-педикюр", price: "350 ₴" },
    ],
  },
  {
    title: "Нарощування та дизайн",
    items: [
      { name: "Нарощування нігтів гелем", price: "від 800 ₴" },
      { name: "Корекція нарощених нігтів", price: "від 600 ₴" },
      { name: "Дизайн (1 нігтик)", price: "від 20 ₴" },
      { name: "Френч / омбре", price: "від 100 ₴" },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
            Ціни
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3">
            Прайс-лист
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink/60 mt-4 text-lg">
            Орієнтовна вартість. Точна ціна залежить від стану нігтів і складності дизайну та уточнюється майстром.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {groups.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="rounded-3xl border border-rose/12 bg-cream/40 p-7"
            >
              <h3 className="font-serif text-xl font-bold text-ink mb-5">{g.title}</h3>
              <ul className="space-y-4">
                {g.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-ink/70 leading-snug">{item.name}</span>
                    <span className="text-sm font-bold text-rose-dark whitespace-nowrap">{item.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mt-10">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-7 py-4 bg-rose hover:bg-rose-dark text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-rose/30"
          >
            Записатися на процедуру
          </a>
        </motion.div>
      </div>
    </section>
  );
}
