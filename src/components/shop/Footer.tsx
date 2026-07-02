import { PHONE_DISPLAY, PHONE_HREF, SHOP_NAME } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-sand/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-serif text-sm text-sand">
            F
          </span>
          <span className="font-serif text-lg text-sand">{SHOP_NAME}</span>
        </div>

        <a href={PHONE_HREF} className="text-sm hover:text-sand">
          {PHONE_DISPLAY}
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-sand/40">
        © {new Date().getFullYear()} {SHOP_NAME}. Дизайнерський декор на
        3D-друку.
      </p>
    </footer>
  );
}
