"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, HeartHandshake, MapPin } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { fadeUp, staggerContainer } from "@/lib/utils";

const trust = [
  { icon: ShieldCheck, label: "Сертифікований майстер" },
  { icon: Sparkles, label: "Стерильні інструменти" },
  { icon: HeartHandshake, label: "Індивідуальний підхід" },
  { icon: MapPin, label: "Біля м. Політехнічний інститут" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#0d0a0d] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/15 border border-pink-500/25 rounded-full text-pink-300 text-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                Приватна студія воскової депіляції · Київ
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Ідеально гладка{" "}
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                  шкіра
                </span>{" "}
                надовго
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Воскова депіляція пахв, рук, ніг та глибокого бікіні — акуратно, гігієнічно
              та з мінімальним дискомфортом. Працюю у приватному кабінеті біля метро
              «Політехнічний інститут».
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#booking"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/30 text-base"
              >
                <InstagramIcon className="w-5 h-5" />
                Записатися в Instagram
              </a>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-white/5 border border-amber-300/30 hover:border-amber-300/60 text-amber-200 font-bold rounded-2xl transition-all duration-200 text-base"
              >
                Переглянути послуги
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-pink-300" />
                  </div>
                  <span className="text-xs text-gray-400 leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-pink-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
