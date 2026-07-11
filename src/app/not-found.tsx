import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]"
      />
      <div className="flex flex-col items-center">
        <p className="overline mb-8">Помилка · 404</p>
        <h1
          className="font-display font-extrabold leading-none tracking-tightest text-gradient"
          style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}
        >
          404
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-2">
          Схоже, цієї сторінки не існує. Але ваша ідеальна стрижка — точно
          існує.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">На головну</Button>
          <Link
            href="/#services"
            data-cursor="hover"
            className="link-underline self-center text-sm text-muted-2 hover:text-gold"
          >
            Переглянути послуги
          </Link>
        </div>
      </div>
    </section>
  );
}
