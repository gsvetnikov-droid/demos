import { prisma } from "@/lib/prisma";

// Fallback used only if the SiteContent singleton row is somehow missing
// (e.g. a fresh database before its first `db:seed` run) — normal
// operation always finds the seeded row and this never applies.
const FALLBACK = {
  id: "singleton",
  siteName: "Showcase",
  siteTagline: "",
  heroHeading: "Business experience. Built into working systems.",
  heroIntro: "",
  heroPrimaryCta: "Explore the projects",
  heroSecondaryCta: "Discuss a workflow",
  sectionHeading: "Applications, prototypes, and operational systems",
  sectionBody: "",
  aboutHeading: "About",
  aboutBody: "",
  contactHeading: "Get in touch",
  contactBody: "",
  contactCtaLabel: "Discuss your workflow",
  contactEmail: null as string | null,
  updatedAt: new Date(),
};

export async function getSiteContent() {
  const content = await prisma.siteContent.findUnique({ where: { id: "singleton" } });
  return content ?? FALLBACK;
}

// Splits the newline-paragraph convention used by heroIntro/aboutBody
// (blank line between paragraphs) into an array for rendering as
// separate <p> tags.
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
