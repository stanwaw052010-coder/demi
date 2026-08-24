/**
 * Генератор тимчасових візуалів у фірмовій палітрі.
 *
 * Реальної фотозйомки клініки в проєкті немає, а брати сток —
 * означає зіпсувати рівень дизайну. Тому кожне зображення тут —
 * стримана графічна композиція (арки, лінії, м’яке світло) у тих
 * самих кольорах, що й сайт. Коли зʼявляться справжні фото,
 * покладіть їх у /public/images під тими ж іменами.
 *
 * Запуск: node scripts/generate-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(out, { recursive: true });

const PALETTE = {
  white: "#FFFFFF",
  soft: "#F7F7F5",
  second: "#EFEFED",
  border: "#D9D9D5",
  muted: "#8D8D88",
  dark: "#353532",
  black: "#111111",
  graphite: "#111111",
  accent: "#7E8A84", // холодний сіро-зеленуватий акцент
};

/** Простий детермінований генератор — щоб файли не мінялися між запусками. */
function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Композиція будується з чотирьох шарів:
 * фон-градієнт → велика форма (арка/еліпс) → тонкі лінії → смуга акценту.
 * Форма й насиченість залежать від seed, тож усі зображення різні,
 * але лишаються однією родиною.
 */
function composition({ seed, w, h, tone = "light", motif = 0 }) {
  const rand = rng(seed + 7);
  const dark = tone === "dark";

  const bgFrom = dark ? "#141413" : PALETTE.white;
  const bgTo = dark ? PALETTE.black : "#E7E7E3";
  const formColor = dark ? "#FFFFFF" : PALETTE.graphite ?? PALETTE.black;
  const formTop = dark ? 0.16 : 0.2;
  const line = dark ? "rgba(255,255,255,0.14)" : "rgba(17,17,17,0.13)";
  const solid = dark ? "rgba(255,255,255,0.06)" : "rgba(17,17,17,0.075)";

  const cx = w * (0.3 + rand() * 0.45);
  const cy = h * (0.3 + rand() * 0.4);
  const r = Math.min(w, h) * (0.5 + rand() * 0.3);
  const arcW = w * (0.62 + rand() * 0.3);
  const arcX = (w - arcW) / 2;
  const arcTop = h * (0.16 + rand() * 0.2);

  const shapes = [
    // класична арка — головний мотив бренду
    `<path d="M ${arcX} ${h} L ${arcX} ${arcTop + arcW / 2} A ${arcW / 2} ${arcW / 2} 0 0 1 ${arcX + arcW} ${arcTop + arcW / 2} L ${arcX + arcW} ${h} Z" fill="${solid}"/>
     <path d="M ${arcX} ${h} L ${arcX} ${arcTop + arcW / 2} A ${arcW / 2} ${arcW / 2} 0 0 1 ${arcX + arcW} ${arcTop + arcW / 2} L ${arcX + arcW} ${h}" fill="none" stroke="${line}" stroke-width="1.5"/>`,
    // світлова колона
    `<rect x="${w * 0.26}" y="0" width="${w * 0.48}" height="${h}" fill="${solid}"/>
     <line x1="${w * 0.26}" y1="0" x2="${w * 0.26}" y2="${h}" stroke="${line}" stroke-width="1.5"/>
     <line x1="${w * 0.74}" y1="0" x2="${w * 0.74}" y2="${h}" stroke="${line}" stroke-width="1.5"/>`,
    // діагональний зріз світла
    `<path d="M 0 ${h} L ${w} ${h * 0.12} L ${w} ${h} Z" fill="${solid}"/>
     <line x1="0" y1="${h}" x2="${w}" y2="${h * 0.12}" stroke="${line}" stroke-width="1.5"/>`,
    // лінза
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${solid}"/>
     <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="${line}" stroke-width="1.5"/>`,
    // горизонт
    `<rect x="0" y="${h * 0.58}" width="${w}" height="${h * 0.42}" fill="${solid}"/>
     <line x1="0" y1="${h * 0.58}" x2="${w}" y2="${h * 0.58}" stroke="${line}" stroke-width="1.5"/>`,
  ];

  // Концентричні хвилі — дрібний ритм, який тримає композицію.
  let waves = "";
  for (let i = 0; i < 4; i += 1) {
    const rr = r * (0.45 + i * 0.28);
    waves += `<circle cx="${(cx + w * 0.1).toFixed(1)}" cy="${(cy + h * 0.16).toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="${line}" stroke-width="1" opacity="0.6"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs>
<linearGradient id="bg${seed}" x1="0.1" y1="0" x2="0.85" y2="1">
<stop offset="0" stop-color="${bgFrom}"/>
<stop offset="1" stop-color="${bgTo}"/>
</linearGradient>
<radialGradient id="glow${seed}" cx="${(0.28 + rand() * 0.4).toFixed(2)}" cy="0.2" r="0.85">
<stop offset="0" stop-color="${dark ? "#FFFFFF" : "#FFFFFF"}" stop-opacity="${dark ? 0.22 : 0.95}"/>
<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
</radialGradient>
<linearGradient id="depth${seed}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${formColor}" stop-opacity="0"/>
<stop offset="1" stop-color="${formColor}" stop-opacity="${formTop}"/>
</linearGradient>
<linearGradient id="accent${seed}" x1="0.1" y1="1" x2="0.9" y2="0.1">
<stop offset="0" stop-color="${PALETTE.accent}" stop-opacity="${dark ? 0.3 : 0.22}"/>
<stop offset="0.55" stop-color="${PALETTE.accent}" stop-opacity="${dark ? 0.08 : 0.05}"/>
<stop offset="1" stop-color="${PALETTE.accent}" stop-opacity="0"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg${seed})"/>
${shapes[motif % shapes.length]}
${waves}
<rect width="${w}" height="${h}" fill="url(#glow${seed})"/>
<rect width="${w}" height="${h}" fill="url(#depth${seed})"/>
<rect width="${w}" height="${h}" fill="url(#accent${seed})"/>
</svg>`;
}

const files = [
  ["hero.svg", { seed: 11, w: 1200, h: 1500, tone: "light", motif: 0 }],
  ["about.svg", { seed: 23, w: 1200, h: 900, tone: "light", motif: 3 }],
  ["massage.svg", { seed: 31, w: 1400, h: 1000, tone: "dark", motif: 1 }],
  ["trust.svg", { seed: 41, w: 1400, h: 900, tone: "dark", motif: 2 }],
  ["gallery-1.svg", { seed: 51, w: 900, h: 1200, tone: "light", motif: 0 }],
  ["gallery-2.svg", { seed: 61, w: 1400, h: 900, tone: "light", motif: 2 }],
  ["gallery-3.svg", { seed: 71, w: 1000, h: 1000, tone: "dark", motif: 3 }],
  ["gallery-4.svg", { seed: 81, w: 900, h: 1200, tone: "light", motif: 1 }],
  ["gallery-5.svg", { seed: 91, w: 1400, h: 900, tone: "dark", motif: 0 }],
  ["gallery-6.svg", { seed: 101, w: 1000, h: 1000, tone: "light", motif: 3 }],
];

const serviceSlugs = [
  "therapy", "hygiene", "aesthetic", "whitening", "orthodontics",
  "implantation", "prosthetics", "kids", "surgery", "consultation",
];

serviceSlugs.forEach((slug, i) => {
  files.push([
    `service-${slug}.svg`,
    { seed: 200 + i * 13, w: 1000, h: 750, tone: i % 5 === 2 ? "dark" : "light", motif: i },
  ]);
});

for (const [name, config] of files) {
  writeFileSync(resolve(out, name), composition(config));
}

console.log(`Готово: ${files.length} файлів у public/images`);
