import Image from "next/image";
import { INSTAGRAM_URL, PRODUCTS } from "@/lib/amulets";

export default function Collection() {
  return (
    <section id="collection" className="bg-panel py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-copper-light">
            Колекція
          </p>
          <h2 className="mt-4 font-display text-3xl text-parchment sm:text-4xl">
            Обереги AMELI
          </h2>
          <p className="mt-4 text-parchment-soft">
            Кожен виріб існує в єдиному екземплярі — деталі та ціну уточнюйте
            в Instagram.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.slug}
              className="group overflow-hidden rounded-2xl border border-copper/15 bg-panel-2 transition-shadow hover:shadow-xl hover:shadow-black/30"
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
                  <span className="absolute left-4 top-4 rounded-full bg-copper px-3 py-1 text-xs font-semibold text-void">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-parchment">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-soft">
                  {product.description}
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-copper-light hover:text-copper"
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
