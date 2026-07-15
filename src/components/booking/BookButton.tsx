"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingContext";

interface BookButtonProps extends ButtonProps {
  serviceName?: string;
}

export function BookButton({ serviceName, children, ...props }: BookButtonProps) {
  const { open } = useBooking();
  return (
    <Button onClick={() => open(serviceName)} {...props}>
      {children}
    </Button>
  );
}
