"use client";

import { useEffect, useRef, useState } from "react";
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
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Small images can finish loading before React attaches onLoad, leaving the
  // handler to never fire. Reconcile with the element's real state on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else setErrored(true);
    }
  }, []);

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
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "relative h-full w-full object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName
          )}
        />
      )}
    </div>
  );
}
