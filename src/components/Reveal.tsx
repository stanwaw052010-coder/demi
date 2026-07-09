"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`mb-4 block text-[10px] font-normal uppercase tracking-[0.28em] ${
        light ? "text-brand-soft" : "text-brand-deep"
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  light = false,
  className = "",
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-4xl leading-[1.1] font-light sm:text-5xl lg:text-[3.5rem] ${
        light ? "text-[#f3f5ec]" : "text-ink"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function DividerGold() {
  return <div className="my-5 h-px w-9 bg-brand opacity-70" aria-hidden />;
}
