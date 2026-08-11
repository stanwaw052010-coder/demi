import { cn } from "@/lib/utils";

/**
 * Градієнтний фон темних секцій.
 *
 * Раніше — три div-и з `filter: blur(120px)` на кілька екранів площею;
 * тепер той самий вигляд дають radial-gradient, які не потребують
 * растеризації розмиття. Сітка малюється одним шаром із маскою.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 aurora-field" />
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
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden soft-glow-field", className)}
    />
  );
}
