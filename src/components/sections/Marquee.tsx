"use client";

import {
  Scissors,
  User,
  Palette,
  Wine,
  Coffee,
  Gamepad2,
  Wifi,
  Cigarette,
} from "lucide-react";
import { perks } from "@/lib/content";

const icons: Record<string, React.ReactNode> = {
  scissors: <Scissors size={18} />,
  user: <User size={18} />,
  palette: <Palette size={18} />,
  wine: <Wine size={18} />,
  coffee: <Coffee size={18} />,
  "gamepad-2": <Gamepad2 size={18} />,
  wifi: <Wifi size={18} />,
  cigarette: <Cigarette size={18} />,
};

export default function Marquee() {
  const row = [...perks, ...perks];
  return (
    <section
      aria-label="Переваги"
      className="pause-hover relative overflow-hidden border-y border-white/5 bg-bg-2/30 py-6"
    >
      <div className="marquee gap-14">
        {row.map((p, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 text-muted-2"
          >
            <span className="text-gold">{icons[p.icon]}</span>
            <span className="text-lg font-medium tracking-tight">{p.label}</span>
            <span className="ml-8 text-white/10">✦</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </section>
  );
}
