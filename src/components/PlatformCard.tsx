import Link from "next/link";
import Image from "next/image";
import { initialsFrom } from "@/lib/initials";
import InteractiveDemoModal from "@/components/InteractiveDemoModal";

export type PlatformCardData = {
  slug: string;
  name: string;
  tagline: string | null;
  summary: string | null;
  category: string | null;
  tags: string[];
  coverImageUrl: string | null;
  imageAlt: string | null;
  imageCaption: string | null;
  displayStatus: string | null;
  liveUrl: string | null;
  interactiveDemoUrl: string | null;
  highlights: string[];
};

export default function PlatformCard({ platform }: { platform: PlatformCardData }) {
  const media = (
    <div className="flex h-40 flex-col overflow-hidden border-b border-cream-200 bg-cream-100">
      <div className="flex flex-1 items-center justify-center overflow-hidden p-2">
        {platform.coverImageUrl ? (
          <Image
            src={platform.coverImageUrl}
            alt={platform.imageAlt || platform.name}
            width={400}
            height={160}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-xl font-bold tracking-wide text-white transition duration-300 group-hover:scale-105">
            {initialsFrom(platform.name)}
          </span>
        )}
      </div>
      {platform.coverImageUrl && platform.imageCaption && (
        <p className="truncate bg-cream-50 px-3 py-1 text-center text-[10px] italic text-neutral-400">{platform.imageCaption}</p>
      )}
    </div>
  );

  const badges = (
    <div className="flex flex-wrap items-center gap-1.5">
      {platform.category && (
        <span className="w-fit rounded-full bg-cream-200 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-cream-800">
          {platform.category}
        </span>
      )}
      {platform.displayStatus && (
        <span className="w-fit rounded-full border border-neutral-300 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">
          {platform.displayStatus}
        </span>
      )}
    </div>
  );

  // A project with a bespoke interactive demo gets two explicit CTAs
  // (open the demo directly vs. read the write-up) instead of the whole
  // card being one link — every other card is untouched below.
  if (platform.interactiveDemoUrl) {
    const proofPoints = platform.highlights.slice(0, 4);
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link href={`/platforms/${platform.slug}`} className="flex flex-1 flex-col">
          {media}
          <div className="flex flex-1 flex-col gap-2 p-6 pb-3">
            {badges}
            <h3 className="text-lg font-semibold text-neutral-900">{platform.name}</h3>
            {platform.tagline && <p className="text-sm font-medium text-neutral-500">{platform.tagline}</p>}
            {platform.summary && <p className="mt-1 text-sm leading-relaxed text-neutral-500">{platform.summary}</p>}
          </div>
        </Link>
        {proofPoints.length > 0 && (
          <div className="grid grid-cols-2 gap-2 px-6">
            {proofPoints.map((p) => (
              <div key={p} className="rounded-lg bg-cream-100 px-2.5 py-2 text-center text-[11px] font-medium text-cream-800">
                {p}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2 p-6 pt-4">
          <InteractiveDemoModal
            demoUrl={platform.interactiveDemoUrl}
            modalTitle="HR Platform — Interactive Roadmap"
            triggerLabel="Explore the interactive roadmap →"
            triggerClassName="w-full rounded-full bg-neutral-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-neutral-700"
          />
          <Link
            href={`/platforms/${platform.slug}`}
            className="w-full rounded-full border border-cream-300 px-4 py-2.5 text-center text-sm font-semibold text-neutral-900 transition hover:border-cream-400 hover:bg-cream-50"
          >
            Read the project overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {media}
      <div className="flex flex-1 flex-col gap-2 p-6">
        {badges}
        <h3 className="text-lg font-semibold text-neutral-900">{platform.name}</h3>
        {platform.tagline && <p className="text-sm font-medium text-neutral-500">{platform.tagline}</p>}
        {platform.summary && <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-neutral-500">{platform.summary}</p>}
        {platform.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {platform.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-cream-100 px-2 py-0.5 text-xs text-cream-800">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-neutral-900 opacity-0 transition group-hover:opacity-100">
          {platform.liveUrl ? "Try the demo" : "Read the case study"}
          <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
