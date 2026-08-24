import { Quote } from "lucide-react";
import type { Review } from "@/data/content";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 rounded-md border border-line bg-white p-8">
      <Quote className="size-5 text-muted" strokeWidth={1.25} aria-hidden />
      <blockquote className="text-[1.0625rem] leading-relaxed text-ink">{review.text}</blockquote>
      <figcaption className="text-xs tracking-[0.18em] text-muted uppercase">
        {review.name}
      </figcaption>
    </figure>
  );
}
