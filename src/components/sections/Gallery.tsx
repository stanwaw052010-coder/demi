import Image from "next/image";
import { Instagram } from "@/components/ui/icons";
import { ArtTile } from "@/components/ui/ArtTile";
import { MotionItem } from "@/components/ui/MotionItem";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { gallery, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Бенто-галерея студії.
 * Кожна плитка автоматично стає фотографією, щойно в `gallery` (src/lib/site.ts)
 * з'явиться поле `src` з файлом із /public/gallery.
 */
export function Gallery() {
  return (
    <section id="gallery" className="relative isolate overflow-hidden bg-graphite-50 py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Галерея"
            title="Атмосфера студії"
            accent="та наші роботи"
            text="Спокійний простір, охайні набори інструментів і результат, який хочеться показати. Найсвіжіші роботи ми щодня публікуємо в Instagram."
            className="lg:max-w-2xl"
          />
          <Reveal direction="left" delay={0.2}>
            <Button href={site.instagram.url} variant="light" size="lg">
              <Instagram className="size-5" strokeWidth={2.2} />
              Дивитись {site.instagram.handle}
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[13.5rem] lg:grid-cols-4 md:mt-16">
          {gallery.map((item) => (
            <MotionItem
              key={item.title}
              className={cn(
                "h-full",
                item.span === "wide" && "col-span-2",
                item.span === "tall" && "row-span-2",
              )}
            >
              <figure className="group relative h-full overflow-hidden rounded-5xl shadow-soft ring-1 ring-graphite-200/60 transition-all duration-500 hover:shadow-lift">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes={
                        item.span === "wide"
                          ? "(max-width: 1024px) 100vw, 50vw"
                          : "(max-width: 1024px) 50vw, 25vw"
                      }
                      className="object-cover"
                    />
                  ) : (
                    item.art && <ArtTile art={item.art} />
                  )}
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-[0.98rem] leading-tight font-extrabold tracking-[-0.02em] text-white text-balance">
                    {item.title}
                  </p>
                  <p className="mt-1.5 max-w-[22ch] text-[0.8rem] leading-snug text-white/0 transition-all duration-500 group-hover:text-white/70">
                    {item.caption}
                  </p>
                </figcaption>
              </figure>
            </MotionItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
