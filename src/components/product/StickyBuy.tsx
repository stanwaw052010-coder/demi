"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * On a phone the buy control leaves the viewport almost immediately, so it
 * comes back as a bar once you have scrolled past it. Desktop never sees this.
 */
export function StickyBuy({ price, name }: { price: string; name: string }) {
  const t = useTranslations("product");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("wy-buy");
    if (!anchor) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShown(!entry?.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-paper wy-rule wy-noprint"
      style={{
        transform: shown ? "translateY(0)" : "translateY(110%)",
        transition: "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden={!shown}
    >
      <div className="wy-shell py-3 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-micro">{name}</p>
          <p className="price text-micro text-stone">{price}</p>
        </div>
        <a
          href="#wy-buy"
          className="wy-btn wy-btn-solid shrink-0"
          tabIndex={shown ? 0 : -1}
        >
          {t("stickyBuy")}
        </a>
      </div>
    </div>
  );
}
