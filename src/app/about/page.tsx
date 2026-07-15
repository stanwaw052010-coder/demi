import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { aboutText } from "@/data/content";
import { team } from "@/data/team";
import { siteConfig } from "@/data/site";
import { BookButton } from "@/components/booking/BookButton";

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "Спабель — SPA-салон краси повного циклу в Запоріжжі. Дізнайтесь про нашу філософію, команду професіоналів та SPA-капсулу Neoqi Medic.",
  openGraph: {
    title: `Про нас | ${siteConfig.name}`,
    description: "Філософія та команда SPA-салону Спабель у Запоріжжі.",
  },
};

const paragraphs = aboutText.split("\n\n");

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Спабель"
        title="Про нас"
        description="SPA для тіла. Belle для душі."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-spa grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-navy-900/70">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <BookButton variant="gold" size="lg">
                Записатися на консультацію
              </BookButton>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative h-72 overflow-hidden rounded-2xl">
              <Photo
                src="/images/about/about-1.jpg"
                alt="Простір салону Спабель"
                label="Спабель"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </div>
            <div className="relative h-56 overflow-hidden rounded-2xl">
              <Photo
                src="/images/spa/spa-1.jpg"
                alt="SPA-капсула Neoqi Medic"
                label="Neoqi Medic"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-spa">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-600">
            Команда
          </span>
          <h2 className="mt-3 font-serif text-3xl text-navy-900 sm:text-4xl">
            Люди, які створюють Спабель
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-64 overflow-hidden">
                  <Photo
                    src={member.photo}
                    alt={member.name}
                    label={member.role}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base text-navy-900">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-gold-600">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
