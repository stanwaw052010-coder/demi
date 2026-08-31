import type { MDXComponents } from "mdx/types";

/**
 * Required by Next's MDX integration in the App Router. Declaring it here keeps
 * the articles as server components: without it the compiled MDX reaches for
 * the React context provider, which does not exist on the server.
 *
 * The article typography lives in `.wy-article` in globals.css, so nothing has
 * to be mapped here — plain HTML is what we want out of MDX.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
