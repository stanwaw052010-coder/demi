import Image from "next/image";
import {
  CalendarDays,
  Bell,
  UserRound,
  House,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "./icons";
import { LINKS } from "@/lib/site";

function PhoneScreen() {
  return (
    <div className="flex h-full flex-col bg-cream">
      {/* Статус-бар */}
      <div className="flex items-center justify-between px-7 pb-2 pt-4 text-[11px] font-semibold text-ink">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-3.5 rounded-[2px] bg-ink/80" />
          <span className="inline-block h-2.5 w-5 rounded-[3px] border border-ink/50 p-px">
            <span className="block h-full w-3/4 rounded-[2px] bg-brand" />
          </span>
        </span>
      </div>

      {/* Шапка застосунку */}
      <div className="flex items-center justify-between px-6 pt-3">
        <div>
          <p className="text-[11px] text-olive">Вітаємо 👋</p>
          <p className="font-display text-lg text-ink">Rayskaya</p>
        </div>
        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
          <Bell className="h-4 w-4 text-ink" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
      </div>

      {/* Найближчий візит */}
      <div className="mx-5 mt-5 rounded-3xl bg-ink p-5 text-white shadow-lg">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
          Найближчий візит
        </p>
        <p className="mt-2 font-display text-[17px]">Догляд за обличчям</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] text-white/80">
            <CalendarDays className="h-3.5 w-3.5" /> Завтра, 10:00
          </span>
          <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold">
            Деталі
          </span>
        </div>
      </div>

      {/* Послуги */}
      <div className="mt-5 flex-1 px-5">
        <p className="mb-3 text-[12px] font-semibold text-ink">
          Популярні послуги
        </p>
        <div className="space-y-2.5">
          {[
            ["Доглядові процедури", "від 40 хв"],
            ["Лазерна епіляція", "від 45 хв"],
            ["Масаж Ендосфера", "від 60 хв"],
          ].map(([name, time]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
            >
              <div>
                <p className="text-[12.5px] font-semibold text-ink">{name}</p>
                <p className="text-[11px] text-olive">{time}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-brand-deep" />
            </div>
          ))}
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="mt-4 w-full rounded-full bg-brand py-3 text-[13px] font-bold text-white shadow-[0_10px_24px_rgba(141,183,72,0.4)]"
        >
          Записатися
        </button>
      </div>

      {/* Таб-бар */}
      <div className="flex items-center justify-around border-t border-line/70 bg-white/90 px-6 pb-5 pt-3">
        <House className="h-5 w-5 text-brand-deep" strokeWidth={1.8} />
        <CalendarCheck className="h-5 w-5 text-ink/35" strokeWidth={1.8} />
        <UserRound className="h-5 w-5 text-ink/35" strokeWidth={1.8} />
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section
      id="app"
      className="relative overflow-hidden bg-ink py-24 text-white md:py-36"
    >
      {/* Декоративні зелені лінії */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M-60 620 C 260 480, 520 760, 840 600 S 1400 420, 1560 520"
          stroke="#8db748"
          strokeOpacity="0.35"
          strokeWidth="1.4"
        />
        <path
          d="M-60 680 C 280 540, 560 820, 880 660 S 1420 480, 1560 580"
          stroke="#8db748"
          strokeOpacity="0.18"
          strokeWidth="1.2"
        />
        <circle cx="1220" cy="160" r="130" stroke="#8db748" strokeOpacity="0.25" strokeDasharray="3 9" />
      </svg>
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.16)_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-[1360px] items-center gap-20 px-5 md:px-10 lg:grid-cols-2">
        {/* Текст */}
        <div>
          <p className="eyebrow mb-7 text-brand" data-reveal="up">
            Онлайн-запис у кишені
          </p>
          <h2
            className="h-display text-white text-[clamp(2rem,4.4vw,3.6rem)]"
            data-reveal="blur"
          >
            Власний мобільний{" "}
            <span className="italic text-brand">застосунок</span>
          </h2>
          <p
            className="mt-8 max-w-md text-lg leading-relaxed text-white/70"
            data-reveal="up"
            data-reveal-delay="0.12"
          >
            Записуйтеся онлайн, обирайте спеціаліста, отримуйте нагадування та
            керуйте своїми візитами в одному застосунку.
          </p>

          <ul
            className="mt-9 space-y-4 text-[15px] text-white/80"
            data-reveal="up"
            data-reveal-delay="0.2"
          >
            {[
              "Запис за кілька дотиків — без дзвінків",
              "Нагадування про візити",
              "Історія процедур завжди під рукою",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>

          <div
            className="mt-11 flex flex-wrap gap-4"
            data-reveal="up"
            data-reveal-delay="0.28"
          >
            <a
              href={LINKS.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-white/10"
            >
              <AppleIcon className="h-7 w-7" />
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-white/60">
                  Завантажити в
                </span>
                <span className="block text-[17px] font-semibold">
                  App Store
                </span>
              </span>
            </a>
            <a
              href={LINKS.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:bg-white/10"
            >
              <GooglePlayIcon className="h-6.5 w-6.5" />
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-white/60">
                  Доступно в
                </span>
                <span className="block text-[17px] font-semibold">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Мокап телефона */}
        <div className="relative flex justify-center" data-reveal="scale">
          <div className="animate-floaty relative">
            {/* Світіння за телефоном */}
            <div
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.28)_0%,transparent_65%)]"
              aria-hidden
            />
            <div className="relative h-[600px] w-[295px] rounded-[52px] bg-[#0d0f09] p-[10px] shadow-[0_60px_120px_rgba(0,0,0,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.12)]">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[22px] z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-[#0d0f09]" />
              <div className="h-full w-full overflow-hidden rounded-[42px]">
                <PhoneScreen />
              </div>
            </div>

            {/* Плаваюче сповіщення */}
            <div className="absolute -right-36 top-[45%] w-56 animate-floaty-soft rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl max-lg:hidden">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand">
                  <Bell className="h-4 w-4 text-white" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    Нагадування
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-white/70">
                    Ваш візит завтра о 10:00 ✨
                  </p>
                </div>
              </div>
            </div>

            {/* Логотип-підпис */}
            <div className="absolute -left-20 bottom-28 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-xl md:block">
              <Image
                src="/logo/rayskaya-light.svg"
                alt="Rayskaya Beauty Space"
                width={120}
                height={35}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
