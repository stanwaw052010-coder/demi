import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/shop";

export default function Contact() {
  return (
    <section id="contacts" className="bg-ink py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
        <h2 className="font-serif text-3xl text-sand sm:text-4xl">
          Готові надрукувати ваш декор?
        </h2>
        <p className="max-w-lg text-sand/75">
          Зателефонуйте нам — підберемо модель, колір і розмір під ваш
          інтер&apos;єр.
        </p>
        <a
          href={PHONE_HREF}
          className="mt-2 flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-sand shadow-lg shadow-accent/30 transition-colors hover:bg-accent-dark"
        >
          <Phone className="h-5 w-5" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}
