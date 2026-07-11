"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Calendar } from "lucide-react";
import { site } from "@/lib/utils";

export default function FloatingBook() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > 700);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-fg px-5 py-3.5 text-sm font-medium text-bg shadow-2xl shadow-black/50 transition-colors hover:bg-gold sm:bottom-8 sm:right-8"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.8} />
          <span>Записатися</span>
          <span className="absolute inset-0 -z-10 rounded-full bg-gold/40 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
