import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/getSiteContent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return { title: content.siteName, description: content.siteTagline };
}

// Every page here reads live DB state — nothing should be statically
// prerendered against build-time data.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-cream-50 font-sans text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
