import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue,
  reviewCount,
  className,
}: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(value);
          const partial = !filled && i < value;
          return (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={cn("shrink-0", {
                "w-3 h-3": size === "sm",
                "w-4 h-4": size === "md",
                "w-5 h-5": size === "lg",
              })}
            >
              <defs>
                {partial && (
                  <linearGradient id={`partial-${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${(value - Math.floor(value)) * 100}%`} stopColor="#f97316" />
                    <stop offset={`${(value - Math.floor(value)) * 100}%`} stopColor="#d1d5db" />
                  </linearGradient>
                )}
              </defs>
              <path
                fill={
                  filled
                    ? "#f97316"
                    : partial
                    ? `url(#partial-${i})`
                    : "#d1d5db"
                }
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span
          className={cn("font-semibold text-gray-900", {
            "text-xs": size === "sm",
            "text-sm": size === "md",
            "text-base": size === "lg",
          })}
        >
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span
          className={cn("text-gray-400", {
            "text-xs": size === "sm",
            "text-sm": size === "md" || size === "lg",
          })}
        >
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
