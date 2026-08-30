import type { LiquorKey } from "@content/types";

/**
 * The real colour of the brewed cup, per tea type. This is an information
 * scale, not a decorative palette: it drives the drop in the register, the fill
 * of the gongfu timer, the eight panels on the home page and the generated
 * imagery. Keep in sync with the `--liquor-*` custom properties in globals.css.
 */
export const liquorHex: Record<LiquorKey, string> = {
  green: "#D8DCA6",
  white: "#EBE4C0",
  oolong: "#D9A85C",
  red: "#A44A2A",
  shou: "#4A2318",
  sheng: "#C9942F",
  matcha: "#7FA23F",
  yellow: "#DFCE87",
  neutral: "#C9D2C2",
};

export const liquorVar = (key: LiquorKey) => `var(--liquor-${key})`;

/** Parse "#RRGGBB" into an [r, g, b] triplet. */
function toRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: [number, number, number]): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = toRgb(a);
  const [br, bg, bb] = toRgb(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

/**
 * How strongly an infusion pulls colour, across a session. The first infusion
 * is pale because the leaf has not opened; three to five are the peak; from
 * about eight it fades again. This curve is what the timer animates, and it is
 * the reason the timer is information rather than decoration.
 *
 * @param index 1-based infusion number
 * @param total how many infusions this tea carries
 * @returns 0-1, where 1 is the tea's full liquor colour
 */
export function infusionStrength(index: number, total: number): number {
  if (total <= 1) return 1;
  const peak = Math.min(4, Math.max(2, Math.round(total * 0.35)));
  if (index <= peak) {
    // Rises quickly from a pale first pour to the peak.
    const t = (index - 1) / Math.max(1, peak - 1);
    return 0.42 + 0.58 * t;
  }
  // Then falls away, but never to nothing while the leaf still gives.
  const t = (index - peak) / Math.max(1, total - peak);
  return 1 - 0.55 * t * t;
}

const PALE = "#F6F7EE";

/** The colour of a specific infusion of a specific tea. */
export function infusionColour(key: LiquorKey, index: number, total: number): string {
  return mix(PALE, liquorHex[key], infusionStrength(index, total));
}

/**
 * A two-stop gradient standing in for a cup of this liquor, used by the
 * generated imagery. Gradients are only ever allowed to depict liquor.
 */
export function liquorGradient(key: LiquorKey): string {
  const base = liquorHex[key];
  return `radial-gradient(60% 60% at 38% 30%, ${mix(base, "#FFFFFF", 0.42)} 0%, ${base} 58%, ${mix(base, "#000000", 0.28)} 100%)`;
}
