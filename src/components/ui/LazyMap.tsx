"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mapsEmbedUrl, site } from "@/lib/site";

/**
 * Карта Google вставляється лише тоді, коли користувач до неї доходить.
 *
 * Вбудований iframe тягне за собою кілька сотень кілобайт чужого JS і тайлів,
 * тому тримати його в початковому завантаженні немає сенсу: до секції контактів
 * доходить не кожен. Поки карти немає — на місці стоїть оформлена заглушка,
 * тож висота блоку не стрибає.
 */
export function LazyMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {show ? (
        <iframe
          title={`Карта: ${site.name}, ${site.address.full}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="size-full border-0 grayscale-[35%] transition-all duration-700 group-hover:grayscale-0"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="grid size-full place-items-center bg-linear-to-br from-graphite-100 via-graphite-50 to-brand-50"
          >
            <MapPin className="size-8 text-brand-300" strokeWidth={1.8} />
          </div>
          <noscript>
            <iframe
              title={`Карта: ${site.name}, ${site.address.full}`}
              src={mapsEmbedUrl}
              loading="lazy"
              className="absolute inset-0 size-full border-0"
            />
          </noscript>
        </>
      )}
    </div>
  );
}
