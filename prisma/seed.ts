import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function seedCrmPlatform() {
  const whitepaper = fs.readFileSync(path.join(__dirname, "seed-content/crm-whitepaper.md"), "utf-8");

  await prisma.platform.upsert({
    where: { slug: "demo-crm" },
    update: {},
    create: {
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
      // Fill these in once the separate demo deployment (see the credits
      // repo's DEMO.md) is live — left blank for now on purpose.
      liveUrl: "",
      repoUrl: "",
      coverImageUrl: "",
      whitepaper,
      status: "DRAFT",
      sortOrder: 1,
    },
  });

  console.log("Seeded the Demo CRM platform (status: DRAFT — publish it from /admin once you're ready to show it).");
}

async function main() {
  await seedCrmPlatform();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
