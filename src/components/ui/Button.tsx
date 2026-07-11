"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-gold",
  outline:
    "border border-white/15 text-fg hover:border-gold/60 hover:text-gold",
  ghost: "text-fg hover:text-gold",
};

export default function Button({
  children,
  href,
  external,
  variant = "primary",
  className,
  arrow = true,
  magnetic = true,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
}) {
  const content = (
    <span className={cn(base, variants[variant], className)}>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.6}
        />
      )}
    </span>
  );

  const inner = href ? (
    external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        data-cursor="hover"
      >
        {content}
      </a>
    ) : (
      <Link href={href} onClick={onClick} data-cursor="hover">
        {content}
      </Link>
    )
  ) : (
    <button type="button" onClick={onClick} data-cursor="hover">
      {content}
    </button>
  );

  return magnetic ? <Magnetic strength={0.3}>{inner}</Magnetic> : inner;
}
