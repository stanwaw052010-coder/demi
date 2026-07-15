"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { BookingForm } from "@/components/booking/BookingForm";
import { useBooking } from "@/components/booking/BookingContext";

export function BookingModal() {
  const { isOpen, close, presetService } = useBooking();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogTitle>Запис у Спабель</DialogTitle>
        <DialogDescription>
          {presetService
            ? `Обрана послуга: ${presetService}`
            : "Залиште контакти — ми підберемо зручний час візиту."}
        </DialogDescription>
        <div className="mt-6">
          <BookingForm defaultService={presetService} compact />
        </div>
      </DialogContent>
    </Dialog>
  );
}
