import Image from "next/image";
import { cn } from "@/lib/utils";

/** The clinic's mark, signed quietly into the corner of its own photographs. */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 flex items-center gap-2 rounded-full bg-ink/45 px-3 py-2 backdrop-blur-[2px]",
        className,
      )}
    >
      <Image
        src="/logo-mark-light.png"
        alt=""
        width={180}
        height={208}
        className="h-6 w-auto opacity-95"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/95">
        Nataly Zhylan
      </span>
    </span>
  );
}
