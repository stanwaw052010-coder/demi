# ELEVATE — Private Tennis Club & Academy

**Above the game.** A concept site for a luxury tennis club — built as a
portfolio demonstration of art direction, motion design and WebGL
engineering. Every visual on the page is generated in code: no stock
photography, no video files, no external assets.

## The experience

- **Cinematic preloader** — bouncing ball with squash-and-stretch, court
  lines drawing themselves, scrambled word cycle, curtain-wipe reveal.
- **WebGL hero** — a procedural tennis ball (parametric seam curve, felt
  speckle, bump map, custom light rig) that floats, leans toward the
  cursor and takes a spin impulse when struck. Camera-shake impact beat,
  scroll-out motion blur.
- **Scroll film** — Lenis smooth scroll + GSAP ScrollTrigger: a pinned
  word-by-word manifesto, a horizontal four-chapter club history with
  self-drawing line art, and a vertical academy timeline the ball rides
  from first bounce to the professional tour.
- **The Grounds** — one SVG court, four lights: dawn, noon, golden hour
  and night morph the sky, sun, shadows and line temperature.
- **The Instrument** — a fully procedural 3D racket (elliptical graphite
  frame, string bed, octagonal leather grip, gold hardware). Drag to
  spin — it keeps its momentum. Lighting warms on hover.
- **Generative gallery** — six art prints drawn in code, floating at
  different depths, drifting against cursor and scroll.
- **Living numbers** — counters with momentum and a win-ratio curve that
  draws itself.
- **Booking** — glass panel, floating labels, animated validation, and a
  success sequence with a drawn check and a bouncing ball.
- **Custom cursor** with velocity stretch and contextual labels, magnetic
  buttons, film grain, self-hosted fonts.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis ·
Three.js via React Three Fiber + drei · self-hosted fonts (Archivo
Variable, Instrument Serif, IBM Plex Mono via Fontsource).

## Run

```bash
npm install
npm run dev      # develop
npm run build && npm start   # production
```

Performance notes: both WebGL canvases pause entirely when off-screen
(IntersectionObserver → frameloop "never"), DPR is capped, dust/particle
counts are modest, and `prefers-reduced-motion` disables the preloader
choreography and smooth scrolling.

---

*A concept demonstration — the club, its coaches and its numbers are
fictional.*
