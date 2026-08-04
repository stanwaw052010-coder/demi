"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type AutoVideoProps = {
  /** Base path without extension — `.webm` and `.mp4` are both expected. */
  src: string;
  poster: string;
  label: string;
  className?: string;
  /** Overlays (watermark, caption) rendered above the frame. */
  children?: React.ReactNode;
  /**
   * Off when the video sits inside a link — a button may not nest in an
   * anchor, and the poster alone is a fine fallback there.
   */
  withPlayButton?: boolean;
};

/**
 * A muted, looping video that only fetches once it approaches the viewport,
 * so a megabyte of footage never delays the first screen. Data-saver and
 * reduced-motion users keep the poster with a play button instead.
 */
export function AutoVideo({
  src,
  poster,
  label,
  className,
  children,
  withPlayButton = true,
}: AutoVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      connection?.saveData ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let observer: IntersectionObserver | undefined;

    /* Never let footage compete with the first screen for bandwidth: the
       observer is only armed once everything else has finished loading. */
    const arm = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          node
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        },
        { rootMargin: "150px" },
      );
      observer.observe(node);
    };

    if (document.readyState === "complete") {
      arm();
      return () => observer?.disconnect();
    }

    window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className={cn("group relative overflow-hidden bg-mist", className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className="size-full object-cover"
        aria-label={label}
      >
        {/* WebM first for Chrome and Firefox, H.264 for Safari and iOS */}
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>

      {withPlayButton && !playing && (
        <button
          type="button"
          onClick={() => {
            const node = ref.current;
            if (!node) return;
            node.play().then(() => setPlaying(true));
          }}
          className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-500 hover:bg-ink/30"
          aria-label={`Відтворити: ${label}`}
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-ink shadow-[0_16px_40px_-16px_rgba(17,17,17,0.8)]">
            <Play className="ml-0.5 size-6 fill-ink" strokeWidth={1.5} />
          </span>
        </button>
      )}

      {children}
    </div>
  );
}
