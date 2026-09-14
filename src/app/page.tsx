import { prisma } from "@/lib/prisma";
import PlatformCard from "@/components/PlatformCard";
import SiteNav from "@/components/SiteNav";
import { getSiteContent, toParagraphs } from "@/lib/getSiteContent";

export default async function HomePage() {
  const [platforms, content] = await Promise.all([
    prisma.platform.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    getSiteContent(),
  ]);

  return (
    <div className="bg-cream-50">
      <SiteNav siteName={content.siteName} />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 sm:pt-32">
        <h1 className="animate-fade-in-up max-w-2xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          {content.heroHeading}
        </h1>
        {toParagraphs(content.heroIntro).map((p, i) => (
          <p
            key={i}
            className="animate-fade-in-up mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 first:mt-5 first:text-lg first:sm:text-xl"
            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
          >
            {p}
          </p>
        ))}
        <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3 [animation-delay:0.25s]">
          <a
            href="#platforms"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            {content.heroPrimaryCta}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-cream-400 hover:bg-white"
          >
            {content.heroSecondaryCta}
          </a>
        </div>
      </section>

      <section id="platforms" className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{content.sectionHeading}</h2>
        <p className="mt-3 max-w-2xl text-neutral-500">{content.sectionBody}</p>

        {platforms.length === 0 ? (
          <p className="mt-10 rounded-3xl border border-dashed border-cream-300 bg-white p-14 text-center text-neutral-400">
            Nothing published yet — add a platform from{" "}
            <a href="/admin" className="text-neutral-900 underline underline-offset-4">
              /admin
            </a>
            .
          </p>
        ) : (
          <div className="mt-10 flex flex-wrap gap-6">
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

      <section className="border-t border-cream-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{content.aboutHeading}</h2>
          {toParagraphs(content.aboutBody).map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-neutral-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{content.contactHeading}</h2>
        {toParagraphs(content.contactBody).map((p, i) => (
          <p key={i} className="mt-4 max-w-xl leading-relaxed text-neutral-600">
            {p}
          </p>
        ))}
        <div className="mt-6">
          {content.contactEmail ? (
            <a
              href={`mailto:${content.contactEmail}`}
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              {content.contactCtaLabel}
            </a>
          ) : (
            <span
              className="cursor-not-allowed rounded-full bg-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-500"
              title="Contact destination not yet configured — set it from /admin/site"
            >
              {content.contactCtaLabel}
            </span>
          )}
        </div>
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
