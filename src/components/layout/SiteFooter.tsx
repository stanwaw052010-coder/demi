import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { COMPANY } from "@/lib/site";
import { CookieReset } from "./CookieReset";
import type { StaticPathname } from "@/i18n/routing";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const legal = await getTranslations("legal");
  const brand = await getTranslations("brand");
  const meta = await getTranslations("meta");

  const columns: { title: string; links: { href: StaticPathname; label: string }[] }[] = [
    {
      title: t("shop"),
      links: [
        { href: "/thee", label: nav("tea") },
        { href: "/collecties", label: nav("collections") },
        { href: "/theeproever", label: meta("quizTitle").split("—")[0].trim() },
        { href: "/puerh-vault", label: nav("vault") },
      ],
    },
    {
      title: t("learn"),
      links: [
        { href: "/zetgids", label: nav("guide") },
        { href: "/journaal", label: nav("journal") },
        { href: "/proeverijen", label: nav("tastings") },
        { href: "/faq", label: meta("faqTitle") },
      ],
    },
    {
      title: t("house"),
      links: [
        { href: "/over-ons", label: nav("about") },
        { href: "/contact", label: nav("contact") },
        { href: "/verzending-retour", label: meta("shippingTitle") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/algemene-voorwaarden", label: legal("termsTitle") },
        { href: "/privacybeleid", label: legal("privacyTitle") },
        { href: "/cookiebeleid", label: legal("cookiesTitle") },
        { href: "/herroepingsrecht", label: legal("withdrawalTitle") },
      ],
    },
  ];

  return (
    <footer className="wy-rule wy-noprint mt-[var(--section)]">
      <div className="wy-shell py-16">
        <div className="wy-grid gap-y-12">
          <div className="wy-margin">
            <Logo variant="stacked" size={44} title={brand("name")} />
            <p className="wy-label mt-5 max-w-[26ch]">{brand("line")}</p>
          </div>

          <div className="wy-main grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[var(--text-micro)] font-medium text-pine mb-3 font-sans">
                  {column.title}
                </h2>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="wy-link text-[var(--text-micro)] text-stone hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="wy-rule mt-14 pt-6 wy-meta">
          <span>{t("rights", { year: new Date().getFullYear() })}</span>
          <span>{t("vatNumber")}</span>
          <span>{COMPANY.shop.city}</span>
          <span>{brand("domain")}</span>
          <CookieReset label={legal("changeCookieChoice")} />
        </div>
        <p className="wy-label mt-3">{t("madeIn")}</p>
      </div>
    </footer>
  );
}
