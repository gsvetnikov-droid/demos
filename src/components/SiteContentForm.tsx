"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type SiteContentFormData = {
  siteName: string;
  siteTagline: string;
  heroHeading: string;
  heroIntro: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  sectionHeading: string;
  sectionBody: string;
  aboutHeading: string;
  aboutBody: string;
  contactHeading: string;
  contactBody: string;
  contactCtaLabel: string;
  contactEmail: string;
};

export default function SiteContentForm({ initial }: { initial: SiteContentFormData }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteContentFormData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof SiteContentFormData>(key: K, value: SiteContentFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/site-content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {saved && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">Saved — refresh the public site to see it live.</p>}

      <Section title="Site">
        <Field label="Site name" hint="Shown in the nav, the browser tab, and page metadata.">
          <input value={form.siteName} onChange={(e) => set("siteName", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Tagline" hint="Used as the page's meta description (SEO/link previews), not shown directly on the page.">
          <input value={form.siteTagline} onChange={(e) => set("siteTagline", e.target.value)} className={inputClass} />
        </Field>
      </Section>

      <Section title="Hero (top of the homepage)">
        <Field label="Heading">
          <input value={form.heroHeading} onChange={(e) => set("heroHeading", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Intro paragraphs" hint="One or more paragraphs. Leave a blank line between paragraphs.">
          <textarea rows={6} value={form.heroIntro} onChange={(e) => set("heroIntro", e.target.value)} className={inputClass} />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Primary button text">
            <input value={form.heroPrimaryCta} onChange={(e) => set("heroPrimaryCta", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Secondary button text">
            <input value={form.heroSecondaryCta} onChange={(e) => set("heroSecondaryCta", e.target.value)} className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section title="Project gallery section intro">
        <Field label="Heading">
          <input value={form.sectionHeading} onChange={(e) => set("sectionHeading", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Body">
          <textarea rows={3} value={form.sectionBody} onChange={(e) => set("sectionBody", e.target.value)} className={inputClass} />
        </Field>
      </Section>

      <Section title="About">
        <Field label="Heading">
          <input value={form.aboutHeading} onChange={(e) => set("aboutHeading", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Body paragraphs" hint="One or more paragraphs. Leave a blank line between paragraphs.">
          <textarea rows={6} value={form.aboutBody} onChange={(e) => set("aboutBody", e.target.value)} className={inputClass} />
        </Field>
      </Section>

      <Section title="Contact">
        <Field label="Heading">
          <input value={form.contactHeading} onChange={(e) => set("contactHeading", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Body paragraphs" hint="One or more paragraphs. Leave a blank line between paragraphs.">
          <textarea rows={3} value={form.contactBody} onChange={(e) => set("contactBody", e.target.value)} className={inputClass} />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Button text">
            <input value={form.contactCtaLabel} onChange={(e) => set("contactCtaLabel", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Contact email" hint="Leave blank to show the button as disabled — never a broken or wrong link.">
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => set("contactEmail", e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>
        </div>
      </Section>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50">
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-5 border-t border-slate-200 pt-6 first:border-t-0 first:pt-0">
      <legend className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
