"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/beauty";
import { fadeUp, staggerContainer } from "@/lib/utils";

export default function BeautyTestimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 border-t border-[#c9a962]/10 bg-[#0d0c0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-4">Відгуки</p>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-[#f4efe4]">
            Що кажуть наші клієнтки
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="rounded-2xl border border-[#c9a962]/15 bg-[#141210] p-7"
            >
              <Quote className="w-6 h-6 text-[#c9a962]/50 mb-4" />
              <p className="text-sm text-[#cfc7b8] leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#f4efe4]">{t.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#c9a962] fill-[#c9a962]" />
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
