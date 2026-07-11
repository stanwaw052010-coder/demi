import * as THREE from "three";

/**
 * Procedural tennis-ball texture. The seam follows the classic
 * parametric curve  p(t) = (a·cos t + b·cos 3t, a·sin t − b·sin 3t, c·sin 2t)
 * projected onto the sphere, drawn into an equirectangular canvas —
 * so it wraps perfectly. Felt is thousands of tone-varied specks;
 * the same speckle drives the bump map.
 */
export function createBallTextures(): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const W = 1024;
  const H = 512;

  const color = document.createElement("canvas");
  color.width = W;
  color.height = H;
  const c = color.getContext("2d")!;

  const bump = document.createElement("canvas");
  bump.width = W;
  bump.height = H;
  const b = bump.getContext("2d")!;

  // — base felt: championship optic yellow, slightly desaturated
  const base = c.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, "#d3e34e");
  base.addColorStop(0.5, "#c9dc41");
  base.addColorStop(1, "#b9cc38");
  c.fillStyle = base;
  c.fillRect(0, 0, W, H);
  b.fillStyle = "#808080";
  b.fillRect(0, 0, W, H);

  // — felt speckle
  for (let i = 0; i < 26000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.4 + 0.3;
    const tone = Math.random();
    c.fillStyle =
      tone > 0.5
        ? `rgba(236, 250, 140, ${0.05 + Math.random() * 0.12})`
        : `rgba(110, 128, 30, ${0.04 + Math.random() * 0.1})`;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();

    const g = 110 + Math.random() * 90;
    b.fillStyle = `rgba(${g},${g},${g},0.5)`;
    b.beginPath();
    b.arc(x, y, r, 0, Math.PI * 2);
    b.fill();
  }

  // — seam curve sampled onto the equirect projection
  const pts: { u: number; v: number }[] = [];
  const A = 1;
  const B = 0.36;
  const C = 0.9;
  for (let i = 0; i <= 1400; i++) {
    const t = (i / 1400) * Math.PI * 2;
    const x = A * Math.cos(t) + B * Math.cos(3 * t);
    const y = A * Math.sin(t) - B * Math.sin(3 * t);
    const z = C * Math.sin(2 * t);
    const len = Math.hypot(x, y, z);
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;
    const u = (0.5 + Math.atan2(nz, nx) / (Math.PI * 2)) * W;
    const v = (0.5 - Math.asin(ny) / Math.PI) * H;
    pts.push({ u, v });
  }

  const strokeSeam = (
    ctx: CanvasRenderingContext2D,
    width: number,
    style: string,
    blur = 0
  ) => {
    ctx.save();
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (blur) {
      ctx.shadowColor = style;
      ctx.shadowBlur = blur;
    }
    // draw thrice shifted by ±W so segments crossing the u-seam stay continuous
    for (const shift of [-W, 0, W]) {
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const q = pts[i - 1];
        if (!started || (q && Math.abs(p.u - q.u) > W / 2)) {
          ctx.moveTo(p.u + shift, p.v);
          started = true;
        } else {
          ctx.lineTo(p.u + shift, p.v);
        }
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  strokeSeam(c, 26, "rgba(84, 98, 22, 0.55)", 6); // groove shadow
  strokeSeam(c, 17, "#efeadb"); // ivory seam band
  strokeSeam(c, 2.5, "rgba(160, 150, 120, 0.5)"); // center stitch hint

  strokeSeam(b, 30, "#4a4a4a", 4); // seam groove in bump
  strokeSeam(b, 15, "#e8e8e8");

  const map = new THREE.CanvasTexture(color);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  const bumpMap = new THREE.CanvasTexture(bump);
  return { map, bumpMap };
}

/**
 * Soft radial glow sprite texture, used as a halo behind the ball.
 */
export function createGlowTexture(inner: string, outer = "rgba(0,0,0,0)") {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
