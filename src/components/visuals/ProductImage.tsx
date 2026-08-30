import { existsSync } from "node:fs";
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
  const hasPhoto = existsSync(path.join(process.cwd(), "public", "products", file));

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
