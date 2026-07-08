import { Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon, TiktokIcon } from "@/components/ui/BrandIcons";
import {
  PHONE_DISPLAY,
  PHONE_RAW,
  INSTAGRAM_URL,
  TIKTOK_URL,
  MAPS_EMBED_URL,
  MAPS_LINK_URL,
  NAV_LINKS,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-green-dark pt-24 text-warm">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 border-b border-warm/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img
              src="/logo/rayskaya-reversed.svg"
              alt="Rayskaya Beauty Space"
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-warm/65">
              Косметологія і естетика обличчя та тіла. Індивідуальний підхід — сучасні
              методики.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-warm/20 text-warm transition-colors hover:border-green hover:text-green"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-warm/20 text-warm transition-colors hover:border-green hover:text-green"
              >
                <TiktokIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm/50">
              Навігація
            </span>
            <nav className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[15px] text-warm/75 transition-colors hover:text-warm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm/50">
              Контакти
            </span>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`tel:${PHONE_RAW}`}
                className="inline-flex items-center gap-2 text-[15px] text-warm/85 transition-colors hover:text-warm"
              >
                <Phone size={15} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-warm/75 transition-colors hover:text-warm"
              >
                Харків
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-warm/50">
              Як нас знайти
            </span>
            <Reveal variant="fade" className="mt-5">
              <a
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border border-warm/15 grayscale transition-all duration-500 hover:grayscale-0"
              >
                <iframe
                  src={MAPS_EMBED_URL}
                  title="Rayskaya Beauty Space на карті"
                  width="100%"
                  height="220"
                  loading="lazy"
                  style={{ border: 0, display: "block" }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-[13px] text-warm/50 md:flex-row">
          <span>© {new Date().getFullYear()} Rayskaya Beauty Space. Усі права захищені.</span>
          <span>Харків</span>
        </div>
      </div>
    </footer>
  );
}
