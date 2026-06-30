"use client";

import { motion } from "framer-motion";

function InstagramIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function FialkaInstagram() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #3B0764 0%, #5B21B6 40%, #7C3AED 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #F5F3FF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C4B5FD 0%, transparent 40%)",
        }}
      />

      {/* Floating flower shapes */}
      {[
        { top: "10%", left: "5%", size: 60, delay: 0 },
        { top: "70%", right: "8%", size: 45, delay: 0.8 },
        { top: "25%", right: "15%", size: 35, delay: 1.5 },
      ].map(({ top, left, right, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          style={{ top, left, right, width: size, height: size }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="text-white"
            >
              <InstagramIcon size={52} />
            </motion.div>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Більше робіт та
            <br />
            актуальні дизайни
          </h2>

          <p className="text-violet-200 text-xl mb-10 font-light">
            в нашому Instagram — нові роботи щодня
          </p>

          <motion.a
            href="https://www.instagram.com/fialka_beauty_bar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 60px rgba(196,181,253,0.6), 0 20px 60px rgba(109,40,217,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full
                       bg-white text-violet-700 font-bold text-lg
                       shadow-2xl shadow-violet-900/30
                       hover:bg-violet-50 transition-all duration-300"
          >
            <InstagramIcon size={22} />
            Перейти в Instagram
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          <p className="mt-5 text-violet-300 text-sm">
            @fialka_beauty_bar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
