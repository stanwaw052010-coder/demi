import { cn } from "@/lib/utils";

/**
 * Фірмовий знак ProfiTime — слід стопи в серці.
 * Побудований на основі логотипа з Instagram-профілю студії.
 */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden focusable="false">
      {/* серце */}
      <path
        d="M24 41.2C9.6 30.4 4.4 21.6 9.4 15.1c4.2-5.4 11.4-4.5 14.6.9 3.2-5.4 10.4-6.3 14.6-.9 5 6.5-.2 15.3-14.6 26.1Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* слід стопи (власна система координат 24×30) */}
      <g transform="translate(18.48 16.8) scale(0.46)" fill="currentColor">
        <path d="M12 10c4.4 0 7.3 2.6 7.3 6 0 2.9-2 4.4-3.1 6.2-.9 1.5-.9 2.4-.9 3.6 0 2.6-1.4 4.4-3.7 4.4s-3.9-1.8-3.9-4.4c0-1.3.1-2.1-.8-3.6C5.8 20.4 4.7 18.9 4.7 16c0-3.4 2.9-6 7.3-6Z" />
        <ellipse cx="4.6" cy="6.6" rx="2" ry="2.3" />
        <ellipse cx="8.9" cy="3.7" rx="1.85" ry="2.15" />
        <ellipse cx="13" cy="3.3" rx="1.7" ry="2" />
        <ellipse cx="16.6" cy="4.7" rx="1.5" ry="1.8" />
        <ellipse cx="19.6" cy="7.2" rx="1.3" ry="1.55" />
      </g>
    </svg>
  );
}

export function BrandMark({
  className,
  glyphClassName,
  tone = "brand",
}: {
  className?: string;
  glyphClassName?: string;
  tone?: "brand" | "white";
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl",
        tone === "brand"
          ? "bg-linear-to-br from-brand-600 via-brand-800 to-brand-950 text-white shadow-glow"
          : "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-1/3 left-0 h-full w-full bg-linear-to-b from-white/30 to-transparent"
      />
      <BrandGlyph className={cn("relative h-2/3 w-2/3", glyphClassName)} />
    </span>
  );
}

export function Wordmark({
  className,
  tone = "dark",
  withCaption = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  withCaption?: boolean;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "text-[1.35rem] font-extrabold tracking-[-0.03em]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        Profi<span className={tone === "dark" ? "text-brand-600" : "text-aqua-300"}>Time</span>
      </span>
      {withCaption && (
        <span
          className={cn(
            "mt-1 hidden text-[0.62rem] font-semibold tracking-[0.22em] whitespace-nowrap uppercase sm:block",
            tone === "dark" ? "text-graphite-400" : "text-white/55",
          )}
        >
          Подологія · Манікюр
        </span>
      )}
    </span>
  );
}
