import clsx from "clsx";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

/** Infinite belt — content is doubled and translated by -50%. */
export function Marquee({ children, duration = 40, className }: MarqueeProps) {
  return (
    <div className={clsx("overflow-hidden", className)} aria-hidden>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
