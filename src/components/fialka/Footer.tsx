export default function FialkaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-violet-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-lg" aria-hidden="true">💜</span>
            <div>
              <p className="font-serif font-bold text-violet-200">Fialka Beauty Bar</p>
              <p className="text-xs text-violet-400">студія краси</p>
            </div>
          </div>

          <div className="text-center sm:text-right flex flex-col gap-1">
            <a
              href="tel:+380976757227"
              className="text-violet-300 hover:text-white text-sm transition-colors"
            >
              +380 97 675 72 27
            </a>
            <p className="text-violet-500 text-xs">вул. Покровська, 57б, Житомир</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-violet-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-violet-500 text-xs">
            © {year} Fialka Beauty Bar. Всі права захищені.
          </p>
          <a
            href="https://www.instagram.com/fialka_beauty_bar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-200 text-xs transition-colors"
          >
            @fialka_beauty_bar
          </a>
        </div>
      </div>
    </footer>
  );
}
