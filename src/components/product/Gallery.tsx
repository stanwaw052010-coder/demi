"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

/**
 * Four views of the same batch: dry leaf, liquor, wet leaf, packaging. The
 * images are rendered on the server (they may be real photographs) and handed
 * in here, so this only switches which one is shown.
 *
 * On a phone it becomes a swipe strip rather than a shrunken thumbnail row.
 */
export function Gallery({
  views,
}: {
  views: { key: "dry" | "liquor" | "wet" | "pack"; node: ReactNode }[];
}) {
  const t = useTranslations("product");
  const [active, setActive] = useState(0);

  const label: Record<string, string> = {
    dry: t("galleryDry"),
    liquor: t("galleryLiquor"),
    wet: t("galleryWet"),
    pack: t("galleryPack"),
  };

  return (
    <div>
      {/* Phone: a real swipe strip with snapping. */}
      <div
        className="sm:hidden flex overflow-x-auto wy-snap-x wy-hide-scrollbar gap-3"
        role="group"
        aria-label={t("gallery")}
        tabIndex={0}
      >
        {views.map((view) => (
          <figure key={view.key} className="wy-snap-item shrink-0 w-[82vw]">
            {view.node}
            <figcaption className="wy-label mt-2">{label[view.key]}</figcaption>
          </figure>
        ))}
      </div>

      {/* Desktop: one large view with a hairline tab row underneath. */}
      <div className="hidden sm:block">
        {views.map((view, index) => (
          <div key={view.key} hidden={index !== active}>
            {view.node}
          </div>
        ))}

        <div role="tablist" aria-label={t("gallery")} className="flex mt-3">
          {views.map((view, index) => (
            <button
              key={view.key}
              type="button"
              role="tab"
              id={`wy-view-${view.key}`}
              aria-selected={index === active}
              aria-controls={`wy-panel-${view.key}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setActive((index + 1) % views.length);
                if (event.key === "ArrowLeft") setActive((index - 1 + views.length) % views.length);
              }}
              className="flex-1 py-2.5 text-[var(--text-meta)] text-left"
              style={{
                borderTop: `1px solid ${index === active ? "var(--color-pine)" : "var(--rule)"}`,
                color: index === active ? "var(--color-ink)" : "var(--color-stone)",
              }}
            >
              {label[view.key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
