import { ArrowUpRight } from "lucide-react";
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
      <div
        className="pointer-events-none absolute -right-48 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.1)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-[1360px] px-5 md:px-10">
        <p className="eyebrow mb-16" data-reveal="up">
          Наші послуги
        </p>

        <div className="border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <a
              key={s.id}
              href="#booking"
              data-reveal="up"
              data-reveal-delay={`${(i % 2) * 0.08}`}
              className="group relative grid items-center gap-x-8 gap-y-2 border-b border-ink/10 py-9 transition-all duration-500 hover:border-brand/40 md:grid-cols-[72px_1.1fr_1.3fr_auto] md:py-11"
            >
              {/* Підсвітка рядка на hover */}
              <span
                className="pointer-events-none absolute -inset-x-6 inset-y-2 -z-10 rounded-[28px] bg-white opacity-0 shadow-[0_24px_60px_rgba(34,39,25,0.08)] transition-all duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span className="font-display text-lg italic text-brand-deep/60 transition-colors duration-300 group-hover:text-brand-deep max-md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink transition-transform duration-500 group-hover:translate-x-1.5">
                {s.title}
              </h3>
              <p className="max-w-xl leading-relaxed text-olive">{s.text}</p>
              <span className="mt-2 inline-flex items-center gap-3 text-[15px] font-semibold text-brand-deep md:mt-0 md:justify-self-end">
                <span className="md:hidden">Записатися</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-white/70 transition-all duration-400 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-400 group-hover:rotate-45" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
