"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useScrollHandler } from "@/lib/use-scroll-value";

/** Phone and booking pinned to the bottom of every phone screen. */
export function MobileCta() {
  const [hidden, setHidden] = React.useState(false);

  /* Only steps aside over the closing form, where the same actions live. */
  useScrollHandler((y) => {
    const booking = document.getElementById("booking");
    if (!booking) return;
    setHidden(y + window.innerHeight > booking.offsetTop + 120);
  });

  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-ink p-1.5 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.85)]",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden",
        hidden
          ? "pointer-events-none translate-y-24 opacity-0"
          : "translate-y-0 opacity-100",
      )}
    >
      <a
        href={site.phoneHref}
        tabIndex={hidden ? -1 : 0}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-bold tabular-nums text-ink"
      >
        <Phone className="size-4" strokeWidth={2.5} />
        Подзвонити
      </a>
      <a
        href="#booking"
        tabIndex={hidden ? -1 : 0}
        className="flex h-12 flex-1 items-center justify-center rounded-full text-[15px] font-semibold text-white"
      >
        Записатися
      </a>
    </div>
  );
}
