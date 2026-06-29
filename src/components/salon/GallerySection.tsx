'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { InstagramIcon } from './Icons';

const galleryItems = [
  { label: 'Фарбування волосся', category: 'Волосся', gradient: 'from-[#C9A96E]/30 via-[#E8C88A]/20 to-[#F5E4BC]/10', span: 'row-span-2' },
  { label: 'Класичний манікюр', category: 'Манікюр', gradient: 'from-[#D4A5A5]/30 via-[#E8B8B8]/20 to-[#F5D8D8]/10', span: '' },
  { label: 'Гель-лак', category: 'Манікюр', gradient: 'from-[#D4A5A5]/40 via-[#C49090]/20 to-[#E8C0C0]/10', span: '' },
  { label: 'Укладка та стрижка', category: 'Волосся', gradient: 'from-[#B8C4D0]/30 via-[#C8D8E4]/20 to-[#DDE8F0]/10', span: 'row-span-2' },
  { label: 'Ламінування брів', category: 'Брови', gradient: 'from-[#1A1A1A]/60 via-[#2D2D2D]/40 to-[#404040]/20', span: '' },
  { label: 'Весільний образ', category: 'Макіяж', gradient: 'from-[#C9A96E]/40 via-[#D4B882]/25 to-[#E8D098]/12', span: '' },
  { label: 'Вечірня зачіска', category: 'Волосся', gradient: 'from-[#8B7355]/40 via-[#A08A6A]/25 to-[#C4A882]/12', span: 'row-span-2' },
  { label: 'Nail-art', category: 'Манікюр', gradient: 'from-[#C9A96E]/30 via-[#E0C080]/20 to-[#F5E0A0]/10', span: '' },
  { label: 'Пудровий макіяж', category: 'Макіяж', gradient: 'from-[#D4A5A5]/40 via-[#E0B8B8]/25 to-[#F0D0D0]/10', span: '' },
];

const categories = ['Всі', 'Волосся', 'Манікюр', 'Брови', 'Макіяж'];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === 'Всі'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <section id="gallery" className="py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Наші роботи</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl text-white mb-4"
          >
            Галерея робіт
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-lg max-w-md mx-auto"
          >
            Кожна робота — це мистецтво, яке підкреслює вашу унікальність
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#C9A96E] text-white'
                  : 'border border-white/15 text-white/50 hover:border-[#C9A96E]/40 hover:text-[#C9A96E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.label}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setLightbox(item)}
                className={`break-inside-avoid mb-4 group cursor-pointer ${item.span}`}
              >
                <div
                  className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${item.gradient} ${
                    item.span === 'row-span-2' ? 'aspect-[3/4]' : 'aspect-square'
                  } flex items-end`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0D0D0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">+</span>
                      </div>
                      <p className="text-sm tracking-wider">Переглянути</p>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="relative p-4 w-full bg-gradient-to-t from-[#0D0D0D]/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-[#C9A96E] text-xs mt-0.5">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm mb-5">Більше робіт в нашому Instagram</p>
          <a
            href="https://www.instagram.com/in.style_salonkrasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/20 text-white/70 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300 group"
          >
            <InstagramIcon size={16} className="transition-transform duration-300 group-hover:scale-110" />
            @in.style_salonkrasy
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-[#0D0D0D]/95 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${lightbox.gradient} w-full max-w-md aspect-[4/5]`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0D0D0D]/90 to-transparent">
                <p className="text-white text-lg font-display">{lightbox.label}</p>
                <p className="text-[#C9A96E] text-sm">{lightbox.category}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D0D0D]/60 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
