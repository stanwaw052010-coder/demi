import { Play } from "lucide-react";
import { InstagramIcon } from "./Icons";

const REELS = [
  { caption: "Ласкаво просимо до KOLIBRI", views: "3 032", g: "from-[#0d3b3e] to-[#12514f]" },
  { caption: "Будні клініки", views: "2 413", g: "from-[#ff6f91] to-[#a855f7]" },
  { caption: "Наша команда", views: "1 747", g: "from-[#ff8a65] to-[#ff6f91]" },
  { caption: "Відгуки пацієнтів", views: "1 205", g: "from-[#a855f7] to-[#38bdf8]" },
];

export default function Gallery() {
  return (
    <section className="bg-[#f4f9f8] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
              @kolibri.vn
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
              Життя клініки в Instagram
            </h2>
          </div>
          <a
            href="https://www.instagram.com/kolibri.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#0d3b3e] px-6 py-3 text-sm font-semibold text-white"
          >
            <InstagramIcon className="h-4 w-4" />
            Підписатись
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {REELS.map((r) => (
            <div
              key={r.caption}
              className={`group relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-br ${r.g}`}
            >
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Play className="h-3.5 w-3.5 fill-white text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-sm font-medium leading-snug text-white">
                  {r.caption}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {r.views} переглядів
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
