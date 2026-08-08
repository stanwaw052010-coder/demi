"use client";

import { Fragment } from "react";

/**
 * Deterministic text splitting — rendered identically on the server and the
 * client, so there is no hydration mismatch and no flash of unsplit type.
 * Each piece sits inside an overflow-hidden mask so it can be pushed out of
 * view and pulled back in.
 *
 * The readable string stays on the wrapper via `aria-label`; the pieces are
 * hidden from assistive technology.
 */

type Props = {
  text: string;
  className?: string;
  /** Class applied to every animatable piece. Targeted by GSAP. */
  pieceClassName?: string;
};

export function SplitChars({ text, className, pieceClassName = "char" }: Props) {
  const words = text.split(" ");

  return (
    <span className={`split ${className ?? ""}`} aria-label={text}>
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          {/* Glyphs are inline-blocks, so a word has to be held together
              explicitly — otherwise a display line can break inside one. */}
          <span className="split__group" aria-hidden="true">
            {Array.from(word).map((glyph, i) => (
              <span className="split__mask" key={`${glyph}-${i}`}>
                <span className={`split__char ${pieceClassName}`}>{glyph}</span>
              </span>
            ))}
          </span>
          {w < words.length - 1 ? <span aria-hidden="true">{" "}</span> : null}
        </Fragment>
      ))}
    </span>
  );
}

export function SplitWords({ text, className, pieceClassName = "word" }: Props) {
  const words = text.split(" ");

  return (
    <span className={`split ${className ?? ""}`} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split__mask" aria-hidden="true">
            <span className={`split__word ${pieceClassName}`}>{word}</span>
          </span>
          {i < words.length - 1 ? <span aria-hidden="true">{" "}</span> : null}
        </Fragment>
      ))}
    </span>
  );
}
