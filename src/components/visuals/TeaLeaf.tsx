import type { CSSProperties } from "react";

/**
 * The leaf.
 *
 * Camellia sinensis has an elliptic-lanceolate leaf with a serrated margin, a
 * midrib that is never quite straight and two blades that are never quite the
 * same width. It is drawn here as three parts — midrib, right blade, left
 * blade — rather than one silhouette, and that is the whole point: the blades
 * are separate paths sharing an origin on the midrib, so `scaleX` on each of
 * them opens the leaf the way hot water does. It is the one shape on this site
 * that can be animated without the animation meaning nothing: a furled leaf is
 * a dry leaf, an open leaf is a brewed one.
 *
 * Everything animated is `transform` on those two blades, so the unfurl runs
 * on the compositor and costs no layout.
 */

/** Blades scale about this point: the midrib, not the bounding box. */
export const LEAF_ORIGIN = "17px 16px";

export const LEAF_BLADE_RIGHT =
  "M17.2 3.2C22.4 8.2 25.6 15.4 22.4 22.6c-1.6 3.8-4.2 6-6.4 6.9.3-6.9.6-17.7 1.2-26.3Z";
export const LEAF_BLADE_LEFT =
  "M17.2 3.2C12.4 7.6 8.2 14.4 10.4 21.6c1.2 4 3.6 6.8 5.6 7.9.3-6.9.6-17.7 1.2-26.3Z";
export const LEAF_MIDRIB = "M16 29.5c.3-6.9.6-17.7 1.2-26.3";
export const LEAF_STEM = "M16 29.4 15.2 31.6";

/** Three veins a side, springing from the midrib and opening with the blade. */
const VEINS_RIGHT = [
  "M16.9 8.2c1.9 1 3.2 2.3 4 3.9",
  "M16.6 13.8c2.4 1.1 4 2.6 5 4.5",
  "M16.3 19.6c2.1 1 3.5 2.3 4.4 4",
];
const VEINS_LEFT = [
  "M16.9 9.4c-1.7 1.1-2.8 2.5-3.4 4.1",
  "M16.6 15.2c-2 1.3-3.3 2.9-4 4.8",
  "M16.3 21c-1.7 1.2-2.8 2.6-3.4 4.2",
];

/** The drawing's own box, trimmed to the leaf: no empty margin to letterbox. */
const VIEW_BOX = "6.4 1.4 19.2 32";
const ASPECT = 19.2 / 32;

export interface TeaLeafProps {
  /** Height of the leaf. The width follows from the drawing, not from a square. */
  size?: number | string;
  /** Blade fill. Defaults to a wash pale enough to sit under text. */
  tone?: string;
  /** Midrib and outline. */
  edge?: string;
  /** 0 = furled tight against the midrib, 1 = fully open. Omit to let CSS say. */
  open?: number;
  veins?: boolean;
  /** False draws the blades as two washes with no line at all: a watermark. */
  outline?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Present only on a leaf that carries a meaning of its own. */
  title?: string;
}

export function TeaLeaf({
  size = 32,
  tone = "color-mix(in srgb, var(--color-sage) 55%, transparent)",
  edge = "var(--color-pine)",
  open,
  veins = true,
  outline = true,
  className,
  style,
  title,
}: TeaLeafProps) {
  // No inline transform when `open` is left out, so a CSS class or keyframe is
  // free to drive the blades without fighting an inline declaration.
  const blade = (): CSSProperties => ({
    transformBox: "view-box",
    transformOrigin: LEAF_ORIGIN,
    ...(open === undefined ? null : { transform: `scaleX(${open})` }),
  });

  return (
    <svg
      viewBox={VIEW_BOX}
      width={typeof size === "number" ? Math.round(size * ASPECT) : size}
      height={size}
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      fill="none"
      {...(title ? { role: "img" as const } : { "aria-hidden": true, focusable: false })}
    >
      {title ? <title>{title}</title> : null}
      <g
        stroke={outline ? edge : "none"}
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <g className="wy-leaf-blade wy-leaf-blade-r" style={blade()}>
          <path d={LEAF_BLADE_RIGHT} fill={tone} />
          {veins && outline ? (
            <g opacity={0.55} strokeWidth={0.6}>
              {VEINS_RIGHT.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          ) : null}
        </g>
        <g className="wy-leaf-blade wy-leaf-blade-l" style={blade()}>
          <path d={LEAF_BLADE_LEFT} fill={tone} />
          {veins && outline ? (
            <g opacity={0.55} strokeWidth={0.6}>
              {VEINS_LEFT.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          ) : null}
        </g>
        {outline ? (
          <>
            <path d={LEAF_MIDRIB} />
            <path d={LEAF_STEM} />
          </>
        ) : null}
      </g>
    </svg>
  );
}
