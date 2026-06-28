import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "green" | "red" | "blue" | "gray" | "dark";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "orange", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        {
          "text-xs px-2.5 py-0.5": size === "sm",
          "text-sm px-3 py-1": size === "md",
          "bg-orange-100 text-orange-700": variant === "orange",
          "bg-green-100 text-green-700": variant === "green",
          "bg-red-100 text-red-600": variant === "red",
          "bg-blue-100 text-blue-700": variant === "blue",
          "bg-gray-100 text-gray-600": variant === "gray",
          "bg-gray-900 text-white": variant === "dark",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
