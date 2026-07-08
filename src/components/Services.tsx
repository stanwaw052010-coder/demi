import { ArrowUpRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { SERVICES } from "@/lib/site";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-mist py-24 md:py-36"
    >
      <div
        className="pointer-events-none absolute -left-56 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.14)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-7" data-reveal="up">
              Наші послуги
            </p>
            <h2
              className="h-display max-w-2xl text-[clamp(2rem,4.4vw,3.6rem)]"
              data-reveal="blur"
            >
              Повний спектр{" "}
              <span className="italic text-brand-deep">косметології</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-base leading-relaxed text-olive"
            data-reveal="up"
            data-reveal-delay="0.15"
          >
            Обличчя та тіло. Апаратні, ін’єкційні та доглядові методики —
            підібрані індивідуально для вас.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((s, i) => (
            <a
              key={s.id}
              href="#booking"
              data-reveal="up"
              data-reveal-delay={`${(i % 3) * 0.12}`}
              className="group relative flex flex-col overflow-hidden rounded-[32px] border border-line/70 bg-white shadow-[0_10px_40px_rgba(34,39,25,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_36px_80px_rgba(34,39,25,0.14)]"
            >
              <div className="relative h-64 overflow-hidden">
                <SmartImage
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="font-display text-[1.55rem] leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-olive">
                  {s.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-deep">
                  Записатися
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
