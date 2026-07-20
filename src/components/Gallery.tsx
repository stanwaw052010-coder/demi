"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { PhotoArt } from "./Decor";
import { InstagramIcon } from "./icons/BrandIcons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tile = {
  variant: "rose" | "gold" | "sand" | "mauve" | "ink";
  motif: "sprig" | "face" | "wave" | "lotus";
  span?: string;
  caption: string;
};

const tiles: Tile[] = [
  { variant: "mauve", motif: "face", span: "sm:row-span-2 sm:col-span-2", caption: "Атмосфера студії" },
  { variant: "gold", motif: "sprig", caption: "До / Після" },
  { variant: "rose", motif: "lotus", caption: "Апаратна косметологія" },
  { variant: "sand", motif: "wave", caption: "Лімфодренаж" },
  { variant: "ink", motif: "lotus", caption: "Догляд за тілом" },
  { variant: "rose", motif: "sprig", span: "sm:col-span-2", caption: "Момент турботи" },
  { variant: "mauve", motif: "wave", caption: "Ендосфера" },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-rose-deep">Галерея</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-ink sm:text-5xl">
                Життя студії в{" "}
                <em className="text-rose-gradient not-italic">Instagram</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/40 px-5 py-3 backdrop-blur transition-colors hover:border-rose"
            >
              <InstagramIcon className="h-5 w-5 text-rose-deep" />
              <span className="text-sm font-semibold text-ink">
                @{site.instagramHandle}
              </span>
              <span className="text-xs text-ink-soft">· 2 077 стежать</span>
            </a>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[210px]"
          stagger={0.07}
        >
          {tiles.map((t, i) => (
            <RevealItem key={i} direction="zoom" className={cn(t.span)}>
              <GalleryTile {...t} />
            </RevealItem>
          ))}

          {/* Follow CTA tile */}
          <RevealItem direction="zoom">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-rose to-rose-deep p-5 text-center text-cream shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <InstagramIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display text-lg leading-tight">Підписатися</span>
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function GalleryTile({ variant, motif, caption }: Tile) {
  return (
    <motion.a
      href={site.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      className="group relative block h-full overflow-hidden rounded-2xl"
    >
      <motion.div
        variants={{ hover: { scale: 1.08 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <PhotoArt variant={variant} motif={motif} className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 text-cream">
          <InstagramIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{caption}</span>
        </div>
      </div>
    </motion.a>
  );
}
