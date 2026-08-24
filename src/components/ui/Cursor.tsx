"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Власний курсор — тільки для десктопа з мишею.
 * На дотикових пристроях компонент нічого не рендерить,
 * тому системний курсор і продуктивність не страждають.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useSpring(useMotionValue(-100), { stiffness: 380, damping: 34, mass: 0.35 });
  const y = useSpring(useMotionValue(-100), { stiffness: 380, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // Вмикаємо власний курсор лише після першого руху миші:
    // так на пристроях без миші системний курсор ніколи не ховається.
    const move = (event: MouseEvent) => {
      setEnabled(true);
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduced, x, y]);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.customCursor = "on";
    return () => {
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:block"
      style={{ x, y }}
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-graphite/50 bg-graphite/5 backdrop-blur-[1px]"
        animate={{ width: active ? 44 : 14, height: active ? 44 : 14, opacity: active ? 1 : 0.75 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
