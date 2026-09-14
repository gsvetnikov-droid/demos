import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-white">
          {SITE_NAME}
        </Link>
        <Link
          href="/admin"
          className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
