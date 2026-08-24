import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ReviewCard } from "../ui/ReviewCard";
import { reviews, reviewsPlaceholder } from "@/data/content";
import { site } from "@/lib/site";

export function Reviews() {
  const hasReviews = reviews.length > 0;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="shell flex flex-col gap-14">
        <SectionHeading
          eyebrow="Відгуки"
          lines={["Що кажуть пацієнти"]}
          description={
            hasReviews
              ? undefined
              : "Ми не публікуємо вигаданих відгуків. Тут зʼявляться реальні враження пацієнтів клініки."
          }
        />

        {hasReviews ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.name} className="flex">
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-md border border-dashed border-line bg-soft px-6 py-20 text-center">
              <p className="font-display text-[1.5rem] text-graphite md:text-[1.875rem]">
                {reviewsPlaceholder}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Поділіться враженням після візиту — у Google Maps або в Instagram клініки.
              </p>
              <a
                href={site.instagram.clinic}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-sm text-graphite"
              >
                {site.instagram.clinicHandle}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
