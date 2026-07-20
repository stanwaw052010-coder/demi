"use client";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon, TelegramIcon, ViberIcon } from "./icons/BrandIcons";
import type { ComponentType, SVGProps } from "react";

type Messenger = {
  key: string;
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  bg: string;
  ring: string;
};

export const messengers: Messenger[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: site.links.whatsapp,
    Icon: WhatsAppIcon,
    bg: "#25D366",
    ring: "rgba(37,211,102,0.35)",
  },
  {
    key: "telegram",
    label: "Telegram",
    href: site.links.telegram,
    Icon: TelegramIcon,
    bg: "#2AABEE",
    ring: "rgba(42,171,238,0.35)",
  },
  {
    key: "viber",
    label: "Viber",
    href: site.links.viber,
    Icon: ViberIcon,
    bg: "#7360F2",
    ring: "rgba(115,96,242,0.35)",
  },
];

/** Full-width labelled messenger buttons (used in the contact card). */
export function MessengerRow({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {messengers.map((m) => (
        <a
          key={m.key}
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: m.bg, boxShadow: `0 12px 30px -12px ${m.ring}` }}
        >
          <m.Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          {m.label}
        </a>
      ))}
    </div>
  );
}
