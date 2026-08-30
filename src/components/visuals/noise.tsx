/**
 * One turbulence filter, defined once per page and referenced by id. Used for
 * the grain over generated compositions and for the infusion stain in the hero.
 */
export function NoiseDefs({ id = "wy-noise" }: { id?: string }) {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

/** A deterministic pseudo-random generator so a slug always draws the same. */
export function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}
