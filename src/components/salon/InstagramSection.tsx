'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

// Place real salon photos in /public/images/salon/
// insta-1.jpg through insta-6.jpg (or reuse gallery photos)
const posts = [
  { src: '/images/salon/wavy-hair.jpg', fallback: 'from-[#C9A96E]/35 via-[#D4B882]/20 to-[#E8D098]/10', likes: 203, comments: 31 },
  { src: '/images/salon/brows.jpg', fallback: 'from-[#B5C5D8]/35 via-[#C8D8E4]/20 to-[#DDE8F0]/10', likes: 147, comments: 23 },
  { src: '/images/salon/black-hair.jpg', fallback: 'from-[#1A1A1A]/70 via-[#2D2D2D]/40 to-[#404040]/20', likes: 89, comments: 14 },
  { src: '/images/salon/ponytail.jpg', fallback: 'from-[#1C1A2E]/70 via-[#2A2840]/50 to-[#3A3050]/30', likes: 312, comments: 44 },
  { src: '/images/salon/interior.jpg', fallback: 'from-[#3D3D45]/70 via-[#4A4460]/50 to-[#5C5070]/30', likes: 76, comments: 9 },
  { src: '/images/salon/manicure.jpg', fallback: 'from-[#D4A5A5]/40 via-[#E0B8B8]/25 to-[#F0D0D0]/10', likes: 158, comments: 27 },
];

function InstaPost({ post }: { post: typeof posts[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href="https://www.instagram.com/in.style_salonkrasy"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer block"
    >
      {!imgError ? (
        <Image
          src={post.src}
          alt="In.Style Salon work"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
          sizes="(max-width: 640px) 50vw, 33vw"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${post.fallback}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>
      )}

      <div className="absolute inset-0 bg-[#0D0D0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-5 text-white">
          <div className="flex items-center gap-1.5">
            <Heart size={15} fill="white" />
            <span className="text-sm font-medium">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={15} fill="white" />
            <span className="text-sm font-medium">{post.comments}</span>
          </div>
        </div>
        <InstagramIcon size={18} className="text-white/60" />
      </div>
    </a>
  );
}

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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <InstaPost post={post} />
            </motion.div>
          ))}
        </div>

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
