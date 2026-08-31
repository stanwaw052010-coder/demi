import { readdirSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Form, LiquorKey } from "@content/types";
import { TeaComposition, type CompositionView } from "./TeaComposition";

interface Props {
  slug: string;
  form: Form;
  liquor: LiquorKey;
  alt: string;
  view?: CompositionView;
  /** Set on the one image that should carry the page transition. */
  shared?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

const VIEW_SUFFIX: Record<CompositionView, string> = {
  dry: "",
  liquor: "-liquor",
  wet: "-wet",
  pack: "-pack",
};

/**
 * The photo directory is read once per process rather than stat-ed per image.
 *
 * Doing it per render was also wrong on a serverless host: statically rendered
 * product pages resolve at build time, where /public exists, while the
 * catalogue renders per request inside a lambda, where it does not. The two
 * would disagree the moment real photographs were added — photos on the
 * product page, drawings in the catalogue. `outputFileTracingIncludes` in
 * next.config.ts ships the directory into the function so both agree.
 */
const photos: ReadonlySet<string> = (() => {
  try {
    return new Set(readdirSync(path.join(process.cwd(), "public", "products")));
  } catch {
    // No directory yet, which is the normal state until PHOTOS.md is worked
    // through. Everything falls back to the drawn composition.
    return new Set<string>();
  }
})();

/**
 * Looks for a real photograph first and falls back to the drawn composition, so
 * replacing the image layer with photography is a matter of dropping files into
 * /public/products. See PHOTOS.md for the shot list.
 */
export function ProductImage({
  slug,
  form,
  liquor,
  alt,
  view = "dry",
  shared = false,
  priority = false,
  sizes = "(max-width: 60rem) 100vw, 40vw",
  className,
}: Props) {
  const file = `${slug}${VIEW_SUFFIX[view]}.jpg`;
  const hasPhoto = photos.has(file);

  return (
    <div
      className={className}
      style={{
        aspectRatio: "1 / 1",
        position: "relative",
        overflow: "hidden",
        // The shared element for the View Transitions API.
        viewTransitionName: shared ? "product-image" : undefined,
        border: "1px solid var(--rule)",
        // A soft corner on the drawing, not a card: hairline, no shadow, no
        // lift. The curve comes from the gaiwan, which is the object in most
        // of these compositions anyway.
        borderRadius: "var(--radius-panel)",
      }}
    >
      {hasPhoto ? (
        <Image
          src={`/products/${file}`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <>
          <TeaComposition slug={slug} form={form} liquor={liquor} view={view} />
          <span className="sr-only">{alt}</span>
        </>
      )}
    </div>
  );
}
