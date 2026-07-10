"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";

interface PillButtonProps {
  children: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
}

/**
 * The house button: magnetic pull, label rolls over itself on hover,
 * and a champagne wash sweeps up from below.
 */
export function PillButton({
  children,
  onClick,
  variant = "solid",
  className,
  type = "button",
  icon,
}: PillButtonProps) {
  return (
    <Magnetic strength={0.3} className={clsx("inline-block", className)}>
      <button
        type={type}
        onClick={onClick}
        data-cursor
        data-cursor-text="Go"
        className={clsx(
          "group relative overflow-hidden rounded-full px-8 py-4 font-mono text-[11px] tracking-[0.26em] uppercase transition-colors duration-500",
          variant === "solid"
            ? "bg-champagne text-ink"
            : "border border-current text-current",
        )}
      >
        {/* rising wash */}
        <span
          className={clsx(
            "absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0",
            variant === "solid" ? "bg-ink" : "bg-current",
          )}
          aria-hidden
        />
        {/* rolling label */}
        <span className="relative block overflow-hidden">
          <span
            className={clsx(
              "flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full",
            )}
          >
            {children} {icon}
          </span>
          <span
            className={clsx(
              "absolute inset-0 flex translate-y-full items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0",
              variant === "solid" ? "text-champagne" : "text-[var(--bg)]",
            )}
            aria-hidden
          >
            {children} {icon}
          </span>
        </span>
      </button>
    </Magnetic>
  );
}
