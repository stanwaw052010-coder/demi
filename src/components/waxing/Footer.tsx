import { Flower2 } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-[#0a080a] text-gray-500 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Flower2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-300 font-medium">Воскова депіляція · Київ</span>
        </div>
        <p className="text-xs text-gray-600 order-3 sm:order-2">
          © {new Date().getFullYear()} Усі права захищені. Макет сайту.
        </p>
        <a
          href="https://instagram.com/s_visk_depilation"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-400 transition-colors order-2 sm:order-3"
        >
          <InstagramIcon className="w-4 h-4" />
          @s_visk_depilation
        </a>
      </div>
    </footer>
  );
}
