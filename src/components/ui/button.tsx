import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverted";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-graphite shadow-[0_1px_2px_rgba(17,17,17,0.16),0_16px_32px_-20px_rgba(17,17,17,0.7)]",
  secondary:
    "bg-white text-ink hairline hover:border-ink/20 hover:bg-mist shadow-[0_1px_2px_rgba(17,17,17,0.03)]",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  inverted: "bg-white text-ink hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-12 px-6 text-[14px]",
  lg: "h-14 px-8 text-[15px]",
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/70 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export type ButtonLinkProps = {
  variant?: Variant;
  size?: Size;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
