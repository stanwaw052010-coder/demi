import Image from "next/image";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/salon";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/dresses/cacao-satin.jpg"
          alt="Вечірня сукня VELLA"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[680px] max-w-6xl flex-col justify-center px-5 py-24">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-ivory/15 px-4 py-1.5 text-sm font-medium text-ivory backdrop-blur-sm">
          Весільний салон у Тернополі
        </p>
        <h1 className="max-w-xl font-display text-5xl leading-tight text-ivory sm:text-6xl">
          Сукні, в яких ви сяятимете
        </h1>
        <p className="mt-5 max-w-lg text-lg text-ivory/85">
          Весільні та вечірні сукні, індивідуальний підбір образу та примірка
          у затишній атмосфері салону.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#collection"
            className="rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg shadow-wine/30 transition-colors hover:bg-wine-light"
          >
            Переглянути колекцію
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full border border-ivory/40 bg-ivory/10 px-7 py-3.5 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/20"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/80">
          <span>👗 Індивідуальний підбір</span>
          <span>✂️ Примірка та підгонка</span>
          <span>📍 Тернопіль</span>
        </div>
      </div>
    </section>
  );
}
