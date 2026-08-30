import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getMapRegions } from "@/lib/catalog";

/**
 * A relief of the sourcing area, not a survey map: Yunnan to the west, Fujian
 * and Guangdong to the east, drawn as terrace contours in hairline. Each point
 * filters the register to that area.
 *
 * The contours are generated from a fixed sum of sines rather than drawn by
 * hand, so the relief reads as terrain instead of as a chart, and stays
 * identical between server and client.
 */
const W = 100;

function terrace(baseY: number, amplitude: number, phase: number): string {
  const points: string[] = [];
  for (let x = 2; x <= 98; x += 2) {
    const t = x / W;
    const y =
      baseY -
      amplitude * (Math.sin(t * 7.4 + phase) * 0.6 + Math.sin(t * 3.1 + phase * 1.7) * 0.4) -
      // Yunnan is the higher, more folded half; the relief follows that.
      amplitude * 0.7 * Math.exp(-Math.pow((t - 0.26) / 0.22, 2));
    points.push(`${x} ${y.toFixed(2)}`);
  }
  return `M${points.join("L")}`;
}

/** Closed contour rings around a peak, for the two highest massifs. */
function ring(cx: number, cy: number, rx: number, ry: number, wobble: number): string {
  const points: string[] = [];
  for (let a = 0; a <= 360; a += 15) {
    const r = (a * Math.PI) / 180;
    const w = 1 + Math.sin(r * 3 + wobble) * 0.14 + Math.sin(r * 5 + wobble * 2) * 0.07;
    points.push(`${(cx + Math.cos(r) * rx * w).toFixed(2)} ${(cy + Math.sin(r) * ry * w).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

export async function OriginMap({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("home");
  const regions = getMapRegions();

  const contours = Array.from({ length: 11 }, (_, i) =>
    terrace(12 + i * 4.4, 3.6 - i * 0.16, i * 0.42),
  );

  return (
    <figure className="mt-12">
      <svg
        viewBox="0 0 100 62"
        className="w-full h-auto"
        role="img"
        aria-label={t("originTitle")}
        style={{ overflow: "visible" }}
      >
        <g stroke="var(--color-sage)" fill="none" strokeWidth="0.2" strokeLinecap="round">
          {contours.map((d, i) => (
            <path key={i} d={d} opacity={0.32 + i * 0.045} />
          ))}
        </g>

        <g stroke="var(--color-sage)" fill="none" strokeWidth="0.26" opacity="0.85">
          {[10, 7.4, 4.8, 2.4].map((r, i) => (
            <path key={`a${i}`} d={ring(21, 26, r * 1.25, r * 0.8, 0.6)} />
          ))}
          {[8, 5.6, 3.2].map((r, i) => (
            <path key={`b${i}`} d={ring(78, 22, r * 1.2, r * 0.72, 2.1)} />
          ))}
          {[6.6, 4.2].map((r, i) => (
            <path key={`c${i}`} d={ring(45, 44, r * 1.3, r * 0.7, 1.3)} />
          ))}
        </g>

        {regions.map((region) => {
          const x = 4 + (region.x / 100) * 92;
          const y = 6 + (region.y / 100) * 46;
          return (
            <Link
              key={region.id}
              href={{ pathname: "/thee", query: { region: region.id } }}
              className="wy-map-point"
              aria-label={region.name}
            >
              <circle cx={x} cy={y} r="4" fill="transparent" />
              <circle cx={x} cy={y} r="1.05" fill="var(--color-pine)" className="wy-map-dot" />
              <circle
                cx={x}
                cy={y}
                r="2.9"
                fill="none"
                stroke="var(--color-pine)"
                strokeWidth="0.24"
                className="wy-map-ring"
              />
              <text
                x={x}
                y={y - 3.2}
                textAnchor="middle"
                fill="var(--color-ink)"
                style={{ fontSize: "2.6px", fontFamily: "var(--font-sans)" }}
              >
                {region.name}
              </text>
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="var(--color-stone)"
                style={{ fontSize: "2.2px", fontFamily: "var(--font-hanzi)" }}
              >
                {region.hanzi}
              </text>
            </Link>
          );
        })}
      </svg>

      <figcaption className="wy-meta mt-8">
        {[...new Set(regions.map((r) => r.province[locale]))].map((province) => (
          <span key={province}>{province}</span>
        ))}
      </figcaption>
    </figure>
  );
}
