import * as React from "react";
import Image from "next/image";
import { implantCase } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { LogoWatermark } from "@/components/ui/logo-watermark";

/**
 * A real full-arch case. The four photos have very different proportions —
 * a CSS multi-column layout lets each keep its own shape instead of being
 * cropped into a common frame.
 */
export function Implants() {
  const photos = implantCase.photos;

  return (
    <section id="implants" className="grain relative bg-mist py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Copy */}
          <div className="lg:sticky lg:top-44 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="font-mono text-[11px] tabular-nums text-ink/50"
                >
                  08
                </span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="eyebrow">Протезування на імплантах</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display-tight mt-6 font-display text-[32px] font-light text-ink sm:text-[44px] lg:text-[50px]">
                Ціла щелепа{" "}
                <span className="accent text-clay">на чотирьох імплантах</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-graphite md:text-[18px]">
                Реальний клінічний випадок від початку й до кінця: чотири
                імпланти, абатменти, виготовлений під прикус протез — і
                повернене жування замість повної відсутності зубів.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3.5">
              {implantCase.points.map((point, i) => (
                /* The reveal rides on the <li> so the list stays valid */
                <li
                  key={point}
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${0.12 + i * 0.05}s`,
                    } as React.CSSProperties
                  }
                  className="reveal flex items-start gap-3 text-[16px] text-graphite"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-ink"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <ButtonLink
                href="#booking"
                size="lg"
                className="mt-10 font-semibold"
              >
                Порахувати мій випадок
              </ButtonLink>
            </Reveal>
          </div>

          {/* Case photos. The four frames differ a lot in proportion, so the
              two columns are filled by hand to keep their heights close. */}
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {[
              [photos[0], photos[3]],
              [photos[1], photos[2]],
            ].map((column, c) => (
              <div key={c} className="flex flex-col gap-4 lg:gap-5">
                {column.map((photo, i) => (
                  <Reveal
                    key={photo.src}
                    delay={c * 0.07 + i * 0.05}
                    y={36}
                  >
                    <figure className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_-55px_rgba(17,17,17,0.55)]">
                      <div
                        className="relative w-full"
                        style={{ aspectRatio: photo.ratio }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                          className="object-cover"
                          loading="lazy"
                        />
                        {photo.watermark && (
                          <LogoWatermark className="bottom-4 right-4" />
                        )}
                      </div>
                      <figcaption className="px-5 py-4 text-[14px] leading-snug text-graphite">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
