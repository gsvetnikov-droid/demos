import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Markdown from "@/components/Markdown";

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const platform = await prisma.platform.findUnique({ where: { slug: params.slug } });
  if (!platform || platform.status !== "PUBLISHED") notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-brand-600 hover:underline">
        ← Back to showcase
      </Link>

      <header className="mb-10 mt-4">
        <div className="flex items-center gap-4">
          {platform.coverImageUrl ? (
            <Image
              src={platform.coverImageUrl}
              alt={platform.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-lg object-cover"
            />
          ) : (
            <span className="text-5xl">{platform.iconEmoji || "🧩"}</span>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{platform.name}</h1>
            {platform.tagline && <p className="mt-1 text-slate-500">{platform.tagline}</p>}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {platform.category && (
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
              {platform.category}
            </span>
          )}
          {platform.techStack.map((tech) => (
            <span key={tech} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              {tech}
            </span>
          ))}
        </div>

        {(platform.liveUrl || platform.repoUrl) && (
          <div className="mt-5 flex gap-3">
            {platform.liveUrl && (
              <a
                href={platform.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                View live
              </a>
            )}
            {platform.repoUrl && (
              <a
                href={platform.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                View repo
              </a>
            )}
          </div>
        )}

        {platform.highlights.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {platform.highlights.map((h) => (
              <li key={h} className="flex gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <span className="text-brand-600">✓</span>
                {h}
              </li>
            ))}
          </ul>
        )}
      </header>

      <Markdown content={platform.whitepaper} />
    </div>
  );
}
