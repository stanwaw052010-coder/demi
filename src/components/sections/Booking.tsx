import { Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import BookingForm from "@/components/sections/BookingForm";
import { WhatsappIcon, TelegramIcon } from "@/components/ui/BrandIcons";
import { PHONE_DISPLAY, PHONE_RAW, WHATSAPP_URL, TELEGRAM_URL, WORK_HOURS } from "@/lib/site";

const CONTACT_METHODS = [
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    href: WHATSAPP_URL,
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "Написати в Telegram",
    href: TELEGRAM_URL,
  },
  {
    icon: Phone,
    label: "Подзвонити",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_RAW}`,
  },
];

export default function Booking() {
  return (
    <section id="booking" className="relative py-28 md:py-40">
      <div className="container-x">
        <Reveal variant="fade">
          <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
            <span className="h-px w-8 bg-green" />
            Онлайн-запис
          </span>
        </Reveal>
        <SplitReveal
          as="h2"
          text="Запишіться зараз"
          className="font-display text-4xl leading-[1.15] text-ink md:text-[2.75rem]"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal variant="up" className="lg:col-span-6 xl:col-span-5">
            <BookingForm />
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-6 xl:col-span-7">
            <Reveal variant="up" delay={0.08}>
              <div className="rounded-lg border border-line bg-warm-deep/40 p-8 md:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
                  Або зв&rsquo;яжіться одразу
                </span>

                <div className="mt-6 flex flex-col divide-y divide-line">
                  {CONTACT_METHODS.map((method) => (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-green-soft text-green-dark transition-colors duration-300 group-hover:bg-green group-hover:text-warm">
                        <method.icon size={18} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-ink">
                          {method.label}
                        </span>
                        <span className="block text-[13.5px] text-body">{method.value}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.16}>
              <div className="rounded-lg border border-line bg-warm-deep/40 p-8 md:p-10">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-olive">
                  Графік роботи
                </span>
                <div className="mt-5 flex flex-col divide-y divide-line">
                  {WORK_HOURS.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                      <span className="text-[15px] text-ink">{row.label}</span>
                      <span
                        className={
                          row.closed
                            ? "text-[14px] font-semibold text-body/70"
                            : "text-[15px] font-semibold text-ink"
                        }
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
