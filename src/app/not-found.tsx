import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 py-32 text-center">
      <span className="font-serif text-7xl text-gold-500">404</span>
      <h1 className="mt-4 font-serif text-2xl text-navy-900 sm:text-3xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-3 max-w-sm text-sm text-navy-900/60">
        Можливо, послугу перенесено або посилання застаріло. Спробуйте перейти
        на головну або переглянути повний прайс.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="primary">
          <Link href="/">На головну</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Всі послуги</Link>
        </Button>
      </div>
    </section>
  );
}
