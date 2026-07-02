import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SHOP_NAME } from "@/lib/amulets";
import { InstagramIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-void py-10 text-parchment-soft/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-copper/40 font-display text-sm text-copper-light">
            A
          </span>
          <span className="font-display tracking-[0.15em] text-parchment">
            {SHOP_NAME}
          </span>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:text-parchment"
        >
          <InstagramIcon className="h-4 w-4" />
          {INSTAGRAM_HANDLE}
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-parchment-soft/40">
        © {new Date().getFullYear()} {SHOP_NAME}. Handcrafted amulets &amp;
        talismans. Створено в Україні.
      </p>
    </footer>
  );
}
