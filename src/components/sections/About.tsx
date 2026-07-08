import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-x">
        <Reveal variant="fade">
          <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
            <span className="h-px w-8 bg-green" />
            Про нас
          </span>
        </Reveal>

        <SplitReveal
          as="h2"
          text="Медичний підхід і естетика luxury."
          className="font-display max-w-2xl text-4xl leading-[1.15] text-ink md:text-[3rem]"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal variant="up" delay={0.1} className="lg:col-span-6 xl:col-span-5">
            <p className="max-w-lg text-[16px] leading-[1.9] text-body">
              Rayskaya Beauty Space — місце, де ви можете отримати повний спектр
              косметологічних послуг для відновлення та збереження молодості, краси та
              здоров&rsquo;я, зберігаючи вашу індивідуальність та природну привабливість.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.18} className="lg:col-span-6 xl:col-span-5">
            <p className="max-w-lg text-[16px] leading-[1.9] text-body">
              Ми поєднуємо медичний підхід та естетику luxury. Кожна процедура
              підбирається індивідуально — з урахуванням типу шкіри, її стану та ваших
              побажань. Жодних шаблонних рішень.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.26}>
          <div className="mt-14 flex flex-wrap gap-16 border-t border-line pt-10">
            <div>
              <div className="font-display text-4xl text-ink">13+</div>
              <div className="mt-1.5 text-[13px] text-body">років досвіду</div>
            </div>
            <div>
              <div className="font-display text-4xl text-ink">100%</div>
              <div className="mt-1.5 text-[13px] text-body">індивідуальний підхід</div>
            </div>
            <div>
              <div className="font-display text-4xl text-ink">0</div>
              <div className="mt-1.5 text-[13px] text-body">шаблонних рішень</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
