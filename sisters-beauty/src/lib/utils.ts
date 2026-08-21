type ClassValue = string | false | null | undefined;

/** Мінімальний конкатенатор класів — без зайвої залежності. */
export const cn = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

/**
 * Український мобільний: +380XXXXXXXXX.
 * Приймає 0XX…, 380…, +380…, з пробілами й дефісами.
 */
export const normalizePhone = (raw: string) => {
  const digits = raw.replace(/[^\d+]/g, "").replace(/^\+/, "");
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  if (/^\d{9}$/.test(digits)) return `+380${digits}`;
  return null;
};
