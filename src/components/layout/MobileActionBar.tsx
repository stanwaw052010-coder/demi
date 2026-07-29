"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { site } from "@/lib/site";

/** Липка панель дій на мобільних — найкоротший шлях до дзвінка та запису. */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 620));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lift ring-1 ring-graphite-200/70 backdrop-blur-xl">
            <a
              href={site.phone.href}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-graphite-50 text-[0.9rem] font-bold text-ink transition-colors active:bg-graphite-100"
            >
              <Phone className="size-[1.05rem] text-brand-600" strokeWidth={2.5} />
              Подзвонити
            </a>
            <a
              href={site.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-br from-brand-600 to-brand-900 text-[0.9rem] font-bold text-white shadow-glow"
            >
              <CalendarCheck className="size-[1.05rem]" strokeWidth={2.5} />
              Записатись
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
