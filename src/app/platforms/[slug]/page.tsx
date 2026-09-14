import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Markdown from "@/components/Markdown";
import SiteNav from "@/components/SiteNav";
import LiveEmbed from "@/components/LiveEmbed";
import InteractiveDemoModal from "@/components/InteractiveDemoModal";
import { initialsFrom } from "@/lib/initials";
import { getSiteContent } from "@/lib/getSiteContent";

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const platform = await prisma.platform.findUnique({ where: { slug: params.slug } });
  if (!platform || platform.status !== "PUBLISHED") notFound();

  const [related, content] = await Promise.all([
    platform.relatedProjectSlugs.length > 0
      ? prisma.platform.findMany({
          where: { slug: { in: platform.relatedProjectSlugs }, status: "PUBLISHED" },
          select: { slug: true, name: true, tagline: true },
        })
      : Promise.resolve([]),
    getSiteContent(),
  ]);

  return (
    <div className="bg-cream-50">
      <SiteNav siteName={content.siteName} />

      <header className="border-b border-cream-200">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/" className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900">
            ← Back to showcase
          </Link>

          <div className="mt-8 flex items-center gap-5">
            {platform.coverImageUrl ? (
              <Image
                src={platform.coverImageUrl}
                alt={platform.imageAlt || platform.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-2xl border border-cream-200 bg-white object-contain p-1.5"
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
              <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-cream-800">
                {platform.category}
              </span>
            )}
            {platform.displayStatus && (
              <span className="rounded-full border border-neutral-300 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                {platform.displayStatus}
              </span>
            )}
            {platform.techStack.map((tech) => (
              <span key={tech} className="rounded-md bg-cream-100 px-2 py-0.5 text-xs text-cream-800">
                {tech}
              </span>
            ))}
          </div>

          {(platform.liveUrl || platform.repoUrl || platform.interactiveDemoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {platform.interactiveDemoUrl && (
                <InteractiveDemoModal
                  demoUrl={platform.interactiveDemoUrl}
                  modalTitle="HR Platform — Interactive Roadmap"
                  triggerLabel="Open interactive roadmap ↗"
                  triggerClassName="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
                />
              )}
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
                  className="rounded-full border border-cream-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-cream-400 hover:bg-white"
                >
                  View repo
                </a>
              )}
            </div>
          )}

          {platform.highlights.length > 0 && (
            <ul className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {platform.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 rounded-xl border border-cream-200 bg-white px-4 py-3 text-sm text-neutral-700">
                  <span className="text-cream-600">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {platform.liveUrl && platform.embeddable && (
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-700">Try it yourself</p>
          <LiveEmbed url={platform.liveUrl} />
        </div>
      )}

      {platform.coverImageUrl && (
        <div className="mx-auto max-w-3xl px-6 pt-16">
          <figure className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
            <Image
              src={platform.coverImageUrl}
              alt={platform.imageAlt || platform.name}
              width={1600}
              height={1000}
              className="h-auto w-full object-contain"
            />
            {platform.imageCaption && (
              <figcaption className="border-t border-cream-200 bg-cream-50 px-4 py-2.5 text-center text-xs italic text-neutral-500">
                {platform.imageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Markdown content={platform.whitepaper} />

        {related.length > 0 && (
          <div className="mt-12 rounded-2xl border border-cream-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-700">Related build{related.length > 1 ? "s" : ""}</p>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/platforms/${r.slug}`} className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
                    {r.name}
                  </Link>
                  {r.tagline && <span className="text-neutral-500"> — {r.tagline}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
