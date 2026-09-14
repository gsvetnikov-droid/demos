import { prisma } from "@/lib/prisma";
import PlatformCard from "@/components/PlatformCard";
import SiteNav from "@/components/SiteNav";
import GradientMesh from "@/components/GradientMesh";
import { SITE_TAGLINE } from "@/lib/site";

export default async function HomePage() {
  const platforms = await prisma.platform.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="bg-slate-950">
      <SiteNav />

      <section className="relative isolate overflow-hidden">
        <GradientMesh />
        <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
          <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
            Selected work
          </p>
          <h1 className="animate-fade-in-up mt-5 text-balance text-5xl font-bold tracking-tight text-white [animation-delay:0.1s] sm:text-6xl">
            Platforms, built end to end.
          </h1>
          <p className="animate-fade-in-up mx-auto mt-6 max-w-xl text-balance text-lg text-slate-400 [animation-delay:0.2s]">
            {SITE_TAGLINE}
          </p>
          <div className="animate-fade-in-up mt-10 [animation-delay:0.3s]">
            <a
              href="#platforms"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              View the work
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>

      <section id="platforms" className="mx-auto max-w-6xl px-6 pb-28">
        {platforms.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/10 p-14 text-center text-slate-500">
            Nothing published yet — add a platform from{" "}
            <a href="/admin" className="text-cyan-300 underline underline-offset-4">
              /admin
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform, i) => (
              <div
                key={platform.id}
                className="animate-fade-in-up w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                style={{ animationDelay: `${Math.min(i, 6) * 0.08}s` }}
              >
                <PlatformCard platform={platform} />
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()}</span>
          <a href="/admin" className="hover:text-slate-300">
            Admin
          </a>
        </div>
      </footer>
    </div>
  );
}
