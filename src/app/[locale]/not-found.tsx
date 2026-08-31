import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/brand/Logo";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="wy-shell" style={{ paddingBlock: "clamp(5rem, 16vh, 10rem)" }}>
      <div className="mx-auto text-center" style={{ maxWidth: "40ch" }}>
        <LogoMark size={48} />
        <h1 className="mt-6 text-[2rem]">{t("title")}</h1>
        <p className="wy-prose mt-4 mx-auto">{t("body")}</p>
        <Link href="/thee" className="wy-btn mt-8">
          {t("toCatalog")}
        </Link>
      </div>
    </div>
  );
}
