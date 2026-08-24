"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

type Props = {
  /** Кожен рядок анімується окремо — так заголовок «збирається» згори вниз. */
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  /** true — анімувати одразу (герой), false — за скролом. */
  immediate?: boolean;
};

export function AnimatedText({
  lines,
  className,
  delay = 0,
  as = "h2",
  immediate = false,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = as;
  const animation = { opacity: 1, y: "0%" };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {/* clip приховує рядок, поки він виїжджає знизу */}
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              className="block"
              initial={reduced ? false : { opacity: 0, y: "108%" }}
              {...(immediate
                ? { animate: animation }
                : { whileInView: animation, viewport: { once: true, margin: "-10%" } })}
              transition={{
                duration: 1,
                delay: delay + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
