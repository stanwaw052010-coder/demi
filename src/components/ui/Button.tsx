import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "light";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm px-6 py-3.5 text-sm tracking-[0.02em] transition-[background-color,color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px";

const variants: Record<Variant, string> = {
  solid: "bg-graphite text-white hover:bg-ink",
  outline: "border border-line text-graphite hover:border-graphite hover:bg-white",
  ghost: "text-graphite hover:text-muted",
  light: "bg-white text-graphite hover:bg-second",
};

export function buttonClass(variant: Variant = "solid", className?: string) {
  return cn(base, variants[variant], className);
}

type LinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "solid", className, children, ...rest }: LinkProps) {
  const external = href.startsWith("http") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={buttonClass(variant, className)}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "solid", className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}
