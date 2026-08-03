import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Address, hours and phone on a black strip above everything else — the two
 * things patients look for first are never more than a glance away.
 */
export function TopBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-ink text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        compact ? "max-h-0 opacity-0" : "max-h-16 opacity-100",
      )}
    >
      <div className="container-x">
        <div className="flex h-11 items-center justify-between gap-4 md:h-12">
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-2 text-[14px] font-medium text-white transition-colors duration-300 hover:text-white md:text-[14px]"
          >
            <MapPin className="size-4 shrink-0" strokeWidth={2} />
            <span className="truncate underline-offset-4 group-hover:underline">
              {site.address}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-5 md:gap-7">
            <span className="hidden items-center gap-2 text-[14px] font-medium text-white/90 lg:inline-flex">
              <Clock className="size-4" strokeWidth={2} />
              Пн–Пт 09:00–19:00 · Сб 10:00–15:00
            </span>

            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-[14px] font-semibold tabular-nums text-white underline-offset-4 transition-colors duration-300 hover:underline md:text-[16px]"
            >
              <Phone className="size-4 shrink-0" strokeWidth={2.25} />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
