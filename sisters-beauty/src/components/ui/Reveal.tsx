"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** порядковий номер у групі — дає stagger 60 мс */
  index?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Єдина scroll-анімація сайту: поява з y-offset 24px і невеликим stagger.
 * За prefers-reduced-motion контент просто з'являється без руху.
 */
export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index, 6) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
