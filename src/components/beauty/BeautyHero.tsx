"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { salon } from "@/lib/beauty";
import { fadeUp, staggerContainer } from "@/lib/utils";

export default function BeautyHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-28 sm:pt-24 sm:pb-36">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#5a0f18]/30 blur-[100px]" />
        <div className="absolute top-1/3 -left-32 w-[24rem] h-[24rem] rounded-full bg-[#c9a962]/15 blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#1a1a1a] blur-[90px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-6"
        >
          Салон краси · {salon.city}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-[var(--font-playfair)] text-4xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#f4efe4] mb-6"
        >
          Доглянуті руки —
          <br />
          <span className="text-[#c9a962]">бездоганний вигляд</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-[#b9b0a1] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Манікюр, педикюр та нейл-дизайн у затишній атмосфері Makhovska Beauty House.
          Стерильні інструменти, преміальні матеріали та увага до кожної деталі.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={salon.phoneHref}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c9a962] text-[#0a0908] font-semibold hover:bg-[#d9b872] transition-colors w-full sm:w-auto justify-center"
          >
            <Phone className="w-4 h-4" />
            Записатися: {salon.phone}
          </a>
          <a
            href={salon.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#c9a962]/40 text-[#ece6da] hover:border-[#c9a962] hover:text-[#c9a962] transition-colors w-full sm:w-auto justify-center"
          >
            <InstagramIcon className="w-4 h-4" />
            @{salon.instagramHandle}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-[#c9a962]/15 pt-8"
        >
          <div>
            <div className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-[#c9a962]">5+</div>
            <div className="text-xs text-[#8a8172] mt-1 tracking-wide">років досвіду</div>
          </div>
          <div>
            <div className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-[#c9a962]">1000+</div>
            <div className="text-xs text-[#8a8172] mt-1 tracking-wide">задоволених клієнтів</div>
          </div>
          <div>
            <div className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-[#c9a962]">200+</div>
            <div className="text-xs text-[#8a8172] mt-1 tracking-wide">відтінків гель-лаку</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
