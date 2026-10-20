import type { ReactNode } from "react";

export const metadata = {
  title: "Hardware Wallet Patterns · Pixel Journey",
  description:
    "Educational hardware wallet integration patterns for WAX/Antelope",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
