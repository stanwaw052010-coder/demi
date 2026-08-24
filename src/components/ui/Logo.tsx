import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Логотип клініки: фірмовий знак (зуб із монограмою та іскрами)
 * плюс типографічний напис у два рядки.
 * На темних секціях знак інвертується у білий — окремий файл не потрібен.
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — на головну`}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity duration-500 hover:opacity-70",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={44}
        height={44}
        priority
        className={cn("size-9 w-auto sm:size-10", tone === "light" && "invert")}
      />

      <span className="flex flex-col leading-[1.15]">
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
      </span>
    </Link>
  );
}
