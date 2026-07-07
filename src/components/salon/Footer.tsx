import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { site } from "@/lib/site";

const navLinks = [
  { label: "Послуги", href: "#services" },
  { label: "Ціни", href: "#pricing" },
  { label: "Портфоліо", href: "#gallery" },
  { label: "Про майстра", href: "#about" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose to-gold flex items-center justify-center text-white font-serif text-sm font-bold">
              AK
            </div>
            <div className="leading-none">
              <div className="text-white font-serif font-bold text-lg">{site.name}</div>
              <div className="text-[10px] text-rose font-medium tracking-widest uppercase">{site.tagline}</div>
            </div>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Приватна студія манікюру та педикюру у {site.city}. Стерильні інструменти, преміум матеріали та
            індивідуальний підхід до кожної клієнтки.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Меню</h4>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm hover:text-rose transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Контакти</h4>
          <div className="space-y-3">
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-sm hover:text-rose transition-colors">
              <InstagramIcon className="w-4 h-4 text-rose shrink-0" />
              @{site.instagramHandle}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2.5 text-sm hover:text-rose transition-colors">
              <Phone className="w-4 h-4 text-rose shrink-0" />
              {site.phone}
            </a>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-rose shrink-0 mt-0.5" />
              {site.address}
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Clock className="w-4 h-4 text-rose shrink-0" />
              {site.hours.map((h) => h.time).join(" / ")}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} {site.name}. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
