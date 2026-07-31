import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  action,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "text-center")}>
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {index && (
              <span
                aria-hidden
                className={cn(
                  "font-mono text-[11px] tabular-nums",
                  tone === "dark" ? "text-white/45" : "text-ink/30",
                )}
              >
                {index}
              </span>
            )}
            <span
              className={cn(
                "h-px w-8",
                tone === "dark" ? "bg-white/20" : "bg-ink/15",
              )}
            />
            <span
              className={cn(
                "eyebrow",
                tone === "dark" && "text-white/50",
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            className={cn(
              "display-tight mt-6 font-display text-[34px] font-light sm:text-[46px] lg:text-[58px]",
              tone === "dark" ? "text-white" : "text-ink",
            )}
          >
            {title}
          </h2>
        </Reveal>

        {description && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-6 max-w-xl text-[16px] leading-relaxed md:text-[18px]",
                tone === "dark" ? "text-white/55" : "text-graphite/70",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {action && <Reveal delay={0.16} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
