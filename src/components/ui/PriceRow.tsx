import { formatPrice, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Signature-елемент сайту: рядок «меню при свічках».
 * Назва серіфом ліворуч, ціна праворуч, між ними — золоті leader-dots,
 * що підсвічуються зліва направо при наведенні на весь рядок.
 */
export function PriceRow({
  service,
  compact = false,
  className,
}: {
  service: Service;
  compact?: boolean;
  className?: string;
}) {
  const isOnRequest = service.price === null;

  return (
    <div
      className={cn(
        "price-row border-b border-gold/12 py-6 last:border-b-0",
        className,
      )}
      tabIndex={0}
    >
      <div className="flex items-end gap-3">
        <h4
          className={cn(
            "max-w-[62%] text-pretty text-sand transition-colors duration-500",
            compact ? "text-lg sm:text-xl" : "text-[1.35rem] leading-snug sm:text-2xl",
          )}
        >
          {service.name}
        </h4>
        <span aria-hidden className="leader" />
        <p className="shrink-0 whitespace-nowrap">
          <span
            className={cn(
              "font-display text-gold-light",
              isOnRequest ? "text-lg sm:text-xl" : "text-[1.7rem] leading-none sm:text-[2rem]",
            )}
          >
            {formatPrice(service)}
          </span>
          {isOnRequest ? null : (
            <span className="label-spaced ml-2 text-beige">грн</span>
          )}
        </p>
      </div>
      {service.description ? (
        <p className="mt-3 max-w-[68ch] text-pretty text-sm text-beige">{service.description}</p>
      ) : null}
    </div>
  );
}
