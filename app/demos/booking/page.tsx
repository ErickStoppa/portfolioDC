import type { Metadata } from "next";
import { BrowserShell } from "@/components/demos/browser-shell";
import { BookingApp } from "./booking-app";

export const metadata: Metadata = {
  title: "Aura Booking Demo",
  description: "Interactive appointment booking demo with calendar, professionals, and confirmation flow.",
};

export default function BookingDemoPage() {
  return (
    <BrowserShell
      title="Aura — Appointment Booking"
      url="aura.app/book"
    >
      <BookingApp />
    </BrowserShell>
  );
}
