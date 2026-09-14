import { prisma } from "@/lib/prisma";
import PlatformCard from "@/components/PlatformCard";
import SiteNav from "@/components/SiteNav";
import { SITE_TAGLINE } from "@/lib/site";

export default async function HomePage() {
  const platforms = await prisma.platform.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="bg-cream-50">
      <SiteNav />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
        <h1 className="animate-fade-in-up max-w-2xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          Platforms, built end to end.
        </h1>
        <p className="animate-fade-in-up mt-5 max-w-xl text-lg text-neutral-500 [animation-delay:0.1s] sm:text-xl">
          {SITE_TAGLINE}
        </p>
      </section>

      <section id="platforms" className="mx-auto max-w-5xl px-6 pb-28">
        {platforms.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-cream-300 bg-white p-14 text-center text-neutral-400">
            Nothing published yet — add a platform from{" "}
            <a href="/admin" className="text-neutral-900 underline underline-offset-4">
              /admin
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {platforms.map((platform, i) => (
              <div
                key={platform.id}
                className="animate-fade-in-up w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                style={{ animationDelay: `${Math.min(i, 6) * 0.06}s` }}
              >
                <PlatformCard platform={platform} />
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-cream-200 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-xs text-neutral-400">
          <span>© {new Date().getFullYear()}</span>
          <a href="/admin" className="hover:text-neutral-600">
            Admin
          </a>
        </div>
      </footer>
    </div>
  );
}
