import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900">
          {SITE_NAME}
        </Link>
        <Link
          href="/admin"
          className="rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-700"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
