import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <a
      href="#top"
      className={cn("group flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-[11px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6",
          tone === "dark" ? "bg-ink text-white" : "bg-white text-ink",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          {/* Minimal tooth mark */}
          <path
            d="M12 4.2c-1.6-1.1-3.4-1.6-4.9-1-1.9.8-2.8 2.9-2.5 5.4.2 1.6.7 2.7 1.1 4.2.4 1.4.5 2.5.7 3.9.2 1.5.6 2.6 1.5 2.7.9.1 1.3-.8 1.7-2.4.4-1.6.6-2.9 1.6-2.9h1.6c1 0 1.2 1.3 1.6 2.9.4 1.6.8 2.5 1.7 2.4.9-.1 1.3-1.2 1.5-2.7.2-1.4.3-2.5.7-3.9.4-1.5.9-2.6 1.1-4.2.3-2.5-.6-4.6-2.5-5.4-1.5-.6-3.3-.1-4.9 1Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[15px] font-semibold tracking-[-0.02em]",
            tone === "dark" ? "text-ink" : "text-white",
          )}
        >
          Dental Clinic Nataly
        </span>
        <span
          className={cn(
            "mt-1 text-[9.5px] font-medium uppercase tracking-[0.24em]",
            tone === "dark" ? "text-ink/60" : "text-white/55",
          )}
        >
          Тернопіль
        </span>
      </span>
    </a>
  );
}
