import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-8">
        <span className="font-script text-2xl text-brand-dark">Наталія Пархуц</span>
        <p className="text-sm text-foreground/50">Манікюр та Педикюр</p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/60">
          <a href="tel:+380989723943" className="flex items-center gap-1.5 hover:text-brand-dark">
            <Phone className="h-3.5 w-3.5" />
            098 972 39 43
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            м. Бурштин, Юнашків
          </span>
        </div>

        <p className="mt-4 text-xs text-foreground/40">
          © {new Date().getFullYear()} Наталія Пархуц. Усі права захищено.
        </p>
      </div>
    </footer>
  );
}
