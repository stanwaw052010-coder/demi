import { Quote as QuoteIcon } from "lucide-react";
import Reveal from "./Reveal";
import { NAME } from "@/lib/mentor";

export default function Quote() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <Reveal className="relative rounded-3xl border border-green/20 bg-concrete-2 px-8 py-14 text-center sm:px-16">
        <QuoteIcon className="mx-auto h-9 w-9 text-green-light/50" />
        <p className="mt-6 font-display text-xl leading-relaxed text-cream sm:text-2xl">
          Я вірю, що кожна жінка може побудувати справу свого життя. Моя
          робота — не просто навчити техніці, а показати шлях до впевненості
          та стабільного доходу.
        </p>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-green-light">
          {NAME}
        </p>
      </Reveal>
    </section>
  );
}
