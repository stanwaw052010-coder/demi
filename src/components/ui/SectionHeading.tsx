export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span
        className={`text-xs font-medium uppercase tracking-[0.3em] ${
          light ? "text-gold-400" : "text-gold-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-serif text-3xl sm:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
