import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Line-art motifs                                                    */
/* ------------------------------------------------------------------ */

export function BotanicalSprig(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" aria-hidden {...props}>
      <path d="M60 200V20" />
      <path d="M60 60c-18-4-30-16-34-34 18 2 30 14 34 34Z" />
      <path d="M60 60c18-4 30-16 34-34-18 2-30 14-34 34Z" />
      <path d="M60 110c-16-4-27-15-31-31 16 2 27 13 31 31Z" />
      <path d="M60 110c16-4 27-15 31-31-16 2-27 13-31 31Z" />
      <path d="M60 156c-13-3-22-12-26-26 13 2 22 11 26 26Z" />
      <path d="M60 156c13-3 22-12 26-26-13 2-22 11-26 26Z" />
      <circle cx="60" cy="14" r="6" />
    </svg>
  );
}

/** Single continuous-line female profile — an editorial beauty motif. */
export function FaceLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M150 18c-30-8-63 6-74 34-9 22-4 40 6 52 6 7 4 14-3 18-9 5-14 12-12 22 2 12 14 18 30 18" />
      <path d="M76 104c6 3 13 2 18-3" />
      <path d="M70 78c5-3 12-3 17 1" />
      <path d="M97 132c8 6 18 6 27 1" />
      <path d="M150 18c14 10 24 27 24 50 0 46-34 78-79 82" />
    </svg>
  );
}

export function WaveLines(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 60" fill="none" stroke="currentColor" strokeWidth={1.2}
      aria-hidden {...props}>
      <path d="M0 15c30-20 60-20 90 0s60 20 90 0 60-20 60-20" opacity="0.9" />
      <path d="M0 32c30-20 60-20 90 0s60 20 90 0 60-20 60-20" opacity="0.6" />
      <path d="M0 49c30-20 60-20 90 0s60 20 90 0 60-20 60-20" opacity="0.35" />
    </svg>
  );
}

/** Rotating circular seal used as a decorative badge. */
export function SealBadge({
  text = "ENDOSPHERE · LPG · ANTI-CELLULITE · BUCHA · ",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 200 200" className="animate-spin-slow h-full w-full" aria-hidden>
        <defs>
          <path id="seal-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-current" style={{ fontSize: "13px", letterSpacing: "3.5px" }}>
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <LotusMark className="h-9 w-9" />
      </div>
    </div>
  );
}

export function LotusMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M24 40c-9 0-16-6-16-6s2-9 8-11c0 0-1 8 8 11 9-3 8-11 8-11 6 2 8 11 8 11s-7 6-16 6Z" />
      <path d="M24 40c-5-4-6-11-6-15 0-6 6-13 6-13s6 7 6 13c0 4-1 11-6 15Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gradient "photo" panels — elegant stand-ins, easy to swap for      */
/*  real photography later (drop an <img>/<Image> in place).           */
/* ------------------------------------------------------------------ */

const palettes: Record<string, string> = {
  rose: "radial-gradient(120% 120% at 20% 15%, #e7c6ca 0%, #e3d3bf 45%, #d9b7a6 100%)",
  gold: "radial-gradient(120% 120% at 80% 10%, #cbb083 0%, #e3d3bf 50%, #efe6d8 100%)",
  sand: "radial-gradient(120% 120% at 30% 80%, #e3d3bf 0%, #efe6d8 55%, #f7f1e8 100%)",
  mauve:
    "radial-gradient(120% 120% at 75% 20%, #c9a2ab 0%, #b76e79 55%, #8c4a5a 100%)",
  ink: "radial-gradient(120% 120% at 25% 20%, #3a2e26 0%, #2e241d 45%, #221a15 100%)",
};

export function PhotoArt({
  variant = "rose",
  motif = "sprig",
  className,
  children,
}: {
  variant?: keyof typeof palettes;
  motif?: "sprig" | "face" | "wave" | "lotus" | "none";
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = variant === "ink" || variant === "mauve";
  const motifColor = dark ? "text-cream/25" : "text-rose-deep/20";

  return (
    <div
      className={cn("grain relative overflow-hidden", className)}
      style={{ background: palettes[variant] }}
    >
      {/* soft light orb */}
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl"
        style={{ background: dark ? "rgba(203,176,131,0.35)" : "rgba(247,241,232,0.6)" }}
      />
      {motif === "sprig" && (
        <BotanicalSprig className={cn("absolute -bottom-6 left-6 h-2/3 w-auto", motifColor)} />
      )}
      {motif === "face" && (
        <FaceLine className={cn("absolute bottom-0 right-4 h-4/5 w-auto", motifColor)} />
      )}
      {motif === "wave" && (
        <WaveLines className={cn("absolute inset-x-0 bottom-8 w-full px-8", motifColor)} />
      )}
      {motif === "lotus" && (
        <LotusMark className={cn("absolute left-1/2 top-1/2 h-1/3 w-auto -translate-x-1/2 -translate-y-1/2", motifColor)} />
      )}
      {children}
    </div>
  );
}
