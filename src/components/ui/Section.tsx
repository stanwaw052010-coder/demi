import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "espresso" | "cocoa" | "cream";

const tones: Record<Tone, string> = {
  espresso: "bg-espresso text-sand",
  cocoa: "bg-cocoa text-sand",
  cream: "bg-cream text-ink",
};

/** Секція-конверт: єдина колонка 1160px і спільний вертикальний ритм. */
export function Section({
  id,
  tone = "espresso",
  className,
  innerClassName,
  children,
  /** вигинає верх секції, накриваючи попередню — м'який перехід замість прямої лінії */
  curveTop = false,
  /** тепла світлова пляма на тлі */
  glow,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  curveTop?: boolean;
  glow?: "left" | "right";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28",
        tones[tone],
        /* clip, а не hidden: hidden зробив би секцію скрол-контейнером і зламав sticky */
        glow && "overflow-clip",
        curveTop && "curve-top -mt-10 pt-24 md:-mt-14 md:pt-32",
        curveTop && "z-10",
        className,
      )}
    >
      {glow ? (
        <span
          aria-hidden
          className={cn(
            "glow-spot hidden h-[420px] w-[420px] md:block",
            glow === "left" ? "-left-24 top-24" : "-right-24 bottom-16",
          )}
        />
      ) : null}
      <div className={cn("relative mx-auto w-full max-w-[1160px]", innerClassName)}>{children}</div>
    </section>
  );
}

/** Заголовок секції: лейбл + display-серіф + необов'язковий вступ. */
export function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  children,
}: {
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {children}
      <h2
        className={cn(
          "text-balance text-[2.1rem] leading-[1.08] sm:text-5xl md:text-[3.4rem]",
          tone === "light" ? "text-ink" : "text-sand",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-[62ch] text-pretty text-[0.98rem] sm:text-base",
            tone === "light" ? "text-ink-soft" : "text-beige",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
