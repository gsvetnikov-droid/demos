import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Markdown from "@/components/Markdown";
import SiteNav from "@/components/SiteNav";
import LiveEmbed from "@/components/LiveEmbed";
import { initialsFrom } from "@/lib/initials";

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const platform = await prisma.platform.findUnique({ where: { slug: params.slug } });
  if (!platform || platform.status !== "PUBLISHED") notFound();

  return (
    <div className="bg-stone-50">
      <SiteNav />

      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/" className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900">
            ← Back to showcase
          </Link>

          <div className="mt-8 flex items-center gap-5">
            {platform.coverImageUrl ? (
              <Image
                src={platform.coverImageUrl}
                alt={platform.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-2xl border border-neutral-200 object-cover"
              />
            ) : (
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-neutral-900 text-2xl font-bold tracking-wide text-white">
                {initialsFrom(platform.name)}
              </span>
            )}
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">{platform.name}</h1>
              {platform.tagline && <p className="mt-1.5 text-neutral-500">{platform.tagline}</p>}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {platform.category && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {platform.category}
              </span>
            )}
            {platform.techStack.map((tech) => (
              <span key={tech} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
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
                  className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
                >
                  Launch demo ↗
                </a>
              )}
              {platform.repoUrl && (
                <a
                  href={platform.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 hover:bg-white"
                >
                  View repo
                </a>
              )}
            </div>
          )}

          {platform.highlights.length > 0 && (
            <ul className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {platform.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700">
                  <span className="text-neutral-400">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {platform.liveUrl && platform.embeddable && (
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Try it yourself</p>
          <LiveEmbed url={platform.liveUrl} />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Markdown content={platform.whitepaper} />
      </div>
    </div>
  );
}
