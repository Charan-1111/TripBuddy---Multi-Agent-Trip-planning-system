import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sign in | TripBuddy",
  description:
    "Sign in to TripBuddy to revisit your travel ideas and build your next itinerary.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
