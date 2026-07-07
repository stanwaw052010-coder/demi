import { ShieldCheck } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d3b3e] to-[#12514f] px-6 py-10 sm:px-12">
        <div
          className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #ff8a65 0%, #ff6f91 45%, transparent 70%)",
          }}
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck className="h-6 w-6 text-[#ff8a65]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Безкоштовне протезування для пенсіонерів
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/70">
                Дізнайтесь, чи маєте ви право на видалення зубів та
                встановлення протезів за програмою — уточніть деталі у наших
                консультантів.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0d3b3e] transition-transform hover:scale-105"
          >
            Дізнатись більше
          </a>
        </div>
      </div>
    </section>
  );
}
