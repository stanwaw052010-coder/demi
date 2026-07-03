import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF, SHOP_NAME } from "@/lib/menu";
import { InstagramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-10 text-cream-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red font-display text-sm text-cream">
              N
            </span>
            <span className="font-display uppercase tracking-wide text-cream">
              {SHOP_NAME}
            </span>
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-red hover:text-red"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-cream-soft/50">
        © {new Date().getFullYear()} {SHOP_NAME}. Суші-бар у Перещепиному.
      </p>
    </footer>
  );
}
