"use client";

import { motion } from "framer-motion";
import { gallery, salon } from "@/lib/beauty";
import { fadeUp, staggerContainer } from "@/lib/utils";
import InstagramIcon from "./InstagramIcon";

export default function BeautyGallery() {
  return (
    <section id="gallery" className="py-24 sm:py-32 border-t border-[#c9a962]/10 bg-[#0d0c0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-4">Палітра сезону</p>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-[#f4efe4] mb-4">
            Огляд наших робіт
          </h2>
          <p className="text-sm text-[#a89f90]">
            Більше прикладів манікюру та дизайнів — у нашому Instagram
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {gallery.map((g) => (
            <motion.div key={g.title} variants={fadeUp} className="group">
              <div
                className="aspect-[4/5] rounded-2xl border border-[#c9a962]/15 mb-4 relative overflow-hidden"
                style={{ background: g.swatch }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <h3 className="font-[var(--font-playfair)] text-base text-[#f4efe4] mb-1">{g.title}</h3>
              <p className="text-xs text-[#8a8172] leading-relaxed">{g.caption}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a
            href={salon.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#c9a962]/40 text-[#ece6da] hover:border-[#c9a962] hover:text-[#c9a962] transition-colors text-sm font-medium"
          >
            <InstagramIcon className="w-4 h-4" />
            Дивитись більше в Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
