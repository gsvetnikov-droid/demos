"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AdminNav() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
      <Link href="/admin" className="font-bold text-slate-900">
        Showcase Admin
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/" className="text-slate-500 hover:text-slate-800">
          View site
        </Link>
        {session && (
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-slate-500 hover:text-slate-800">
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
