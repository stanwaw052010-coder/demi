import type { Metadata } from "next";
import {
  AtSign,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Footprints,
  Hand,
  HeartHandshake,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "bokhna_podolog.nails — Маніюр і подологія | Маша, Очаків",
  description:
    "Манікюр та подологія в Очакові. Маша — майстер манікюру та подолог. Естетика, яка не шкодить здоров'ю. Запис через Instagram Direct.",
};

const INSTAGRAM_URL = "https://www.instagram.com/bokhna_podolog.nails/?hl=ru";
const EMAIL = "masha.bokhna@gmail.com";

const services = [
  {
    icon: Hand,
    title: "Манікюр",
    description:
      "Класичний та апаратний манікюр, ідеальне покриття гель-лаком, дизайн будь-якої складності.",
  },
  {
    icon: Footprints,
    title: "Подологія",
    description:
      "Вирішення будь-якої проблеми стоп: вростання нігтя, натоптиші, тріщини, апаратний педикюр.",
  },
  {
    icon: ShieldCheck,
    title: "Безпечний простір",
    description:
      "Стерильні інструменти та матеріали, індивідуальний підхід — естетика, яка не шкодить здоров'ю.",
  },
];

const galleryItems = [
  { label: "Манікюр з дизайном", tone: "from-[#E8DCC8] to-[#D8C7A8]" },
  { label: "Педикюр", tone: "from-[#F1E9DC] to-[#E3D6BE]" },
  { label: "Покриття з втиркою", tone: "from-[#A9D6C9] to-[#7FB8AA]" },
  { label: "Подологічний догляд", tone: "from-[#D9C3B0] to-[#C4A98F]" },
];

export default function SalonPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#332C24]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#E7DCC8] bg-[#FAF6EF]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">bokhna_podolog.nails</p>
            <p className="text-xs text-[#8A7B63]">Маша · Манікюр · Подолог · Очаків</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#332C24] px-5 py-2.5 text-sm font-medium text-[#FAF6EF] transition hover:bg-[#4A3F30] sm:inline-flex"
          >
            <AtSign className="h-4 w-4" />
            Записатись
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EFE4CF] px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-[#7A6A4E]">
              <Sparkles className="h-3.5 w-3.5" />
              Health &amp; beauty · Очаків
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Естетика, яка не шкодить здоров&rsquo;ю
            </h1>
            <p className="mt-5 max-w-md text-[#5B5041]">
              Манікюр та подологія в одному безпечному просторі. Вирішую будь-яку
              проблему стоп та створюю ідеальне покриття — дбайливо і з увагою
              до деталей.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#332C24] px-6 py-3 text-sm font-medium text-[#FAF6EF] transition hover:bg-[#4A3F30]"
              >
                <AtSign className="h-4 w-4" />
                Запис через Direct
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#332C24]/20 px-6 py-3 text-sm font-medium text-[#332C24] transition hover:bg-[#EFE4CF]"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Owner photo placeholder */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#C9B79C] via-[#D8CBB0] to-[#9CAF97] shadow-xl">
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#3D3630]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FAF6EF]/70">
                  <User className="h-11 w-11 text-[#5B5041]" strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-wide text-[#5B5041]/80">
                  Фото власниці
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-5 py-4 text-center shadow-lg">
              <p className="text-sm font-semibold">Маша — власниця</p>
              <p className="text-xs text-[#8A7B63]">Майстер манікюру та подолог</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-[#E7DCC8] bg-[#F3EBDC]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-3">
            <Stat value="1 918" label="робіт у портфоліо" />
            <Stat value="403" label="підписники в Instagram" />
            <Stat value="Очаків" label="локація студії" />
          </div>
        </section>

        {/* About / owner */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-semibold tracking-tight">Привіт, я Маша</h2>
            <p className="mt-4 text-[#5B5041]">
              Поєдную дві професії — майстра манікюру та подолога, тому підходжу
              до кожного клієнта комплексно: не просто ідеальне покриття, а
              здорові нігті та стопи.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#5B5041]">
              <li className="flex items-center gap-3">
                <HeartHandshake className="h-4 w-4 shrink-0 text-[#8FA888]" />
                Твій безпечний простір та ідеальне покриття
              </li>
              <li className="flex items-center gap-3">
                <Footprints className="h-4 w-4 shrink-0 text-[#8FA888]" />
                Вирішую будь-яку проблему стоп
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#8FA888]" />
                Стерильність і безпека на кожному етапі
              </li>
            </ul>
          </div>
          <div className="order-1 mx-auto w-full max-w-xs md:order-2">
            <div className="aspect-square w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3D3630] via-[#4A4239] to-[#1F1B16] shadow-xl">
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#FAF6EF]">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                  <User className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Фото власниці — Маша
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-[#F3EBDC] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              Послуги
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {services.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-[#FAF6EF] p-7 shadow-sm ring-1 ring-[#E7DCC8]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFE4CF]">
                    <Icon className="h-5 w-5 text-[#7A6A4E]" />
                  </div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-[#5B5041]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Роботи
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[#5B5041]">
            Повне портфоліо — в Instagram &nbsp;
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#8FA888] underline-offset-4"
            >
              @bokhna_podolog.nails
            </a>
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {galleryItems.map((item) => (
              <div
                key={item.label}
                className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br p-4 text-center shadow-sm ${item.tone}`}
              >
                <Sparkles className="h-5 w-5 text-[#3D3630]/60" />
                <p className="text-xs font-medium text-[#3D3630]/80">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / booking */}
        <section className="border-t border-[#E7DCC8] bg-[#332C24] py-20 text-[#FAF6EF]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Запис через Direct
            </h2>
            <p className="mt-4 text-[#D8CBB0]">
              Напишіть в Instagram або на пошту — підберемо зручний час.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF6EF] px-6 py-3 text-sm font-medium text-[#332C24] transition hover:bg-[#EFE4CF]"
              >
                <AtSign className="h-4 w-4" />
                @bokhna_podolog.nails
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-[#D8CBB0]">
              <MapPin className="h-4 w-4" />
              Очаків, Миколаївська область
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2A2419] py-8 text-center text-xs text-[#B8A98A]">
        © {new Date().getFullYear()} bokhna_podolog.nails · Маша
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-[#8A7B63] sm:text-sm">{label}</p>
    </div>
  );
}
