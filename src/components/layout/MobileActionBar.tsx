"use client";

import { CalendarCheck, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Липка панель дій на мобільних — найкоротший шлях до дзвінка та запису. */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 620);
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-[130%]",
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lift ring-1 ring-graphite-200/70 backdrop-blur-xl">
        <a
          href={site.phone.href}
          tabIndex={visible ? undefined : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-graphite-50 text-[0.9rem] font-bold text-ink transition-colors active:bg-graphite-100"
        >
          <Phone className="size-[1.05rem] text-brand-600" strokeWidth={2.5} />
          Подзвонити
        </a>
        <a
          href={site.booking.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-linear-to-br from-brand-600 to-brand-900 text-[0.9rem] font-bold text-white shadow-glow"
        >
          <CalendarCheck className="size-[1.05rem]" strokeWidth={2.5} />
          Записатись
        </a>
      </div>
    </div>
  );
}
