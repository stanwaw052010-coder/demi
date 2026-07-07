import { Bird } from "lucide-react";

const DOCTORS = [
  {
    name: "Т. О. Красіліч",
    role: "Лікар-стоматолог",
  },
  {
    name: "Т. П. Позур",
    role: "Лікар-стоматолог",
  },
];

export default function Doctors() {
  return (
    <section id="doctors" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
          Лікарі
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
          Команда, яка веде ваш випадок
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Профілі лікарів та деталі кожного кейсу — у наших сторіз в Instagram.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DOCTORS.map((d) => (
          <div
            key={d.name}
            className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm shadow-black/[0.02]"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a65] via-[#ff6f91] to-[#a855f7] p-[3px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f4f9f8]">
                <Bird className="h-8 w-8 text-[#0d3b3e]" />
              </div>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#0d3b3e]">
              {d.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{d.role}</p>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-[#f4f9f8] p-7 text-center">
          <p className="text-sm font-medium text-gray-600">
            Хочете потрапити на прийом до конкретного лікаря?
          </p>
          <a
            href="#contact"
            className="mt-4 rounded-full bg-[#0d3b3e] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Записатись
          </a>
        </div>
      </div>
    </section>
  );
}
