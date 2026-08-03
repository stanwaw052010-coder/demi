import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The clinic's real mark plus a live-text wordmark that mirrors the printed
 * lock-up. Deliberately large — it is the first thing a visitor should see.
 */
export function Logo({
  className,
  tone = "dark",
  size = "md",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  const mark = {
    sm: "h-9 w-[31px]",
    md: "h-[52px] w-[45px]",
    lg: "h-14 w-[49px]",
  }[size];

  const name = {
    sm: "text-[17px]",
    md: "text-[24px]",
    lg: "text-[26px]",
  }[size];

  const script = {
    sm: "text-[15px]",
    md: "text-[21px]",
    lg: "text-[23px]",
  }[size];

  return (
    <a
      href="#top"
      className={cn("group flex items-center gap-3 md:gap-3.5", className)}
    >
      <Image
        src={tone === "dark" ? "/logo-mark-dark.png" : "/logo-mark-light.png"}
        alt=""
        width={180}
        height={208}
        priority
        aria-hidden
        className={cn(
          "shrink-0 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5",
          mark,
        )}
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.3em]",
            tone === "dark" ? "text-clay" : "text-sand",
          )}
        >
          Dental Clinic
        </span>
        <span className="mt-1.5 flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-display font-semibold uppercase tracking-[0.02em]",
              name,
              tone === "dark" ? "text-ink" : "text-white",
            )}
          >
            Nataly
          </span>
          <span
            className={cn(
              "accent leading-none",
              script,
              tone === "dark" ? "text-clay" : "text-sand",
            )}
          >
            Zhylan
          </span>
        </span>
      </span>
      <span className="sr-only">
        Dental Clinic Nataly Zhylan — на початок сторінки
      </span>
    </a>
  );
}
