import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/salon";

const PHOTOS = [
  { src: "/gallery/pomeranian.webp", alt: "Померанський шпіц після грумінгу" },
  { src: "/gallery/poodle-red.webp", alt: "Той-пудель з зачіскою після стрижки" },
  { src: "/gallery/poodle-brown.webp", alt: "Шоколадний той-пудель після грумінгу" },
  { src: "/gallery/owner-dog.webp", alt: "Задоволена клієнтка з доглянутим песиком" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Наші роботи
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Галерея
        </h2>
        <p className="mt-4 text-ink-soft">
          Більше фото та відео — у нашому Instagram.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-brand px-8 py-3.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand hover:text-cream"
        >
          Дивитись в Instagram
        </a>
      </div>
    </section>
  );
}
