"use client";

/**
 * Infinite marquee — duplicated track, CSS-driven, GPU-composited.
 */
export default function Marquee({
  children,
  duration = 30,
  className = "",
  reverse = false,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
