import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Список «ефектів» з друкованих прайсів студії. */
export function EffectsList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-beige">
          <LogoMark className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
