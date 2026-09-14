import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PlatformCard from "@/components/PlatformCard";

export default async function HomePage() {
  const platforms = await prisma.platform.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Showcase</h1>
          <p className="mt-2 max-w-xl text-slate-500">
            A gallery of platforms I&apos;ve built. Each one has a full written case study — what it does, how
            it&apos;s built, and why it&apos;s built that way.
          </p>
        </div>
        <Link
          href="/admin"
          className="shrink-0 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-50"
        >
          Admin
        </Link>
      </header>

      {platforms.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-400">
          Nothing published yet — add a platform from{" "}
          <Link href="/admin" className="underline">
            /admin
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      )}
    </div>
  );
}
