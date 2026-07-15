import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Gem } from "lucide-react";
import { imageExists } from "@/lib/images";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  label?: string;
  icon?: LucideIcon;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders the real photo once it exists under /public, otherwise a branded
 * placeholder tile — so the layout looks finished today and swaps to real
 * photography automatically the moment a file lands at `src` (see PHOTOS.md).
 */
export function Photo({
  src,
  alt,
  label,
  icon: Icon = Gem,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: PhotoProps) {
  if (imageExists(src)) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", className)}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950",
        fill ? "absolute inset-0" : "",
        className
      )}
      role="img"
      aria-label={alt}
    >
      <div className="bg-noise absolute inset-0" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--gold-500) 0px, var(--gold-500) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <Icon className="h-8 w-8 text-gold-400" strokeWidth={1.25} />
        {label && (
          <span className="font-serif text-sm tracking-wide text-white/80">{label}</span>
        )}
      </div>
    </div>
  );
}
