"use client";

import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

type LinkProps = ComponentProps<typeof Link>;

/**
 * Page transitions through the View Transitions API, with the product image as
 * the shared element (see `view-transition-name` in ProductImage).
 *
 * Next's client router updates the DOM asynchronously, so the transition is
 * held open with a promise that resolves when the pathname actually changes.
 * A short timeout guarantees the page is never left frozen if that never
 * happens. Where the API is missing, or motion is reduced, this is an ordinary
 * client navigation.
 */
export function TransitionLink({
  children,
  onNavigate,
  ...props
}: LinkProps & { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<(() => void) | null>(null);

  useEffect(() => {
    pending.current?.();
    pending.current = null;
  }, [pathname]);

  useEffect(() => () => {
    pending.current?.();
    pending.current = null;
  }, []);

  return (
    <Link
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        if (typeof document === "undefined") return;
        if (!document.startViewTransition) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        event.preventDefault();
        const href = props.href;
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              const finish = () => {
                pending.current = null;
                resolve();
              };
              pending.current = finish;
              window.setTimeout(finish, 600);
              router.push(href as never);
            }),
        );
      }}
    >
      {children}
    </Link>
  );
}
