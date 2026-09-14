import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
};

// Every page here reads live DB state — nothing should be statically
// prerendered against build-time data.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-stone-50 font-sans text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
