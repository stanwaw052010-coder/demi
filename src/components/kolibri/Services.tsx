import {
  Baby,
  Scissors,
  Smile,
  Sparkle,
  Stethoscope,
  Syringe,
  Wrench,
  Zap,
} from "lucide-react";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Терапевтична стоматологія",
    text: "Лікування карієсу, пульпіту та інших захворювань зубів.",
  },
  {
    icon: Scissors,
    title: "Щелепно-лицева хірургія",
    text: "Складні хірургічні втручання в щелепно-лицевій ділянці.",
  },
  {
    icon: Syringe,
    title: "Хірургічна стоматологія",
    text: "Видалення зубів будь-якої складності, резекції, синус-ліфтинг.",
  },
  {
    icon: Wrench,
    title: "Ортопедія та протезування",
    text: "Коронки, мости та знімні протези для відновлення зубного ряду.",
  },
  {
    icon: Zap,
    title: "Імплантація",
    text: "Встановлення імплантів із подальшим протезуванням.",
  },
  {
    icon: Smile,
    title: "Ортодонтія",
    text: "Виправлення прикусу — брекет-системи та капи.",
  },
  {
    icon: Sparkle,
    title: "Естетична стоматологія",
    text: "Відбілювання, вініри та реставрації для гарної посмішки.",
  },
  {
    icon: Baby,
    title: "Дитяча стоматологія",
    text: "Дбайливе лікування зубів у маленьких пацієнтів.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#f4f9f8] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
            Послуги
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
            Все — в одному центрі
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl bg-white p-6 shadow-sm shadow-black/[0.02] ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff8a65] via-[#ff6f91] to-[#a855f7] text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#0d3b3e]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
