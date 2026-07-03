import Link from "next/link";
import { NAME, PERSONAL_INSTAGRAM_HANDLE, PERSONAL_INSTAGRAM_URL, SALON_NAME } from "@/lib/mentor";
import { Instagram } from "./icons";

const FOOTER_LINKS = [
  { href: "/pro-mene", label: "Про мене" },
  { href: "/navchannya", label: "Навчання" },
  { href: "/salon", label: "Салон" },
  { href: "/contacts", label: "Контакти" },
];

export default function Footer() {
  return (
    <footer className="bg-concrete py-10 text-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-cream">{NAME}</p>
          <p className="mt-1 text-xs">Навчання нарощуванню волосся • {SALON_NAME}</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PERSONAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-cream"
          >
            <Instagram className="h-4 w-4" />
            {PERSONAL_INSTAGRAM_HANDLE}
          </a>
        </nav>
      </div>
      <p className="mt-8 text-center text-xs text-cream-soft/50">
        © {new Date().getFullYear()} {NAME}. Усі права захищено.
      </p>
    </footer>
  );
}
