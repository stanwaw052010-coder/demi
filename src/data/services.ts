export type Service = {
  slug: string;
  title: string;
  /** Загальний опис категорії. Жодних конкретних технологій чи цін —
   *  таких даних клініка не надавала. */
  summary: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "therapy",
    title: "Терапевтична стоматологія",
    summary: "Лікування зубів із увагою до збереження власних тканин.",
    image: "/images/service-therapy.svg",
  },
  {
    slug: "hygiene",
    title: "Професійна гігієна",
    summary: "Регулярний догляд, який тримає усмішку здоровою.",
    image: "/images/service-hygiene.svg",
  },
  {
    slug: "aesthetic",
    title: "Естетична стоматологія",
    summary: "Форма, колір і пропорції — природний вигляд усмішки.",
    image: "/images/service-aesthetic.svg",
  },
  {
    slug: "whitening",
    title: "Відбілювання",
    summary: "Освітлення відтінку емалі під контролем лікаря.",
    image: "/images/service-whitening.svg",
  },
  {
    slug: "orthodontics",
    title: "Ортодонтія",
    summary: "Вирівнювання прикусу та положення зубів.",
    image: "/images/service-orthodontics.svg",
  },
  {
    slug: "implantation",
    title: "Імплантація",
    summary: "Відновлення втрачених зубів із опорою на імплантат.",
    image: "/images/service-implantation.svg",
  },
  {
    slug: "prosthetics",
    title: "Протезування",
    summary: "Повернення функції та естетики зубного ряду.",
    image: "/images/service-prosthetics.svg",
  },
  {
    slug: "kids",
    title: "Дитяча стоматологія",
    summary: "Спокійний перший досвід і догляд без стресу.",
    image: "/images/service-kids.svg",
  },
  {
    slug: "surgery",
    title: "Хірургічна стоматологія",
    summary: "Втручання, коли зберегти зуб уже неможливо.",
    image: "/images/service-surgery.svg",
  },
  {
    slug: "consultation",
    title: "Консультація стоматолога",
    summary: "Огляд, відповіді на запитання та план турботи.",
    image: "/images/service-consultation.svg",
  },
];
