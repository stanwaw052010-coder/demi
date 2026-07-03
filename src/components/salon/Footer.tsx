import { ADDRESS, PHONE_DISPLAY, PHONE_HREF, SALON_NAME } from "@/lib/salon";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-ivory/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-wine font-display text-sm text-ivory">
              V
            </span>
            <span className="font-display text-lg tracking-[0.1em] text-ivory">
              {SALON_NAME}
            </span>
          </div>
          <p className="mt-2 max-w-xs text-xs">{ADDRESS}</p>
        </div>

        <a href={PHONE_HREF} className="text-sm hover:text-ivory">
          {PHONE_DISPLAY}
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} {SALON_NAME}. Весільний салон у
        Тернополі.
      </p>
    </footer>
  );
}
