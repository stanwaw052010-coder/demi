import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Типографічний логотип: два рядки, широкий трекінг, без картинки. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — на головну`}
      className={cn(
        "group inline-flex flex-col leading-[1.05] transition-opacity duration-500 hover:opacity-70",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-[0.8125rem] tracking-[0.3em] uppercase",
          tone === "light" ? "text-white" : "text-graphite",
        )}
      >
        Clinic
      </span>
      <span
        className={cn(
          "font-display text-[0.8125rem] tracking-[0.3em] uppercase",
          tone === "light" ? "text-white/55" : "text-muted",
        )}
      >
        Stomatology
      </span>
    </Link>
  );
}
