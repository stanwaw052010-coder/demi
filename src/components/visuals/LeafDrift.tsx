import { TeaLeaf } from "./TeaLeaf";

/**
 * Five leaves falling through the hero, and no more than five.
 *
 * The reason this is not the naff falling-leaves effect: each leaf is three
 * nested elements running three unrelated animations — a linear fall, a slow
 * lateral sway on its own period, and a tumble about the leaf's long axis —
 * so no two leaves ever repeat the same path and none of them slides. All of
 * it is transform and opacity on five elements, and the whole layer is masked
 * away from the middle of the screen so it never sits behind the headline.
 *
 * Under prefers-reduced-motion the layer is not rendered as motion at all: the
 * leaves hold still where they are (see globals.css).
 */

interface Drift {
  x: string;
  size: number;
  /** Seconds for one fall. */
  fall: number;
  /** Negative, so the layer is already in motion on first paint. */
  delay: number;
  sway: number;
  swayDuration: number;
  spin: number;
  opacity: number;
  /** Where the leaf comes to rest when motion is switched off. */
  rest: string;
}

const LEAVES: Drift[] = [
  { x: "8%", size: 46, fall: 31, delay: -4, sway: 30, swayDuration: 6.5, spin: 13, opacity: 0.78, rest: "7rem" },
  { x: "24%", size: 30, fall: 43, delay: -21, sway: 46, swayDuration: 9.5, spin: 21, opacity: 0.5, rest: "21rem" },
  { x: "63%", size: 38, fall: 36, delay: -13, sway: 38, swayDuration: 7.5, spin: 17, opacity: 0.66, rest: "27rem" },
  { x: "81%", size: 56, fall: 27, delay: -9, sway: 26, swayDuration: 5.5, spin: 11, opacity: 0.85, rest: "5rem" },
  { x: "93%", size: 26, fall: 47, delay: -30, sway: 52, swayDuration: 11, spin: 25, opacity: 0.44, rest: "16rem" },
];

export function LeafDrift() {
  return (
    <div className="wy-leaf-layer" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <span
          key={leaf.x}
          className="wy-leaf-fall"
          style={{
            left: leaf.x,
            opacity: leaf.opacity,
            animationDuration: `${leaf.fall}s`,
            animationDelay: `${leaf.delay}s`,
            ["--wy-rest" as string]: leaf.rest,
          }}
        >
          <span
            className="wy-leaf-sway"
            style={{
              ["--wy-sway" as string]: `${leaf.sway}px`,
              animationDuration: `${leaf.swayDuration}s`,
            }}
          >
            <span
              className="wy-leaf-spin"
              style={{ animationDuration: `${leaf.spin}s` }}
            >
              <TeaLeaf
                size={leaf.size}
                tone="color-mix(in srgb, var(--color-sage) 78%, transparent)"
                edge="color-mix(in srgb, var(--color-pine) 80%, transparent)"
                veins={leaf.size >= 30}
              />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
