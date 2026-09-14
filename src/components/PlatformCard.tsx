import Link from "next/link";
import Image from "next/image";
import { initialsFrom } from "@/lib/initials";

export type PlatformCardData = {
  slug: string;
  name: string;
  tagline: string | null;
  summary: string | null;
  category: string | null;
  tags: string[];
  coverImageUrl: string | null;
};

export default function PlatformCard({ platform }: { platform: PlatformCardData }) {
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-40 items-center justify-center overflow-hidden border-b border-neutral-200 bg-neutral-50">
        {platform.coverImageUrl ? (
          <Image
            src={platform.coverImageUrl}
            alt={platform.name}
            width={400}
            height={160}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-xl font-bold tracking-wide text-white transition duration-300 group-hover:scale-105">
            {initialsFrom(platform.name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        {platform.category && (
          <span className="w-fit rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-neutral-500">
            {platform.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-neutral-900">{platform.name}</h3>
        {platform.tagline && <p className="text-sm font-medium text-neutral-500">{platform.tagline}</p>}
        {platform.summary && <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-neutral-500">{platform.summary}</p>}
        {platform.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {platform.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-neutral-900 opacity-0 transition group-hover:opacity-100">
          Try the demo
          <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
