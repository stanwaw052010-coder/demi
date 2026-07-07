import { Award, HeartHandshake, Sparkles } from "lucide-react";

const POINTS = [
  {
    icon: Award,
    title: "Досвід",
    text: "Роками відточені протоколи лікування — від простої терапії до складних щелепно-лицевих операцій.",
  },
  {
    icon: HeartHandshake,
    title: "Професіоналізм",
    text: "Ми чесно говоримо про діагноз і варіанти лікування, навіть якщо це не найпростіше рішення.",
  },
  {
    icon: Sparkles,
    title: "Найсучасніші методи",
    text: "Сучасне обладнання та матеріали, які скорочують час лікування та роблять його комфортнішим.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
          Про клініку
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
          Стоматологія без зайвого пафосу
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Ми розуміємо, що не всі захочуть лікувати зуби саме у нас — і це
          нормально. Але тим, хто обирає KOLIBRI, ми даємо повний цикл
          допомоги: від профілактики та терапії до складної щелепно-лицевої
          хірургії, в одній команді та в одному кабінеті.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm shadow-black/[0.02] transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d3b3e]/5">
              <Icon className="h-5 w-5 text-[#0d3b3e]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#0d3b3e]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
