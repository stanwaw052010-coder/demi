import { Camera } from "lucide-react";

export default function PhotoSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl border border-green/20 bg-[radial-gradient(circle_at_30%_20%,rgba(111,160,102,0.18),transparent_60%),linear-gradient(160deg,#2e2c27,#221f1a)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(135deg,rgba(236,231,220,0.15)_0px,rgba(236,231,220,0.15)_1px,transparent_1px,transparent_10px)]" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green-light">
          <Camera className="h-5 w-5" />
        </span>
        <p className="font-display text-xs uppercase tracking-wide text-cream-soft">
          {label}
        </p>
      </div>
    </div>
  );
}
