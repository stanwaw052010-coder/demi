"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Smile, Timer, Sparkles, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

const items = [
  {
    icon: GraduationCap,
    title: "Сертифікований майстер",
    desc: "Пройдено професійне навчання воскової депіляції, є сертифікати кваліфікації.",
  },
  {
    icon: ShieldCheck,
    title: "Гігієна понад усе",
    desc: "Стерильні одноразові матеріали, дезінфекція на кожному етапі процедури.",
  },
  {
    icon: Smile,
    title: "Мінімум дискомфорту",
    desc: "Якісний віск і правильна техніка знижують больові відчуття та ризик вросків.",
  },
  {
    icon: Timer,
    title: "Точно у свій час",
    desc: "Запис по хвилинах, без черг і затримок — ваш час цінний.",
  },
  {
    icon: Sparkles,
    title: "Індивідуальний підхід",
    desc: "Підбираю віск і технологію під тип шкіри та чутливість.",
  },
  {
    icon: MapPin,
    title: "Зручна локація",
    desc: "Приватний кабінет у Києві, за кілька хвилин від м. «Політехнічний інститут».",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-pink-600 mb-3">
            Чому обирають мене
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Комфорт, якість та турбота
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-pink-200 hover:bg-rose-50/40 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
