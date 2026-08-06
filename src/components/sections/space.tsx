"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/lib/content";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LogoWatermark } from "@/components/ui/logo-watermark";
import { AutoVideo } from "@/components/ui/auto-video";

/** The clinic walkthrough — fetched only as the section nears the viewport. */
function ClinicVideo() {
  return (
    <AutoVideo
      src="/video/clinic"
      poster="/images/clinic-video-poster.jpg"
      label="Відео інтер'єру клініки"
      className="aspect-9/16 rounded-[24px] shadow-[0_40px_110px_-60px_rgba(17,17,17,0.55)]"
    >
      <LogoWatermark className="right-5 top-5" />

      <span className="pointer-events-none absolute bottom-5 left-5 rounded-full glass-dark px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-white">
        Наш простір
      </span>
    </AutoVideo>
  );
}

export function Space() {
  return (
    <section id="space" className="bg-white py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          index="09"
          eyebrow="Клініка"
          title={
            <>
              Місце, куди хочеться{" "}
              <span className="accent text-clay">повертатися</span>
            </>
          }
          description="Затишна зона очікування, окремий кабінет із мікроскопом і стерильність за протоколом. Подивіться, як у нас усередині."
          action={
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/15 px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              <InstagramIcon className="size-[18px]" strokeWidth={1.75} />
              {site.instagramHandle}
              <ArrowUpRight
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.25}
              />
            </a>
          }
        />

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] lg:gap-5">
          <Reveal y={36}>
            <ClinicVideo />
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:gap-5">
            {gallery.map((item, i) => (
              <Reveal key={item.src} delay={(i % 2) * 0.07} className="h-full">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block h-full min-h-[180px] overflow-hidden rounded-[24px] bg-mist"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 28vw"
                    style={
                      item.position ? { objectPosition: item.position } : undefined
                    }
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-4 left-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                    {item.label}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
