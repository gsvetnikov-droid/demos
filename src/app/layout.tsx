import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showcase",
  description: "A gallery of platforms I've built, with a written case study for each.",
};

// Every page here reads live DB state — nothing should be statically
// prerendered against build-time data.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans text-slate-900 antialiased">{children}</body>
    </html>
  );
}
