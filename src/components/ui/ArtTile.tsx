import { cn } from "@/lib/utils";

type Art = "arc" | "bloom" | "wave" | "orbit" | "grid" | "drop";

/**
 * Абстрактні візуали студії у фірмовій синій гамі.
 * Використовуються, доки на плитку не додано реальне фото (див. GalleryItem.src).
 * Повністю векторні: без зовнішніх запитів, без CLS, без втрат у Lighthouse.
 */
export function ArtTile({ art, className }: { art: Art; className?: string }) {
  const id = `art-${art}`;

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1b44" />
          <stop offset="55%" stopColor="#16368c" />
          <stop offset="100%" stopColor="#1f53dc" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9ad9ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9ad9ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c2e7ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c2e7ff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#${id}-bg)`} />

      {art === "arc" && (
        <g>
          <circle cx="60" cy="360" r="330" fill={`url(#${id}-glow)`} opacity="0.5" />
          {[70, 130, 190, 250, 310, 370].map((r, i) => (
            <circle
              key={r}
              cx="60"
              cy="360"
              r={r}
              fill="none"
              stroke={`url(#${id}-line)`}
              strokeWidth={i % 2 === 0 ? 1.6 : 0.8}
              opacity={0.75 - i * 0.09}
            />
          ))}
          <circle cx="286" cy="112" r="30" fill="#c2e7ff" opacity="0.16" />
        </g>
      )}

      {art === "bloom" && (
        <g>
          <circle cx="150" cy="150" r="200" fill={`url(#${id}-glow)`} opacity="0.5" />
          <ellipse cx="150" cy="200" rx="118" ry="150" fill="#74c4ff" opacity="0.16" transform="rotate(-28 150 200)" />
          <ellipse cx="230" cy="180" rx="118" ry="150" fill="#c2e7ff" opacity="0.13" transform="rotate(22 230 180)" />
          <ellipse cx="196" cy="240" rx="96" ry="126" fill="#ffffff" opacity="0.08" transform="rotate(-6 196 240)" />
          <circle cx="196" cy="196" r="7" fill="#ffffff" opacity="0.7" />
        </g>
      )}

      {art === "wave" && (
        <g fill="none" stroke={`url(#${id}-line)`}>
          <circle cx="330" cy="80" r="220" fill={`url(#${id}-glow)`} opacity="0.35" stroke="none" />
          {Array.from({ length: 11 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${90 + i * 26} C 90 ${40 + i * 26}, 190 ${150 + i * 26}, 420 ${60 + i * 26}`}
              strokeWidth={i % 3 === 0 ? 1.8 : 0.9}
              opacity={0.55 - i * 0.03}
            />
          ))}
        </g>
      )}

      {art === "orbit" && (
        <g>
          <circle cx="200" cy="200" r="210" fill={`url(#${id}-glow)`} opacity="0.4" />
          {[
            [150, 46, -18],
            [120, 78, 26],
            [88, 118, -42],
          ].map(([rx, ry, rot]) => (
            <ellipse
              key={`${rx}-${ry}`}
              cx="200"
              cy="200"
              rx={rx}
              ry={ry}
              fill="none"
              stroke={`url(#${id}-line)`}
              strokeWidth="1.4"
              opacity="0.6"
              transform={`rotate(${rot} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="34" fill="#ffffff" opacity="0.12" />
          <circle cx="200" cy="200" r="9" fill="#c2e7ff" opacity="0.85" />
          <circle cx="332" cy="146" r="6" fill="#ffffff" opacity="0.75" />
        </g>
      )}

      {art === "grid" && (
        <g>
          <circle cx="300" cy="300" r="240" fill={`url(#${id}-glow)`} opacity="0.35" />
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 12 }).map((__, col) => (
              <circle
                key={`${row}-${col}`}
                cx={26 + col * 32}
                cy={26 + row * 32}
                r={row + col > 12 ? 3 : 1.6}
                fill="#c2e7ff"
                opacity={0.16 + (row + col) * 0.022}
              />
            )),
          )}
          <rect
            x="188"
            y="188"
            width="164"
            height="164"
            rx="34"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="1.6"
          />
        </g>
      )}

      {art === "drop" && (
        <g>
          <circle cx="220" cy="120" r="220" fill={`url(#${id}-glow)`} opacity="0.42" />
          <path
            d="M200 40c62 78 96 126 96 168a96 96 0 1 1-192 0c0-42 34-90 96-168Z"
            fill="#ffffff"
            opacity="0.1"
          />
          <path
            d="M200 92c44 56 68 90 68 120a68 68 0 1 1-136 0c0-30 24-64 68-120Z"
            fill="none"
            stroke={`url(#${id}-line)`}
            strokeWidth="1.6"
          />
          <circle cx="176" cy="228" r="18" fill="#c2e7ff" opacity="0.35" />
          <circle cx="238" cy="268" r="8" fill="#ffffff" opacity="0.55" />
        </g>
      )}
    </svg>
  );
}
