"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // lock scroll while loading
    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const DURATION = 1600;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="overline mb-6">Хмельницький · Est. 2014</span>
            <span className="font-display text-6xl font-extrabold tracking-tightest sm:text-8xl">
              GIN
            </span>
            <span className="mt-2 text-xs tracking-[0.4em] text-muted">
              BARBERSHOP
            </span>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-8">
            <div className="h-px w-full max-w-md overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-white"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="flex w-full max-w-md items-center justify-between text-xs text-muted">
              <span>Завантаження досвіду</span>
              <span className="tabular-nums text-fg">{count}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
