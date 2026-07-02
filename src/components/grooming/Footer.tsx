import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/salon";
import { InstagramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-serif text-sm text-cream">
              D
            </span>
            <span className="font-serif text-lg text-cream">Dog Style</span>
          </div>
          <p className="mt-2 max-w-xs text-xs">{ADDRESS}</p>
        </div>

        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="text-sm hover:text-cream">
            {PHONE_DISPLAY}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={INSTAGRAM_HANDLE}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 hover:border-cream/60 hover:text-cream"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Dog Style. Грумінг-салон для собак у
        Кам&apos;янці-Подільському.
      </p>
    </footer>
  );
}
