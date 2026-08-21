import { cn } from "@/lib/utils";

/**
 * Розріджений капслок-лейбл — наскрізна фірмова деталь,
 * узята з друкованих прайсів студії (Р У Ч Н И Й   М А С А Ж).
 */
export function SectionLabel({
  children,
  className,
  tone = "gold",
}: {
  children: string;
  className?: string;
  tone?: "gold" | "beige" | "ink";
}) {
  const toneClass =
    tone === "gold" ? "text-gold" : tone === "ink" ? "text-ink-soft" : "text-beige";

  return (
    <p className={cn("label-spaced", toneClass, className)}>
      <span className="inline-flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-current opacity-50" />
        {children}
      </span>
    </p>
  );
}
