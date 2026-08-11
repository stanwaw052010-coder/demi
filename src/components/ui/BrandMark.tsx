import { cn } from "@/lib/utils";
import { LOGO_PATHS } from "./logo-paths";

/**
 * Один опис знака на всю сторінку. Рендериться в layout прихованим —
 * далі кожне використання лише посилається на нього через <use>.
 * Інакше 7 контурів логотипа їхали б у розмітці стільки разів,
 * скільки разів він з'являється (шапка, hero, CTA, контакти, підвал).
 */
export function BrandGlyphSprite() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" className="absolute">
      <symbol id="pt-glyph" viewBox="0 0 64 64">
        {LOGO_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} fill="currentColor" />
        ))}
      </symbol>
    </svg>
  );
}

/** Фірмовий знак ProfiTime — оригінальний логотип студії у вигляді вектора. */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <use href="#pt-glyph" />
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
          ? "bg-linear-to-br from-brand-500 via-logo to-brand-950 text-white shadow-glow"
          : "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-1/3 left-0 h-full w-full bg-linear-to-b from-white/30 to-transparent"
      />
      <BrandGlyph className={cn("relative h-[72%] w-[72%]", glyphClassName)} />
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
