# Atelier Ivoire

An editorial web experience for a premium nail studio — manicure, pedicure,
nail art, gel and signature care. Built as a single-purpose site: opening
sequence, held service index, pinned horizontal archive, and a booking close.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run studio:art   # regenerate the artwork
```

## Stack

Next.js (App Router) · TypeScript · GSAP + ScrollTrigger · Lenis.

No CSS framework. The design system is a set of custom properties and
component classes scoped under `.studio` in `src/app/studio.css` — tokens
first (colour, type scale, spacing, easing), then primitives, then sections.

## Layout of the code

```
src/app/
  layout.tsx           fonts, metadata, document shell
  page.tsx             section composition
  studio.css           design system + every section's styling
  globals.css          document-level base only
  icon.svg             favicon

src/components/studio/
  StudioShell          smooth scroll, animation clock, cursor, grain, intro
  Nav                  minimal bar + fullscreen menu with pointer preview
  Hero Ritual Gallery About Stats Testimonials BookingCTA Footer Marquee
  Cursor Preloader
  primitives/          SplitText · RevealMedia · Magnetic

src/lib/studio/
  content.ts           every string, price and image reference
  gsap.ts hooks.ts scroll.ts intro.tsx

public/studio/art/     generated artwork
scripts/generate-studio-art.mjs
```

## Content

Brand, addresses, hours, services, prices, gallery entries, testimonials and
statistics all live in **`src/lib/studio/content.ts`**. `ATELIER IVOIRE` is a
placeholder identity — changing `STUDIO.name` and `STUDIO.mark` renames the
site everywhere, including the preloader and the footer.

## Artwork

`npm run studio:art` regenerates `public/studio/art` — 18 SVG compositions,
around 300 KB in total, no external requests, crisp at any pixel density. They
are sculptural hand studies with lacquered nails, cropped like macro editorial
photography; the generator exposes five nail shapes, ten lacquers and five skin
tones.

To use real studio photography instead, drop the files into `public/studio/`
and update the `src`, `width` and `height` values in `content.ts`. Keeping the
intrinsic dimensions accurate is what holds cumulative layout shift at zero.

## Motion, performance and access

- One Lenis instance drives ScrollTrigger from the GSAP ticker, so the page
  runs a single requestAnimationFrame loop.
- Images carry intrinsic dimensions and a reserved aspect ratio; measured CLS
  is 0.
- `prefers-reduced-motion` collapses the intro to a fade, unpins the horizontal
  gallery into a native scroll rail, skips the custom cursor and drops
  scroll-linked tweens rather than snapping them.
- Semantic landmarks, a skip link, visible focus rings, and a keyboard-operable
  menu and testimonial carousel.
