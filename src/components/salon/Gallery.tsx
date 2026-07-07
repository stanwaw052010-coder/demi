"use client";

import { motion } from "framer-motion";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { site } from "@/lib/site";

const works = [
  { label: "Френч", gradient: "from-rose-light to-white" },
  { label: "Омбре", gradient: "from-gold-light to-rose-light" },
  { label: "Мінімалізм", gradient: "from-white to-rose-light" },
  { label: "Квітковий дизайн", gradient: "from-rose-light to-gold-light" },
  { label: "Втирка", gradient: "from-gold-light to-white" },
  { label: "Педикюр", gradient: "from-white to-gold-light" },
  { label: "Літній принт", gradient: "from-rose-light via-white to-gold-light" },
  { label: "Класика", gradient: "from-gold-light via-rose-light to-white" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
              Портфоліо
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3">
              Наші роботи
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href={site.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-rose-dark font-semibold hover:text-rose-dark/80 transition-colors shrink-0"
          >
            <InstagramIcon className="w-4 h-4" />
            Більше робіт в Instagram →
          </motion.a>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {works.map((w) => (
            <motion.div
              key={w.label}
              variants={fadeUp}
              className={`group relative aspect-square rounded-3xl bg-gradient-to-br ${w.gradient} border border-rose/12 overflow-hidden flex items-end p-4`}
            >
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
              <span className="relative text-sm font-semibold text-ink/70 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full">
                {w.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
