"use client";

import { motion } from "framer-motion";
import { Award, Users, Sparkles, ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/utils";

const stats = [
  { icon: Award, value: "5+", label: "років досвіду" },
  { icon: Users, value: "1000+", label: "задоволених клієнтів" },
  { icon: Sparkles, value: "500+", label: "унікальних дизайнів" },
  { icon: ShieldCheck, value: "100%", label: "стерильність інструментів" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="aspect-square max-w-md mx-auto rounded-[2.5rem] bg-gradient-to-br from-rose-light via-white to-gold-light border border-rose/15 shadow-xl shadow-rose/10 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-white/70 backdrop-blur flex items-center justify-center">
              <span className="font-serif text-4xl font-bold text-rose-dark">AK</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
            Про майстра
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3 mb-6">
            Майстерність у кожній деталі
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink/60 text-lg leading-relaxed mb-4">
            Займаюсь манікюром та педикюром вже понад 5 років, постійно навчаюсь новим технікам та слідкую за
            актуальними трендами нейл-індустрії.
          </motion.p>
          <motion.p variants={fadeUp} className="text-ink/60 text-lg leading-relaxed mb-8">
            Головні принципи роботи — акуратність, стерильність та індивідуальний підхід до кожного клієнта.
          </motion.p>

          <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-rose-dark" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-ink leading-none">{value}</div>
                  <div className="text-xs text-ink/50 mt-1">{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
