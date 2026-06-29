'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">

      {/* ── Atmospheric background ── */}
      <div className="absolute inset-0">
        {/* Base radial glow — top right warm gold */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 75% 20%, rgba(201,169,110,0.13) 0%, transparent 60%),' +
              'radial-gradient(ellipse 60% 80% at 20% 80%, rgba(212,165,165,0.07) 0%, transparent 55%),' +
              'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(44,36,24,0.4) 0%, transparent 70%)',
          }}
        />
        {/* Subtle noise overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* ── Decorative rings ── */}
      {[280, 380, 490, 610].map((size, i) => (
        <motion.div
          key={size}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.06, 0.03, 0.08][i] ?? 0.04, scale: 1 }}
          transition={{ duration: 2.5 + i * 0.6, delay: 0.4 + i * 0.35, ease: 'easeOut' }}
          className="absolute rounded-full border border-[#C9A96E] pointer-events-none"
          style={{
            width: size,
            height: size,
            top: '50%',
            right: '-8%',
            transform: `translate(0, -50%)`,
          }}
        />
      ))}

      {/* ── Vertical accent line ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.25 }}
        transition={{ duration: 1.6, delay: 0.8 }}
        className="absolute left-10 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #C9A96E 40%, #C9A96E 60%, transparent)' }}
      />

      {/* ── Floating gold particles ── */}
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: i % 3 === 0 ? 3 : 1.5,
            height: i % 3 === 0 ? 3 : 1.5,
            background: '#C9A96E',
            left: `${8 + i * 9.5}%`,
            top: `${30 + (i % 4) * 14}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -(12 + i * 5), 0] }}
          transition={{ duration: 3.5 + i * 0.8, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Large decorative serif letter ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.025, x: 0 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-[32vw] text-white leading-none select-none pointer-events-none hidden lg:block"
        style={{ fontStyle: 'italic', letterSpacing: '-0.05em' }}
      >
        S
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.5em] uppercase">
              Коростень · Україна
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display leading-[1.04] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 6.5rem)' }}
          >
            <span className="text-white">Краса, яка </span>
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(120deg, #C9A96E 0%, #F5E0A0 40%, #E8C070 70%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}
            >
              підкреслює
            </span>
            <br />
            <span className="text-white/75">вашу індивідуальність</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="text-white/50 text-lg sm:text-xl mb-12 max-w-md leading-relaxed font-light"
          >
            Ваш преміальний простір для трансформації у Коростені.
            Досвідчені майстри, індивідуальний підхід, незабутній результат.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 22px 55px rgba(201,169,110,0.38)' }}
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
              className="px-9 py-4 border border-white/22 text-white/75 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/55 hover:text-[#C9A96E] transition-all duration-300"
            >
              Переглянути роботи
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="flex flex-wrap gap-10"
          >
            {[
              { value: '5+', label: 'років досвіду' },
              { value: '1000+', label: 'клієнтів' },
              { value: '8+', label: 'майстрів' },
            ].map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.12 }}
              >
                <span
                  className="font-display block leading-none"
                  style={{
                    fontSize: 'clamp(2rem,5vw,3rem)',
                    background: 'linear-gradient(135deg, #C9A96E, #F0D896)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </span>
                <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-2 block">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase block text-center mb-1.5">Scroll</span>
          <div className="w-px h-9 mx-auto" style={{ background: 'linear-gradient(to bottom, #C9A96E55, transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
