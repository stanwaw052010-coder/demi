import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  /** Заголовок передається рядками — кожен зʼявляється окремо. */
  lines: string[];
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  lines,
  description,
  align = "left",
  tone = "dark",
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal y={12}>
          <span className={cn("eyebrow block", tone === "light" && "text-white/50")}>
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <AnimatedText
        lines={lines}
        as="h2"
        className={cn(
          "text-[2.15rem] leading-[1.05] sm:text-[3rem] lg:text-[3.75rem]",
          tone === "light" && "text-white",
        )}
      />

      {description ? (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-[0.975rem] leading-relaxed text-muted",
              align === "center" && "mx-auto",
              tone === "light" && "text-white/60",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
