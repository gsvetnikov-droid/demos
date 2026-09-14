import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Markdown from "@/components/Markdown";
import SiteNav from "@/components/SiteNav";
import GradientMesh from "@/components/GradientMesh";

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const platform = await prisma.platform.findUnique({ where: { slug: params.slug } });
  if (!platform || platform.status !== "PUBLISHED") notFound();

  return (
    <div className="bg-slate-950">
      <SiteNav />

      <header className="relative isolate overflow-hidden border-b border-white/10">
        <GradientMesh className="opacity-60" />
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-white">
            ← Back to showcase
          </Link>

          <div className="mt-8 flex items-center gap-5">
            {platform.coverImageUrl ? (
              <Image
                src={platform.coverImageUrl}
                alt={platform.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-2xl border border-white/10 object-cover"
              />
            ) : (
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl">
                {platform.iconEmoji || "🧩"}
              </span>
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">{platform.name}</h1>
              {platform.tagline && <p className="mt-1.5 text-slate-400">{platform.tagline}</p>}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {platform.category && (
              <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-indigo-300">
                {platform.category}
              </span>
            )}
            {platform.techStack.map((tech) => (
              <span key={tech} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                {tech}
              </span>
            ))}
          </div>

          {(platform.liveUrl || platform.repoUrl) && (
            <div className="mt-8 flex gap-3">
              {platform.liveUrl && (
                <a
                  href={platform.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  View live
                </a>
              )}
              {platform.repoUrl && (
                <a
                  href={platform.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30"
                >
                  View repo
                </a>
              )}
            </div>
          )}

          {platform.highlights.length > 0 && (
            <ul className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {platform.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  <span className="text-indigo-400">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Markdown content={platform.whitepaper} dark />
      </div>
    </div>
  );
}
