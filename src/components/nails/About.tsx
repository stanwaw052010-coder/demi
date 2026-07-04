import { Gem, Heart, ShieldCheck } from "lucide-react";
import PhotoPlaceholder from "./PhotoPlaceholder";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Стерильність",
    text: "Одноразові та стерилізовані інструменти для кожного клієнта",
  },
  {
    icon: Gem,
    title: "Якісні матеріали",
    text: "Перевірені гель-лаки та засоби для нігтів і шкіри",
  },
  {
    icon: Heart,
    title: "Індивідуальний підхід",
    text: "Підбираю форму, довжину та дизайн під ваші побажання",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <PhotoPlaceholder
          label="Фото власниці студії"
          filename="owner.jpg"
          className="order-2 aspect-square w-full lg:order-1"
        />

        <div className="order-1 lg:order-2">
          <span className="text-xs font-semibold tracking-widest text-brand-dark">
            ПРО МАЙСТРА
          </span>
          <h2 className="mt-3 font-script text-4xl text-brand-dark sm:text-5xl">
            Наталія Пархуц
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-foreground/70">
            Приймаю у власній студії в Бурштині (Юнашків). Створюю акуратний,
            доглянутий манікюр та педикюр, слідкую за трендами nail-індустрії
            та завжди дбаю про здоров&apos;я ваших нігтів і шкіри.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-1">
            {POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pink-100">
                  <point.icon className="h-5 w-5 text-brand-dark" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{point.title}</p>
                  <p className="text-sm text-foreground/60">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
