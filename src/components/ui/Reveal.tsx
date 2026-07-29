"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, staggerParent } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 48 },
  right: { x: -48 },
  scale: { scale: 0.94 },
  fade: {},
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
};

/** Плавна поява блоку при скролі: fade up / left / right / scale. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.75,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Контейнер для послідовної (stagger) появи дочірніх MotionItem. */
export function StaggerGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
