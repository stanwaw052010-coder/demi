"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";

export default function ContactBanner() {
  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 lg:p-14 relative overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div variants={fadeUp} className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Не знайшли потрібну деталь?
              </h2>
              <p className="text-orange-100 text-lg max-w-xl">
                Зателефонуйте або напишіть — підберемо за VIN-кодом, артикулом або фото. Безкоштовно.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+380672546266"
                className="flex items-center gap-2.5 px-6 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-200 hover:shadow-xl hover:shadow-orange-700/20 text-sm"
              >
                <Phone className="w-4 h-4" />
                +38 (067) 254-62-66
              </a>
              <a
                href="https://t.me/sprinter_parts"
                className="flex items-center gap-2.5 px-6 py-4 bg-white/15 text-white font-bold rounded-2xl hover:bg-white/25 border border-white/20 transition-all duration-200 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Написати в Telegram
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
