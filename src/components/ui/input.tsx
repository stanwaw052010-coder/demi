import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full border border-input bg-white px-4 text-sm text-navy-950 outline-none transition-colors placeholder:text-muted-foreground",
        "focus-visible:border-gold-500 focus-visible:ring-1 focus-visible:ring-gold-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
