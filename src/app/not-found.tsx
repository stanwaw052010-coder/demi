import Link from "next/link";
import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { landingPages } from "@/lib/landing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Сторінку не знайдено — ${site.name}` },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate grain flex min-h-dvh items-center overflow-hidden bg-brand-950 py-32">
      <Aurora />

      <div className="container-x relative z-10">
        <p className="text-[0.72rem] font-bold tracking-[0.2em] text-aqua-300 uppercase">Помилка 404</p>

        <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,1.4rem+3.2vw,3.8rem)] leading-[1.04] font-extrabold tracking-[-0.04em] text-white text-balance">
          Такої сторінки немає
        </h1>

        <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-white/60 text-pretty">
          Можливо, адресу набрано з помилкою. Ось те, що шукають найчастіше.
        </p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {landingPages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                className="inline-flex rounded-full px-5 py-3 text-[0.88rem] font-bold text-white/80 transition-colors duration-300 glass hover:text-white"
              >
                {page.short}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/" size="lg">
            На головну
          </Button>
        </div>
      </div>
    </section>
  );
}
