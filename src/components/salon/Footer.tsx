'use client';

import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';

const links = [
  { href: '#services', label: 'Послуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#about', label: 'Про нас' },
  { href: '#booking', label: 'Запис' },
  { href: '#contacts', label: 'Контакти' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0D0D] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/8">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-display text-3xl tracking-widest text-gradient-gold block">
                In.Style
              </span>
              <span className="text-[9px] text-white/35 tracking-[0.4em] uppercase">
                Salon Krasy
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Ваш преміальний простір для краси та трансформації у Коростені.
              Де кожна клієнтка відчуває себе особливою.
            </p>
            <a
              href="https://www.instagram.com/in.style_salonkrasy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-white/40 hover:text-[#C9A96E] transition-colors text-sm group"
            >
              <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#C9A96E]/40 transition-colors">
                <InstagramIcon size={14} />
              </div>
              @in.style_salonkrasy
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">Навігація</p>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/50 hover:text-[#C9A96E] text-sm transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">Контакти</p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+380989506332"
                className="flex items-center gap-3 text-white/50 hover:text-[#C9A96E] transition-colors text-sm group"
              >
                <Phone size={14} className="text-[#C9A96E]/60 group-hover:text-[#C9A96E]" />
                (98) 950 63 32 — Тетяна
              </a>
              <a
                href="tel:+380979861437"
                className="flex items-center gap-3 text-white/50 hover:text-[#C9A96E] transition-colors text-sm group"
              >
                <Phone size={14} className="text-[#C9A96E]/60 group-hover:text-[#C9A96E]" />
                (97) 986 14 37
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={14} className="text-[#C9A96E]/60 mt-0.5 flex-shrink-0" />
                <span>вул. Михайла Грушевського, 33<br />Коростень, Житомирська обл.</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#booking')}
              className="mt-6 px-6 py-3 bg-[#C9A96E] text-white text-sm tracking-widest rounded-full hover:bg-[#A88542] transition-colors w-full"
            >
              Записатися
            </motion.button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} In.Style Salon Krasy. Всі права захищено.
          </p>
          <p className="text-white/15 text-xs">
            Коростень, Україна
          </p>
        </div>
      </div>
    </footer>
  );
}
