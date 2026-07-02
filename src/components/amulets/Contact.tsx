import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/amulets";
import { InstagramIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contacts" className="bg-panel py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
        <h2 className="font-display text-3xl text-parchment sm:text-4xl">
          Знайдіть свій оберіг
        </h2>
        <p className="max-w-lg text-parchment-soft">
          Пишіть нам в Instagram — підберемо амулет, розповімо про руну та
          оформимо доставку по Україні та Європі.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-3 rounded-full bg-copper px-8 py-4 text-lg font-semibold text-void shadow-lg shadow-copper/20 transition-colors hover:bg-copper-light"
        >
          <InstagramIcon className="h-5 w-5" />
          {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
