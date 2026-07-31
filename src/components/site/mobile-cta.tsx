"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useScrollHandler } from "@/lib/use-scroll-value";

export function MobileCta() {
  const [visible, setVisible] = React.useState(false);

  useScrollHandler((y) => {
    const max = document.body.scrollHeight - window.innerHeight;
    setVisible(y > 700 && y < max - 720);
  });

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 flex items-center gap-2 rounded-full glass p-1.5 shadow-[0_20px_50px_-24px_rgba(17,17,17,0.55)]",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <a
        href={site.phoneHref}
        aria-label={`Зателефонувати ${site.phone}`}
        tabIndex={visible ? 0 : -1}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink"
      >
        <Phone className="size-4" strokeWidth={1.75} />
      </a>
      <a
        href="#contacts"
        tabIndex={visible ? 0 : -1}
        className="flex h-11 flex-1 items-center justify-center rounded-full bg-ink text-[14px] font-medium text-white"
      >
        Записатися на прийом
      </a>
    </div>
  );
}
