import { Phone } from "lucide-react";
import { salon } from "@/lib/beauty";
import InstagramIcon from "./InstagramIcon";

const navLinks = [
  { label: "Послуги", href: "#services" },
  { label: "Про нас", href: "#about" },
  { label: "Галерея", href: "#gallery" },
  { label: "Відгуки", href: "#testimonials" },
  { label: "Контакти", href: "#contact" },
];

export default function BeautyFooter() {
  return (
    <footer className="border-t border-[#c9a962]/10 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#c9a962] flex items-center justify-center">
            <span className="font-[var(--font-playfair)] text-[#c9a962] text-xs tracking-widest">MBH</span>
          </div>
          <div className="leading-none">
            <div className="font-[var(--font-playfair)] text-[#ece6da] text-sm">Makhovska</div>
            <div className="text-[10px] text-[#c9a962] tracking-[0.2em] uppercase">Beauty House</div>
          </div>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#8a8172] hover:text-[#c9a962] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={salon.phoneHref} className="flex items-center gap-2 text-sm text-[#cfc7b8] hover:text-[#c9a962] transition-colors">
            <Phone className="w-4 h-4 text-[#c9a962]" />
            {salon.phone}
          </a>
          <a
            href={salon.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#cfc7b8] hover:text-[#c9a962] transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-[#c9a962]/10 text-center">
        <p className="text-xs text-[#5c564a]">
          © {new Date().getFullYear()} {salon.name}, {salon.city}. Всі права захищені.
        </p>
      </div>
    </footer>
  );
}
