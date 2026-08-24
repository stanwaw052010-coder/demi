"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Липка панель дій на мобільному: запис + миттєвий дзвінок.
 * Зʼявляється лише після першого екрана, щоб не перекривати герой.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2.5 px-4 pt-3">
        <a
          href="#booking"
          className="flex-1 rounded-sm bg-graphite px-5 py-3.5 text-center text-sm text-white"
        >
          Записатися
        </a>
        <a
          href={site.phone.href}
          aria-label={`Зателефонувати ${site.phone.label}`}
          className="rounded-sm border border-line p-3.5 text-graphite"
        >
          <Phone className="size-5" strokeWidth={1.5} aria-hidden />
        </a>
      </div>
    </div>
  );
}
