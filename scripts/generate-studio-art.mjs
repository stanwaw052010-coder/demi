/**
 * Art generator for the ATELIER IVOIRE nail studio experience.
 *
 * Produces art-directed SVG compositions — sculptural hand studies with
 * lacquered nails, cropped like macro editorial photography — into
 * `public/studio/art`.
 *
 * Vector output keeps the whole gallery well under 300 KB, stays crisp at any
 * DPR, and can never yield a broken image or a layout shift. To swap in real
 * studio photography later, replace the `src` values in
 * `src/lib/studio/content.ts` — nothing else needs to change.
 *
 * Run: node scripts/generate-studio-art.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "public/studio/art");

/* ------------------------------------------------------------------ *
 * Palette
 * ------------------------------------------------------------------ */

const GROUND = {
  ivory: ["#F7F4EF", "#EAE3DA"],
  bone: ["#EFE8DE", "#DCD3C6"],
  clay: ["#E0D2C3", "#C5B2A1"],
  smoke: ["#E2DDD6", "#C0B8AD"],
  ink: ["#242221", "#131211"],
  espresso: ["#3D342E", "#1E1A17"],
  rose: ["#EDE0D9", "#D4B9B0"],
  olive: ["#E1DFD3", "#B9B9A4"],
  sand: ["#EDE4D6", "#D5C6B2"],
};

/** Skin studies — kept sculptural and warm rather than photographic. */
const SKIN = {
  porcelain: { lit: "#F2E1D4", mid: "#E3CBB8", shade: "#C9A991", edge: "#FFF6EE" },
  warm: { lit: "#EAD2BC", mid: "#D9B99F", shade: "#B89174", edge: "#FBEADC" },
  amber: { lit: "#D9B694", mid: "#C29A76", shade: "#9C7452", edge: "#F0D5B6" },
  umber: { lit: "#A87A58", mid: "#8A5F41", shade: "#61402B", edge: "#C99B76" },
  cocoa: { lit: "#7A5340", mid: "#5F3E2F", shade: "#40281E", edge: "#A0735A" },
};

/** Lacquers: ordered gradient stops + a rim-light colour. */
const LACQUER = {
  nude: { stops: ["#F1DFD0", "#E0C4AE", "#C6A78E"], rim: "#FFF6EC" },
  chrome: {
    stops: ["#F5F4F2", "#C9CED2", "#98A0A6", "#DCD7D1", "#8C9296"],
    rim: "#FFFFFF",
  },
  ivory: { stops: ["#FCFAF6", "#EFE8DE", "#D9CFC2"], rim: "#FFFFFF" },
  clay: { stops: ["#DDCBBA", "#C3AC95", "#9E8672"], rim: "#F8ECE0" },
  espresso: { stops: ["#61524A", "#372E28", "#1B1715"], rim: "#CDB8A8" },
  rosewood: { stops: ["#E6C7BF", "#C89C92", "#9C6E66"], rim: "#FFEFE9" },
  pearl: {
    stops: ["#FEFCFA", "#F0E8F1", "#E0E7EB", "#F5EAE3", "#E5DDD4"],
    rim: "#FFFFFF",
  },
  olive: { stops: ["#C9CAB5", "#A4A68E", "#7C7E68"], rim: "#EFF0E1" },
  noir: { stops: ["#514E4A", "#262422", "#0D0C0C"], rim: "#BDB3A9" },
  blush: { stops: ["#F7E7E1", "#E8CAC2", "#D0A9A0"], rim: "#FFF8F4" },
  cherry: { stops: ["#B2544F", "#8A3733", "#5A211F"], rim: "#E9A79F" },
};

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

const n = (v) => Number(v.toFixed(2));

/** Nail plate silhouettes, centred on the origin. */
function nailPath(shape, w, h) {
  const base = h * 0.44;
  const close = `C ${n(w * 0.32)} ${n(h * 0.52)}, ${n(-w * 0.32)} ${n(
    h * 0.52
  )}, ${n(-w / 2)} ${n(base)} Z`;

  switch (shape) {
    case "coffin":
      return [
        `M ${n(-w / 2)} ${n(base)}`,
        `L ${n(-w * 0.3)} ${n(-h * 0.38)}`,
        `Q ${n(-w * 0.3)} ${n(-h * 0.5)}, ${n(-w * 0.21)} ${n(-h * 0.5)}`,
        `L ${n(w * 0.21)} ${n(-h * 0.5)}`,
        `Q ${n(w * 0.3)} ${n(-h * 0.5)}, ${n(w * 0.3)} ${n(-h * 0.38)}`,
        `L ${n(w / 2)} ${n(base)}`,
        close,
      ].join(" ");
    case "square":
      return [
        `M ${n(-w / 2)} ${n(base)}`,
        `L ${n(-w * 0.46)} ${n(-h * 0.4)}`,
        `Q ${n(-w * 0.46)} ${n(-h * 0.5)}, ${n(-w * 0.37)} ${n(-h * 0.5)}`,
        `L ${n(w * 0.37)} ${n(-h * 0.5)}`,
        `Q ${n(w * 0.46)} ${n(-h * 0.5)}, ${n(w * 0.46)} ${n(-h * 0.4)}`,
        `L ${n(w / 2)} ${n(base)}`,
        close,
      ].join(" ");
    case "oval":
      return [
        `M ${n(-w / 2)} ${n(base)}`,
        `C ${n(-w / 2)} ${n(-h * 0.06)}, ${n(-w * 0.47)} ${n(
          -h * 0.5
        )}, 0 ${n(-h * 0.5)}`,
        `C ${n(w * 0.47)} ${n(-h * 0.5)}, ${n(w / 2)} ${n(-h * 0.06)}, ${n(
          w / 2
        )} ${n(base)}`,
        close,
      ].join(" ");
    case "almond":
    default:
      /* tapered flanks, softly rounded apex — never a point */
      return [
        `M ${n(-w / 2)} ${n(base)}`,
        `C ${n(-w / 2)} ${n(-h * 0.04)}, ${n(-w * 0.41)} ${n(-h * 0.33)}, ${n(
          -w * 0.15
        )} ${n(-h * 0.46)}`,
        `Q 0 ${n(-h * 0.51)}, ${n(w * 0.15)} ${n(-h * 0.46)}`,
        `C ${n(w * 0.41)} ${n(-h * 0.33)}, ${n(w / 2)} ${n(-h * 0.04)}, ${n(
          w / 2
        )} ${n(base)}`,
        close,
      ].join(" ");
  }
}

/** Fingertip column: rounded cap around the nail, running off-frame below. */
function fingerPath(fw, h, length) {
  const top = -h * 0.56;
  return [
    `M ${n(-fw / 2)} ${n(length)}`,
    `L ${n(-fw / 2)} ${n(-h * 0.2)}`,
    `C ${n(-fw / 2)} ${n(top + h * 0.16)}, ${n(-fw * 0.3)} ${n(top)}, 0 ${n(top)}`,
    `C ${n(fw * 0.3)} ${n(top)}, ${n(fw / 2)} ${n(top + h * 0.16)}, ${n(
      fw / 2
    )} ${n(-h * 0.2)}`,
    `L ${n(fw / 2)} ${n(length)}`,
    "Z",
  ].join(" ");
}

/* ------------------------------------------------------------------ *
 * Gradient helpers
 * ------------------------------------------------------------------ */

let uid = 0;
const nextId = (p) => `${p}${(uid += 1)}`;

function linear(id, stops, angle) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * 0.5;
  const dy = Math.sin(rad) * 0.5;
  const body = stops
    .map(
      (s) =>
        `<stop offset="${s.o}%" stop-color="${s.c}"${
          s.a === undefined ? "" : ` stop-opacity="${s.a}"`
        }/>`
    )
    .join("");
  return `<linearGradient id="${id}" x1="${n(0.5 - dx)}" y1="${n(
    0.5 - dy
  )}" x2="${n(0.5 + dx)}" y2="${n(0.5 + dy)}">${body}</linearGradient>`;
}

function lacquerGradient(id, lacquer, angle) {
  const stops = LACQUER[lacquer].stops.map((c, i, a) => ({
    c,
    o: n((i / (a.length - 1)) * 100),
  }));
  return linear(id, stops, angle);
}

/* ------------------------------------------------------------------ *
 * The digit — a fingertip with a lacquered nail
 * ------------------------------------------------------------------ */

function digit({
  x,
  y,
  w,
  h,
  rotate = 0,
  shape = "almond",
  lacquer,
  skin = "porcelain",
  angle = 118,
  depth = 0,
  frameH = 1500,
}) {
  const s = SKIN[skin];
  const fw = w * 1.18;
  const length = frameH; /* always runs past the bottom edge */
  const fPath = fingerPath(fw, h, length);
  const nPath = nailPath(shape, w, h);

  const fClip = nextId("fc");
  const nClip = nextId("nc");
  const fGrad = nextId("fg");
  const fDepth = nextId("fd");
  const nGrad = nextId("ng");
  const sheen = nextId("sh");
  const spec = nextId("sp");
  const shade = nextId("sd");
  const cuticle = nextId("cu");
  const lunula = nextId("lu");
  const cast = nextId("cs");

  const defs = [
    `<clipPath id="${fClip}"><path d="${fPath}"/></clipPath>`,
    `<clipPath id="${nClip}"><path d="${nPath}"/></clipPath>`,
    linear(
      fGrad,
      [
        { c: s.edge, o: 0 },
        { c: s.lit, o: 22 },
        { c: s.mid, o: 62 },
        { c: s.shade, o: 100 },
      ],
      12
    ),
    linear(
      fDepth,
      [
        { c: s.shade, o: 0, a: 0 },
        { c: s.shade, o: 62, a: 0.18 },
        { c: "#2A1E16", o: 100, a: 0.44 },
      ],
      90
    ),
    lacquerGradient(nGrad, lacquer, angle),
    linear(
      sheen,
      [
        { c: "#ffffff", o: 0, a: 0.7 },
        { c: "#ffffff", o: 50, a: 0.14 },
        { c: "#ffffff", o: 100, a: 0 },
      ],
      78
    ),
    linear(
      spec,
      [
        { c: "#ffffff", o: 0, a: 0 },
        { c: "#ffffff", o: 40, a: 0.8 },
        { c: "#ffffff", o: 100, a: 0 },
      ],
      90
    ),
    linear(
      shade,
      [
        { c: "#1B1512", o: 0, a: 0 },
        { c: "#1B1512", o: 100, a: 0.11 },
      ],
      90
    ),
    `<radialGradient id="${cuticle}" cx="0.5" cy="0.5" r="0.5">` +
      `<stop offset="0%" stop-color="#3A2A20" stop-opacity="0.34"/>` +
      `<stop offset="100%" stop-color="#3A2A20" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="${lunula}" cx="0.5" cy="0.5" r="0.5">` +
      `<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.2"/>` +
      `<stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="${cast}" cx="0.5" cy="0.5" r="0.5">` +
      `<stop offset="0%" stop-color="#2A211A" stop-opacity="0.44"/>` +
      `<stop offset="100%" stop-color="#2A211A" stop-opacity="0"/></radialGradient>`,
  ].join("");

  const recede = depth ? `<rect x="${n(-fw)}" y="${n(-h * 0.8)}" width="${n(
    fw * 2
  )}" height="${n(length + h)}" fill="#2A211A" opacity="${n(depth)}"/>` : "";

  const body = `
    <g transform="translate(${n(x)} ${n(y)}) rotate(${n(rotate)})">
      <ellipse cx="${n(fw * 0.34)}" cy="${n(h * 0.1)}" rx="${n(fw * 0.95)}" ry="${n(
        h * 0.9
      )}" fill="url(#${cast})"/>
      <g clip-path="url(#${fClip})">
        <rect x="${n(-fw)}" y="${n(-h)}" width="${n(fw * 2)}" height="${n(
          length + h * 2
        )}" fill="url(#${fGrad})"/>
        <rect x="${n(-fw)}" y="${n(-h)}" width="${n(fw * 2)}" height="${n(
          length + h * 2
        )}" fill="url(#${fDepth})"/>
        <ellipse cx="${n(-fw * 0.34)}" cy="${n(h * 0.1)}" rx="${n(
          fw * 0.2
        )}" ry="${n(h * 0.7)}" fill="${s.edge}" opacity="0.28"/>
        ${recede}
      </g>
      <path d="${fPath}" fill="none" stroke="${s.edge}" stroke-opacity="0.3" stroke-width="${n(
        Math.max(0.8, w * 0.01)
      )}"/>
      <ellipse cx="0" cy="${n(h * 0.5)}" rx="${n(w * 0.62)}" ry="${n(
        h * 0.16
      )}" fill="url(#${cuticle})"/>
      <g clip-path="url(#${nClip})">
        <rect x="${n(-w)}" y="${n(-h)}" width="${n(w * 2)}" height="${n(
          h * 2
        )}" fill="url(#${nGrad})"/>
        <ellipse cx="${n(-w * 0.16)}" cy="${n(-h * 0.2)}" rx="${n(
          w * 0.46
        )}" ry="${n(h * 0.5)}" fill="url(#${sheen})" transform="rotate(-8 ${n(
          -w * 0.16
        )} ${n(-h * 0.2)})"/>
        <rect x="${n(w * 0.11)}" y="${n(-h * 0.42)}" width="${n(
          w * 0.07
        )}" height="${n(h * 0.78)}" rx="${n(w * 0.035)}" fill="url(#${spec})" opacity="0.55"/>
        <ellipse cx="0" cy="${n(h * 0.38)}" rx="${n(w * 0.42)}" ry="${n(
          h * 0.09
        )}" fill="url(#${lunula})"/>
        <rect x="${n(-w)}" y="${n(h * 0.06)}" width="${n(w * 2)}" height="${n(
          h * 0.5
        )}" fill="url(#${shade})"/>
        ${recede}
      </g>
      <path d="${nPath}" fill="none" stroke="${
        LACQUER[lacquer].rim
      }" stroke-opacity="0.4" stroke-width="${n(Math.max(0.7, w * 0.011))}"/>
    </g>`;

  return { defs, body };
}

/* ------------------------------------------------------------------ *
 * A free-standing lacquer form (press-on study) — no fingertip
 * ------------------------------------------------------------------ */

function plate({ x, y, w, h, rotate = 0, shape = "coffin", lacquer, angle = 116 }) {
  const clip = nextId("pc");
  const grad = nextId("pg");
  const sheen = nextId("ps");
  const spec = nextId("pp");
  const drop = nextId("pd");
  const path = nailPath(shape, w, h);

  const defs = [
    `<clipPath id="${clip}"><path d="${path}"/></clipPath>`,
    lacquerGradient(grad, lacquer, angle),
    linear(
      sheen,
      [
        { c: "#ffffff", o: 0, a: 0.6 },
        { c: "#ffffff", o: 55, a: 0.1 },
        { c: "#ffffff", o: 100, a: 0 },
      ],
      68
    ),
    linear(
      spec,
      [
        { c: "#ffffff", o: 0, a: 0 },
        { c: "#ffffff", o: 42, a: 0.85 },
        { c: "#ffffff", o: 100, a: 0 },
      ],
      90
    ),
    `<radialGradient id="${drop}"><stop offset="0%" stop-color="#2A231E" stop-opacity="0.3"/>` +
      `<stop offset="65%" stop-color="#2A231E" stop-opacity="0.09"/>` +
      `<stop offset="100%" stop-color="#2A231E" stop-opacity="0"/></radialGradient>`,
  ].join("");

  const body = `
    <g transform="translate(${n(x)} ${n(y)}) rotate(${n(rotate)})">
      <ellipse cx="${n(w * 0.1)}" cy="${n(h * 0.48)}" rx="${n(w * 0.82)}" ry="${n(
        h * 0.14
      )}" fill="url(#${drop})"/>
      <g clip-path="url(#${clip})">
        <rect x="${n(-w)}" y="${n(-h)}" width="${n(w * 2)}" height="${n(
          h * 2
        )}" fill="url(#${grad})"/>
        <ellipse cx="${n(-w * 0.17)}" cy="${n(-h * 0.11)}" rx="${n(
          w * 0.43
        )}" ry="${n(h * 0.43)}" fill="url(#${sheen})"/>
        <rect x="${n(w * 0.1)}" y="${n(-h * 0.42)}" width="${n(
          w * 0.07
        )}" height="${n(h * 0.8)}" rx="${n(w * 0.035)}" fill="url(#${spec})" opacity="0.5"/>
      </g>
      <path d="${path}" fill="none" stroke="${
        LACQUER[lacquer].rim
      }" stroke-opacity="0.4" stroke-width="${n(Math.max(0.7, w * 0.011))}"/>
    </g>`;

  return { defs, body };
}

/* ------------------------------------------------------------------ *
 * Decorative editorial marks
 * ------------------------------------------------------------------ */

function marks(list, tone) {
  const stroke = tone === "dark" ? "#F4F1EC" : "#191817";
  return list
    .map((m) => {
      const o = m.o ?? 0.14;
      const w = m.w ?? 1;
      if (m.t === "circle")
        return `<circle cx="${m.x}" cy="${m.y}" r="${m.r}" fill="none" stroke="${stroke}" stroke-opacity="${o}" stroke-width="${w}"/>`;
      if (m.t === "line")
        return `<line x1="${m.x1}" y1="${m.y1}" x2="${m.x2}" y2="${m.y2}" stroke="${stroke}" stroke-opacity="${o}" stroke-width="${w}"/>`;
      if (m.t === "arc")
        return `<path d="${m.d}" fill="none" stroke="${stroke}" stroke-opacity="${o}" stroke-width="${w}"/>`;
      return "";
    })
    .join("");
}

/* ------------------------------------------------------------------ *
 * Composition assembly
 * ------------------------------------------------------------------ */

function compose({ w, h, ground, glow, forms = [], deco = [], tone = "light" }) {
  uid = 0;
  const [g0, g1] = GROUND[ground];

  const parts = forms.map((f) =>
    f.kind === "plate" ? plate(f) : digit({ ...f, frameH: h * 1.4 })
  );

  const defs = [
    linear(
      "bg",
      [
        { c: g0, o: 0 },
        { c: g1, o: 100 },
      ],
      58
    ),
    glow
      ? `<radialGradient id="glow" cx="${glow.cx}" cy="${glow.cy}" r="${glow.r}">` +
        `<stop offset="0%" stop-color="${glow.color}" stop-opacity="${
          glow.o ?? 0.55
        }"/><stop offset="100%" stop-color="${glow.color}" stop-opacity="0"/></radialGradient>`
      : "",
    `<radialGradient id="vig" cx="0.5" cy="0.44" r="0.8">` +
      `<stop offset="52%" stop-color="#000000" stop-opacity="0"/>` +
      `<stop offset="100%" stop-color="#000000" stop-opacity="${
        tone === "dark" ? 0.42 : 0.14
      }"/></radialGradient>`,
    ...parts.map((p) => p.defs),
  ].join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" preserveAspectRatio="xMidYMid slice">` +
    `<defs>${defs}</defs>` +
    `<rect width="${w}" height="${h}" fill="url(#bg)"/>` +
    (glow ? `<rect width="${w}" height="${h}" fill="url(#glow)"/>` : "") +
    marks(deco, tone) +
    parts.map((p) => p.body).join("") +
    `<rect width="${w}" height="${h}" fill="url(#vig)"/>` +
    `</svg>`
  );
}

/* ------------------------------------------------------------------ *
 * Hand studies
 * ------------------------------------------------------------------ */

/**
 * A fanned set of digits, cropped by the frame — the core motif.
 * `count` 3–5, ordered outer → inner → outer with the middle digit longest.
 */
function hand({
  cx,
  cy,
  unit = 150,
  count = 4,
  shape = "almond",
  lacquer,
  skin = "porcelain",
  spread = 1,
  tilt = 0,
  lacquers,
}) {
  const layouts = {
    3: [
      { dx: -1.0, dy: 0.16, s: 0.9, r: -13, z: 0.06 },
      { dx: 0, dy: -0.12, s: 1, r: -1, z: 0 },
      { dx: 1.0, dy: 0.18, s: 0.88, r: 12, z: 0.07 },
    ],
    4: [
      { dx: -1.52, dy: 0.3, s: 0.83, r: -19, z: 0.11 },
      { dx: -0.52, dy: -0.1, s: 0.96, r: -7, z: 0.03 },
      { dx: 0.5, dy: -0.06, s: 0.98, r: 5, z: 0.02 },
      { dx: 1.5, dy: 0.26, s: 0.85, r: 17, z: 0.1 },
    ],
    5: [
      { dx: -2.02, dy: 0.42, s: 0.76, r: -25, z: 0.15 },
      { dx: -1.02, dy: 0.06, s: 0.9, r: -13, z: 0.07 },
      { dx: 0, dy: -0.14, s: 1, r: 0, z: 0 },
      { dx: 1.0, dy: 0.08, s: 0.89, r: 13, z: 0.07 },
      { dx: 1.98, dy: 0.46, s: 0.74, r: 24, z: 0.16 },
    ],
  };

  return layouts[count].map((c, i) => ({
    x: cx + c.dx * unit * 0.92 * spread,
    y: cy + c.dy * unit,
    w: unit * 0.9 * c.s,
    h: unit * 1.62 * c.s,
    rotate: c.r + tilt,
    depth: c.z,
    shape,
    skin,
    lacquer: lacquers ? lacquers[i % lacquers.length] : lacquer,
    angle: 112 + c.dx * 9,
  }));
}

/* ------------------------------------------------------------------ *
 * The collection
 * ------------------------------------------------------------------ */

const COLLECTION = {
  /* ---- Hero ---- */
  "hero-primary": {
    w: 1400,
    h: 1750,
    ground: "bone",
    glow: { cx: "0.36", cy: "0.26", r: "0.74", color: "#FFFFFF", o: 0.72 },
    deco: [
      { t: "circle", x: 700, y: 780, r: 540, o: 0.09 },
      { t: "line", x1: 0, y1: 1300, x2: 1400, y2: 1300, o: 0.07 },
    ],
    forms: hand({
      cx: 700,
      cy: 810,
      unit: 305,
      count: 4,
      lacquer: "nude",
      skin: "porcelain",
    }),
  },

  "hero-secondary": {
    w: 1000,
    h: 1400,
    ground: "ink",
    tone: "dark",
    glow: { cx: "0.58", cy: "0.28", r: "0.72", color: "#C8B8AA", o: 0.3 },
    deco: [{ t: "circle", x: 520, y: 620, r: 360, o: 0.13 }],
    forms: hand({
      cx: 520,
      cy: 660,
      unit: 230,
      count: 3,
      shape: "coffin",
      lacquer: "noir",
      skin: "umber",
      tilt: -4,
    }),
  },

  /* ---- Services ---- */
  "service-manicure": {
    w: 1200,
    h: 1500,
    ground: "ivory",
    glow: { cx: "0.4", cy: "0.24", r: "0.72", color: "#FFFFFF", o: 0.78 },
    deco: [{ t: "line", x1: 130, y1: 0, x2: 130, y2: 1500, o: 0.07 }],
    forms: hand({
      cx: 620,
      cy: 700,
      unit: 250,
      count: 5,
      lacquer: "nude",
      skin: "warm",
    }),
  },
  "service-pedicure": {
    w: 1200,
    h: 1500,
    ground: "smoke",
    glow: { cx: "0.6", cy: "0.3", r: "0.7", color: "#FFFFFF", o: 0.62 },
    deco: [{ t: "circle", x: 600, y: 720, r: 440, o: 0.09 }],
    forms: hand({
      cx: 600,
      cy: 760,
      unit: 235,
      count: 5,
      shape: "oval",
      lacquer: "ivory",
      skin: "porcelain",
      spread: 0.94,
    }),
  },
  "service-nailart": {
    w: 1200,
    h: 1500,
    ground: "rose",
    glow: { cx: "0.34", cy: "0.26", r: "0.72", color: "#FFF7F3", o: 0.72 },
    deco: [
      { t: "circle", x: 400, y: 430, r: 210, o: 0.15 },
      { t: "arc", d: "M 150 1230 Q 600 990 1050 1230", o: 0.13 },
    ],
    forms: hand({
      cx: 600,
      cy: 730,
      unit: 250,
      count: 4,
      lacquer: "rosewood",
      lacquers: ["rosewood", "chrome", "blush", "pearl"],
      skin: "warm",
      tilt: 3,
    }),
  },
  "service-gel": {
    w: 1200,
    h: 1500,
    ground: "clay",
    glow: { cx: "0.48", cy: "0.22", r: "0.74", color: "#FFF4EA", o: 0.62 },
    deco: [{ t: "line", x1: 0, y1: 1140, x2: 1200, y2: 1140, o: 0.11 }],
    forms: hand({
      cx: 600,
      cy: 690,
      unit: 250,
      count: 4,
      shape: "square",
      lacquer: "clay",
      skin: "amber",
    }),
  },
  "service-signature": {
    w: 1200,
    h: 1500,
    ground: "espresso",
    tone: "dark",
    glow: { cx: "0.5", cy: "0.26", r: "0.7", color: "#C8B8AA", o: 0.28 },
    deco: [{ t: "circle", x: 600, y: 680, r: 400, o: 0.15 }],
    forms: hand({
      cx: 600,
      cy: 720,
      unit: 245,
      count: 4,
      shape: "coffin",
      lacquer: "espresso",
      skin: "cocoa",
    }),
  },

  /* ---- Gallery ---- */
  "work-01": {
    w: 900,
    h: 1200,
    ground: "ivory",
    glow: { cx: "0.34", cy: "0.26", r: "0.74", color: "#FFFFFF", o: 0.72 },
    deco: [{ t: "circle", x: 450, y: 560, r: 320, o: 0.09 }],
    forms: hand({
      cx: 460,
      cy: 560,
      unit: 205,
      count: 3,
      lacquer: "chrome",
      skin: "porcelain",
    }),
  },
  "work-02": {
    w: 1200,
    h: 900,
    ground: "ink",
    tone: "dark",
    glow: { cx: "0.3", cy: "0.42", r: "0.68", color: "#8D8177", o: 0.34 },
    deco: [{ t: "line", x1: 0, y1: 430, x2: 1200, y2: 430, o: 0.11 }],
    forms: hand({
      cx: 600,
      cy: 400,
      unit: 175,
      count: 5,
      shape: "coffin",
      lacquer: "noir",
      lacquers: ["noir", "espresso", "chrome", "espresso", "noir"],
      skin: "cocoa",
      spread: 1.06,
    }),
  },
  "work-03": {
    w: 1000,
    h: 1000,
    ground: "rose",
    glow: { cx: "0.58", cy: "0.3", r: "0.7", color: "#FFF7F3", o: 0.74 },
    deco: [{ t: "arc", d: "M 130 790 Q 500 570 870 790", o: 0.15 }],
    forms: hand({
      cx: 500,
      cy: 470,
      unit: 175,
      count: 5,
      shape: "oval",
      lacquer: "blush",
      skin: "warm",
    }),
  },
  "work-04": {
    w: 900,
    h: 1350,
    ground: "smoke",
    glow: { cx: "0.42", cy: "0.22", r: "0.72", color: "#FFFFFF", o: 0.64 },
    deco: [
      { t: "line", x1: 150, y1: 0, x2: 150, y2: 1350, o: 0.07 },
      { t: "line", x1: 750, y1: 0, x2: 750, y2: 1350, o: 0.07 },
    ],
    forms: [
      ...hand({
        cx: 450,
        cy: 620,
        unit: 240,
        count: 3,
        shape: "square",
        lacquer: "pearl",
        skin: "porcelain",
      }),
    ],
  },
  "work-05": {
    w: 1200,
    h: 1500,
    ground: "sand",
    glow: { cx: "0.38", cy: "0.26", r: "0.72", color: "#FFF4EA", o: 0.68 },
    deco: [{ t: "circle", x: 600, y: 690, r: 430, o: 0.11 }],
    forms: hand({
      cx: 600,
      cy: 720,
      unit: 245,
      count: 5,
      lacquer: "clay",
      skin: "amber",
    }),
  },
  "work-06": {
    w: 1400,
    h: 900,
    ground: "bone",
    glow: { cx: "0.5", cy: "0.26", r: "0.74", color: "#FFFFFF", o: 0.78 },
    deco: [{ t: "line", x1: 0, y1: 600, x2: 1400, y2: 600, o: 0.09 }],
    forms: hand({
      cx: 700,
      cy: 380,
      unit: 175,
      count: 5,
      lacquer: "ivory",
      lacquers: ["ivory", "nude", "blush", "nude", "clay"],
      skin: "warm",
      spread: 1.12,
    }),
  },
  "work-07": {
    w: 900,
    h: 1200,
    ground: "olive",
    glow: { cx: "0.34", cy: "0.28", r: "0.72", color: "#FFFFFF", o: 0.6 },
    deco: [{ t: "circle", x: 450, y: 520, r: 290, o: 0.13 }],
    forms: hand({
      cx: 450,
      cy: 540,
      unit: 200,
      count: 3,
      shape: "oval",
      lacquer: "olive",
      skin: "umber",
    }),
  },
  "work-08": {
    w: 1000,
    h: 1400,
    ground: "espresso",
    tone: "dark",
    glow: { cx: "0.54", cy: "0.24", r: "0.72", color: "#C8B8AA", o: 0.3 },
    deco: [{ t: "arc", d: "M 130 1110 Q 500 880 870 1110", o: 0.17 }],
    forms: [
      {
        kind: "plate",
        x: 500,
        y: 620,
        w: 300,
        h: 530,
        rotate: -6,
        shape: "coffin",
        lacquer: "chrome",
        angle: 112,
      },
      {
        kind: "plate",
        x: 660,
        y: 1010,
        w: 170,
        h: 300,
        rotate: 26,
        shape: "coffin",
        lacquer: "noir",
        angle: 96,
      },
    ],
  },
  "work-09": {
    w: 1000,
    h: 1250,
    ground: "ivory",
    glow: { cx: "0.44", cy: "0.24", r: "0.72", color: "#FFFFFF", o: 0.74 },
    deco: [{ t: "line", x1: 0, y1: 940, x2: 1000, y2: 940, o: 0.09 }],
    forms: hand({
      cx: 500,
      cy: 560,
      unit: 210,
      count: 4,
      lacquer: "cherry",
      skin: "porcelain",
      tilt: -2,
    }),
  },

  /* ---- Editorial ---- */
  "about-01": {
    w: 1100,
    h: 1400,
    ground: "bone",
    glow: { cx: "0.4", cy: "0.26", r: "0.74", color: "#FFFFFF", o: 0.74 },
    deco: [
      { t: "circle", x: 550, y: 620, r: 370, o: 0.09 },
      { t: "line", x1: 0, y1: 1080, x2: 1100, y2: 1080, o: 0.07 },
    ],
    forms: hand({
      cx: 550,
      cy: 640,
      unit: 230,
      count: 4,
      lacquer: "pearl",
      skin: "warm",
    }),
  },
  "about-02": {
    w: 1100,
    h: 800,
    ground: "ivory",
    glow: { cx: "0.6", cy: "0.3", r: "0.72", color: "#FFFFFF", o: 0.72 },
    deco: [{ t: "line", x1: 0, y1: 540, x2: 1100, y2: 540, o: 0.09 }],
    forms: hand({
      cx: 560,
      cy: 330,
      unit: 165,
      count: 4,
      lacquer: "nude",
      skin: "amber",
    }),
  },
};

/* ------------------------------------------------------------------ */

mkdirSync(OUT_DIR, { recursive: true });

let bytes = 0;
for (const [name, spec] of Object.entries(COLLECTION)) {
  const svg = compose(spec);
  writeFileSync(resolve(OUT_DIR, `${name}.svg`), svg);
  bytes += svg.length;
  console.log(`  ${name}.svg  ${(svg.length / 1024).toFixed(1)} KB`);
}
console.log(
  `\n${Object.keys(COLLECTION).length} compositions · ${(bytes / 1024).toFixed(
    1
  )} KB total → public/studio/art`
);
