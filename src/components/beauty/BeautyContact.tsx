"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { salon } from "@/lib/beauty";
import { fadeUp, staggerContainer } from "@/lib/utils";
import InstagramIcon from "./InstagramIcon";

export default function BeautyContact() {
  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-[#c9a962]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a962] font-medium mb-4">Контакти</p>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-[#f4efe4]">
            Запишіться на процедуру
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-[#c9a962]/15 bg-[#141210] p-8 space-y-6"
          >
            <a href={salon.phoneHref} className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-full border border-[#c9a962]/40 flex items-center justify-center shrink-0 group-hover:bg-[#c9a962] transition-colors">
                <Phone className="w-4.5 h-4.5 text-[#c9a962] group-hover:text-[#0a0908] transition-colors" />
              </div>
              <div>
                <div className="text-xs text-[#8a8172] uppercase tracking-wider mb-1">Телефон для запису</div>
                <div className="text-[#f4efe4] font-medium group-hover:text-[#c9a962] transition-colors">{salon.phone}</div>
              </div>
            </a>

            <a
              href={salon.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-full border border-[#c9a962]/40 flex items-center justify-center shrink-0 group-hover:bg-[#c9a962] transition-colors">
                <InstagramIcon className="w-4.5 h-4.5 text-[#c9a962] group-hover:text-[#0a0908] transition-colors" />
              </div>
              <div>
                <div className="text-xs text-[#8a8172] uppercase tracking-wider mb-1">Instagram</div>
                <div className="text-[#f4efe4] font-medium group-hover:text-[#c9a962] transition-colors">@{salon.instagramHandle}</div>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full border border-[#c9a962]/40 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-[#c9a962]" />
              </div>
              <div>
                <div className="text-xs text-[#8a8172] uppercase tracking-wider mb-1">Місто</div>
                <div className="text-[#f4efe4] font-medium">{salon.city}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full border border-[#c9a962]/40 flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5 text-[#c9a962]" />
              </div>
              <div>
                <div className="text-xs text-[#8a8172] uppercase tracking-wider mb-1">Графік роботи</div>
                <div className="text-[#f4efe4] font-medium">{salon.hours}</div>
                <div className="text-sm text-[#8a8172]">{salon.hoursOff}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-[#c9a962]/15 bg-gradient-to-br from-[#1a1710] to-[#0a0908] p-8 flex flex-col justify-center items-center text-center"
          >
            <div className="w-14 h-14 rounded-full border border-[#c9a962] flex items-center justify-center mb-6">
              <span className="font-[var(--font-playfair)] text-[#c9a962] text-lg">MBH</span>
            </div>
            <h3 className="font-[var(--font-playfair)] text-2xl text-[#f4efe4] mb-3">
              Готові доглянути ваші руки?
            </h3>
            <p className="text-sm text-[#a89f90] mb-8 max-w-xs">
              Зателефонуйте або напишіть в Instagram — підберемо зручний час візиту.
            </p>
            <a
              href={salon.phoneHref}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c9a962] text-[#0a0908] font-semibold hover:bg-[#d9b872] transition-colors"
            >
              Зателефонувати зараз
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
