"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Row = { id: string; slug: string; name: string; status: string; category: string | null };

export default function AdminPlatformList({ initialPlatforms }: { initialPlatforms: Row[] }) {
  const router = useRouter();
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleStatus(row: Row) {
    setBusyId(row.id);
    const nextStatus = row.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const res = await fetch(`/api/platforms/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    setBusyId(null);
    if (res.ok) setPlatforms((prev) => prev.map((p) => (p.id === row.id ? { ...p, status: nextStatus } : p)));
  }

  async function move(row: Row, direction: "up" | "down") {
    setBusyId(row.id);
    await fetch(`/api/platforms/${row.id}/reorder`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function remove(row: Row) {
    if (!confirm(`Delete "${row.name}"? This can't be undone.`)) return;
    setBusyId(row.id);
    const res = await fetch(`/api/platforms/${row.id}`, { method: "DELETE" });
    setBusyId(null);
    if (res.ok) setPlatforms((prev) => prev.filter((p) => p.id !== row.id));
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {platforms.map((row) => (
            <tr key={row.id} className={busyId === row.id ? "opacity-50" : ""}>
              <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
              <td className="px-4 py-3 text-slate-500">{row.category || "—"}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleStatus(row)}
                  disabled={busyId === row.id}
                  className={
                    row.status === "PUBLISHED"
                      ? "rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700"
                      : "rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                  }
                >
                  {row.status === "PUBLISHED" ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button onClick={() => move(row, "up")} disabled={busyId === row.id} className="rounded border border-slate-200 px-1.5 text-slate-500 hover:bg-slate-50">
                    ↑
                  </button>
                  <button onClick={() => move(row, "down")} disabled={busyId === row.id} className="rounded border border-slate-200 px-1.5 text-slate-500 hover:bg-slate-50">
                    ↓
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link href={`/platforms/${row.slug}`} target="_blank" className="text-slate-500 hover:text-slate-800">
                    View
                  </Link>
                  <Link href={`/admin/platforms/${row.id}/edit`} className="text-brand-600 hover:text-brand-800">
                    Edit
                  </Link>
                  <button onClick={() => remove(row)} disabled={busyId === row.id} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
