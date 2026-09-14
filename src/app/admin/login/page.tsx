"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl");
  const callbackUrl = rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//") ? rawCallbackUrl : "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { username, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid username or password.");
      return;
    }
    // Full navigation, not router.push: middleware reads the session cookie
    // on the very next request, and a client-side transition can race ahead
    // of the browser applying the cookie the sign-in response just set.
    window.location.href = callbackUrl;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-5 rounded-xl border border-slate-200/70 bg-white p-9 shadow-md">
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Showcase Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage platforms.</p>
        </div>

        {error && <p className="rounded-md bg-red-50 p-2.5 text-center text-sm text-red-700">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input
              type="text"
              autoCapitalize="none"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand-600 py-2.5 font-medium text-white shadow-sm hover:bg-brand-700 hover:shadow disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
