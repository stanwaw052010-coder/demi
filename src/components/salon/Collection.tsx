import Image from "next/image";
import { DRESSES, PHONE_HREF } from "@/lib/salon";

export default function Collection() {
  return (
    <section id="collection" className="bg-ivory-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-wine">
            Колекція
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Наші сукні
          </h2>
          <p className="mt-4 text-ink-soft">
            Кожна сукня існує в салоні в обмеженій кількості — уточнюйте
            наявність та ціну телефоном.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DRESSES.map((dress) => (
            <div
              key={dress.slug}
              className="group overflow-hidden rounded-2xl border border-blush bg-ivory transition-shadow hover:shadow-xl hover:shadow-wine/10"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={dress.image}
                  alt={dress.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {dress.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-wine px-3 py-1 text-xs font-semibold text-ivory">
                    {dress.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-ink">
                  {dress.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {dress.description}
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-4 inline-block text-sm font-semibold text-wine hover:text-wine-light"
                >
                  Дізнатись ціну →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
