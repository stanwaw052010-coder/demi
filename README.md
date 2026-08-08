This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Atelier Ivoire — nail studio experience (site root)

The site itself: an award-level experience served at `/`. Its code, styles and
assets are namespaced, and the only shared file it relies on is the root
layout. The parts store it replaced still runs — its home page moved to
`/shop`, every other store route is unchanged, and `/studio` permanently
redirects to `/`.

```
src/app/(studio)/        route group serving `/`: layout (fonts + metadata),
                         page, studio.css
src/components/studio/   Nav, Hero, Ritual, Gallery, About, Stats,
                         Testimonials, BookingCTA, Footer, Cursor, Preloader
  └ primitives/          SplitText, RevealMedia, Magnetic
src/lib/studio/          content (all copy + media), gsap, hooks, scroll, intro
public/studio/art/       generated artwork
scripts/generate-studio-art.mjs
```

**Stack.** Next.js + TypeScript + GSAP/ScrollTrigger + Lenis, on the design
tokens defined at the top of `src/app/studio/studio.css`. Tailwind is not used
on this route — the design system is a small set of CSS custom properties and
component classes scoped under `.studio`.

**Artwork.** `npm run studio:art` regenerates the SVG compositions in
`public/studio/art` (18 files, ~300 KB total, no external requests). To use
real studio photography instead, drop the files in `public/studio/` and change
the `src`, `width` and `height` values in `src/lib/studio/content.ts` — keeping
the intrinsic dimensions accurate is what keeps the layout shift at zero.

**Content.** Brand name, addresses, services, prices, gallery entries,
testimonials and statistics all live in `src/lib/studio/content.ts`. The brand
(`ATELIER IVOIRE`) is a placeholder identity; replacing `STUDIO.name` and
`STUDIO.mark` renames the site everywhere, including the preloader and footer.

**Motion.** One Lenis instance drives ScrollTrigger from the GSAP ticker, so
there is a single rAF loop on the page. Everything degrades under
`prefers-reduced-motion`: the intro collapses to a fade, the pinned horizontal
gallery becomes a native scroll rail, the custom cursor is not mounted, and
scroll-linked tweens are skipped rather than snapped.

The route group `(studio)` contributes no URL segment, which is what lets the
experience own `/` while keeping its own layout, fonts and stylesheet separate
from the store's.
