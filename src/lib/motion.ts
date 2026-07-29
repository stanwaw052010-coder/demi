import type { Variants } from "framer-motion";

/** Спільна крива плавності для всіх анімацій сайту. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
