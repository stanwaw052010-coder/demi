export interface Advantage {
  icon: "gem" | "shield-check" | "sparkles" | "users" | "zap-off" | "heart-handshake";
  title: string;
  description: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    icon: "gem",
    title: "Салон повного циклу",
    description:
      "Манікюр, масаж, перукарня та косметологія — всі етапи догляду в одному просторі, без поспіху.",
  },
  {
    icon: "sparkles",
    title: "SPA-капсула Neoqi Medic",
    description:
      "Єдиний в Запоріжжі салон з комплексним ритуалом відновлення в спа-капсулі.",
  },
  {
    icon: "users",
    title: "Команда професіоналів",
    description:
      "Косметологи та стилісти, які постійно вдосконалюють майстерність для найвибагливіших запитів.",
  },
  {
    icon: "heart-handshake",
    title: "Індивідуальний підхід",
    description:
      "Жодних шаблонних рішень — лише рішення, засновані на досвіді та повазі до вашої природної краси.",
  },
  {
    icon: "shield-check",
    title: "Бездоганна чистота",
    description:
      "Сучасні стандарти стерилізації та безпеки на кожному етапі процедур.",
  },
  {
    icon: "zap-off",
    title: "Працюємо без перебоїв",
    description:
      "Салон обладнаний генераторами — ваш запис і комфорт залишаються пріоритетом за будь-яких обставин.",
  },
];
