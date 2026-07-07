import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15]",
          light ? "text-white" : "text-navy-950"
        )}
      >
        {title}
      </h2>
      <div className="gold-divider" style={align === "center" ? { marginInline: "auto" } : undefined} />
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-sm sm:text-base leading-relaxed",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
