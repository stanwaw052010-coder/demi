import Image from "next/image";
import { PHONE_HREF, PRODUCTS } from "@/lib/shop";

export default function Catalog() {
  return (
    <section id="catalog" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Каталог
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Наші роботи
        </h2>
        <p className="mt-4 text-ink-soft">
          Кожен виріб можна замовити в іншому кольорі чи розмірі — просто
          зателефонуйте нам.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <div
            key={product.slug}
            className="group overflow-hidden rounded-2xl border border-sand-2 bg-white/40 transition-shadow hover:shadow-lg hover:shadow-accent/10"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-sand">
                  {product.tag}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl text-ink">{product.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {product.description}
              </p>
              <a
                href={PHONE_HREF}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-dark"
              >
                Дізнатись ціну →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
