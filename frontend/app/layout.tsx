import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripBuddy AI | Plan your perfect trip",
  description:
    "Search flights, discover hotels, and generate a complete travel itinerary with TripBuddy AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
