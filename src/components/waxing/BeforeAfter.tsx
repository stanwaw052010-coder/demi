"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";

const zones = ["Пахви", "Руки", "Ноги", "Бікіні"];

function CompareCard({ zone }: { zone: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-rose-100">
      {/* "До" — textured half */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          background:
            "repeating-linear-gradient(115deg, #e7cbb8 0px, #e7cbb8 2px, #d9b79f 3px, #d9b79f 4px)",
        }}
      />
      {/* "Після" — smooth half */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
          background: "linear-gradient(135deg, #fbe4e0, #f6cfd6)",
        }}
      />
      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
        до
      </span>
      <span className="absolute bottom-3 right-3 text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-white/80 backdrop-blur px-2.5 py-1 rounded-full">
        після
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent pt-8 pb-3 px-4">
        <span className="text-white font-semibold text-sm">{zone}</span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="relative py-24 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
            Результати
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            До / Після
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-500">
            Приклад-схема результату по кожній зоні. Реальні фото робіт — в
            Instagram-хайлайтах студії.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {zones.map((z) => (
            <motion.div key={z} variants={fadeUp}>
              <CompareCard zone={z} />
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-8">
          * Ілюстративна схема для макету сайту, не фотографії клієнтів.
        </p>
      </div>
    </section>
  );
}
