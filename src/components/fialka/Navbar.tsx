"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function FialkaNavbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.85)"]);
  const blur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(16px)"]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <motion.div
        style={{ backgroundColor: bg, backdropFilter: blur }}
        className="max-w-6xl mx-auto flex items-center justify-between
                   rounded-2xl px-5 py-3 border border-violet-100/60
                   shadow-sm transition-shadow duration-300"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl select-none" aria-hidden="true">💜</span>
          <div className="leading-tight">
            <p className="font-serif font-bold text-violet-900 text-base tracking-tight">
              Fialka Beauty Bar
            </p>
            <p className="text-[10px] font-sans font-normal text-violet-400 tracking-[0.18em] uppercase">
              студія краси
            </p>
          </div>
        </div>

        {/* Phone + CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+380976757227"
            className="hidden sm:block text-sm font-medium text-violet-700 hover:text-violet-900 transition-colors"
          >
            +380 97 675 72 27
          </a>
          <motion.a
            href="https://www.instagram.com/fialka_beauty_bar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-full bg-violet-600 text-white text-sm font-semibold
                       shadow-md shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300
                       transition-all duration-200"
          >
            Записатися
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
