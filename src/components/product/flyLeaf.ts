import {
  LEAF_BLADE_LEFT,
  LEAF_BLADE_RIGHT,
  LEAF_MIDRIB,
  LEAF_STEM,
} from "@/components/visuals/TeaLeaf";

const SVG = "http://www.w3.org/2000/svg";

/**
 * A leaf flies from the button to the cart in the header, unfurling as it
 * goes, and then the counter springs once. It is the same drawing as the
 * leaves falling through the hero and steeping in the gaiwan, filled with
 * this tea's own liquor colour.
 *
 * Transform and opacity only, 600 ms, and skipped entirely under
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

  const leaf = document.createElementNS(SVG, "svg");
  leaf.setAttribute("viewBox", "0 0 32 34");
  leaf.setAttribute("aria-hidden", "true");
  leaf.setAttribute("fill", "none");
  leaf.style.cssText =
    `position:fixed;left:${start.left + start.width / 2 - 13}px;top:${start.top - 8}px;` +
    `width:26px;height:26px;pointer-events:none;z-index:60;overflow:visible;`;

  const group = document.createElementNS(SVG, "g");
  group.setAttribute("stroke", "var(--color-pine)");
  group.setAttribute("stroke-width", "0.9");
  group.setAttribute("stroke-linecap", "round");
  group.setAttribute("stroke-linejoin", "round");
  group.setAttribute("vector-effect", "non-scaling-stroke");

  const blades: SVGPathElement[] = [];
  for (const d of [LEAF_BLADE_RIGHT, LEAF_BLADE_LEFT]) {
    const blade = document.createElementNS(SVG, "path");
    blade.setAttribute("d", d);
    blade.setAttribute("fill", `var(--color-liquor-${liquor})`);
    blade.setAttribute("class", "wy-leaf-blade");
    group.appendChild(blade);
    blades.push(blade);
  }
  for (const d of [LEAF_MIDRIB, LEAF_STEM]) {
    const line = document.createElementNS(SVG, "path");
    line.setAttribute("d", d);
    group.appendChild(line);
  }
  leaf.appendChild(group);
  document.body.appendChild(leaf);

  const dx = end.left + end.width / 2 - (start.left + start.width / 2);
  const dy = end.top + end.height / 2 - (start.top - 8);
  const options: KeyframeAnimationOptions = {
    duration: 600,
    easing: "cubic-bezier(0.32, 0.72, 0, 1)",
    fill: "forwards",
  };

  // The leaf opens on the way up and closes again as it drops into the cart.
  for (const blade of blades) {
    blade.animate(
      [
        { transform: "scaleX(0.22)" },
        { transform: "scaleX(1)", offset: 0.45 },
        { transform: "scaleX(0.3)" },
      ],
      { ...options, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }

  const animation = leaf.animate(
    [
      { transform: "translate3d(0,0,0) rotate(0deg) scale(1)", opacity: 1 },
      {
        transform: `translate3d(${dx * 0.45}px, ${dy * 0.28 - 64}px, 0) rotate(150deg) scale(0.94)`,
        opacity: 1,
        offset: 0.55,
      },
      {
        transform: `translate3d(${dx}px, ${dy}px, 0) rotate(340deg) scale(0.28)`,
        opacity: 0,
      },
    ],
    options,
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
