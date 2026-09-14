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
//
// liveUrl is intentionally blank on every project below except where noted
// — none of the documented URLs (aiedgeacademy.net, gsglobal.pro) could be
// reached from this build environment to verify they're still live, so no
// "Launch"/"View platform" button points at them yet. Set liveUrl from
// /admin once you've confirmed a site is actually up.
const platforms: PlatformSeed[] = [
  {
    slug: "demo-crm",
    name: "Demo CRM",
    tagline: "A full sales, onboarding, and compliance CRM for cross-border lending",
    summary:
      "Lead pipeline, KYC/KYB eligibility matching, structured risk scoring, outbound campaign tracking, and a support desk — one system covering the full lifecycle from cold email to funded account.",
    category: "CRM",
    displayStatus: "Internal tool",
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
    imageAlt: "",
    imageCaption: "",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("crm-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 1,
  },
  {
    slug: "ai-edge-academy",
    name: "AI Edge Academy",
    tagline: "Turning operational AI education into a connected platform",
    summary:
      "An operational AI education platform combining courses, an insights hub, enterprise enquiries, and outbound workflows. Built independently to connect educational content with lead capture, campaign engagement, and CRM records.",
    category: "Operational AI education & GTM infrastructure",
    displayStatus: "Marketing platform + GTM system",
    tags: ["Marketing platform", "GTM automation", "Education"],
    techStack: ["Custom HTML/CSS", "Netlify Functions", "Make.com", "HubSpot", "Smartlead"],
    highlights: [
      "44-page marketing site: courses, insights hub, enterprise enquiries, careers",
      "Server-side webhook proxy normalizing outbound event payloads",
      "Enterprise enquiry workflow: contact upsert, note, internal notification",
      "Campaign-specific links routing different audiences to relevant content",
      "Smoke-test pages for verifying event and enquiry workflows",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/ai-edge-academy.webp",
    imageAlt:
      "Representative AI Edge Academy homepage concept generated for this portfolio, showing sample course cards, an insights section, and an enterprise-training call to action — not a live screenshot.",
    imageCaption: "Representative website concept with sample content",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("ai-edge-academy-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 2,
  },
  {
    slug: "confintel",
    name: "ConfIntel",
    tagline: "Bringing event research and planning into one workspace",
    summary:
      "A public conference and trade-show research platform combining event discovery, AI-assisted recommendations, SWOT analysis, budget planning, networking preparation, and speaking-opportunity tracking.",
    category: "Conference research & event planning",
    displayStatus: "Public platform",
    tags: ["Public tool", "Research", "Events", "AI-assisted"],
    techStack: [],
    highlights: [
      "No signup, no login — public access",
      "ROI scenario calculator and SWOT analysis per event",
      "AI-assisted event recommendations",
      "Budget planner with PDF export",
      "Networking prep and CFP deadline tracking",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/confintel.webp",
    imageAlt:
      "Representative ConfIntel interface concept generated for this portfolio, showing event discovery results plus ROI, SWOT, budget, and networking planning panels, with sample events.",
    imageCaption: "Representative interface with sample events",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("confintel-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 3,
  },
  {
    slug: "hiring-signal-intelligence",
    name: "Hiring Signal Intelligence Platform",
    tagline: "Turning hiring activity into prioritized outsourcing opportunities",
    summary:
      'A BPO prospecting platform that uses hiring activity to identify potential outsourcing needs. Company-level opportunity scores, "why now" explanations, outreach preparation, and pipeline tracking help prioritize the next commercial action.',
    category: "BPO sales intelligence",
    displayStatus: "Internal tool",
    tags: ["Sales intelligence", "BPO", "Lead scoring"],
    techStack: ["Next.js", "Neon Postgres", "Vercel"],
    highlights: [
      "0-100 opportunity score per company, with a plain-language rationale",
      "Scores hiring volume, velocity, role mix, seniority, work model, and repost patterns",
      "Signal-aware outreach generator + pipeline tracker",
      "Job data from free public APIs plus direct ATS reads (Greenhouse, Lever, Ashby)",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/hiring-signal-intelligence.webp",
    imageAlt:
      "Representative Hiring Signal Intelligence interface concept generated for this portfolio, showing a top-opportunities table with scores and a company detail panel, with fictional sample companies.",
    imageCaption: "Representative interface with fictional opportunities",
    relatedProjectSlugs: ["emsit-hiring-signals"],
    whitepaper: readWhitepaper("hiring-signal-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 4,
  },
  {
    slug: "discovery-call-prep",
    name: "Discovery Call Prep Tool",
    tagline: "Making discovery preparation structured and repeatable",
    summary:
      "An internal sales tool that turns prospect inputs into a structured call brief: fit rationale, company context, discovery questions, and a downloadable PDF. Designed to improve preparation consistency without adding a complex software stack.",
    category: "Internal sales enablement",
    displayStatus: "Internal tool",
    tags: ["Sales enablement", "AI", "Internal tool"],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Groq (Llama 3.3 70B)", "jsPDF", "localStorage"],
    highlights: [
      "1-100 fit score with written rationale",
      "10-12 categorized discovery questions with suggested follow-ups",
      "Client-side PDF export — no server, no upload required",
      "Runs on Groq's free tier",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/discovery-call-prep.webp",
    imageAlt:
      "Representative Discovery Call Prep interface concept generated for this portfolio, showing a prospect-details form, a sample fit-score output, and a call-brief PDF preview.",
    imageCaption: "Representative interface with sample output",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("discovery-call-prep-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 5,
  },
  {
    slug: "hr-operations-prototype",
    name: "HR Operations Platform",
    tagline: "From operational requirements to a build-ready platform.",
    summary:
      "A white-label HR and recruiting platform concept, developed into an interactive prototype and a detailed delivery roadmap. Explore how I structure product workflows, engineering priorities, integration dependencies, and launch preparation in one working tool.",
    category: "Product architecture · HR operations",
    displayStatus: "Prototype & interactive roadmap",
    tags: ["HR tech", "Product architecture", "Interactive roadmap"],
    techStack: [],
    highlights: [
      "178 engineering tasks",
      "19 roadmap sections",
      "40 vendor entries",
      "64 launch checklist items",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/hr-operations-prototype.webp",
    imageAlt:
      "Representative HR Operations white-label prototype concept generated for this portfolio, showing a candidate kanban board, a candidate profile panel, and a meeting-UI concept, clearly labeled as a non-live demonstration.",
    imageCaption: "Prototype concept; production integrations not demonstrated",
    interactiveDemoUrl: "/demos/hr-roadmap/index.html",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("hr-operations-prototype-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 6,
  },
  {
    slug: "emsit-hiring-signals",
    name: "EMSIT Hiring Signal Tool",
    tagline: "Applying hiring intelligence to day-to-day business development",
    summary:
      "A single-user BPO prospecting tool built for EMSIT business development. It combines job-posting signals, company-fit analysis, prospect stages, and follow-up tracking in one internal workflow.",
    category: "Internal BPO prospecting",
    displayStatus: "Internal tool",
    tags: ["Sales intelligence", "BPO", "Internal tool"],
    techStack: ["Next.js 15", "Neon Postgres", "Prisma", "Vercel", "Make.com", "Claude API"],
    highlights: [
      "Job-posting ingestion and hiring-signal detection",
      "Outsourcing-fit scoring, AI-assisted via the Claude API",
      "Prospect pipeline with status and follow-up tracking",
      "Single-user scope, built for one business-development workflow",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/emsit-hiring-signals.webp",
    imageAlt:
      "Representative EMSIT Hiring Signals interface concept generated for this portfolio, showing a hiring-signal feed, outsourcing-fit analysis, and a prospect pipeline with fictional sample companies.",
    imageCaption: "Representative interface with fictional prospects",
    relatedProjectSlugs: ["hiring-signal-intelligence"],
    whitepaper: readWhitepaper("emsit-hiring-signals-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 7,
  },
  {
    slug: "linkedin-assistant",
    name: "LinkedIn Assistant",
    tagline: "Organizing content and outreach without automating the relationship",
    summary:
      "A manual-first workspace for LinkedIn content planning, draft management, outreach tracking, and follow-ups. It organizes the work while leaving every message and publication under the user's control.",
    category: "Personal productivity & relationship management",
    displayStatus: "Internal tool",
    tags: ["Productivity", "LinkedIn", "Manual-first"],
    techStack: ["Next.js 15", "TypeScript", "Neon PostgreSQL", "Prisma", "Vercel"],
    highlights: [
      "Draft, queue, and plan posts for manual publishing",
      "Connection request and conversation tracking with follow-ups",
      "No LinkedIn API write access anywhere in the codebase",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/linkedin-assistant.webp",
    imageAlt:
      "Representative LinkedIn Assistant interface concept generated for this portfolio, showing a draft workspace, a content board, and an outreach tracker with a manual-review notice.",
    imageCaption: "Representative interface with sample content",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("linkedin-assistant-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 8,
  },
  {
    slug: "credits-outbound-gtm",
    name: "Credits.com Outbound GTM",
    tagline: "Structuring commercial outreach from sourcing to follow-up",
    summary:
      "A commercial outreach operating model covering audience segmentation, prospect sourcing, tailored messaging, lead stages, follow-ups, and referral workflows. The original blueprint separates active manual operations from a proposed automation phase.",
    category: "Commercial operations & GTM system design",
    displayStatus: "GTM system (historical)",
    tags: ["GTM", "Historical blueprint", "Outbound"],
    techStack: [],
    highlights: [
      "Audience segmentation and tailored messaging by vertical",
      "Lead-record structure: vertical, product interest, status, follow-up",
      "Referral workflow with pre-referral qualification review",
      "Automation roadmap kept separate from what was actually operational",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/credits-outbound-gtm.webp",
    imageAlt:
      "Conceptual outbound GTM operating-blueprint diagram generated for this portfolio, illustrating segmented outreach, lead operations, and referral partnerships based on the historical export.",
    imageCaption: "Conceptual workspace based on the historical export",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("credits-outbound-gtm-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 9,
  },
  {
    slug: "feynman-learning-loop",
    name: "Feynman Learning Loop",
    tagline: "Structuring AI conversations around demonstrated understanding",
    summary:
      "A structured Claude learning workflow that combines simple explanations, targeted questions, refinement, application, and teach-back. Designed to help the learner expose gaps and explain the concept independently.",
    category: "AI learning workflow & prompt architecture",
    displayStatus: "AI workflow",
    tags: ["Prompt engineering", "Claude project", "Education"],
    techStack: ["Claude (standing project instructions)"],
    highlights: [
      "7-step loop: simplify, identify gaps, question, refine, apply, compress",
      "Targeted questions designed to surface gaps, not test recall",
      "2-3 refinement cycles, each required to be clearer than the last",
      "Ends in a compressed teaching snapshot the learner can reuse",
    ],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "/projects/feynman-learning-loop.webp",
    imageAlt: "Illustrative learning-notebook graphic representing the Feynman Learning Loop's simplify, question, refine, and teach-back structure.",
    imageCaption: "Representative learning worksheet",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("feynman-loop-whitepaper.md"),
    status: "DRAFT",
    sortOrder: 10,
  },
  {
    slug: "ny-property-transition-refinance",
    name: "NY Property Transition Refinance Workspace",
    tagline: "Interim entry — full details pending",
    summary:
      "An interim placeholder entry. The source export for this project was incomplete, so only the confirmed stack is listed here pending further detail on what it does, who uses it, and its features.",
    category: "Real estate workflow (interim entry)",
    displayStatus: "Interim entry",
    tags: ["Real estate", "Interim"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [],
    liveUrl: "",
    repoUrl: "",
    coverImageUrl: "",
    imageAlt: "",
    imageCaption: "",
    relatedProjectSlugs: [],
    whitepaper: readWhitepaper("ny-property-transition-refinance-interim.md"),
    status: "DRAFT",
    sortOrder: 11,
  },
];

// Seeded once as a starting point, then fully owned by whoever edits it
// from /admin/site — unlike the platform rows above, this is NOT re-synced
// on every deploy (update: {}), so an admin's homepage copy edits are
// never silently overwritten by a future change to the defaults below.
const siteContentDefaults = {
  id: "singleton",
  siteName: "Showcase",
  siteTagline: "Operations and GTM software, built end to end, project by project.",
  heroHeading: "Business experience. Built into working systems.",
  heroIntro: [
    "I'm Gennady Svetnikov — an operations and go-to-market professional who designs and builds software around real business problems.",
    "My work spans sales intelligence, discovery preparation, recruiting operations, conference research, professional education, and commercial outreach. I build independently, using AI-assisted development to move from an operational requirement to a working tool, an interactive prototype, or a structured automation system.",
    "The starting point is always the workflow: who needs to act, what information they need, and what should happen next.",
  ].join("\n\n"),
  heroPrimaryCta: "Explore the projects",
  heroSecondaryCta: "Discuss a workflow",
  sectionHeading: "Applications, prototypes, and operational systems",
  sectionBody:
    "Each project below explains the problem, the approach, and the delivered scope. Production tools, internal applications, prototypes, and planned capabilities are identified separately.",
  aboutHeading: "About",
  aboutBody: [
    "My background combines BPO management, business development, financial services, and operational improvement. Building software extends that work: it allows me to turn requirements into tools that support how teams actually operate.",
    "I take responsibility for the business problem, product definition, workflow design, and implementation. The portfolio includes independently built applications alongside prototypes and structured AI workflows.",
    "I work in English and Russian, with an emphasis on clear communication, practical implementation, and accountable processes.",
  ].join("\n\n"),
  contactHeading: "What workflow needs to work better?",
  contactBody:
    "If your team is spending too much time researching, coordinating, preparing, or maintaining fragmented records, let's discuss the process and what a practical solution could look like.",
  contactCtaLabel: "Discuss your workflow",
  contactEmail: null,
};

async function main() {
  for (const { liveUrl, coverImageUrl, status, sortOrder, ...content } of platforms) {
    await prisma.platform.upsert({
      where: { slug: content.slug },
      update: content,
      create: { ...content, liveUrl, coverImageUrl, status, sortOrder },
    });
  }
  console.log(`Synced ${platforms.length} platforms (content re-synced every run; liveUrl/coverImageUrl/status/sortOrder are admin-managed and left alone once set).`);

  await prisma.siteContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: siteContentDefaults,
  });
  console.log("Ensured the SiteContent singleton exists (left untouched if already present — edit it from /admin/site).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
