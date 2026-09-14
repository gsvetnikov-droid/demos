import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminPlatformList from "@/components/AdminPlatformList";

export default async function AdminDashboardPage() {
  const platforms = await prisma.platform.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Platforms</h1>
        <Link href="/admin/platforms/new" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          + New platform
        </Link>
      </div>

      {platforms.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-10 text-center text-slate-400">
          No platforms yet.
        </p>
      ) : (
        <AdminPlatformList
          initialPlatforms={platforms.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            status: p.status,
            category: p.category,
          }))}
        />
      )}
    </div>
  );
}
