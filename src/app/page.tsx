import { prisma } from "@/lib/prisma";
import PlatformCard from "@/components/PlatformCard";
import SiteNav from "@/components/SiteNav";
import { CONTACT_EMAIL } from "@/lib/site";

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
          Business experience. Built into working systems.
        </h1>
        <p className="animate-fade-in-up mt-5 max-w-2xl text-lg text-neutral-500 [animation-delay:0.1s] sm:text-xl">
          I&apos;m Gennady Svetnikov — an operations and go-to-market professional who designs and builds software
          around real business problems.
        </p>
        <p className="animate-fade-in-up mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 [animation-delay:0.15s]">
          My work spans sales intelligence, discovery preparation, recruiting operations, conference research,
          professional education, and commercial outreach. I build independently, using AI-assisted development to
          move from an operational requirement to a working tool, an interactive prototype, or a structured
          automation system.
        </p>
        <p className="animate-fade-in-up mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 [animation-delay:0.2s]">
          The starting point is always the workflow: who needs to act, what information they need, and what should
          happen next.
        </p>
        <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3 [animation-delay:0.25s]">
          <a
            href="#platforms"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Explore the projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-cream-400 hover:bg-white"
          >
            Discuss a workflow
          </a>
        </div>
      </section>

      <section id="platforms" className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Applications, prototypes, and operational systems
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-500">
          Each project below explains the problem, the approach, and the delivered scope. Production tools, internal
          applications, prototypes, and planned capabilities are identified separately.
        </p>

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
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">About</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">
            My background combines BPO management, business development, financial services, and operational
            improvement. Building software extends that work: it allows me to turn requirements into tools that
            support how teams actually operate.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-600">
            I take responsibility for the business problem, product definition, workflow design, and implementation.
            The portfolio includes independently built applications alongside prototypes and structured AI workflows.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-600">
            I work in English and Russian, with an emphasis on clear communication, practical implementation, and
            accountable processes.
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">What workflow needs to work better?</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-neutral-600">
          If your team is spending too much time researching, coordinating, preparing, or maintaining fragmented
          records, let&apos;s discuss the process and what a practical solution could look like.
        </p>
        <div className="mt-6">
          {CONTACT_EMAIL ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Discuss your workflow
            </a>
          ) : (
            <span
              className="cursor-not-allowed rounded-full bg-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-500"
              title="Contact destination not yet configured — set CONTACT_EMAIL in src/lib/site.ts"
            >
              Discuss your workflow
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
