"use client";

import { motion } from "framer-motion";
import VioletFlower from "./VioletFlower";

export default function FialkaFinalCTA() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 100% 100% at 50% 0%, #EDE9FE 0%, #F5F3FF 50%, #FAFAFA 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #DDD6FE, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-10 right-0 w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C4B5FD, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-7"
        >
          {/* Small flower */}
          <div className="pointer-events-none">
            <VioletFlower size={120} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-5xl sm:text-6xl font-bold text-violet-950 leading-tight">
              Запишись зараз
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Перший крок до краси — один дзвінок або повідомлення в Instagram
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="tel:+380976757227"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 48px rgba(109,40,217,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full
                         bg-violet-600 text-white font-bold text-lg
                         shadow-xl shadow-violet-200 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.06 1.08 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              +380 97 675 72 27
            </motion.a>

            <motion.a
              href="https://www.instagram.com/fialka_beauty_bar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 48px rgba(109,40,217,0.2)",
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full
                         border-2 border-violet-300 text-violet-700 font-bold text-lg
                         hover:border-violet-500 hover:bg-violet-50 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
              </svg>
              Instagram
            </motion.a>
          </div>

          <p className="text-violet-400 text-sm">
            Або пишіть у Директ — відповімо швидко 💜
          </p>
        </motion.div>
      </div>
    </section>
  );
}
