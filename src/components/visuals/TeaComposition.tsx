import { liquorHex } from "@/lib/liquor";
import type { Form, LiquorKey } from "@content/types";
import { ObjectSilhouette } from "./ObjectSilhouette";
import { seeded } from "./noise";

export type CompositionView = "dry" | "liquor" | "wet" | "pack";

interface Props {
  slug: string;
  form: Form;
  liquor: LiquorKey;
  view?: CompositionView;
  className?: string;
}

/**
 * There are no photographs, so the image layer is drawn. Each form gets its own
 * construction — a cake is concentric compressed leaf, loose leaf is vein
 * macro, matcha is a stipple field, teaware is a line drawing — and the four
 * gallery views change what is drawn rather than recolouring one template.
 *
 * Everything is deterministic from the slug, so server and client agree.
 */
export function TeaComposition({ slug, form, liquor, view = "dry", className }: Props) {
  const rand = seeded(`${slug}:${view}`);
  const colour = liquorHex[liquor];
  const gradientId = `grad-${slug}-${view}`;
  const clipId = `clip-${slug}-${view}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="presentation"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        {/* A gradient is allowed here because it depicts liquor. */}
        <radialGradient id={gradientId} cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor={colour} stopOpacity="0.92" />
          <stop offset="62%" stopColor={colour} stopOpacity="0.7" />
          <stop offset="100%" stopColor={colour} stopOpacity="0.38" />
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="66" />
        </clipPath>
      </defs>

      <rect width="200" height="200" fill="var(--color-mist)" opacity="0.55" />

      {view === "liquor" ? (
        <Liquor gradientId={gradientId} clipId={clipId} rand={rand} colour={colour} />
      ) : form === "object" || form === "voucher" ? (
        <Object slug={slug} view={view} />
      ) : form === "powder" ? (
        <Powder colour={colour} rand={rand} view={view} />
      ) : form === "cake" || form === "tuocha" || form === "brick" ? (
        <Cake colour={colour} rand={rand} view={view} />
      ) : (
        <Leaf colour={colour} rand={rand} view={view} />
      )}
    </svg>
  );
}

/* ── The cup seen from above ─────────────────────────────────────────────── */
function Liquor({
  gradientId,
  clipId,
  rand,
  colour,
}: {
  gradientId: string;
  clipId: string;
  rand: () => number;
  colour: string;
}) {
  return (
    <>
      <circle cx="100" cy="100" r="66" fill={`url(#${gradientId})`} />
      <g clipPath={`url(#${clipId})`} opacity="0.32">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse
            key={i}
            cx={80 + rand() * 40}
            cy={80 + rand() * 40}
            rx={18 + rand() * 30}
            ry={12 + rand() * 22}
            fill="none"
            stroke={colour}
            strokeWidth="0.8"
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="66" fill="none" stroke="var(--color-sage)" strokeWidth="1.1" />
      <circle cx="100" cy="100" r="74" fill="none" stroke="var(--color-sage)" strokeWidth="0.7" opacity="0.5" />
    </>
  );
}

/* ── Pressed disc: concentric compression rings and radial leaf ──────────── */
function Cake({
  colour,
  rand,
  view,
}: {
  colour: string;
  rand: () => number;
  view: CompositionView;
}) {
  const rings = view === "pack" ? 3 : 7;
  return (
    <>
      {view === "pack" ? (
        <>
          <rect x="34" y="34" width="132" height="132" rx="2" fill="var(--color-paper)" stroke="var(--color-sage)" strokeWidth="1.2" />
          <path d="M34 66h132M34 134h132" stroke="var(--color-sage)" strokeWidth="0.7" opacity="0.6" />
          <circle cx="100" cy="100" r="26" fill="none" stroke={colour} strokeWidth="1.1" />
          <path d="M100 88v24M88 100h24" stroke={colour} strokeWidth="1.1" strokeLinecap="round" />
        </>
      ) : null}

      <circle
        cx="100"
        cy="100"
        r="62"
        fill={colour}
        fillOpacity={view === "wet" ? 0.34 : 0.16}
        stroke="var(--color-sage)"
        strokeWidth="1.2"
      />

      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={12 + i * (48 / rings)}
          fill="none"
          stroke={colour}
          strokeWidth={0.7}
          opacity={0.5 - i * 0.04}
        />
      ))}

      {/* Radial leaf pressed into the disc. */}
      {Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2 + rand() * 0.14;
        const inner = 14 + rand() * 12;
        const outer = 44 + rand() * 17;
        const wobble = (rand() - 0.5) * 0.4;
        const x1 = 100 + Math.cos(angle) * inner;
        const y1 = 100 + Math.sin(angle) * inner;
        const x2 = 100 + Math.cos(angle + wobble) * outer;
        const y2 = 100 + Math.sin(angle + wobble) * outer;
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)} ${y1.toFixed(1)}Q${(100 + Math.cos(angle + wobble / 2) * ((inner + outer) / 2 + 5)).toFixed(1)} ${(100 + Math.sin(angle + wobble / 2) * ((inner + outer) / 2 + 5)).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
            fill="none"
            stroke={colour}
            strokeWidth={view === "wet" ? 1.5 : 1}
            strokeLinecap="round"
            opacity={0.34 + rand() * 0.4}
          />
        );
      })}

      {/* The dimple every pressed cake has on the back. */}
      <circle cx="100" cy="100" r="9" fill="var(--color-mist)" stroke="var(--color-sage)" strokeWidth="0.9" />
    </>
  );
}

/* ── Loose leaf: one macro leaf with its venation, plus scattered leaf ──────
   Every tea gets a different leaf: the rotation, the width, the taper and the
   number of vein pairs all come from the slug, so a shelf of loose teas does
   not look like one drawing in eight colours. ─────────────────────────────── */
function Leaf({
  colour,
  rand,
  view,
}: {
  colour: string;
  rand: () => number;
  view: CompositionView;
}) {
  const open = view === "wet";
  // Draw the shape parameters first so the scatter below uses fresh numbers.
  const tilt = -26 + rand() * 52;
  const width = 34 + rand() * 20 + (open ? 6 : 0);
  const top = (open ? 34 : 42) + rand() * 6;
  const bottom = 200 - top - (open ? 2 : 8);
  const veins = 7 + Math.floor(rand() * 5);
  const shoulder = 0.52 + rand() * 0.22;
  const midY = top + (bottom - top) * shoulder;

  return (
    <>
      {view === "pack" ? (
        <>
          <path
            d="M52 40h96v124c0 4-3 6-8 6H60c-5 0-8-2-8-6Z"
            fill="var(--color-paper)"
            stroke="var(--color-sage)"
            strokeWidth="1.2"
          />
          <path d="M52 58h96" stroke="var(--color-sage)" strokeWidth="0.8" opacity="0.6" />
          <path d="M66 128h68M66 140h44" stroke="var(--color-stone)" strokeWidth="0.8" opacity="0.5" />
        </>
      ) : null}

      <g transform={`translate(100 ${((top + bottom) / 2).toFixed(1)}) rotate(${tilt.toFixed(1)}) translate(-100 -${((top + bottom) / 2).toFixed(1)})`}>
        <path
          d={`M100 ${top.toFixed(1)}C${(100 + width).toFixed(1)} ${(top + (midY - top) * 0.55).toFixed(1)} ${(100 + width * 1.05).toFixed(1)} ${midY.toFixed(1)} 100 ${bottom.toFixed(1)}C${(100 - width * 1.05).toFixed(1)} ${midY.toFixed(1)} ${(100 - width).toFixed(1)} ${(top + (midY - top) * 0.55).toFixed(1)} 100 ${top.toFixed(1)}Z`}
          fill={colour}
          fillOpacity={open ? 0.3 : 0.14}
          stroke="var(--color-sage)"
          strokeWidth="1.3"
        />
        <path d={`M100 ${(top + 3).toFixed(1)}V${(bottom - 3).toFixed(1)}`} stroke={colour} strokeWidth="1.3" opacity="0.8" />

        {Array.from({ length: veins }, (_, i) => {
          const p = (i + 1) / (veins + 1);
          const y = top + (bottom - top) * p;
          // Widest in the middle of the blade, tapering to both tips.
          const spread = width * 0.82 * Math.sin(Math.PI * p) ** 0.75;
          const drop = 10 + (bottom - top) * 0.05;
          return (
            <g key={i} opacity={0.55}>
              <path
                d={`M100 ${y.toFixed(1)}Q${(100 + spread * 0.6).toFixed(1)} ${(y + drop * 0.35).toFixed(1)} ${(100 + spread).toFixed(1)} ${(y + drop).toFixed(1)}`}
                fill="none"
                stroke={colour}
                strokeWidth="0.85"
              />
              <path
                d={`M100 ${y.toFixed(1)}Q${(100 - spread * 0.6).toFixed(1)} ${(y + drop * 0.35).toFixed(1)} ${(100 - spread).toFixed(1)} ${(y + drop).toFixed(1)}`}
                fill="none"
                stroke={colour}
                strokeWidth="0.85"
              />
            </g>
          );
        })}

        {/* Serrated edge, which is what tells Camellia sinensis apart. */}
        {view !== "pack"
          ? Array.from({ length: 9 }, (_, i) => {
              const p = 0.15 + (i / 8) * 0.7;
              const y = top + (bottom - top) * p;
              const spread = width * 1.02 * Math.sin(Math.PI * p) ** 0.75;
              return (
                <g key={`s${i}`} opacity="0.4">
                  <path d={`M${(100 + spread).toFixed(1)} ${y.toFixed(1)}l3 -2`} stroke={colour} strokeWidth="0.7" />
                  <path d={`M${(100 - spread).toFixed(1)} ${y.toFixed(1)}l-3 -2`} stroke={colour} strokeWidth="0.7" />
                </g>
              );
            })
          : null}
      </g>

      {Array.from({ length: 11 }, (_, i) => {
        const x = 24 + rand() * 152;
        const y = 26 + rand() * 148;
        const a = rand() * 180;
        const len = 8 + rand() * 16;
        return (
          <path
            key={i}
            d={`M${x.toFixed(1)} ${y.toFixed(1)}q${(len * 0.5).toFixed(1)} ${(rand() * 6 - 3).toFixed(1)} ${len.toFixed(1)} ${(rand() * 4 - 2).toFixed(1)}`}
            transform={`rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`}
            fill="none"
            stroke={colour}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={0.3 + rand() * 0.35}
          />
        );
      })}
    </>
  );
}

/* ── Matcha: a stipple field and the flat floor of a chawan ──────────────── */
function Powder({
  colour,
  rand,
  view,
}: {
  colour: string;
  rand: () => number;
  view: CompositionView;
}) {
  return (
    <>
      {view === "pack" ? (
        <rect x="58" y="46" width="84" height="108" rx="1.5" fill="var(--color-paper)" stroke="var(--color-sage)" strokeWidth="1.2" />
      ) : null}
      <ellipse cx="100" cy="100" rx="64" ry="64" fill={colour} fillOpacity="0.2" stroke="var(--color-sage)" strokeWidth="1.2" />
      <ellipse cx="100" cy="100" rx="46" ry="46" fill="none" stroke="var(--color-sage)" strokeWidth="0.8" opacity="0.6" />
      {/* The whisk track: a W, the way the chasen actually moves. */}
      <path
        d="M66 116c10-30 16-30 22 0s14 30 24 0 16-30 22 0"
        fill="none"
        stroke={colour}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      {Array.from({ length: 150 }, (_, i) => {
        const angle = rand() * Math.PI * 2;
        const radius = Math.sqrt(rand()) * 60;
        return (
          <circle
            key={i}
            cx={(100 + Math.cos(angle) * radius).toFixed(1)}
            cy={(100 + Math.sin(angle) * radius).toFixed(1)}
            r={(0.5 + rand() * 1.1).toFixed(2)}
            fill={colour}
            opacity={0.25 + rand() * 0.5}
          />
        );
      })}
    </>
  );
}

function Object({ slug, view }: { slug: string; view: CompositionView }) {
  return (
    <>
      {view === "pack" ? (
        <rect x="30" y="46" width="140" height="112" rx="1.5" fill="var(--color-paper)" stroke="var(--color-sage)" strokeWidth="1.2" />
      ) : null}
      <ObjectSilhouette slug={slug} stroke="var(--color-pine)" />
      <path d="M28 168h144" stroke="var(--color-sage)" strokeWidth="1" opacity="0.7" />
    </>
  );
}
