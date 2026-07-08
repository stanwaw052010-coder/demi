import MagneticButton from "./MagneticButton";

export default function CTA() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32">
      <div
        className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#eef4df_0%,#dcebbf_45%,#c3dc95_100%)] px-8 py-20 text-center md:py-28"
        data-reveal="scale"
      >
        {/* Декор */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.35)_0%,transparent_65%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_60%)]"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute right-14 top-12 h-40 w-40 text-brand-deep/25 animate-spin-slow max-md:hidden"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
        </svg>

        <div className="relative">
          <h2 className="h-display mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)]">
            Готові зробити перший крок до{" "}
            <span className="italic text-brand-deep">здорової шкіри?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-olive">
            Залиште заявку — і ми підберемо процедуру саме для вас.
          </p>
          <div className="mt-11">
            <MagneticButton
              href="#booking"
              className="items-center justify-center rounded-full bg-ink px-11 py-5 text-base font-semibold text-white shadow-[0_24px_60px_rgba(34,39,25,0.35)] transition-colors duration-300 hover:bg-brand-deep"
            >
              Записатися зараз
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
