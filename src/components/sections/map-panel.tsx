"use client";

import * as React from "react";
import { ArrowUpRight, Map as MapIcon } from "lucide-react";
import { site } from "@/lib/site";

const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
  site.geo.lng - 0.006
}%2C${site.geo.lat - 0.003}%2C${site.geo.lng + 0.006}%2C${
  site.geo.lat + 0.003
}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`;

/**
 * The interactive map is mounted on demand: the section stays fast on first
 * paint and never shows a broken third-party frame.
 */
export function MapPanel() {
  const [live, setLive] = React.useState(false);

  return (
    <div className="group relative h-full min-h-[380px] overflow-hidden rounded-[24px] border border-sand/50 bg-cream lg:min-h-[560px]">
      {live ? (
        <iframe
          title={`Карта — ${site.name}, ${site.addressLatin}`}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full grayscale-[85%] contrast-[1.03]"
        />
      ) : (
        <>
          {/* Stylised plan of the district */}
          <svg
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 size-full"
            aria-hidden
          >
            <rect width="800" height="600" fill="#f7f7f7" />
            <g stroke="#111111" strokeOpacity="0.06" strokeWidth="1">
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="600" />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 64} x2="800" y2={i * 64} />
              ))}
            </g>
            <path
              d="M-20 420 C 160 380, 300 300, 420 300 S 700 250, 830 190"
              fill="none"
              stroke="#111111"
              strokeOpacity="0.09"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M240 -20 L 300 620"
              fill="none"
              stroke="#111111"
              strokeOpacity="0.07"
              strokeWidth="18"
            />
            <path
              d="M-20 180 L 820 260"
              fill="none"
              stroke="#111111"
              strokeOpacity="0.05"
              strokeWidth="14"
            />
            <rect
              x="520"
              y="360"
              width="180"
              height="130"
              rx="12"
              fill="#c2c6ca"
              fillOpacity="0.28"
            />
            <rect
              x="90"
              y="90"
              width="120"
              height="90"
              rx="10"
              fill="#111111"
              fillOpacity="0.03"
            />

            {/* Marker */}
            <g transform="translate(400 292)">
              <circle r="46" fill="#c2c6ca" fillOpacity="0.22" />
              <circle r="26" fill="#c2c6ca" fillOpacity="0.35" />
              <circle r="9" fill="#4b5158" />
              <circle r="3.4" fill="#ffffff" />
            </g>
          </svg>

          <button
            type="button"
            onClick={() => setLive(true)}
            className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-[14px] font-medium text-ink shadow-[0_10px_30px_-18px_rgba(17,17,17,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60"
          >
            <MapIcon className="size-4" strokeWidth={1.5} />
            Інтерактивна карта
          </button>
        </>
      )}

      <a
        href={site.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 rounded-[20px] glass p-4 shadow-[0_20px_50px_-30px_rgba(17,17,17,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 sm:right-auto sm:pr-8"
      >
        <span>
          <span className="block text-[11px] uppercase tracking-[0.18em] text-ink/85">
            Прокласти маршрут
          </span>
          <span className="mt-1 block font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
            {site.addressLatin}
          </span>
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-ink" strokeWidth={1.5} />
      </a>
    </div>
  );
}
