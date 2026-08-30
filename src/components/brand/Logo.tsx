import type { CSSProperties } from "react";

export type LogoVariant = "horizontal" | "stacked" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  /** Size of the mark in pixels. The wordmark scales with it. */
  size?: number;
  className?: string;
  /** Set on the decorative instance when the wordmark is already the heading. */
  title?: string;
  style?: CSSProperties;
}

/**
 * 井 (jǐng) means "well" — a direct rhyme on Well's — and is graphically four
 * strokes that make a square in the middle. The circle is the mouth of the well
 * and a cup seen from above; the strokes run past it so the well breathes. The
 * leaf sits in the square the character makes.
 *
 * Lines only: no fills, no gradients, one stroke width. It has to hold at 24px
 * for the favicon and at 400px in the footer, which is why the leaf loses its
 * midrib below 32px.
 */
export function LogoMark({
  size = 48,
  strokeWidth,
  detail = true,
}: {
  size?: number;
  strokeWidth?: number;
  detail?: boolean;
}) {
  // 1.25 at 48px reads as a hairline; below 32px it needs a touch more weight.
  const sw = strokeWidth ?? (size < 32 ? 1.7 : 1.4);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="15.4" stroke="var(--color-sage)" strokeWidth={sw} />
      <g stroke="var(--color-pine)" strokeWidth={sw}>
        <path d="M18.7 7.4 16.5 40.6" />
        <path d="M31.5 7.4 29.3 40.6" />
        <path d="M7.4 18.7 40.6 16.9" />
        <path d="M7.4 30.9 40.6 29.1" />
      </g>
      <g stroke="var(--color-sage)" strokeWidth={sw} strokeLinejoin="round">
        <path d="M24 19.4c3.2 2.4 3.2 6.7 0 9.1-3.2-2.4-3.2-6.7 0-9.1Z" />
        {detail && size >= 32 ? <path d="M24 20.4v7.1" strokeWidth={sw * 0.7} /> : null}
      </g>
    </svg>
  );
}

const wordmarkStyle = (size: number): CSSProperties => ({
  fontFamily: "var(--font-display)",
  fontSize: `${size * 0.46}px`,
  lineHeight: 1,
  letterSpacing: "-0.015em",
  fontOpticalSizing: "auto",
});

export function Logo({
  variant = "horizontal",
  size = 40,
  className,
  title,
  style,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={className} style={style} role={title ? "img" : undefined} aria-label={title}>
        <LogoMark size={size} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span
        className={className}
        style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: size * 0.3, ...style }}
        role={title ? "img" : undefined}
        aria-label={title}
      >
        <LogoMark size={size} />
        <span style={wordmarkStyle(size)}>Well’s of Yunnan</span>
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28, ...style }}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      <LogoMark size={size} />
      <span style={wordmarkStyle(size)}>Well’s of Yunnan</span>
    </span>
  );
}

/**
 * 云南井, the cinnabar seal. It appears exactly once on the site, on the
 * certificate of origin block on the About page, and nowhere else.
 */
export function Seal({ size = 96, label }: { size?: number; label: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={label}
      style={{ display: "block" }}
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="2"
        fill="none"
        stroke="var(--color-cinnabar)"
        strokeWidth="4.5"
      />
      <text
        x="27"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-cinnabar)"
        style={{ fontFamily: "var(--font-hanzi)", fontSize: "30px" }}
      >
        云
      </text>
      <text
        x="73"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-cinnabar)"
        style={{ fontFamily: "var(--font-hanzi)", fontSize: "30px" }}
      >
        南
      </text>
      <text
        x="50"
        y="74"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-cinnabar)"
        style={{ fontFamily: "var(--font-hanzi)", fontSize: "32px" }}
      >
        井
      </text>
    </svg>
  );
}
