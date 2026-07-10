# LUMÉA — Beauty Atelier

A conceptual, award-style one-page website for a fictional luxury beauty
atelier in Kyiv. Built as a technology demonstration: every section
showcases a different modern web-motion technique while staying at 60 fps.

> This is **not a real salon**. All photography is from Unsplash and the
> booking form sends nothing anywhere.

## The experience

| Scene | Techniques |
| --- | --- |
| Cinematic preloader | GSAP timeline, morphing halo, serif counter, curtain clip-path exit |
| Hero | Slow-zoom photography, canvas dust particles, drifting light leaks, mouse-parallax depth layers, per-character mask reveal, magnetic buttons, infinite marquee |
| Manifesto | Scroll-scrubbed word-by-word reading, sticky image stack storytelling, floating parallax collage |
| Services | Cursor-chasing photograph, light sweeps, accordion dossiers, elastic hovers |
| Gallery | Pinned horizontal promenade (ScrollTrigger `containerAnimation`), per-plate inner parallax, native snap-scroll fallback on touch |
| Before / After | Draggable seam with lerped inertia and a wordless self-demonstration |
| Stats | Counting serif numerals, champagne glow, per-item parallax drift |
| Guest book | Throwable spring-physics card deck (Framer Motion), iris photo masks, word-by-word quotes |
| Reservation | Glassmorphism, rotating conic border light, floating labels, SVG-drawn success state |
| Footer | Kyiv clock, gradient-filled giant logotype mask reveal |
| Everywhere | Custom cursor (glow, verbs, magnetic), Lenis smooth scroll, dark ↔ ivory page-wide theme crossfades, film grain |

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **GSAP + ScrollTrigger** — scroll choreography, pinning, scrubbing
- **Lenis** — inertial smooth scrolling
- **Framer Motion** — spring physics, presence animations
- Instrument Serif · Inter Tight · IBM Plex Mono (via `next/font`)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/                 layout, page, global design tokens
  components/
    providers/         Lenis + app-state context
    fx/                custom cursor, particles
    ui/                Pic, Magnetic, PillButton, Split text, Marquee
    sections/          Hero, Manifesto, Services, Gallery, BeforeAfter,
                       Testimonials, Stats, Booking, Footer
  data/content.ts      all copy & imagery in one place
  lib/                 gsap setup, shared hooks
```

Performance notes: transform-only animation, `will-change` on moving
layers, IntersectionObserver-paused canvas, lazy images with graceful
fallbacks, `prefers-reduced-motion` respected throughout.
