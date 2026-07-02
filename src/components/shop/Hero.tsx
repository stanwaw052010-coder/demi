import Image from "next/image";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/shop";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/products/bouquet-vase.jpg"
          alt="Дизайнерська 3D-друкована ваза в інтер'єрі"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/15" />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-5 py-24">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-sand/15 px-4 py-1.5 text-sm font-medium text-sand backdrop-blur-sm">
          Студія 3D-друку декору в Україні
        </p>
        <h1 className="max-w-xl font-serif text-4xl leading-tight text-sand sm:text-5xl">
          Дизайнерський декор, надрукований на 3D-принтері
        </h1>
        <p className="mt-5 max-w-lg text-lg text-sand/85">
          Вази та скульптурні предмети інтер&apos;єру з унікальним рельєфом.
          Обирайте колір і розмір — друкуємо під ваше замовлення.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#catalog"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-sand shadow-lg shadow-accent/30 transition-colors hover:bg-accent-dark"
          >
            Переглянути каталог
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full border border-sand/40 bg-sand/10 px-7 py-3.5 text-sm font-semibold text-sand backdrop-blur-sm transition-colors hover:bg-sand/20"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-sand/80">
          <span>🎨 Будь-який колір на вибір</span>
          <span>📐 Індивідуальний розмір</span>
          <span>🚚 Доставка по всій Україні</span>
        </div>
      </div>
    </section>
  );
}
