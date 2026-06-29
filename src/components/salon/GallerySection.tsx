'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { InstagramIcon } from './Icons';

// Real salon photos — place files in /public/images/salon/
// Names: brows.jpg, interior.jpg, black-hair.jpg, wavy-hair.jpg, ponytail.jpg
const galleryItems = [
  {
    src: '/images/salon/brows.jpg',
    label: 'Ламінування брів',
    category: 'Брови',
    fallback: 'from-[#B5C5D8]/40 via-[#9EB0C5]/25 to-[#8A9EB5]/15',
    tall: true,
  },
  {
    src: '/images/salon/interior.jpg',
    label: 'Наш салон',
    category: "Інтер'єр",
    fallback: 'from-[#3D3D45]/70 via-[#4A4460]/50 to-[#5C5070]/30',
    tall: false,
  },
  {
    src: '/images/salon/black-hair.jpg',
    label: 'Стрижка + укладка',
    category: 'Волосся',
    fallback: 'from-[#1A1A1A]/80 via-[#2D2D2D]/60 to-[#3D3020]/30',
    tall: false,
  },
  {
    src: '/images/salon/wavy-hair.jpg',
    label: 'Локони та укладка',
    category: 'Волосся',
    fallback: 'from-[#C9A96E]/30 via-[#B8956A]/20 to-[#8B6B45]/15',
    tall: true,
  },
  {
    src: '/images/salon/ponytail.jpg',
    label: 'Вечірня зачіска',
    category: 'Волосся',
    fallback: 'from-[#1C1A2E]/70 via-[#2A2840]/50 to-[#3A3050]/30',
    tall: false,
  },
  {
    src: '/images/salon/manicure.jpg',
    label: 'Гель-лак / nail-art',
    category: 'Манікюр',
    fallback: 'from-[#D4A5A5]/40 via-[#E0B8B8]/25 to-[#F0D0D0]/12',
    tall: false,
  },
];

const categories = ['Всі', 'Волосся', 'Брови', 'Манікюр', "Інтер'єр"];

function GalleryCard({
  item,
  onClick,
}: {
  item: typeof galleryItems[0];
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl overflow-hidden ${
        item.tall ? 'aspect-[3/4]' : 'aspect-square'
      } break-inside-avoid mb-4`}
    >
      {!imgError ? (
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${item.fallback}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>
      )}

      {/* Always-on subtle bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Hover overlay center */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div className="w-12 h-12 rounded-full border-2 border-white/70 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <span className="text-white text-xl leading-none">+</span>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent">
        <p className="text-white text-sm font-medium">{item.label}</p>
        <p className="text-[#C9A96E] text-xs mt-0.5">{item.category}</p>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);
  const [lightboxImgError, setLightboxImgError] = useState(false);

  const filtered =
    activeCategory === 'Всі'
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <section id="gallery" className="py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
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

        {/* Filter */}
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

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 gap-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <GalleryCard item={item} onClick={() => { setLightboxImgError(false); setLightbox(item); }} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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
            className="fixed inset-0 z-50 bg-[#0D0D0D]/95 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl overflow-hidden w-full max-w-sm aspect-[4/5]"
            >
              {!lightboxImgError ? (
                <Image
                  src={lightbox.src}
                  alt={lightbox.label}
                  fill
                  className="object-cover"
                  onError={() => setLightboxImgError(true)}
                  sizes="400px"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${lightbox.fallback}`} />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0D0D0D]/90 to-transparent">
                <p className="text-white text-lg font-display">{lightbox.label}</p>
                <p className="text-[#C9A96E] text-sm">{lightbox.category}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D0D0D]/60 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-sm"
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
