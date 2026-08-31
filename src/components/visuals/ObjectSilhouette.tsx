/**
 * Line drawings of the eight pieces of teaware. Each object is drawn on its own
 * rather than recoloured from one template, because a shop that draws its own
 * gaiwan looks different from one that does not.
 *
 * All drawings sit in a 200 x 200 box, stroked, never filled.
 */
const S = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ObjectSilhouette({ slug, stroke }: { slug: string; stroke: string }) {
  const common = { ...S, stroke, strokeWidth: 1.6 };

  switch (slug) {
    case "gaiwan-porselein-110":
      return (
        <g {...common}>
          {/* lid, bowl, saucer */}
          <path d="M62 74c0-13 17-23 38-23s38 10 38 23" />
          <path d="M100 44v7" />
          <ellipse cx="100" cy="74" rx="38" ry="7" />
          <path d="M64 82c2 24 10 40 36 40s34-16 36-40" />
          <ellipse cx="100" cy="82" rx="36" ry="6.5" />
          <path d="M58 138c0-6 19-10 42-10s42 4 42 10-19 10-42 10-42-4-42-10Z" />
          <path d="M74 138h52" strokeWidth="0.9" opacity="0.5" />
        </g>
      );
    case "yixing-zhuni-100":
      return (
        <g {...common}>
          <path d="M66 84c-4 16 0 34 12 42 8 5 36 5 44 0 12-8 16-26 12-42" />
          <ellipse cx="100" cy="84" rx="34" ry="9" />
          <path d="M86 72h28l-3 10H89Z" />
          <path d="M100 66v6" />
          <path d="M134 92c14 2 20 10 20 20" />
          <path d="M66 96c-10 2-16 8-16 16 0 8 6 12 12 12" />
          <path d="M78 128h44" strokeWidth="0.9" opacity="0.5" />
        </g>
      );
    case "chahai-glas":
      return (
        <g {...common}>
          <path d="M68 66h64l-8 62c-1 8-8 12-24 12s-23-4-24-12Z" />
          <ellipse cx="100" cy="66" rx="32" ry="7" />
          <path d="M132 70l14-6-10 12" />
          <path d="M76 108h48" strokeWidth="0.9" opacity="0.45" />
          <path d="M79 118h42" strokeWidth="0.9" opacity="0.3" />
        </g>
      );
    case "pialas-set-vier":
      return (
        <g {...common}>
          {[
            [58, 78],
            [142, 78],
            [58, 132],
            [142, 132],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <ellipse cx={cx} cy={cy} rx="26" ry="7" />
              <path d={`M${cx - 26} ${cy}c1 14 6 22 26 22s25-8 26-22`} />
            </g>
          ))}
        </g>
      );
    case "chaban-bamboe":
      return (
        <g {...common}>
          <path d="M32 92h136v40H32Z" />
          <path d="M32 92l18-14h100l18 14" />
          <path d="M50 78v54" opacity="0.4" strokeWidth="0.9" />
          <path d="M150 78v54" opacity="0.4" strokeWidth="0.9" />
          {[46, 62, 78, 94, 110, 126, 142, 158].map((x) => (
            <path key={x} d={`M${x} 92v40`} strokeWidth="0.8" opacity="0.35" />
          ))}
          <path d="M32 132h136v10H32Z" />
        </g>
      );
    case "chasen-bamboe":
      return (
        <g {...common}>
          <path d="M88 44h24v40H88Z" />
          <path d="M94 44v40M100 44v40M106 44v40" strokeWidth="0.8" opacity="0.45" />
          {Array.from({ length: 15 }, (_, i) => {
            const t = (i / 14 - 0.5) * 2;
            return (
              <path
                key={i}
                d={`M${100 + t * 11} 84C${100 + t * 30} 108 ${100 + t * 34} 128 ${100 + t * 22} 150`}
                strokeWidth="0.9"
              />
            );
          })}
        </g>
      );
    case "chawan-steengoed":
      return (
        <g {...common}>
          <ellipse cx="100" cy="72" rx="52" ry="12" />
          <path d="M48 72c2 32 14 54 52 54s50-22 52-54" />
          <path d="M84 132h32" />
          <path d="M84 132v8h32v-8" />
          <path d="M62 92c14 6 62 6 76 0" strokeWidth="0.9" opacity="0.35" />
        </g>
      );
    case "weegschaal-01g":
      return (
        <g {...common}>
          <path d="M42 92h116v42H42Z" />
          <path d="M42 92l10-10h96l10 10" />
          <path d="M64 108h48v14H64Z" />
          <path d="M70 115h6M82 115h10M98 115h8" strokeWidth="1.2" opacity="0.7" />
          <circle cx="136" cy="115" r="6" />
          <path d="M56 138v6M144 138v6" />
        </g>
      );
    case "ijzeren-ketel-12l":
      return (
        <g {...common}>
          <path d="M60 96c-4 22 2 40 16 46 10 5 38 5 48 0 14-6 20-24 16-46" />
          <ellipse cx="100" cy="96" rx="40" ry="10" />
          <path d="M86 82h28l-4 8H90Z" />
          <path d="M64 88c6-22 66-22 72 0" />
          <path d="M140 104c12 4 16 12 14 22" />
          <path d="M82 148h36" strokeWidth="0.9" opacity="0.5" />
        </g>
      );
    default:
      return (
        <g {...common}>
          <ellipse cx="100" cy="80" rx="38" ry="9" />
          <path d="M62 80c2 28 12 46 38 46s36-18 38-46" />
        </g>
      );
  }
}
