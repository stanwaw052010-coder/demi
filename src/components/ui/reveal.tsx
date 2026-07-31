import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Scroll-triggered fade-up used across every section for one consistent
 * rhythm. It stays a server component — a single observer mounted once
 * (`RevealObserver`) drives every instance, so dozens of these cost the
 * browser nothing at hydration.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <div
      data-reveal
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Word-by-word reveal for the headline moment. CSS-driven: the hero sits above
 * the fold and must not wait for hydration to become visible.
 */
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          {/* The space lives outside the clipping box, or it gets trimmed */}
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="enter-word inline-block"
              style={{ animationDelay: `${delay + i * 0.045}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}
