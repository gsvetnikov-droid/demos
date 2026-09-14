import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function readWhitepaper(filename: string): string {
  return fs.readFileSync(path.join(__dirname, "seed-content", filename), "utf-8");
}

type PlatformSeed = Parameters<typeof prisma.platform.upsert>[0]["create"];

// One row per showcased project. liveUrl/coverImageUrl/status/sortOrder are
// "admin-managed" — once a row exists, those four are left alone by every
// later seed run (see main() below), so publishing a platform or setting
// its cover image from /admin never gets clobbered by a redeploy. Every
// other field (copy, tags, tech stack, the whitepaper body) re-syncs from
// this file on every deploy, so fixing a typo here is enough — no need to
// hand-edit the live row too.
const platforms: PlatformSeed[] = [
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
    name: "Hiring Signal Intelligence Platform",
    tagline: "Turns live hiring activity into a scored, ranked, pipeline-ready prospect list",
    summary:
      "A lead-sourcing platform that scores every company it tracks across six hiring-signal dimensions, then runs a full find-to-close pipeline on top — tracking 248+ companies with a ranked top-20 of the best opportunities open right now.",
    category: "Sales intelligence",
    tags: ["Sales intelligence", "Lead sourcing", "Sales pipeline"],
    techStack: ["Next.js", "Neon Postgres", "Vercel", "Greenhouse / Lever / Ashby ATS data"],
    highlights: [
      "0-100 opportunity scoring across 6 hiring-signal dimensions",
      "Live dashboard: companies tracked, new this week, follow-ups due",
      "Ranked top-20 best-opportunity list, not a raw feed",
      "Signal-aware outreach generator + full sales pipeline tracker",
      "Built entirely on free job-data APIs and direct ATS reads",
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
  {
    slug: "discovery-call-prep",
    name: "Discovery Call Prep Tool",
    tagline: "A full discovery-call package generated from one form, in under 30 seconds",
    summary:
      "An internal sales enablement tool: submit a company name and get a fit score with rationale, company context, 10-12 categorized discovery questions, and a client-side PDF export — replacing 30-60 minutes of manual prep, at zero AI cost.",
    category: "Sales enablement",
    tags: ["Sales enablement", "AI", "Internal tool"],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Groq (Llama 3.3 70B)", "jsPDF"],
    highlights: [
      "Fit score (1-100) with written rationale, not just a number",
      "10-12 discovery questions grouped by category with stated purpose",
      "Client-side PDF export — no server, no upload required",
      "Runs on Groq's free tier — zero ongoing AI cost",
      "Full package generated in under 30 seconds",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("discovery-call-prep-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 7,
  },
  {
    slug: "confintel",
    name: "ConfIntel",
    tagline: "Free, public research platform for conferences, trade shows, and expos worldwide",
    summary:
      "No signup, no login — search any conference or trade show and get an ROI calculator, SWOT analysis, AI-personalized recommendations, a budget planner, networking prep, and CFP deadline tracking. Covers 16+ industries and 1,000+ events.",
    category: "Public research tool",
    tags: ["Public tool", "AI", "Research", "Events"],
    techStack: ["AI-assisted research and generation"],
    highlights: [
      "No signup, no login — instant public access",
      "16+ industries, 100+ sub-domains, 1,000+ events tracked",
      "ROI calculator and SWOT analysis per event",
      "AI networking prep and CFP deadline tracking",
      "Built and run solo, at zero ongoing infrastructure cost",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    whitepaper: readWhitepaper("confintel-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 8,
  },
];

async function main() {
  for (const { liveUrl, coverImageUrl, status, sortOrder, ...content } of platforms) {
    await prisma.platform.upsert({
      where: { slug: content.slug },
      update: content,
      create: { ...content, liveUrl, coverImageUrl, status, sortOrder },
    });
  }
  console.log(`Synced ${platforms.length} platforms (content re-synced every run; liveUrl/coverImageUrl/status/sortOrder are admin-managed and left alone once set).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
