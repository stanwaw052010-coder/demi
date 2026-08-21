import { cn } from "@/lib/utils";

/** Знак студії: золотий діамант з внутрішнім гранованим контуром. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    >
      <path d="M16 2.5 29 16 16 29.5 3 16 16 2.5Z" />
      <path d="M16 8 24 16l-8 8-8-8 8-8Z" opacity="0.55" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-gold", className)}>
      <LogoMark />
      <span className="font-display text-lg leading-none tracking-[0.12em] text-sand">
        SISTER&rsquo;S
      </span>
    </span>
  );
}
