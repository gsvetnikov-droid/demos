## The problem

A cross-border lending and account-opening business runs on relationships that live in three places at once: a sales rep's inbox, a shared spreadsheet nobody trusts, and someone's memory of "didn't we already talk to this person?" Leads get worked twice, follow-ups slip, and the compliance side of the business — KYC/KYB, country and vertical risk, document checklists — lives in a separate process that nobody outside compliance can see into. By the time a deal is a client, three different teams have touched it with three different systems.

The brief was to replace all of that with one system: sales pipeline, support, onboarding/compliance, and outbound campaigns, used by every team from first outbound touch to funded account — without the six-figure price tag or vendor lock-in of a Salesforce-class platform.

## What it is

A full internal CRM built on Next.js, Postgres, and Prisma, covering:

- **Lead pipeline** — a 9-stage pipeline (New → Contacted → Engaged → Qualified → Onboarding → Compliance Review → Onboarding Successful → First Transaction → Client) with team-scoped visibility, so a sales manager sees their team's pipeline and a rep sees their own, without a separate reporting tool.
- **KYC/KYB eligibility matcher** — plug in a prospect's registration country, residency, industry vertical, and needed services, and see which partner banks/EMIs can plausibly take the account, plus the exact document checklist each one needs. This is the product's actual differentiator: turning "will anyone even approve this?" from a multi-day back-and-forth into an instant answer.
- **Structured risk scoring** — country, industry, ownership, transaction, and licensing risk combine into a single score and tier (Standard / Enhanced KYC / EDD / Senior Review / Restricted), with hard blocks for sanctioned countries or restricted verticals regardless of score.
- **Outbound campaign tracking** — cold email campaigns (via ReachInbox) feed opens/clicks/replies straight into the CRM, auto-creating leads on interest and sending a same-thread follow-up the moment someone clicks, from whichever mailbox actually sent the original message.
- **Lead Signals & ICP Prospecting** — two intake pipelines feeding the top of the funnel: one captures buying-signal statements (a LinkedIn post, a job listing) and scores them against keyword rules; the other surfaces firmographic matches against the business's own ICP definitions. Both land in a review queue before anyone commits to reaching out.
- **LinkedIn outreach tracking** — a manual-send cadence tool (deliberately not automated — LinkedIn's own ToS rules that out) that queues connection requests, paces them under LinkedIn's daily caps, and reminds a rep when a connected contact's next sequence message is due.
- **Support desk** — tickets with SLA-aging, a bug-report path separate from client support, and inbound intake from Telegram that creates or continues a ticket automatically.
- **Partner & referral program** — a public no-login intake form for prospective referral partners, agent codes for approved partners to submit client referrals, and reporting tied back to the sales pipeline.
- **Full admin layer** — role-based permissions across 8 roles, a master activity log, login history, duplicate-lead detection with one-click merge (and undo), and a one-click full-data JSON backup.

## Architecture

**Stack:** Next.js 14 (App Router, TypeScript) for both the UI and the API, Prisma against Postgres, NextAuth for credentials-based auth with JWT sessions, Tailwind for styling. No separate backend service — API routes and server components share the same Prisma client and the same TypeScript types as the UI, so a schema change is felt immediately at compile time everywhere it matters.

**Data model:** 60+ Prisma models. The schema deliberately uses plain strings for status/role/type fields rather than native Postgres enums, validated against shared TypeScript union types (`src/lib/types.ts`) instead — the tradeoff is a small amount of app-level validation in exchange for a schema that migrates without a `ALTER TYPE` dance every time a new status is added, which happened more than once as the pipeline evolved.

**Permissions:** a role → module access matrix (`src/lib/permissions.ts`) checked on both the client (what renders) and the server (what an API route will actually do) — the client-side check is a UX convenience, never the security boundary. Team-scoped data visibility (a Sales Manager sees their own team, not the whole company) is a separate, explicit query filter (`teamScope.ts`), not something bolted onto the permission matrix.

**Integrations, all "inert until configured":** WhatsApp Cloud API, Telegram Bot API (two separate bots — sales and support), ReachInbox for outbound email and reply tracking, Hunter/Clearbit/Apollo/People Data Labs for enrichment, generic SMTP for notifications, Web Push for desktop notifications, Slack incoming webhooks for team alerts. Every one of them fails closed and silent (skipped, not errored) when its env vars aren't set, rather than crashing a deploy that hasn't wired up every integration yet — and every webhook verifies a signature or shared secret, fixed after an early pass where "not configured yet" and "open to anyone" were accidentally the same state.

**Zero-cost by design:** free-tier Postgres (Neon), free-tier hosting (Vercel), no paid integrations required to run the core CRM — WhatsApp/Telegram/email/enrichment are all optional add-ons layered on top, not load-bearing dependencies.

## A few decisions worth calling out

**Status migrations, handled in the seed script, not a one-off.** The pipeline's stage names changed twice during development (a stage was renamed, another was inserted mid-pipeline). Rather than a manual data-fix script run once and thrown away, the migration logic lives in the seed script itself and runs — idempotently — on every deploy, so a database that's several versions behind catches up automatically the next time it deploys.

**Duplicate detection with a real undo.** Merging two lead records is inherently risky — get it wrong and you've silently deleted someone's history. The merge tool snapshots the full pre-merge state before touching anything, so "undo last merge" is a genuine one-click restore, not a support ticket.

**The onboarding matcher is the product, not a feature.** Everything else in the CRM — the pipeline stages, the risk scoring, even how outbound campaigns are tagged by industry — exists to feed information into that matcher and act on what it says. Building it as a first-class module (its own set of Country/Vertical/Service/Partner models) rather than a form bolted onto the Lead record is what makes it fast enough to use live, on a call with a prospect.

## Result

One system, one login, covering the full lifecycle from a cold email to a funded account — sales, support, compliance, and outbound, each seeing exactly the slice of it their role needs, running for the cost of a Vercel Hobby plan and a free-tier Postgres database.
