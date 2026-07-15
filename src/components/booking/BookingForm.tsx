"use client";

import * as React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { serviceCategories } from "@/data/services";

interface BookingFormProps {
  defaultService?: string | null;
  compact?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm({ defaultService, compact }: BookingFormProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      service: String(form.get("service") ?? ""),
      date: String(form.get("date") ?? ""),
      comment: String(form.get("comment") ?? ""),
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Помилка надсилання");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Помилка надсилання");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold-500" />
        <p className="font-serif text-xl text-navy-900">Дякуємо за запис!</p>
        <p className="max-w-xs text-sm text-navy-900/60">
          Наш адміністратор зв&apos;яжеться з вами найближчим часом для підтвердження часу візиту.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="name">Ім&apos;я</Label>
          <Input id="name" name="name" placeholder="Ваше ім'я" required />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+38 (0__) ___-__-__" required />
        </div>
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <Label htmlFor="service">Послуга</Label>
          <Select id="service" name="service" defaultValue={defaultService ?? ""}>
            <option value="">Оберіть послугу</option>
            {serviceCategories.map((cat) => (
              <option key={cat.slug} value={cat.title}>
                {cat.title}
              </option>
            ))}
            {defaultService && (
              <option value={defaultService}>{defaultService}</option>
            )}
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Бажана дата</Label>
          <Input id="date" name="date" type="date" />
        </div>
      </div>
      <div>
        <Label htmlFor="comment">Коментар</Label>
        <Textarea id="comment" name="comment" placeholder="Побажання щодо запису (необов'язково)" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Записатися
      </Button>
      <p className="text-center text-xs text-navy-900/40">
        Надсилаючи форму, ви погоджуєтесь на обробку персональних даних.
      </p>
    </form>
  );
}
