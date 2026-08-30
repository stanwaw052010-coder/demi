import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/brand/Logo";
import { LocaleSwitch } from "./LocaleSwitch";
import { CartButton } from "@/components/cart/CartButton";
import { MobileNav } from "./MobileNav";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const brand = await getTranslations("brand");

  const links: { href: import("@/i18n/routing").StaticPathname; label: string }[] = [
    { href: "/thee", label: t("tea") },
    { href: "/collecties", label: t("collections") },
    { href: "/zetgids", label: t("guide") },
    { href: "/puerh-vault", label: t("vault") },
    { href: "/journaal", label: t("journal") },
    { href: "/proeverijen", label: t("tastings") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/92 backdrop-blur-[6px] wy-rule-b wy-noprint">
      <div className="wy-shell flex items-center gap-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label={brand("name")}
        >
          <LogoMark size={30} />
          <span
            className="hidden sm:block text-[1.0625rem] leading-none"
            style={{ fontFamily: "var(--font-display)", fontOpticalSizing: "auto" }}
          >
            Well’s of Yunnan
          </span>
        </Link>

        <nav
          aria-label={t("primary")}
          className="hidden lg:flex items-center gap-5 text-[var(--text-micro)]"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="wy-link text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          <LocaleSwitch />
          <CartButton />
          <MobileNav
            links={links.map((l) => ({ href: l.href, label: l.label }))}
            aboutLabel={t("about")}
            contactLabel={t("contact")}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            navLabel={t("primary")}
          />
        </div>
      </div>
    </header>
  );
}
