import type { LiquorKey } from "@content/types";

/**
 * The drop is the identity mark of a row. It is the actual colour of the cup,
 * so it carries information; on hover it fills, which is the whole hover
 * behaviour of a row. No scale, no shadow.
 */
export function LiquorDrop({
  liquor,
  size = "0.85rem",
  full = false,
}: {
  liquor: LiquorKey;
  size?: string;
  full?: boolean;
}) {
  return (
    <span
      className="wy-drop"
      data-full={full ? "true" : undefined}
      style={{
        ["--drop" as string]: `var(--color-liquor-${liquor})`,
        width: size,
        height: size,
      }}
      aria-hidden="true"
    />
  );
}
