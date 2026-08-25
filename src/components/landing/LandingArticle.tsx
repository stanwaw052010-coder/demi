import Link from "next/link";
import { ArrowRight, CalendarCheck, ChevronRight, MapPin, Phone } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLandingPage, type LandingPage, type LandingSection } from "@/lib/landing";
import { mapsDirectionsUrl, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Тіло посадкової сторінки.
 *
 * Порядок блоків підпорядкований одному: людина прийшла з пошуку з
 * конкретним болем. Спершу — де ми і як записатися, далі — відповідь на
 * її питання, потім ціна, потім заперечення (FAQ) і лише в кінці —
 * сусідні сторінки.
 */
export function LandingArticle({ page }: { page: LandingPage }) {
  return (
    <article>
      <LandingHero page={page} />

      {page.sections.map((section, index) => (
        <SectionBlock key={section.heading} section={section} index={index} />
      ))}

      <PriceBlock page={page} />
      <FaqBlock page={page} />
      <RelatedBlock page={page} />
    </article>
  );
}

/* ------------------------------------------------------------------ */

function LandingHero({ page }: { page: LandingPage }) {
  return (
    <section className="relative isolate grain overflow-hidden bg-brand-950 pt-32 pb-20 md:pt-40 md:pb-24">
      <Aurora />

      <div className="container-x relative z-10">
        {/* Хлібні крихти: і навігація, і сигнал структури для пошуку */}
        <nav aria-label="Навігація по сайту" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] font-semibold text-white/45">
            <li>
              <Link href="/" className="transition-colors hover:text-white/80">
                Головна
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" strokeWidth={2.6} />
            </li>
            <li className="text-white/75" aria-current="page">
              {page.short}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-[clamp(2.3rem,1.4rem+3.6vw,4.2rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-white text-balance">
            {page.h1}
          </h1>

          <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-white/65 text-pretty md:text-[1.15rem]">
            {page.lead}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={site.booking.url} size="lg">
              <CalendarCheck className="size-[1.15rem]" strokeWidth={2.4} />
              Записатись онлайн
            </Button>
            <Button href={site.phone.href} variant="ghost" size="lg">
              <Phone className="size-[1.05rem]" strokeWidth={2.4} />
              {site.phone.display}
            </Button>
          </div>

          {/* NAP-блок: назва, адреса, телефон на кожній сторінці — це те,
              за чим Google звіряє сайт із карткою компанії. */}
          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.85rem] font-semibold text-white/55">
            <span className="flex items-center gap-2.5">
              <MapPin className="size-4 text-aqua-400" strokeWidth={2.3} />
              {site.address.street}, {site.address.city}
            </span>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <span>{site.address.landmark}</span>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-aqua-300 transition-colors hover:text-aqua-200"
            >
              Прокласти маршрут
              <ArrowRight className="size-3.5" strokeWidth={2.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SectionBlock({ section, index }: { section: LandingSection; index: number }) {
  // Чергуємо тло, щоб довга сторінка не читалась як суцільна стіна
  const tinted = index % 2 === 1;

  return (
    <section
      className={cn(
        "py-20 md:py-28",
        tinted ? "bg-graphite-50" : "bg-white",
      )}
    >
      <div className="container-x">
        <SectionHeading
          title={section.heading}
          text={"intro" in section ? section.intro : undefined}
        />

        <div className="mt-12">
          {section.kind === "prose" && <Prose paragraphs={section.paragraphs} />}
          {section.kind === "list" && <Cards items={section.items} />}
          {section.kind === "steps" && <Steps items={section.items} />}
        </div>
      </div>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      {paragraphs.map((text, i) => (
        <Reveal key={text.slice(0, 40)} direction="up" delay={i * 0.06}>
          <p className="text-[1.02rem] leading-relaxed text-graphite-600 text-pretty md:text-[1.08rem]">
            {text}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function Cards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          data-reveal="up"
          className="flex flex-col gap-3 rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-400 hover:-translate-y-1 hover:shadow-lift"
        >
          <h3 className="text-[1.05rem] leading-snug font-extrabold tracking-[-0.025em] text-ink text-balance">
            {item.title}
          </h3>
          <p className="text-[0.94rem] leading-relaxed text-graphite-600 text-pretty">{item.text}</p>
        </div>
      ))}
    </StaggerGroup>
  );
}

function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <StaggerGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.title}
          data-reveal="up"
          className="relative flex flex-col gap-3 rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft"
        >
          <span className="text-[0.72rem] font-bold tracking-[0.2em] text-brand-500">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[1.05rem] leading-snug font-extrabold tracking-[-0.025em] text-ink text-balance">
            {item.title}
          </h3>
          <p className="text-[0.94rem] leading-relaxed text-graphite-600 text-pretty">{item.text}</p>
        </div>
      ))}
    </StaggerGroup>
  );
}

/* ------------------------------------------------------------------ */

function PriceBlock({ page }: { page: LandingPage }) {
  return (
    <section id="price" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Прайс"
          title="Скільки це"
          accent="коштує"
          text="Цифри — з офіційного прайс-листа студії. Там, де вказано діапазон, точну суму називаємо після огляду, до початку роботи."
        />

        <div className="mt-12 flex flex-col gap-8">
          {page.priceGroups.map((group) => (
            <Reveal key={group.title} direction="up">
              <div className="overflow-hidden rounded-5xl border border-graphite-200/70 bg-white shadow-soft">
                <div className="flex flex-col gap-1.5 border-b border-graphite-200/70 bg-graphite-50 px-6 py-5 md:px-8">
                  <h3 className="text-[1.1rem] font-extrabold tracking-[-0.025em] text-ink">
                    {group.title}
                  </h3>
                  {group.note && (
                    <p className="text-[0.88rem] leading-relaxed text-graphite-500">{group.note}</p>
                  )}
                </div>

                {group.columns && (
                  <div className="flex items-center gap-6 border-b border-graphite-200/70 px-6 py-3 md:px-8">
                    <span className="flex-1" />
                    {group.columns.map((column) => (
                      <span
                        key={column}
                        className="w-[5.5rem] shrink-0 text-right text-[0.7rem] font-bold tracking-[0.14em] text-graphite-400 uppercase"
                      >
                        {column}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="divide-y divide-graphite-200/60">
                  {group.rows.map((row) => (
                    <li
                      key={`${row.name}-${row.note ?? ""}`}
                      className="flex items-baseline gap-6 px-6 py-4 transition-colors hover:bg-graphite-50/70 md:px-8"
                    >
                      <span className="flex-1 text-[0.96rem] font-semibold text-ink text-pretty">
                        {row.name}
                        {row.note && (
                          <span className="ml-2 text-[0.85rem] font-medium text-graphite-400">
                            {row.note}
                          </span>
                        )}
                      </span>

                      {Array.isArray(row.price) ? (
                        row.price.map((value, i) => (
                          <span
                            key={i}
                            className="w-[5.5rem] shrink-0 text-right text-[0.95rem] font-bold whitespace-nowrap text-brand-800"
                          >
                            {value}
                          </span>
                        ))
                      ) : (
                        <span className="shrink-0 text-right text-[0.95rem] font-bold whitespace-nowrap text-brand-800">
                          {row.price}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 rounded-5xl bg-linear-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-10">
            <div>
              <p className="text-[1.25rem] leading-snug font-extrabold tracking-[-0.03em] text-balance">
                Не впевнені, що саме вам потрібно?
              </p>
              <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-white/65 text-pretty">
                Почніть з консультації — для нових клієнтів вона безкоштовна. Подивимось, назвемо
                причину й точну вартість.
              </p>
            </div>
            <Button href={site.booking.url} variant="light" size="lg" className="shrink-0">
              Записатись
              <ArrowRight className="size-[1.1rem]" strokeWidth={2.4} />
            </Button>
          </div>
        </Reveal>

        <p className="mt-6 text-[0.88rem] text-graphite-500">
          Повний прайс усіх напрямків —{" "}
          <Link href="/#price" className="font-semibold text-brand-700 underline underline-offset-4">
            на головній сторінці
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FaqBlock({ page }: { page: LandingPage }) {
  return (
    <section className="bg-graphite-50 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Питання та відповіді"
              title="Що запитують"
              accent="найчастіше"
              text="Якщо вашого питання тут немає — зателефонуйте, відповімо чесно й без шаблонів."
            />

            <Reveal direction="up" delay={0.2}>
              <div className="mt-9 flex flex-col gap-3">
                <Button href={site.phone.href} size="md" className="w-full sm:w-auto">
                  <Phone className="size-[1.05rem]" strokeWidth={2.4} />
                  {site.phone.display}
                </Button>
              </div>
            </Reveal>
          </div>

          <Accordion items={page.faq} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function RelatedBlock({ page }: { page: LandingPage }) {
  const related = page.related
    .map((slug) => getLandingPage(slug))
    .filter((item): item is LandingPage => Boolean(item));

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading title="Інші напрямки" />

        <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              data-reveal="up"
              className="group flex flex-col gap-3 rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-400 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
            >
              <h3 className="text-[1.08rem] leading-snug font-extrabold tracking-[-0.025em] text-ink transition-colors group-hover:text-brand-700 text-balance">
                {item.short}
              </h3>
              <p className="line-clamp-3 text-[0.92rem] leading-relaxed text-graphite-600 text-pretty">
                {item.lead}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[0.85rem] font-bold text-brand-700">
                Детальніше
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </span>
            </Link>
          ))}
        </StaggerGroup>

        <Reveal direction="up" delay={0.12}>
          <p className="mt-10 text-[0.92rem] text-graphite-500">
            <Link href="/" className="font-semibold text-brand-700 underline underline-offset-4">
              Головна сторінка студії
            </Link>{" "}
            — команда, галерея робіт, повний прайс і карта проїзду.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
