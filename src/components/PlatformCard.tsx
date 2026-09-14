import Link from "next/link";
import Image from "next/image";

export type PlatformCardData = {
  slug: string;
  name: string;
  tagline: string | null;
  summary: string | null;
  category: string | null;
  tags: string[];
  iconEmoji: string | null;
  coverImageUrl: string | null;
};

export default function PlatformCard({ platform }: { platform: PlatformCardData }) {
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100">
        {platform.coverImageUrl ? (
          <Image
            src={platform.coverImageUrl}
            alt={platform.name}
            width={400}
            height={144}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl">{platform.iconEmoji || "🧩"}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {platform.category && (
          <span className="w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            {platform.category}
          </span>
        )}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">{platform.name}</h3>
        {platform.tagline && <p className="text-sm font-medium text-slate-500">{platform.tagline}</p>}
        {platform.summary && <p className="mt-1 line-clamp-3 text-sm text-slate-600">{platform.summary}</p>}
        {platform.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {platform.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
