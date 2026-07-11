/**
 * Text splitter for staggered reveals — chars or words.
 * - chars are grouped per word in a `white-space: nowrap` wrapper so
 *   lines can never break mid-word;
 * - nested elements (e.g. styled <span>s inside a heading) are kept
 *   and split recursively, so accent styling survives.
 * Returns the created spans in DOM order for GSAP staggers.
 */
export function splitText(
  el: HTMLElement,
  mode: "chars" | "words" = "chars"
): HTMLElement[] {
  if (el.dataset.split === mode) {
    return Array.from(
      el.querySelectorAll<HTMLElement>(
        mode === "chars" ? ".split-char" : ".split-word"
      )
    );
  }

  el.setAttribute("aria-label", el.textContent ?? "");
  const out: HTMLElement[] = [];

  const mk = (cls: string, content: string) => {
    const span = document.createElement("span");
    span.className = cls;
    span.textContent = content;
    span.setAttribute("aria-hidden", "true");
    return span;
  };

  const process = (container: HTMLElement) => {
    const nodes = Array.from(container.childNodes);
    container.textContent = "";
    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        container.appendChild(node);
        process(node as HTMLElement);
        continue;
      }
      if (node.nodeType !== Node.TEXT_NODE) continue;
      for (const part of (node.textContent ?? "").split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          container.appendChild(mk("split-ws", " "));
        } else if (mode === "words") {
          const w = mk("split-word", part);
          container.appendChild(w);
          out.push(w);
        } else {
          const wrap = document.createElement("span");
          wrap.className = "split-wordwrap";
          wrap.setAttribute("aria-hidden", "true");
          for (const ch of part) {
            const c = mk("split-char", ch);
            wrap.appendChild(c);
            out.push(c);
          }
          container.appendChild(wrap);
        }
      }
    }
  };

  process(el);
  el.dataset.split = mode;
  return out;
}
