"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Trigger = "inview" | "mount";

/** Fade + rise reveal for any block. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
  trigger = "inview",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  trigger?: Trigger;
}) {
  const anim =
    trigger === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once, margin: "-80px" },
        };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...anim}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word mask reveal for headings. */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  once = true,
  trigger = "inview",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  once?: boolean;
  trigger?: Trigger;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => {
        const t = { duration: 0.9, ease: EASE, delay: delay + i * 0.055 };
        const anim =
          trigger === "mount"
            ? { animate: { y: 0 } }
            : {
                whileInView: { y: 0 },
                viewport: { once, margin: "-60px" },
              };
        return (
          <span key={i}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
            >
              <motion.span
                className={cn("inline-block", wordClassName)}
                initial={{ y: "110%" }}
                {...anim}
                transition={t}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}
