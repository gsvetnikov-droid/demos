import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function readWhitepaper(filename: string): string {
  return fs.readFileSync(path.join(__dirname, "seed-content", filename), "utf-8");
}

// One row per showcased project. `liveUrl`/`coverImageUrl` are blank on
// purpose for every entry below except when noted — they're filled in
// (and the row flipped to PUBLISHED) from /admin once real screenshots
// exist for that platform. All rows seed as DRAFT so nothing shows on the
// public site until it's ready.
const platforms: Array<Parameters<typeof prisma.platform.upsert>[0]["create"]> = [
  {
    slug: "demo-crm",
    name: "Demo CRM",
    tagline: "A full sales, onboarding, and compliance CRM for cross-border lending",
    summary:
      "Lead pipeline, KYC/KYB eligibility matching, structured risk scoring, outbound campaign tracking, and a support desk — one system covering the full lifecycle from cold email to funded account.",
    category: "CRM",
    tags: ["CRM", "Fintech", "Compliance", "Sales pipeline"],
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
    highlights: [
      "9-stage sales pipeline with team-scoped visibility",
      "Instant KYC/KYB partner-matching against a live document checklist",
      "Structured, tiered risk scoring with hard compliance blocks",
      "Outbound campaign tracking with automatic reply-triggered follow-ups",
      "Lead Signals + ICP Prospecting intake pipelines",
      "Full role-based admin layer with duplicate-merge undo",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("crm-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 1,
  },
  {
    slug: "hiring-signal-intelligence",
    name: "Hiring Signal Intelligence Tool",
    tagline: "Turns job-posting patterns into a scored, pipeline-ready outsourcing prospect list",
    summary:
      "A single-user sourcing tool for a BPO business development function: detects hiring signals that indicate outsourcing opportunity, scores each company for fit, and runs a prospect pipeline on top — no manual spreadsheet step anywhere in the loop.",
    category: "Sales intelligence",
    tags: ["Sales intelligence", "AI scoring", "Sourcing", "Internal tool"],
    techStack: ["Next.js", "Neon Postgres", "Prisma", "Vercel", "Make.com", "Claude API"],
    highlights: [
      "Detects hiring-pattern signals from raw job posting data",
      "Claude API scores each company against BPO-services fit",
      "Prospect pipeline with stage, status, and follow-up tracking",
      "Single-user by design — no auth, roles, or multi-tenant overhead",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("hiring-signal-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 2,
  },
  {
    slug: "hr-ops-recruiting-platform",
    name: "HR Ops & Recruiting Platform",
    tagline: "A white-label recruiting SaaS prototype with in-app video and behavioral scoring",
    summary:
      "An enterprise SaaS prototype — six navigable screens, in-app Zoom/Meet/Teams interviews, a 15-system bidirectional CRM sync, and a behavioral interview intelligence module with a hardcoded ethics layer no client can disable.",
    category: "HR tech",
    tags: ["HR tech", "SaaS prototype", "White-label", "Enterprise"],
    techStack: ["React", "In-app video (Zoom/Meet/Teams)", "CRM sync API", "localStorage"],
    highlights: [
      "6 navigable screens with undo/redo and scroll-position memory",
      "In-app video meetings — no external redirect",
      "Bidirectional sync across 15 CRM systems",
      "Behavioral interview intelligence with a non-overridable ethics layer",
      "130+ task build roadmap across 16 phases, with a 30+ vendor registry",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("hr-ops-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 3,
  },
  {
    slug: "ai-edge-academy",
    name: "AI Edge Academy",
    tagline: "A 44-page marketing site with a full outbound-to-CRM GTM stack behind it",
    summary:
      "Turned a single course landing page into a 44-page site plus a 5-campaign, 15-mailbox outbound engine wired straight into HubSpot — every reply, click, and bounce lands as a reportable contact property with no manual logging.",
    category: "GTM / Marketing",
    tags: ["Marketing site", "Outbound", "GTM automation", "HubSpot"],
    techStack: ["Netlify", "Netlify Functions", "Smartlead", "Make.com", "HubSpot", "Cloudflare"],
    highlights: [
      "44-page site with full schema markup and a 44-URL sitemap",
      "5 campaigns across 5 domains and 15 mailboxes, zero blacklist hits",
      "Tracked shortlinks with full UTM attribution on every redirect",
      "6-branch Make.com router syncing every email event to HubSpot",
      "Live smoke-test pages for verifying the pipeline end to end",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("ai-edge-academy-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 4,
  },
  {
    slug: "linkedin-assistant",
    name: "LinkedIn Assistant",
    tagline: "Content planning and outreach tracking for LinkedIn, with a hard no-auto-post boundary",
    summary:
      "A personal productivity tool for planning LinkedIn posts and tracking outreach — connection requests, follow-ups, conversation status — with zero LinkedIn API write access anywhere in the codebase.",
    category: "Productivity",
    tags: ["Productivity", "LinkedIn", "Outreach tracking"],
    techStack: ["Next.js", "TypeScript", "Neon Postgres", "Prisma", "Vercel"],
    highlights: [
      "Draft, schedule, and queue posts for manual publishing",
      "Connection request and follow-up tracking in one place",
      "No LinkedIn API write access — architecturally incapable of auto-posting",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("linkedin-assistant-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 5,
  },
  {
    slug: "feynman-learning-loop",
    name: "Feynman Learning Loop",
    tagline: "A standing Claude project that runs every session as a structured teaching loop",
    summary:
      "Not a hosted app — a prompt architecture. Every session runs the same 7-step loop (simplify, question, refine, apply, compress) built on Richard Feynman's approach to learning, instead of a single freeform explanation.",
    category: "Prompt architecture",
    tags: ["Prompt engineering", "Claude project", "Education"],
    techStack: ["Claude (standing project instructions)"],
    highlights: [
      "7-step structured loop run identically on every session",
      "Targeted questions designed to surface gaps, not test recall",
      "2-3 refinement cycles, each required to be clearer than the last",
      "Ends in a compressed teaching snapshot the user can reuse",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("feynman-loop-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 6,
  },
];

async function main() {
  for (const platform of platforms) {
    await prisma.platform.upsert({
      where: { slug: platform.slug },
      update: {},
      create: platform,
    });
  }
  console.log(`Seeded ${platforms.length} platforms (all DRAFT — publish each from /admin once it's ready to show).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
