# GIN Barbershop — Преміальний барбершоп у Хмельницькому

Award-worthy, dark-luxury website for **GIN Barbershop** (Khmelnytskyi, Ukraine).
Built with a focus on premium typography, cinematic motion and flawless UX.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — reveals, parallax, carousels, page motion
- **Lenis** — smooth scrolling
- **Lucide** icons

## Features

- Luxury loading screen with animated progress counter
- Custom cursor (dot + magnetic ring), scroll progress bar
- Sticky blurred navbar with hide/show on scroll + full-screen mobile menu
- Full-screen hero with parallax, word-by-word text reveal and animated spotlight
- Animated statistics counters, perks marquee
- Interactive service cards with mouse-follow glow
- Barber cards with grayscale→color hover
- Masonry gallery with keyboard-navigable lightbox
- Google-style reviews carousel (auto-advance)
- Before/After drag slider
- Online booking via embedded **Altegio** widget
- Premium FAQ accordion
- Contacts with Google Maps embed, Call / Route / Book actions
- Floating booking button + sticky mobile CTA
- Full SEO: metadata, Open Graph, Twitter cards, `schema.org` `HairSalon`,
  `sitemap.xml`, `robots.txt`, web manifest
- Accessible, responsive, `prefers-reduced-motion` aware

## Pages

`/` · `/services` · `/gallery` · `/barbers` · `/contacts` · `/privacy` · `404`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Content & configuration

All business data (phone, hours, booking URL, maps, socials) lives in
`src/lib/utils.ts`; services, barbers, gallery, reviews and FAQ content live in
`src/lib/content.ts`. Update those to change site content.

> Note: photos use Unsplash placeholders. Replace the URLs in
> `src/lib/content.ts` and the section components with real GIN photography
> before launch. Update `site.url` in `src/lib/utils.ts` to the production
> domain so canonical/OG/sitemap URLs are correct.
