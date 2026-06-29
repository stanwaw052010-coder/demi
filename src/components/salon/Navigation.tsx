'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#services', label: 'Послуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#about', label: 'Про нас' },
  { href: '#contacts', label: 'Контакти' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#0D0D0D]/92 backdrop-blur-xl border-b border-[#C9A96E]/15'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col leading-none focus:outline-none"
            aria-label="На головну"
          >
            <span className="font-display text-[1.6rem] tracking-widest text-gradient-gold">
              In.Style
            </span>
            <span className="text-[9px] text-white/45 tracking-[0.35em] uppercase -mt-0.5">
              Salon Krasy
            </span>
          </button>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/60 hover:text-[#C9A96E] text-sm tracking-widest transition-colors duration-300 focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#booking')}
              className="hidden md:block px-6 py-2.5 bg-[#C9A96E] text-white text-sm tracking-widest rounded-full hover:bg-[#A88542] transition-colors duration-300 focus:outline-none"
            >
              Записатися
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] p-1.5 focus:outline-none"
              aria-label="Меню"
            >
              <motion.span
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-[1.5px] bg-white block origin-center"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-[1.5px] bg-white block"
              />
              <motion.span
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-[1.5px] bg-white block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col items-center justify-center gap-10"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-display text-5xl text-white hover:text-[#C9A96E] transition-colors duration-300 focus:outline-none"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo('#booking')}
              className="mt-4 px-12 py-4 bg-[#C9A96E] text-white text-lg tracking-widest rounded-full focus:outline-none"
            >
              Записатися
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 text-white/30 text-sm tracking-widest flex flex-col items-center gap-1"
            >
              <span>@in.style_salonkrasy</span>
              <span className="text-xs">(98) 950 63 32 — Тетяна</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
