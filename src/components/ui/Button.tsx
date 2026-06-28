import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none",
          {
            // Variants
            "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-sm hover:shadow-md hover:shadow-orange-500/20":
              variant === "primary",
            "bg-white text-gray-900 border border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600":
              variant === "secondary",
            "text-gray-600 hover:text-orange-600 hover:bg-orange-50":
              variant === "ghost",
            "border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white":
              variant === "outline",
            "bg-red-500 text-white hover:bg-red-600": variant === "danger",
            // Sizes
            "text-xs px-3 py-1.5 rounded-lg": size === "sm",
            "text-sm px-4 py-2.5": size === "md",
            "text-base px-6 py-3": size === "lg",
            "text-base px-8 py-4 rounded-2xl": size === "xl",
            // Width
            "w-full": fullWidth,
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
