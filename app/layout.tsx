import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Hardware wallet patterns · Pixel Journey",
  description: "Educational hardware wallet integration patterns for WAX",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
