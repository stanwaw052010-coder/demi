'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { InstagramIcon } from './Icons';

// Each card has a layered CSS gradient that creates a rich, photo-like feel
const galleryItems = [
  {
    id: 1,
    label: 'Ламінування брів',
    category: 'Брови',
    tall: true,
    style: {
      background: 'linear-gradient(160deg, #2C2018 0%, #3D2E1A 30%, #1A140D 65%, #0D0A06 100%)',
      overlay: 'radial-gradient(ellipse 70% 55% at 55% 40%, rgba(180,145,95,0.35) 0%, transparent 65%)',
      accent: '#B4915F',
    },
    detail: 'Ідеальна форма та колір',
  },
  {
    id: 2,
    label: 'Стрижка та укладка',
    category: 'Волосся',
    tall: false,
    style: {
      background: 'linear-gradient(145deg, #0D0D0D 0%, #1A1515 40%, #120F0A 100%)',
      overlay: 'radial-gradient(ellipse 80% 60% at 40% 60%, rgba(201,169,110,0.18) 0%, transparent 70%)',
      accent: '#C9A96E',
    },
    detail: 'Від стрижки до укладки',
  },
  {
    id: 3,
    label: 'Гель-лак nail-art',
    category: 'Манікюр',
    tall: false,
    style: {
      background: 'linear-gradient(135deg, #1C0F14 0%, #2D1520 45%, #1A0D12 100%)',
      overlay: 'radial-gradient(ellipse 65% 65% at 60% 45%, rgba(212,165,165,0.3) 0%, transparent 60%)',
      accent: '#D4A5A5',
    },
    detail: 'Акуратно та стильно',
  },
  {
    id: 4,
    label: 'Вечірня зачіска',
    category: 'Волосся',
    tall: true,
    style: {
      background: 'linear-gradient(155deg, #12101A 0%, #1E1828 50%, #0D0B14 100%)',
      overlay:
        'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(180,160,220,0.22) 0%, transparent 60%),' +
        'radial-gradient(ellipse 50% 70% at 30% 70%, rgba(201,169,110,0.15) 0%, transparent 55%)',
      accent: '#B4A0DC',
    },
    detail: 'Елегантність у кожній деталі',
  },
  {
    id: 5,
    label: 'Фарбування волосся',
    category: 'Волосся',
    tall: false,
    style: {
      background: 'linear-gradient(140deg, #1A0E08 0%, #2E1A0A 40%, #140C06 100%)',
      overlay: 'radial-gradient(ellipse 75% 60% at 45% 50%, rgba(201,169,110,0.28) 0%, transparent 65%)',
      accent: '#C9A96E',
    },
    detail: 'Відтінки, які підкреслять вас',
  },
  {
    id: 6,
    label: 'Весільний образ',
    category: 'Макіяж',
    tall: false,
    style: {
      background: 'linear-gradient(150deg, #1A1510 0%, #28201A 35%, #120E0A 100%)',
      overlay:
        'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(240,216,150,0.22) 0%, transparent 60%),' +
        'radial-gradient(ellipse 40% 40% at 75% 70%, rgba(212,165,165,0.18) 0%, transparent 50%)',
      accent: '#F0D896',
    },
    detail: 'Незабутній образ на ваш день',
  },
  {
    id: 7,
    label: 'Класичний манікюр',
    category: 'Манікюр',
    tall: true,
    style: {
      background: 'linear-gradient(145deg, #180A12 0%, #2A1020 45%, #100810 100%)',
      overlay: 'radial-gradient(ellipse 70% 55% at 55% 45%, rgba(220,140,160,0.28) 0%, transparent 65%)',
      accent: '#DC8CA0',
    },
    detail: 'Доглянуті нігті щодня',
  },
  {
    id: 8,
    label: 'Корекція брів',
    category: 'Брови',
    tall: false,
    style: {
      background: 'linear-gradient(160deg, #0E1018 0%, #161A28 45%, #0A0D16 100%)',
      overlay: 'radial-gradient(ellipse 65% 60% at 45% 45%, rgba(160,180,220,0.25) 0%, transparent 60%)',
      accent: '#A0B4DC',
    },
    detail: 'Чіткі лінії та форма',
  },
  {
    id: 9,
    label: 'Денний макіяж',
    category: 'Макіяж',
    tall: false,
    style: {
      background: 'linear-gradient(140deg, #18140C 0%, #2A2014 45%, #140F0A 100%)',
      overlay: 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(230,195,140,0.22) 0%, transparent 65%)',
      accent: '#E6C38C',
    },
    detail: 'Природна краса щодня',
  },
];

const categories = ['Всі', 'Волосся', 'Манікюр', 'Брови', 'Макіяж'];

// Dot pattern SVG used as texture overlay
const DOT_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E\")";

type GalleryItem = typeof galleryItems[0];

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group cursor-pointer rounded-xl overflow-hidden break-inside-avoid mb-4 ${
        item.tall ? 'aspect-[3/4]' : 'aspect-square'
      }`}
      style={{ background: item.style.background }}
    >
      {/* Gradient overlay layer */}
      <div className="absolute inset-0" style={{ background: item.style.overlay }} />

      {/* Dot texture */}
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: DOT_PATTERN }} />

      {/* Decorative circle element */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 0.55 : 0.3 }}
        transition={{ duration: 0.5 }}
        className="absolute rounded-full border pointer-events-none"
        style={{
          borderColor: item.style.accent,
          width: item.tall ? 160 : 120,
          height: item.tall ? 160 : 120,
          top: item.tall ? '18%' : '15%',
          right: '12%',
        }}
      />
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1, opacity: hovered ? 0.3 : 0.15 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="absolute rounded-full border pointer-events-none"
        style={{
          borderColor: item.style.accent,
          width: item.tall ? 220 : 160,
          height: item.tall ? 220 : 160,
          top: item.tall ? '12%' : '9%',
          right: '6%',
        }}
      />

      {/* Center icon / monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.9 : 1 }}
          transition={{ duration: 0.35 }}
          className="font-display italic select-none"
          style={{
            fontSize: item.tall ? '6rem' : '4.5rem',
            color: item.style.accent,
            opacity: 0.2,
            lineHeight: 1,
          }}
        >
          {item.label[0]}
        </motion.div>
      </div>

      {/* Hover: "view" icon */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm"
          style={{ borderColor: `${item.style.accent}90`, background: `${item.style.accent}18` }}
        >
          <span className="text-white text-xl leading-none">+</span>
        </div>
      </motion.div>

      {/* Bottom label — always visible, rises on hover */}
      <motion.div
        animate={{ y: hovered ? 0 : 4 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
      >
        <p className="text-white text-sm font-medium">{item.label}</p>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
          className="text-xs mt-0.5"
          style={{ color: item.style.accent }}
        >
          {item.category}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [active, setActive] = useState('Всі');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    active === 'Всі' ? galleryItems : galleryItems.filter((i) => i.category === active);

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
            Кожна робота — це мистецтво. Більше фото в нашому Instagram
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                active === cat
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
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="columns-2 md:columns-3 gap-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <GalleryCard item={item} onClick={() => setLightbox(item)} />
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
          <p className="text-white/35 text-sm mb-5">Більше фото наших робіт в Instagram</p>
          <a
            href="https://www.instagram.com/in.style_salonkrasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 border border-white/18 text-white/60 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/55 hover:text-[#C9A96E] transition-all duration-300 group"
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
            className="fixed inset-0 z-50 bg-[#050505]/96 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 230, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl overflow-hidden w-full max-w-sm aspect-[4/5]"
              style={{ background: lightbox.style.background }}
            >
              <div className="absolute inset-0" style={{ background: lightbox.style.overlay }} />
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: DOT_PATTERN }} />

              {/* Big decorative circles */}
              {[180, 260].map((s, i) => (
                <div
                  key={s}
                  className="absolute rounded-full border pointer-events-none"
                  style={{
                    borderColor: `${lightbox.style.accent}50`,
                    width: s, height: s,
                    top: `${10 + i * 6}%`, right: `${5 + i * 4}%`,
                    transform: 'translate(30%, -20%)',
                  }}
                />
              ))}

              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <div
                  className="font-display italic mb-4 select-none"
                  style={{ fontSize: '5rem', color: lightbox.style.accent, opacity: 0.25, lineHeight: 1 }}
                >
                  {lightbox.label[0]}
                </div>
                <div className="text-white/25 text-xs tracking-widest uppercase">{lightbox.detail}</div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                <p className="text-white font-display text-xl">{lightbox.label}</p>
                <p className="text-xs mt-1" style={{ color: lightbox.style.accent }}>{lightbox.category}</p>
                <a
                  href="https://www.instagram.com/in.style_salonkrasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-white/50 text-xs hover:text-white transition-colors"
                >
                  <InstagramIcon size={12} />
                  Більше фото в Instagram
                </a>
              </div>

              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-sm"
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
