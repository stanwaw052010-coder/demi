import Image from "next/image";
import { ArrowRight, CalendarCheck, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

const trust = [
  { icon: ShieldCheck, label: "Стерильний інструмент" },
  { icon: CalendarCheck, label: "Онлайн запис 24/7" },
];

/** Затримка вхідної анімації — через CSS-змінну, без JS. */
const delay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate grain overflow-hidden bg-brand-950 pt-32 pb-20 md:pt-40 md:pb-28 lg:min-h-dvh lg:pt-44 lg:pb-32"
    >
      <Aurora />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          {/* ---------------- Копірайт ---------------- */}
          <div className="max-w-2xl">
            <a
              href="#contacts"
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.72rem] font-bold tracking-[0.16em] text-white/75 uppercase transition-colors duration-300 glass hover:text-white"
            >
              <MapPin className="size-3.5 text-aqua-400" strokeWidth={2.6} />
              Подолог у Вишгороді · пл. Шевченка, 3
            </a>

            <h1
              className="mt-7 text-[clamp(2.6rem,1.4rem+4.6vw,5.1rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-white text-balance"
            >
              Здорові стопи
              <br />
              та <span className="font-serif font-medium text-aqua-300 italic">естетика нігтів</span>
            </h1>

            <p
              className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-white/65 text-pretty md:text-[1.18rem]"
            >
              Простір подології та нігтьового сервісу в одному місці. Розбираємось у причині, а не лише в
              наслідках: працюємо стерильним інструментом і повертаємо стопам комфорт — без болю й поспіху.
            </p>

            <div
              className="enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={delay(0.1)}
            >
              <Button href={site.booking.url} size="lg">
                Замовити консультацію
                <ArrowRight
                  className="size-[1.15rem] transition-transform duration-300 group-hover/btn:translate-x-1"
                  strokeWidth={2.4}
                />
              </Button>
              <Button href="#price" variant="ghost" size="lg">
                Переглянути прайс
              </Button>
            </div>

            <ul
              className="enter-fade mt-11 flex flex-wrap items-center gap-x-7 gap-y-3.5"
              style={delay(0.22)}
            >
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-[0.83rem] font-semibold text-white/55">
                  <Icon className="size-4 text-aqua-400" strokeWidth={2.3} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- Композиція ---------------- */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="enter-scale relative aspect-4/5 w-full overflow-hidden rounded-6xl bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 shadow-[0_60px_120px_-40px_rgb(4_12_36/0.9)] ring-1 ring-white/12"
              style={delay(0.05)}
            >
              <Image
                src="/gallery/hero-manicure.jpg"
                alt="Манікюр із ніжним покриттям, виконаний у студії ProfiTime"
                fill
                // головне зображення сторінки — вантажимо першим
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />

              {/* затемнення знизу, щоб підпис і логотип лишалися читабельними */}
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/25 to-brand-950/10"
              />

              <BrandGlyph className="absolute top-6 right-6 size-12 text-white/85 drop-shadow-[0_4px_12px_rgb(4_12_36/0.6)]" />

              {/* нижня скляна підпис-панель */}
              <div className="absolute inset-x-5 bottom-5 rounded-4xl px-6 py-5 glass">
                <p className="text-[0.68rem] font-bold tracking-[0.2em] text-aqua-300 uppercase">
                  ProfiTime · Вишгород
                </p>
                <p className="mt-2 text-[1.05rem] leading-snug font-bold text-white text-balance">
                  Подологія та нігтьовий сервіс в одному місці
                </p>
              </div>
            </div>

            {/* плаваючі картки */}
            <FloatingCard
              className="-top-5 -left-4 md:-left-10 lg:-left-16"
              delaySeconds={0.4}
              icon={<CalendarCheck className="size-[1.15rem]" strokeWidth={2.4} />}
              title="Онлайн запис"
              subtitle="Доступно 24/7"
            />
            <FloatingCard
              className="top-[56%] right-0 md:-right-8 lg:-right-14"
              delaySeconds={0.55}
              float="slow"
              icon={<Sparkles className="size-[1.15rem]" strokeWidth={2.4} />}
              title="Консультація подолога"
              subtitle="0 грн для нових клієнтів"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  subtitle,
  delaySeconds,
  float = "normal",
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  delaySeconds: number;
  float?: "normal" | "slow";
}) {
  return (
    <div className={`enter-scale absolute z-10 ${className}`} style={delay(delaySeconds)}>
      <div
        className={`flex items-center gap-3.5 rounded-3xl bg-white/95 px-5 py-4 shadow-[0_30px_60px_-25px_rgb(4_12_36/0.75)] ring-1 ring-white/60 ${
          float === "slow" ? "animate-float-slow" : "animate-float"
        }`}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-900 text-white">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-[0.92rem] leading-tight font-extrabold tracking-[-0.02em] text-ink">
            {title}
          </span>
          <span className="mt-0.5 text-[0.78rem] font-medium text-graphite-500">{subtitle}</span>
        </span>
      </div>
    </div>
  );
}
