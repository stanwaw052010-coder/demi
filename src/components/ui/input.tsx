import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "border-border text-foreground placeholder:text-muted-foreground flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors",
          "focus-visible:ring-ring focus-visible:border-ring focus-visible:ring-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
