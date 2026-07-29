import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.7rem] font-bold tracking-[0.18em] uppercase",
        tone === "dark"
          ? "bg-brand-50 text-brand-700 ring-1 ring-brand-100"
          : "glass text-white/80",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "dark" ? "bg-brand-500" : "bg-aqua-400",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  tone = "dark",
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Слово-акцент курсивною антиквою в кінці заголовка. */
  accent?: string;
  text?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="up">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.08}>
        <h2
          className={cn(
            "max-w-3xl text-[clamp(2rem,1.35rem+2.7vw,3.6rem)] leading-[1.06] font-extrabold tracking-[-0.035em] text-balance",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          {title}
          {accent && (
            <>
              {" "}
              <span
                className={cn(
                  "font-serif font-medium italic",
                  tone === "dark" ? "text-brand-600" : "text-aqua-300",
                )}
              >
                {accent}
              </span>
            </>
          )}
        </h2>
      </Reveal>

      {text && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-[1.02rem] leading-relaxed text-pretty md:text-[1.1rem]",
              tone === "dark" ? "text-graphite-600" : "text-white/65",
            )}
          >
            {text}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
