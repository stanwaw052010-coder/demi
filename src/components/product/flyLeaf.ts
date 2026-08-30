/**
 * A leaf flies from the button to the cart in the header, then the counter
 * springs once. Transform and opacity only, 560 ms, and skipped entirely under
 * prefers-reduced-motion — in which case the drawer just opens.
 */
export function flyLeaf(
  from: HTMLElement | null,
  liquor: string,
  done: () => void,
): void {
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  if (
    !from ||
    !target ||
    typeof document === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof Element.prototype.animate !== "function"
  ) {
    done();
    return;
  }

  const start = from.getBoundingClientRect();
  const end = target.getBoundingClientRect();

  const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  leaf.setAttribute("viewBox", "0 0 24 24");
  leaf.setAttribute("aria-hidden", "true");
  leaf.style.cssText = `position:fixed;left:${start.left + start.width / 2 - 11}px;top:${start.top - 6}px;width:22px;height:22px;pointer-events:none;z-index:60;`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 2c6 4.6 6 14.8 0 19.6C6 16.8 6 6.6 12 2Z");
  path.setAttribute("fill", `var(--color-liquor-${liquor})`);
  path.setAttribute("stroke", "var(--color-pine)");
  path.setAttribute("stroke-width", "1");
  leaf.appendChild(path);
  document.body.appendChild(leaf);

  const dx = end.left + end.width / 2 - (start.left + start.width / 2);
  const dy = end.top + end.height / 2 - (start.top - 6);

  const animation = leaf.animate(
    [
      { transform: "translate3d(0,0,0) rotate(0deg) scale(1)", opacity: 1 },
      {
        transform: `translate3d(${dx * 0.45}px, ${dy * 0.28 - 60}px, 0) rotate(140deg) scale(0.9)`,
        opacity: 1,
        offset: 0.55,
      },
      {
        transform: `translate3d(${dx}px, ${dy}px, 0) rotate(320deg) scale(0.3)`,
        opacity: 0,
      },
    ],
    { duration: 560, easing: "cubic-bezier(0.32, 0.72, 0, 1)", fill: "forwards" },
  );

  animation.onfinish = () => {
    leaf.remove();
    done();
  };
  animation.oncancel = () => {
    leaf.remove();
    done();
  };
}
