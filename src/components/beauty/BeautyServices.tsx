"use client";

import { motion } from "framer-motion";
import { Droplet, Gem, Hand, Leaf, Scissors, Sparkles, type LucideIcon } from "lucide-react";
import { services } from "@/lib/beauty";
import { fadeUp, staggerContainer } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  hand: Hand,
  sparkles: Sparkles,
  gem: Gem,
  droplet: Droplet,
  scissors: Scissors,
  leaf: Leaf,
};

export default function BeautyServices() {
  return (
    <section id="services" className="py-24 sm:py-32 border-t border-[#c9a962]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-4">Наші послуги</p>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-[#f4efe4]">
            Повний спектр нейл-догляду
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <motion.div
                key={s.name}
                variants={fadeUp}
                className="group rounded-2xl border border-[#c9a962]/15 bg-[#141210] p-7 hover:border-[#c9a962]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-[#c9a962]/40 flex items-center justify-center mb-5 group-hover:bg-[#c9a962] transition-colors">
                  <Icon className="w-5 h-5 text-[#c9a962] group-hover:text-[#0a0908] transition-colors" />
                </div>
                <h3 className="font-[var(--font-playfair)] text-lg text-[#f4efe4] mb-2">{s.name}</h3>
                <p className="text-sm text-[#a89f90] leading-relaxed mb-5">{s.description}</p>
                <div className="flex items-center justify-between text-sm border-t border-[#c9a962]/10 pt-4">
                  <span className="text-[#c9a962] font-semibold">{s.price}</span>
                  <span className="text-[#8a8172]">{s.duration}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
