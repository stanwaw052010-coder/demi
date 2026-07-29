import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 text-white shadow-glow hover:shadow-[0_26px_60px_-18px_rgb(31_83_220/0.7)]",
  dark: "bg-ink text-white shadow-lift hover:bg-brand-950",
  light:
    "bg-white text-brand-900 shadow-soft ring-1 ring-brand-100/80 hover:shadow-lift hover:ring-brand-200",
  outline:
    "border border-brand-200 bg-white/60 text-brand-900 backdrop-blur-sm hover:border-brand-400 hover:bg-white",
  ghost: "text-white/90 ring-1 ring-white/20 hover:bg-white/10 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Біковий блиск, що пробігає по кнопці при наведенні. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full skew-x-[-18deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[420%]"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type AnchorProps = CommonProps & Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = buttonVariants({ variant, size, className });

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorRest}
        >
          <Sheen />
          <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorRest}>
        <Sheen />
        <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      <Sheen />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}
