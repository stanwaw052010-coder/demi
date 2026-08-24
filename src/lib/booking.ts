/**
 * Сервісний шар для заявок на консультацію.
 *
 * Бекенду в проєкті немає, тому ми свідомо НЕ імітуємо відправку.
 * Якщо змінна NEXT_PUBLIC_BOOKING_ENDPOINT не задана — форма чесно
 * повідомляє, що онлайн-запис ще не підключений, і пропонує дзвінок
 * або Instagram. Щоб увімкнути реальну відправку (Telegram bot,
 * e-mail-сервіс, CRM), достатньо:
 *   1) підняти endpoint, який приймає POST JSON у форматі BookingRequest;
 *   2) додати NEXT_PUBLIC_BOOKING_ENDPOINT=https://... у .env.local.
 * Жодних інших змін у компонентах не потрібно.
 */

export type BookingRequest = {
  name: string;
  phone: string;
  service: string;
  date: string;
  comment: string;
  /** Звідки прийшла заявка — знадобиться, коли сторінок стане більше. */
  source: string;
};

export type BookingResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

export async function submitBooking(
  data: BookingRequest,
): Promise<BookingResult> {
  if (!endpoint) return { status: "not-configured" };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `Сервер відповів помилкою (${response.status}).`,
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "Не вдалося надіслати заявку. Перевірте зʼєднання.",
    };
  }
}

/** Валідація на боці клієнта. Ключ = імʼя поля. */
export type BookingErrors = Partial<Record<"name" | "phone" | "service", string>>;

export function validateBooking(data: BookingRequest): BookingErrors {
  const errors: BookingErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Вкажіть, будь ласка, імʼя.";
  }

  // Достатньо 9 цифр — так проходять і місцеві, і міжнародні формати.
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 9) {
    errors.phone = "Вкажіть коректний номер телефону.";
  }

  if (!data.service) {
    errors.service = "Оберіть послугу.";
  }

  return errors;
}
