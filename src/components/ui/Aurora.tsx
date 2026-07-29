import { cn } from "@/lib/utils";

/** Живий градієнтний фон для темних секцій. Чистий CSS — без JS і без зображень. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-1/3 -left-24 size-[46rem] animate-aurora rounded-full bg-brand-600/35 blur-[120px]" />
      <div className="absolute top-1/4 -right-32 size-[38rem] animate-aurora rounded-full bg-aqua-500/25 blur-[130px] [animation-delay:-7s]" />
      <div className="absolute -bottom-40 left-1/3 size-[34rem] animate-aurora rounded-full bg-brand-500/25 blur-[120px] [animation-delay:-14s]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}

/** М'які світлові плями для світлих секцій. */
export function SoftGlow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-40 right-0 size-[32rem] rounded-full bg-brand-200/40 blur-[110px]" />
      <div className="absolute bottom-0 -left-32 size-[28rem] rounded-full bg-aqua-200/45 blur-[110px]" />
    </div>
  );
}
