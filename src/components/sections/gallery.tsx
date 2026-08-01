import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

export function Gallery() {
  return (
    <section id="gallery" className="bg-white py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col gap-5 border-t border-ink/[0.08] pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Життя клініки</span>
              <h2 className="mt-4 font-display text-[26px] font-light tracking-[-0.03em] text-ink md:text-[34px]">
                Щодня в <span className="accent text-clay">Instagram</span>
              </h2>
            </div>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[14px] font-medium text-graphite/75 transition-colors duration-300 hover:text-ink"
            >
              <InstagramIcon className="size-4" />
              {site.instagramHandle}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src + i}
              delay={(i % 4) * 0.06}
              className={cn(item.span && "col-span-2 row-span-2")}
            >
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block h-full overflow-hidden rounded-[20px] bg-mist",
                  item.span ? "aspect-square" : "aspect-square",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover grayscale-[30%] transition-all duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90"
                />
                <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/90">
                  <span className="size-1 rounded-full bg-sand" aria-hidden />
                  {item.label}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
