"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { buttonClass } from "./Button";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "light";
  /** Сила притягання до курсора у пікселях. */
  strength?: number;
};

/**
 * Кнопка, що ледь тягнеться за курсором. Ефект працює лише на
 * пристроях із мишею — на тачі жест лише заважав би.
 */
export function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  strength = 10,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 22, mass: 0.4 });

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={buttonClass(variant, className)}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </motion.a>
  );
}
