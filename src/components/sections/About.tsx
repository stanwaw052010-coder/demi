import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import PhotoSlot from "@/components/ui/PhotoSlot";

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal variant="fade">
            <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
              <span className="h-px w-8 bg-green" />
              Про нас
            </span>
          </Reveal>

          <SplitReveal
            as="h2"
            text="Медичний підхід і естетика luxury."
            className="font-display max-w-md text-4xl leading-[1.15] text-ink md:text-[2.75rem]"
          />

          <Reveal variant="up" delay={0.1}>
            <p className="mt-8 max-w-lg text-[16px] leading-[1.9] text-body">
              Rayskaya Beauty Space — місце, де ви можете отримати повний спектр
              косметологічних послуг для відновлення та збереження молодості, краси та
              здоров&rsquo;я, зберігаючи вашу індивідуальність та природну привабливість.
            </p>
            <p className="mt-5 max-w-lg text-[16px] leading-[1.9] text-body">
              Ми поєднуємо медичний підхід та естетику luxury. Кожна процедура
              підбирається індивідуально — з урахуванням типу шкіри, її стану та ваших
              побажань. Жодних шаблонних рішень.
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.2}>
            <div className="mt-12 flex gap-12 border-t border-line pt-8">
              <div>
                <div className="font-display text-3xl text-ink">13+</div>
                <div className="mt-1 text-[13px] text-body">років досвіду</div>
              </div>
              <div>
                <div className="font-display text-3xl text-ink">100%</div>
                <div className="mt-1 text-[13px] text-body">індивідуальний підхід</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal variant="scale" duration={1.1}>
            <PhotoSlot
              src="/images/about-studio.jpg"
              alt="Кабінет Rayskaya Beauty Space"
              className="aspect-[16/11] w-full rounded-xl"
              blobVariant={3}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
