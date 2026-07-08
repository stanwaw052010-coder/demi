"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import OrganicBlob from "@/components/decorative/OrganicBlob";
import BotanicalLine from "@/components/decorative/BotanicalLine";

type PhotoSlotProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  blobVariant?: 1 | 2 | 3;
};

/**
 * Renders a real photo when present at /public + src. If the file hasn't
 * been added yet, falls back to a designed duotone placeholder so the
 * layout never looks broken while photography is pending.
 */
export default function PhotoSlot({
  src,
  alt,
  className,
  imgClassName,
  blobVariant = 1,
}: PhotoSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-green-dark", className)}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3a4a2e] via-[#4a5c39] to-[#8db748]">
          <OrganicBlob
            variant={blobVariant}
            className="absolute -left-1/4 -top-1/4 h-[80%] w-[80%] text-white/10"
          />
          <OrganicBlob
            variant={2}
            className="absolute -bottom-1/3 -right-1/4 h-[70%] w-[70%] text-black/10"
          />
          <BotanicalLine className="relative h-2/3 text-white/35" />
        </div>
      )}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
