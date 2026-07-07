"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Gem, Star } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { site } from "@/lib/site";

const trust = [
  { icon: ShieldCheck, label: "Стерильні інструменти" },
  { icon: Gem, label: "Преміум гель-лаки" },
  { icon: Sparkles, label: "Авторський дизайн" },
  { icon: Star, label: "4.9★ за відгуками" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-cream">
      {/* Soft color blobs */}
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-rose/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[420px] h-[420px] bg-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232a2220' fill-opacity='1'%3E%3Ccircle cx='2' cy='2' r='1.4'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose/10 border border-rose/25 rounded-full text-rose-dark text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-dark animate-pulse" />
              Студія манікюру та педикюру · {site.city}
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight">
              Ідеальний манікюр,{" "}
              <span className="text-gradient-rose">яким хочеться</span>{" "}
              хвалитися
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-ink/60 leading-relaxed max-w-lg">
            {site.name} — приватна студія манікюру та педикюру у {site.city}. Акуратна робота, стерильні інструменти
            та авторський дизайн нігтів, який тримається тижнями.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-rose hover:bg-rose-dark text-white font-bold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-rose/30"
            >
              <InstagramIcon className="w-4 h-4" />
              Записатися в Instagram
            </a>
            <a
              href="#pricing"
              className="flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-rose/5 border border-rose/20 text-ink font-bold rounded-2xl transition-all duration-200"
            >
              Переглянути ціни
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-rose-dark" />
                </div>
                <span className="text-xs text-ink/60 leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-rose-light via-cream to-gold-light border border-rose/15 shadow-2xl shadow-rose/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-white/60 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-rose-dark" />
              </div>
            </div>
            <div className="absolute top-6 left-6 right-6 flex justify-between">
              <span className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur text-xs font-semibold text-ink/70">Гель-лак</span>
              <span className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur text-xs font-semibold text-ink/70">Дизайн</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/85 backdrop-blur rounded-2xl px-5 py-4 shadow-lg">
                <div className="text-sm font-semibold text-ink">Instagram-портфоліо</div>
                <div className="text-xs text-ink/50 mt-0.5">@{site.instagramHandle}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
