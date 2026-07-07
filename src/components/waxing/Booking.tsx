"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import { fadeUp, staggerContainer } from "@/lib/utils";

const INSTAGRAM_URL = "https://instagram.com/s_visk_depilation";
const MAPS_URL = "https://maps.app.goo.gl/gsLYstfGs6tkgw5x9?g_st=ic";

export default function Booking() {
  return (
    <section id="booking" className="relative py-24 bg-[#0d0a0d] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-widest uppercase text-amber-300 mb-3">
            Запис
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Готові до гладкої шкіри?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-400">
            Напишіть у Instagram Direct, щоб узгодити зручний час і зону депіляції.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          <motion.a
            variants={fadeUp}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-400/40 hover:bg-white/8 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <InstagramIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold flex items-center gap-1">
                @s_visk_depilation
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <div className="text-sm text-gray-500 mt-0.5">Записатися в Direct</div>
            </div>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-400/40 hover:bg-white/8 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold flex items-center gap-1">
                м. Політехнічний інститут
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-pink-400 transition-colors" />
              </div>
              <div className="text-sm text-gray-500 mt-0.5">Київ · відкрити на карті</div>
            </div>
          </motion.a>

          <motion.div variants={fadeUp} className="flex flex-col gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">Щодня, 9:00–20:00</div>
              <div className="text-sm text-gray-500 mt-0.5">За попереднім записом</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
