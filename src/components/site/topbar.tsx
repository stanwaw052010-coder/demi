import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { InstagramIcon, ViberIcon } from "@/components/ui/icons";

/**
 * Always-on black strip: address on the left, messengers and the phone on the
 * right. It never collapses — the two questions every patient arrives with
 * are answered before they scroll.
 */
export function TopBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-x">
        <div className="flex min-h-[52px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 md:min-h-[56px]">
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-2.5 text-[15px] font-semibold text-white md:text-[16px]"
          >
            <MapPin className="size-[18px] shrink-0" strokeWidth={2.25} />
            <span className="truncate underline-offset-4 group-hover:underline">
              {site.address}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-4 md:gap-6">
            <span className="hidden items-center gap-2 text-[15px] font-medium text-white xl:inline-flex">
              <Clock className="size-[18px]" strokeWidth={2.25} />
              Пн–Пт 09:00–19:00
            </span>

            <span className="hidden items-center gap-2 sm:flex">
              <a
                href={site.viber}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написати у Viber"
                className="flex size-9 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                <ViberIcon className="size-[18px]" />
              </a>
              {/* Spelled out from lg — as an icon alone the clinic could not
                  find the Instagram link at all. */}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center justify-center gap-2 rounded-full border border-white/25 px-2.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink lg:px-4"
              >
                <InstagramIcon className="size-[18px]" strokeWidth={1.75} />
                <span className="hidden lg:inline">{site.instagramHandle}</span>
                <span className="sr-only lg:hidden">Instagram клініки</span>
              </a>
            </span>

            <span className="flex items-center gap-2.5 text-white">
              <Phone className="size-5 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight sm:flex-row sm:items-center sm:gap-4">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-[26px] items-center text-[15px] font-bold tabular-nums underline-offset-4 hover:underline sm:text-[17px] md:text-[19px]"
                >
                  {site.phone}
                </a>
                <a
                  href={site.phone2Href}
                  className="inline-flex min-h-[26px] items-center text-[15px] font-bold tabular-nums underline-offset-4 hover:underline sm:text-[17px] md:text-[19px]"
                >
                  {site.phone2}
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
