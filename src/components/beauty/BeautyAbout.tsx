"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { salon, values } from "@/lib/beauty";
import { fadeUp, slideInLeft, staggerContainer } from "@/lib/utils";

export default function BeautyAbout() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-[#c9a962]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-4">Про нас</p>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-[#f4efe4] mb-6 leading-tight">
            Makhovska Beauty House — простір краси у {salon.city}
          </h2>
          <p className="text-sm sm:text-base text-[#a89f90] leading-relaxed mb-6">
            Ми створили затишний салон, де кожна клієнтка почувається особливою. Наша команда
            майстрів слідкує за трендами нейл-індустрії, використовує лише перевірені матеріали
            та підходить до кожної роботи з увагою до дрібниць.
          </p>
          <p className="text-sm sm:text-base text-[#a89f90] leading-relaxed mb-10">
            Записатися можна за телефоном або в директ Instagram — оберемо зручний час
            та підберемо ідеальний варіант манікюру саме для вас.
          </p>

          <div className="space-y-5">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#c9a962]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#c9a962]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f4efe4]">{v.title}</div>
                  <div className="text-sm text-[#8a8172]">{v.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="aspect-square rounded-2xl border border-[#c9a962]/15 mt-8"
            style={{ background: "linear-gradient(150deg, #1a1a1a, #050505)" }}
          />
          <motion.div
            variants={fadeUp}
            className="aspect-square rounded-2xl border border-[#c9a962]/15"
            style={{ background: "linear-gradient(150deg, #5a0f18, #2a0509)" }}
          />
          <motion.div
            variants={fadeUp}
            className="aspect-square rounded-2xl border border-[#c9a962]/15"
            style={{ background: "linear-gradient(150deg, #c9a962, #8a6d31)" }}
          />
          <motion.div
            variants={fadeUp}
            className="aspect-square rounded-2xl border border-[#c9a962]/15 mt-8"
            style={{ background: "linear-gradient(150deg, #3a3428, #141210)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
