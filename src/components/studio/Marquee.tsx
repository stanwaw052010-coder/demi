import { Fragment } from "react";

type Props = {
  items: readonly string[];
  reverse?: boolean;
  /** Seconds for one full pass. Longer reads calmer. */
  duration?: number;
  className?: string;
  separator?: string;
};

/**
 * Infinite editorial band. Two identical groups slide by exactly half the
 * track, so the loop is seamless; hovering stretches the duration rather than
 * stopping it dead. Pure CSS — no scroll listener, no rAF.
 */
export default function Marquee({
  items,
  reverse = false,
  duration = 46,
  className,
  separator = "·",
}: Props) {
  const group = (
    <span className="marquee__group">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="marquee__item">{item}</span>
          <span className="marquee__sep" aria-hidden>
            {separator}
          </span>
        </Fragment>
      ))}
    </span>
  );

  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${className ?? ""}`}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-hidden
    >
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
