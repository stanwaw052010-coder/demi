"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface PicProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Image inside an art-directed frame: shimmer while loading,
 * and a quiet monogram placeholder if a source ever fails —
 * the composition never breaks.
 */
export function Pic({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: PicProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={clsx("pic-frame", className)} data-loaded={loaded || failed}>
      {failed ? (
        <span
          aria-hidden
          className="font-serif-display absolute inset-0 flex items-center justify-center text-[3rem] italic opacity-20"
        >
          L
        </span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={clsx(
            "object-cover transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
