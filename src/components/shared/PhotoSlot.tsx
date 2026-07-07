"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoCategory = "podolog" | "cosmetolog" | "hairdresser" | "spa";

interface PhotoSlotProps {
  category: PhotoCategory;
  index: number;
  alt: string;
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders /public/images/{category}/{index}.jpg when the file exists.
 * Until the real photo is dropped in at that exact path, it degrades to a
 * branded placeholder instead of a broken image.
 */
export function PhotoSlot({
  category,
  index,
  alt,
  label,
  className,
  sizes = "100vw",
  priority,
}: PhotoSlotProps) {
  const [failed, setFailed] = useState(false);
  const src = `/images/${category}/${index}.jpg`;

  if (failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950",
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(198,161,91,0.18),transparent_60%)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <Camera className="h-5 w-5 text-gold-400/60" strokeWidth={1.25} />
          <span className="border border-gold-400/40 px-4 py-2 text-[10px] tracking-[0.25em] text-gold-300/80 uppercase">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-navy-900", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
