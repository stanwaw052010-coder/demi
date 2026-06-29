'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const [heroImgError, setHeroImgError] = useState(false);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      {/* Hero background photo — place /public/images/salon/hero.jpg for full-bleed image */}
      {!heroImgError && (
        <div className="absolute inset-0">
          <Image
            src="/images/salon/hero.jpg"
            alt="In.Style Salon"
            fill
            priority
            className="object-cover object-center"
            onError={() => setHeroImgError(true)}
            sizes="100vw"
          />
        </div>
      )}

      {/* Dark overlay — stronger when photo is absent */}
      <div
        className={`absolute inset-0 ${
          heroImgError
            ? 'bg-gradient-to-br from-[#0D0D0D] via-[#110E0A] to-[#0D0D0D]'
            : 'bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/70 to-[#0D0D0D]/40'
        }`}
      />

      {/* Gold glow accent */}
      {heroImgError && (
        <>
          <div className="absolute right-0 top-0 w-[65%] h-full bg-gradient-to-bl from-[#C9A96E]/12 via-[#D4A5A5]/6 to-transparent pointer-events-none" />
          <div className="absolute right-[15%] top-[20%] w-[30%] h-[40%] rounded-full bg-[#C9A96E]/8 blur-3xl pointer-events-none" />
        </>
      )}

      {/* Decorative rings (when no photo) */}
      {heroImgError && [320, 420, 520].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.12 - i * 0.03, scale: 1 }}
          transition={{ duration: 2 + i * 0.5, delay: 0.5 + i * 0.3 }}
          className="absolute rounded-full border border-[#C9A96E] pointer-events-none"
          style={{
            width: size,
            height: size,
            right: '8%',
            top: '12%',
            marginRight: -(size / 2 - 160),
            marginTop: -(size / 2 - 120),
          }}
        />
      ))}

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0], y: [0, -16 - i * 4, 0] }}
          transition={{ duration: 4 + i * 0.7, delay: i * 0.9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-1 h-1 bg-[#C9A96E] rounded-full pointer-events-none"
          style={{ left: `${10 + i * 13}%`, top: `${45 + (i % 3) * 12}%` }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">
              Коростень · Україна
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[1.05] tracking-tight mb-8"
          >
            Краса, яка{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-gold italic">підкреслює</span>
            <br />
            вашу{' '}
            <span className="text-white/80">індивідуальність</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white/60 text-lg sm:text-xl mb-12 max-w-lg leading-relaxed font-light"
          >
            Ваш преміальний простір для трансформації у Коростені.
            Досвідчені майстри, індивідуальний підхід, незабутній результат.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(201,169,110,0.35)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#booking')}
              className="px-9 py-4 bg-[#C9A96E] text-white text-sm tracking-widest rounded-full hover:bg-[#A88542] transition-all duration-300 shadow-lg shadow-[#C9A96E]/20"
            >
              Записатися зараз
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#gallery')}
              className="px-9 py-4 border border-white/25 text-white/80 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
            >
              Переглянути роботи
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-wrap gap-10"
          >
            {[
              { value: '5+', label: 'років досвіду' },
              { value: '1000+', label: 'задоволених клієнтів' },
              { value: '8+', label: 'майстрів' },
            ].map((stat) => (
              <div key={stat.value}>
                <span className="font-display text-4xl text-[#C9A96E] font-semibold leading-none block">
                  {stat.value}
                </span>
                <span className="text-white/35 text-xs tracking-[0.25em] uppercase mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.8 },
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A96E]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
