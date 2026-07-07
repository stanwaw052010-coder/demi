import { Clock, MapPin, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0d3b3e]"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #ff8a65 0%, #ff6f91 45%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #a855f7 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 ring-1 ring-white/20">
              Центр щелепно-лицевої хірургії та стоматології
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              KOLIBRI —{" "}
              <span className="bg-gradient-to-r from-[#ff8a65] via-[#ff6f91] to-[#c084fc] bg-clip-text text-transparent">
                турбота, якій довіряють
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Досвід, професіоналізм та найсучасніші методи — для найкращих
              результатів. Лікуємо зуби та вирішуємо складні щелепно-лицеві
              випадки в одній клініці.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0d3b3e] shadow-lg shadow-black/10 transition-transform hover:scale-[1.03]"
              >
                Записатись на прийом
              </a>
              <a
                href="https://www.instagram.com/kolibri.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Дивитись Instagram
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#ff8a65]" />
                Пн–Пт, 09:00–19:00
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#ff8a65]" />
                093 090 0600 · 068 050 0400
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#ff8a65]" />
                вул. Дмитра Майбороди, 2а
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ff8a65] via-[#ff6f91] to-[#a855f7] p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d3b3e] text-sm font-bold text-white">
                    K
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">kolibri.vn</p>
                  <p className="text-xs text-white/50">Загальна стоматологія</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 text-center">
                <div>
                  <p className="text-xl font-bold text-white">348</p>
                  <p className="text-[11px] text-white/50">публікацій</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">1148</p>
                  <p className="text-[11px] text-white/50">підписників</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">108</p>
                  <p className="text-[11px] text-white/50">підписок</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  "from-[#ff8a65] to-[#ff6f91]",
                  "from-[#ff6f91] to-[#a855f7]",
                  "from-[#a855f7] to-[#38bdf8]",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl bg-gradient-to-br ${g} opacity-80`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
