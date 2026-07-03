import { NAME, PERSONAL_INSTAGRAM_HANDLE, PERSONAL_INSTAGRAM_URL, SALON_NAME } from "@/lib/mentor";
import { Instagram } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-concrete py-10 text-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm uppercase tracking-wide text-cream">{NAME}</p>
          <p className="mt-1 text-xs">Навчання нарощуванню волосся • {SALON_NAME}</p>
        </div>

        <a
          href={PERSONAL_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:text-cream"
        >
          <Instagram className="h-4 w-4" />
          {PERSONAL_INSTAGRAM_HANDLE}
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-cream-soft/50">
        © {new Date().getFullYear()} {NAME}. Усі права захищено.
      </p>
    </footer>
  );
}
