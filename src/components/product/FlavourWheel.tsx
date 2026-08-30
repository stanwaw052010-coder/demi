import { getTranslations } from "next-intl/server";
import type { LiquorKey, Product } from "@content/types";
import { flavourAxes } from "@content/taxonomy";
import { flavourProfile } from "@/lib/catalog";
import { liquorHex } from "@/lib/liquor";

/**
 * Six axes, one point per axis, filled in the tea's own liquor colour. It plots
 * where the tasting notes gather rather than inventing scores: the value on an
 * axis is how many of this tea's notes belong to it.
 */
export async function FlavourWheel({
  product,
  liquor,
}: {
  product: Product;
  liquor: LiquorKey;
}) {
  const t = await getTranslations("product");
  const axisT = await getTranslations("flavourAxis");
  const flavourT = await getTranslations("flavour");

  const profile = flavourProfile(product);
  const peak = Math.max(1, ...Object.values(profile));
  const size = 260;
  const c = size / 2;
  const radius = size * 0.34;

  const point = (index: number, value: number) => {
    const angle = (index / flavourAxes.length) * Math.PI * 2 - Math.PI / 2;
    const r = (0.22 + 0.78 * (value / peak)) * radius;
    return [c + Math.cos(angle) * r, c + Math.sin(angle) * r] as const;
  };

  const shape = flavourAxes
    .map((axis, i) => point(i, profile[axis]).map((n) => n.toFixed(1)).join(" "))
    .join("L");

  return (
    <section aria-labelledby="wy-wheel">
      <h2 id="wy-wheel" className="wy-label pb-2 wy-rule-b">
        {t("wheel")}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-6">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: "min(16rem, 100%)", flex: "none" }}
          role="img"
          aria-label={`${t("wheel")}: ${flavourAxes.map((a) => `${axisT(a)} ${profile[a]}`).join(", ")}`}
        >
          {[0.4, 0.7, 1].map((ring) => (
            <polygon
              key={ring}
              points={flavourAxes
                .map((_, i) => {
                  const angle = (i / flavourAxes.length) * Math.PI * 2 - Math.PI / 2;
                  return `${c + Math.cos(angle) * radius * ring},${c + Math.sin(angle) * radius * ring}`;
                })
                .join(" ")}
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="0.7"
              opacity={0.6}
            />
          ))}

          {flavourAxes.map((axis, i) => {
            const angle = (i / flavourAxes.length) * Math.PI * 2 - Math.PI / 2;
            const lx = c + Math.cos(angle) * (radius + 26);
            const ly = c + Math.sin(angle) * (radius + 26);
            return (
              <g key={axis}>
                <line
                  x1={c}
                  y1={c}
                  x2={c + Math.cos(angle) * radius}
                  y2={c + Math.sin(angle) * radius}
                  stroke="var(--color-sage)"
                  strokeWidth="0.7"
                  opacity={0.6}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--color-stone)"
                  style={{ fontSize: "11px", fontFamily: "var(--font-sans)" }}
                >
                  {axisT(axis)}
                </text>
              </g>
            );
          })}

          <path
            d={`M${shape}Z`}
            fill={liquorHex[liquor]}
            fillOpacity="0.42"
            stroke={liquorHex[liquor]}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>

        <div className="min-w-0">
          <p className="wy-label">{t("notes")}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {product.notes.map((note) => (
              <li
                key={note}
                className="text-[1rem] text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {flavourT(note)}
              </li>
            ))}
          </ul>
          <p className="wy-label mt-5" style={{ maxWidth: "28ch" }}>
            {t("wheelHint")}
          </p>
        </div>
      </div>
    </section>
  );
}
