"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Markdown from "@/components/Markdown";

export type PlatformFormData = {
  id?: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  category: string;
  tags: string; // comma-separated in the form, array in the API
  techStack: string; // comma-separated
  highlights: string; // one per line
  liveUrl: string;
  repoUrl: string;
  iconEmoji: string;
  coverImageUrl: string;
  whitepaper: string;
  status: "DRAFT" | "PUBLISHED";
};

const EMPTY: PlatformFormData = {
  slug: "",
  name: "",
  tagline: "",
  summary: "",
  category: "",
  tags: "",
  techStack: "",
  highlights: "",
  liveUrl: "",
  repoUrl: "",
  iconEmoji: "",
  coverImageUrl: "",
  whitepaper: "",
  status: "DRAFT",
};

function csvToArray(v: string): string[] {
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}
function linesToArray(v: string): string[] {
  return v.split("\n").map((s) => s.trim()).filter(Boolean);
}

export default function PlatformForm({ initial }: { initial?: Partial<PlatformFormData> }) {
  const router = useRouter();
  const [form, setForm] = useState<PlatformFormData>({ ...EMPTY, ...initial });
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof PlatformFormData>(key: K, value: PlatformFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug,
      tagline: form.tagline,
      summary: form.summary,
      category: form.category,
      tags: csvToArray(form.tags),
      techStack: csvToArray(form.techStack),
      highlights: linesToArray(form.highlights),
      liveUrl: form.liveUrl,
      repoUrl: form.repoUrl,
      iconEmoji: form.iconEmoji,
      coverImageUrl: form.coverImageUrl,
      whitepaper: form.whitepaper,
      status: form.status,
    };

    const res = await fetch(form.id ? `/api/platforms/${form.id}` : "/api/platforms", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Slug" hint="Leave blank to auto-generate from the name.">
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputClass} placeholder="auto-generated-from-name" />
        </Field>
        <Field label="Tagline" hint="Short one-liner shown under the name.">
          <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Category">
          <input value={form.category} onChange={(e) => set("category", e.target.value)} className={inputClass} placeholder="e.g. CRM, Analytics" />
        </Field>
        <Field label="Icon emoji" hint="Shown when there's no cover image.">
          <input value={form.iconEmoji} onChange={(e) => set("iconEmoji", e.target.value)} className={inputClass} placeholder="🧩" />
        </Field>
        <Field label="Cover image URL">
          <input value={form.coverImageUrl} onChange={(e) => set("coverImageUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Live URL">
          <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Repo URL">
          <input value={form.repoUrl} onChange={(e) => set("repoUrl", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Status">
          <select value={form.status} onChange={(e) => set("status", e.target.value as "DRAFT" | "PUBLISHED")} className={inputClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </Field>
      </section>

      <Field label="Summary" hint="Short blurb shown on the gallery card.">
        <textarea rows={3} value={form.summary} onChange={(e) => set("summary", e.target.value)} className={inputClass} />
      </Field>

      <Field label="Tags" hint="Comma-separated, shown as chips on the card.">
        <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputClass} placeholder="Next.js, Postgres, CRM" />
      </Field>
      <Field label="Tech stack" hint="Comma-separated, shown on the whitepaper page.">
        <input value={form.techStack} onChange={(e) => set("techStack", e.target.value)} className={inputClass} placeholder="Next.js, Prisma, Postgres" />
      </Field>
      <Field label="Highlights" hint="One per line — shown as a checklist on the whitepaper page.">
        <textarea rows={4} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} className={inputClass} />
      </Field>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">Whitepaper (Markdown)</label>
          <button type="button" onClick={() => setPreview((p) => !p)} className="text-xs font-medium text-brand-600 hover:underline">
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
        {preview ? (
          <div className="rounded-md border border-slate-200 p-4">
            <Markdown content={form.whitepaper} />
          </div>
        ) : (
          <textarea
            rows={20}
            value={form.whitepaper}
            onChange={(e) => set("whitepaper", e.target.value)}
            className={`${inputClass} font-mono text-xs`}
          />
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm";

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
