import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  /** Затримка появи, секунди. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Поява блоку при скролі.
 *
 * Серверний компонент: у розмітку йде лише `data-reveal`, а сам перехід
 * робить CSS. Клас `.is-visible` вішає єдиний IntersectionObserver
 * (див. RevealObserver) — жодного JS на кожен блок.
 */
export function Reveal({ children, direction = "up", delay = 0, className, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      data-reveal={direction}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Контейнер, діти якого з'являються послідовно (затримки — у CSS). */
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("stagger", className)}>{children}</div>;
}
