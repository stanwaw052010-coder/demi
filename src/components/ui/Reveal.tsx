"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Наскільки далеко елемент піднімається під час появи. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Базова поява при скролі. Один компонент на весь сайт —
 * так усі секції зʼявляються з однаковим темпом.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
