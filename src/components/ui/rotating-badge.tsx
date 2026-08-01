import * as React from "react";
import { ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Circular lock-up that slowly rotates — an anchor point for the hero
 * composition and a second, quieter call to action.
 */
export function RotatingBadge({
  href = "#contacts",
  label = "ЗАПИСАТИСЯ НА ПРИЙОМ · DENTAL NATALY ·",
  className,
  style,
}: {
  href?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      style={style}
      className={cn(
        "group relative grid size-28 place-items-center rounded-full bg-ink text-white shadow-[0_20px_50px_-24px_rgba(17,17,17,0.65)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 md:size-32",
        className,
      )}
    >
      <svg
        viewBox="0 0 120 120"
        className="animate-spin-slow absolute size-full"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        <text fill="currentColor" fontSize="8.2" fontWeight="500">
          {/* textLength = the circle's circumference, so the label fits once */}
          <textPath
            href="#badge-circle"
            startOffset="0"
            textLength="276"
            lengthAdjust="spacingAndGlyphs"
          >
            {label}
          </textPath>
        </text>
      </svg>
      <span className="relative flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 group-hover:border-white/50 group-hover:bg-white group-hover:text-ink">
        <ArrowDownRight className="size-4" strokeWidth={1.5} />
      </span>
    </a>
  );
}
