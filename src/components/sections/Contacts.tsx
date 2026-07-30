import { CalendarCheck, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Instagram } from "@/components/ui/icons";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftGlow } from "@/components/ui/Aurora";
import { mapsDirectionsUrl, mapsEmbedUrl, site } from "@/lib/site";

const details = [
  {
    icon: MapPin,
    label: "Адреса",
    value: `${site.address.streetWithUnit}, ${site.address.city}`,
    hint: site.address.landmark,
  },
  {
    icon: Clock,
    label: "Години роботи",
    value: site.hours,
    hint: "Онлайн запис доступний цілодобово",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: site.phone.display,
    hint: "Дзвінки та повідомлення",
    href: site.phone.href,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: site.instagram.handle,
    hint: "Роботи, новини та прайс",
    href: site.instagram.url,
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <SoftGlow />

      <div className="container-x relative z-10">
        <SectionHeading
          eyebrow="Як нас знайти"
          title="Ми у центрі Вишгорода —"
          accent="поруч із Книгарнею «Є»"
          text="пл. Шевченка, 3, приміщення 143. Натисніть «Прокласти маршрут» — навігація до студії відкриється одразу з вашою поточною локацією."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] md:mt-16">
          {/* ---------- картка з контактами ---------- */}
          <Reveal direction="right">
            <div className="flex h-full flex-col rounded-6xl border border-graphite-200/70 bg-white p-8 shadow-soft md:p-10">
              <ul className="flex flex-col gap-6">
                {details.map(({ icon: Icon, label, value, hint, href }) => {
                  const content = (
                    <>
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-all duration-400 group-hover/item:bg-linear-to-br group-hover/item:from-brand-600 group-hover/item:to-brand-900 group-hover/item:text-white">
                        <Icon className="size-5" strokeWidth={2.2} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.7rem] font-bold tracking-[0.16em] text-graphite-400 uppercase">
                          {label}
                        </span>
                        <span className="mt-1 text-[1.02rem] leading-tight font-extrabold tracking-[-0.02em] text-ink">
                          {value}
                        </span>
                        <span className="mt-1 text-[0.83rem] font-medium text-graphite-500">{hint}</span>
                      </span>
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group/item flex items-start gap-4 rounded-3xl transition-opacity hover:opacity-90"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="group/item flex items-start gap-4">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-9 flex flex-col gap-3 border-t border-graphite-200/80 pt-8">
                <Button href={mapsDirectionsUrl} size="lg" className="w-full">
                  <Navigation className="size-5" strokeWidth={2.3} />
                  Прокласти маршрут
                </Button>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button href={site.phone.href} variant="light" size="md" className="w-full">
                    <Phone className="size-[1.05rem]" strokeWidth={2.4} />
                    Подзвонити
                  </Button>
                  <Button href={site.instagram.url} variant="outline" size="md" className="w-full">
                    <Instagram className="size-[1.05rem]" strokeWidth={2.2} />
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---------- карта ---------- */}
          <Reveal direction="left" delay={0.12}>
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-6xl shadow-lift ring-1 ring-graphite-200/70">
              <iframe
                title={`Карта: ${site.name}, ${site.address.full}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0 grayscale-[35%] transition-all duration-700 group-hover:grayscale-0"
              />

              {/* плаваюча картка адреси поверх карти */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="pointer-events-auto flex flex-col gap-4 rounded-4xl bg-white/90 p-5 shadow-lift ring-1 ring-white/70 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-900 text-white shadow-glow">
                      <MapPin className="size-5" strokeWidth={2.4} />
                    </span>
                    <div>
                      <p className="text-[1rem] leading-tight font-extrabold tracking-[-0.02em] text-ink">
                        ProfiTime · {site.address.streetWithUnit}
                      </p>
                      <p className="mt-1 text-[0.83rem] font-medium text-graphite-500">
                        {site.address.city} · {site.address.landmark}
                      </p>
                    </div>
                  </div>
                  <Button href={mapsDirectionsUrl} size="sm" className="shrink-0">
                    <Navigation className="size-4" strokeWidth={2.4} />
                    Маршрут
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- запис на консультацію ---------- */}
        <div id="consultation" className="mt-6 scroll-mt-28">
          <Reveal direction="up">
            <div className="relative overflow-hidden rounded-6xl border border-graphite-200/70 bg-graphite-50 p-8 md:p-12 lg:p-16">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-brand-200/40 blur-[110px]"
              />
              <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <h3 className="max-w-md text-[clamp(1.7rem,1.2rem+1.8vw,2.6rem)] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink text-balance">
                    Замовити{" "}
                    <span className="font-serif font-medium text-brand-600 italic">консультацію</span>
                  </h3>
                  <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-graphite-600 text-pretty">
                    Запис відбувається онлайн: ви бачите вільні вікна, обираєте послугу й час — і одразу
                    отримуєте підтвердження. Для нових клієнтів консультація подолога безкоштовна.
                  </p>

                  <div className="mt-9 flex flex-col gap-4">
                    <MiniPoint icon={CalendarCheck} text="Онлайн-запис працює цілодобово, без дзвінків і очікування" />
                    <MiniPoint icon={Clock} text="Бачите реальні вільні вікна — без «передзвонимо і уточнимо»" />
                    <MiniPoint icon={Phone} text="Не знаєте, що обрати? Зателефонуйте — підкажемо" />
                  </div>
                </div>

                {/* картка онлайн-запису */}
                <div className="relative grain overflow-hidden rounded-5xl bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 p-8 shadow-[0_50px_100px_-40px_rgb(10_27_68/0.7)] sm:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 size-64 animate-float-slow rounded-full bg-aqua-500/25 blur-[80px]"
                  />
                  <BrandGlyph className="pointer-events-none absolute -right-8 -bottom-10 size-48 text-white/[0.06]" />

                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.68rem] font-bold tracking-[0.18em] text-white/80 uppercase glass">
                      <span aria-hidden className="size-1.5 rounded-full bg-aqua-400" />
                      {site.booking.label}
                    </span>

                    <p className="mt-7 text-[1.45rem] leading-tight font-extrabold tracking-[-0.03em] text-white text-balance">
                      Оберіть послугу та зручний час за пару хвилин
                    </p>
                    <p className="mt-3.5 text-[0.93rem] leading-relaxed text-white/60 text-pretty">
                      Ми відкриємо систему запису ProfiTime — там актуальний розклад і всі напрямки студії.
                    </p>

                    <Button href={site.booking.url} variant="light" size="lg" className="mt-8 w-full">
                      <CalendarCheck className="size-5" strokeWidth={2.3} />
                      Замовити консультацію
                    </Button>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Button href={site.phone.href} variant="ghost" size="md" className="w-full">
                        <Phone className="size-[1.05rem]" strokeWidth={2.4} />
                        Подзвонити
                      </Button>
                      <Button href={site.instagram.url} variant="ghost" size="md" className="w-full">
                        <Instagram className="size-[1.05rem]" strokeWidth={2.2} />
                        Написати
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MiniPoint({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  text: string;
}) {
  return (
    <p className="flex items-start gap-3 text-[0.9rem] leading-snug font-medium text-graphite-600">
      <Icon className="mt-0.5 size-[1.05rem] shrink-0 text-brand-500" strokeWidth={2.3} />
      {text}
    </p>
  );
}
