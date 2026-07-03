import { HeartHandshake, Sparkles, TrendingUp } from "lucide-react";
import { EXPERIENCE_YEARS, NAME, PHOTOS } from "@/lib/mentor";
import Photo from "./Photo";
import Reveal from "./Reveal";

const POINTS = [
  {
    icon: Sparkles,
    title: "Трансформація",
    text: "Вчу професії, яка змінює життя — не лише навичку, а нову ідентичність.",
  },
  {
    icon: TrendingUp,
    title: "Стабільний дохід",
    text: "Допомагаю побудувати систему, що приносить прогнозований результат.",
  },
  {
    icon: HeartHandshake,
    title: "Особистий супровід",
    text: "Кожна учениця отримує увагу та зворотний зв'язок на кожному етапі.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Photo
            src={PHOTOS.portrait.src}
            alt={PHOTOS.portrait.alt}
            className="aspect-[4/5] w-full"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
              Про мене
            </p>
            <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-cream sm:text-4xl">
              {NAME}
            </h2>
            <p className="mt-6 leading-relaxed text-cream-soft">
              Більше {EXPERIENCE_YEARS} років у beauty-індустрії — від майстра
              нарощування волосся до власниці салону краси. За цей час я
              пройшла шлях від першої клієнтки до стабільного бізнесу і хочу
              передати цей досвід тим, хто готовий змінити своє життя через
              нову професію.
            </p>
            <p className="mt-4 leading-relaxed text-cream-soft">
              Навчаю нарощуванню волосся з нуля та допомагаю вийти на
              стабільний дохід у beauty-бізнесі — без здогадок і випадкових
              клієнтів.
            </p>
          </Reveal>

          <div className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.1}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-concrete-2 p-6 transition-colors hover:border-green/30">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green/15 text-green-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm uppercase tracking-wide text-cream">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-cream-soft">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
