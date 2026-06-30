"use client";

import { motion } from "framer-motion";
import VioletFlower from "./VioletFlower";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function FialkaHero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 70% 40%, #EDE9FE 0%, #F5F3FF 40%, #FAFAFA 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #DDD6FE 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #C4B5FD 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                           bg-violet-100 text-violet-600 tracking-widest uppercase mb-4"
              >
                Житомир · вул. Покровська, 57б
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold
                         text-violet-950 leading-[1.05] tracking-tight"
            >
              Fialka
              <br />
              <span className="text-violet-600">Beauty Bar</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-xl sm:text-2xl text-violet-700 font-medium leading-relaxed"
            >
              студія краси з фіолетовим настроєм
            </motion.p>

            <motion.p
              {...fadeUp(0.4)}
              className="text-base text-gray-500 max-w-md leading-relaxed"
            >
              краса · стерильність · професійний догляд
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <motion.a
                href="tel:+380976757227"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(109,40,217,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                           bg-violet-600 text-white font-semibold text-base
                           shadow-lg shadow-violet-200 transition-all duration-200"
              >
                Записатися
              </motion.a>

              <motion.a
                href="https://www.instagram.com/fialka_beauty_bar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 32px rgba(109,40,217,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full
                           border-2 border-violet-300 text-violet-700 font-semibold text-base
                           hover:border-violet-500 hover:bg-violet-50 transition-all duration-200"
              >
                <InstagramIcon />
                Переглянути роботи
              </motion.a>
            </motion.div>

            {/* Trust chips */}
            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-2 pt-2">
              {["5.0 ⭐ Google", "Стерильність", "Майстри з досвідом", "Затишна атмосфера"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full bg-white/70 border border-violet-100
                               text-xs text-violet-700 font-medium shadow-sm backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Flower column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center items-center"
          >
            <VioletFlower size={320} />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-violet-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-violet-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
