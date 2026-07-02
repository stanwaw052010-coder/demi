import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/amulets";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/amulets/collection-flat.jpg"
          alt="Колекція рунічних оберегів ручної роботи AMELI"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/70 to-void" />
      </div>

      <div className="relative mx-auto flex min-h-[680px] max-w-6xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="font-display text-sm uppercase tracking-[0.4em] text-copper-light">
          Handcrafted amulets &amp; talismans
        </p>
        <h1 className="mt-6 font-display text-5xl tracking-[0.1em] text-parchment sm:text-7xl">
          AMELI
        </h1>
        <p className="mt-6 max-w-md text-lg text-parchment-soft">
          Унікальні прикраси з особливою атмосферою
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#collection"
            className="rounded-full bg-copper px-8 py-3.5 text-sm font-semibold text-void shadow-lg shadow-copper/20 transition-colors hover:bg-copper-light"
          >
            Переглянути колекцію
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-copper/50 px-8 py-3.5 text-sm font-semibold text-parchment transition-colors hover:border-copper hover:text-copper-light"
          >
            Instagram
          </a>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.2em] text-parchment-soft/70">
          <span>Створено в Україні</span>
          <span>Shipping across Europe</span>
          <span>Ручна робота</span>
        </div>
      </div>
    </section>
  );
}
