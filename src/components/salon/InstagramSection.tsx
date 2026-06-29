'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

const posts = [
  { bg: 'linear-gradient(145deg,#1A1208 0%,#2E1E08 50%,#100C06 100%)', glow: 'rgba(201,169,110,0.28)', likes: 203, comments: 31, letter: 'В' },
  { bg: 'linear-gradient(155deg,#0E1018 0%,#161A28 50%,#0A0D16 100%)', glow: 'rgba(160,180,220,0.22)', likes: 147, comments: 23, letter: 'Б' },
  { bg: 'linear-gradient(140deg,#0D0D0D 0%,#1A1515 50%,#120F0A 100%)', glow: 'rgba(201,169,110,0.2)', likes: 89, comments: 14, letter: 'С' },
  { bg: 'linear-gradient(150deg,#12101A 0%,#1E1828 50%,#0D0B14 100%)', glow: 'rgba(180,160,220,0.25)', likes: 312, comments: 44, letter: 'З' },
  { bg: 'linear-gradient(160deg,#180A12 0%,#2A1020 50%,#100810 100%)', glow: 'rgba(212,165,165,0.28)', likes: 76, comments: 9, letter: 'М' },
  { bg: 'linear-gradient(135deg,#1C0F14 0%,#2D1520 50%,#1A0D12 100%)', glow: 'rgba(220,140,160,0.25)', likes: 158, comments: 27, letter: 'Н' },
];

export default function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-28 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Instagram</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl text-white mb-4"
          >
            Ми в Instagram
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="https://www.instagram.com/in.style_salonkrasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E8C88A] transition-colors text-lg font-light"
          >
            <InstagramIcon size={18} />
            @in.style_salonkrasy
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/in.style_salonkrasy"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.93 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer block"
              style={{ background: post.bg }}
            >
              {/* Glow layer */}
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${post.glow}, transparent 70%)` }}
              />

              {/* Letter monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display italic select-none pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ fontSize: '5rem', color: '#C9A96E', lineHeight: 1 }}
                >
                  {post.letter}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0D0D0D]/62 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-5 text-white">
                  <div className="flex items-center gap-1.5">
                    <Heart size={14} fill="white" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={14} fill="white" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
                <InstagramIcon size={17} className="text-white/55" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/35 text-sm mb-5">
            Переглядайте всі наші роботи та записуйтесь через Instagram
          </p>
          <a
            href="https://www.instagram.com/in.style_salonkrasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/18 text-white/65 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/60 hover:text-[#C9A96E] transition-all duration-300 group"
          >
            <InstagramIcon size={16} className="transition-transform duration-300 group-hover:scale-110" />
            Підписатися на Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
