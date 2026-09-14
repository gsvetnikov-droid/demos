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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow"
    >
      <div className="flex h-40 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10">
        {platform.coverImageUrl ? (
          <Image
            src={platform.coverImageUrl}
            alt={platform.name}
            width={400}
            height={160}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl transition duration-300 group-hover:scale-110">{platform.iconEmoji || "🧩"}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        {platform.category && (
          <span className="w-fit rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-indigo-300">
            {platform.category}
          </span>
        )}
        <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
        {platform.tagline && <p className="text-sm font-medium text-slate-400">{platform.tagline}</p>}
        {platform.summary && <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-500">{platform.summary}</p>}
        {platform.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {platform.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-400 opacity-0 transition group-hover:opacity-100">
          Read the case study
          <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
