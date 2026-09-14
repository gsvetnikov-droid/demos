## The problem

Managing LinkedIn outreach by hand means losing track of who was messaged when, which connection requests are still pending, and what to say next. Most tools that promise to fix this do it by automating posts and messages directly, which puts the account they're supposed to help at risk.

## What it is

A personal productivity tool for planning LinkedIn content and tracking outreach, built around one hard boundary: it never posts or messages on LinkedIn itself.

- **Content planning** — draft, schedule, and queue posts for manual publishing.
- **Outreach tracking** — connection requests, follow-ups, and conversation status, logged and visible in one place instead of scattered across LinkedIn's own inbox and memory.
- **No LinkedIn API write access anywhere in the codebase** — the tool has no technical capability to publish or send on someone's behalf.

## Architecture

Next.js 15 and TypeScript on Neon Postgres via Prisma, deployed to Vercel. The same class of issue that came up on the hiring-signal tool showed up here too: Prisma's client needed the right configuration to run inside Next.js Edge functions against a serverless Postgres connection. An earlier build attempt on Netlify also ran into a routing conflict — its form-detection step clashed with the app's own routes — which is part of why the deploy moved to Vercel.

## A few decisions worth calling out

**The no-auto-post boundary is architectural.** LinkedIn's terms of service prohibit automated posting and messaging, and enforcement can mean account restriction with no appeal. The tool has no code path with write access to LinkedIn's API at all, so there's nothing to accidentally enable later under pressure to "just automate it."

**Built alongside a broader content plan, not as a standalone tool.** The build supports a specific content strategy aimed at senior salespeople who haven't adopted AI tools yet, produced with AI-avatar video and paired with a companion proof-point build — a mortgage workflow tool on Cloudflare Workers demonstrating that a non-programmer can ship working software with AI assistance.

## Result

A live tracking layer for LinkedIn content and outreach that respects the platform's own rules by construction — every post and every message still goes out by a human's own hand, on their own schedule.
