import { ArrowUpRight } from "lucide-react";
import { Logo } from "./ui/Logo";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Instagram", href: site.instagram.clinic, external: true },
    { label: site.phone.label, href: site.phone.href, external: false },
    { label: "Google Maps", href: site.address.maps, external: true },
  ];

  return (
    <footer className="border-t border-white/10 bg-graphite text-white/70">
      <div className="shell grid gap-12 py-16 md:grid-cols-3 md:py-20">
        <div className="flex flex-col gap-4">
          <Logo tone="light" />
          <p className="text-sm text-white/50">{site.tagline}</p>
        </div>

        <nav aria-label="Швидкі посилання">
          <ul className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="link-underline inline-flex items-center gap-1.5 text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  {link.external ? (
                    <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="text-sm not-italic text-white/50">
          {site.address.street}
          <br />
          {site.address.district}, {site.address.region}
          <br />
          {site.address.postal}
        </address>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Усі права захищено.
        </p>
        <p>{site.claim}</p>
      </div>
    </footer>
  );
}
