'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

const posts = [
  { gradient: 'from-[#C9A96E]/35 via-[#D4B882]/20 to-[#E8D098]/10', likes: 147, comments: 23, label: 'Фарбування' },
  { gradient: 'from-[#D4A5A5]/35 via-[#E0B8B8]/20 to-[#F0D0D0]/10', likes: 89, comments: 14, label: 'Манікюр' },
  { gradient: 'from-[#8B7355]/35 via-[#A08A6A]/20 to-[#C4A882]/10', likes: 203, comments: 31, label: 'Укладка' },
  { gradient: 'from-[#B5C5D8]/35 via-[#C8D8E4]/20 to-[#DDE8F0]/10', likes: 76, comments: 9, label: 'Брови' },
  { gradient: 'from-[#1A1A1A]/70 via-[#2D2D2D]/40 to-[#404040]/20', likes: 312, comments: 44, label: 'Весільний образ' },
  { gradient: 'from-[#C9A96E]/40 via-[#E8C88A]/25 to-[#F5E4BC]/10', likes: 158, comments: 27, label: 'Nail-art' },
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0D0D0D]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-5 text-white">
                  <div className="flex items-center gap-1.5">
                    <Heart size={16} fill="white" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={16} fill="white" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
                <InstagramIcon size={20} className="text-white/60" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white/80 text-xs">{post.label}</p>
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
          <a
            href="https://www.instagram.com/in.style_salonkrasy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-white/70 text-sm tracking-widest rounded-full hover:border-[#C9A96E]/60 hover:text-[#C9A96E] transition-all duration-300 group"
          >
            <InstagramIcon size={16} className="transition-transform duration-300 group-hover:scale-110" />
            Підписатися на Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
