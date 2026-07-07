import { Logo, InstagramIcon } from "./Icons";

const NAV = [
  { href: "#about", label: "Про клініку" },
  { href: "#services", label: "Послуги" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contact", label: "Контакти" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d3b3e]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-3">
              <Logo />
              <span className="text-lg font-bold text-white">KOLIBRI</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Центр щелепно-лицевої хірургії та стоматології. Досвід,
              професіоналізм та найсучасніші методи для найкращих результатів.
            </p>
            <a
              href="https://www.instagram.com/kolibri.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#ff6f91] hover:text-[#ff6f91]"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/40">
              Навігація
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/40">
              Контакти
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <a href="tel:+380930900600" className="hover:text-white">
                093 090 0600
              </a>
              <a href="tel:+380680500400" className="hover:text-white">
                068 050 0400
              </a>
              <span>вул. Дмитра Майбороди, 2а</span>
              <span>Пн–Пт: 09:00–19:00</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} KOLIBRI. Усі права захищено.
        </div>
      </div>
    </footer>
  );
}
