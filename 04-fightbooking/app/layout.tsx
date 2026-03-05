import type { Metadata } from "next";
import "./globals.css";
import { BookingProvider } from "@/store/bookingStore";

export const metadata: Metadata = {
  title: "FightBooking – Online Check-in",
  description: "Airline online check-in system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <BookingProvider>
          {/* Header / Navbar */}
          <header className="bg-blue-700 text-white py-4 px-6 flex items-center gap-3 shadow-md">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold tracking-wide">FightBooking</span>
            <span className="ml-2 text-blue-200 text-sm">Online Check-in</span>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm mt-8">
            © 2026 FightBooking · Next.js 04-fightbooking
          </footer>
        </BookingProvider>
      </body>
    </html>
  );
}

