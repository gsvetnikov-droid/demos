## The problem

Finding outsourcing prospects the manual way means scanning job boards by eye, guessing whether a hiring pattern actually signals outsourcing intent, and logging whatever gets remembered into a spreadsheet. There's no scoring, no pipeline, and no way to tell at a glance which of fifty flagged companies this week are actually worth a call — by the time a rep works through the list, the hiring signal that made a company worth calling is already a week old.

## What it is

A lead-sourcing platform that turns live hiring activity into a scored, prioritized outreach list, run as one loop: **find** the hiring signals that matter, **understand** why a company is a fit and why now, **contact** the right person with the right angle, **engage** with a message that lands, **close** the conversation into a partnership.

The intelligence layer scores every company it tracks across six dimensions: hiring volume and velocity, role mix and seniority depth, work model and coverage needs, bilingual and specialized role demand, repost and growth patterns, and overall fit for outsourced support. Each company comes out the other side with an opportunity score from 0–100, a priority tier (High / Good Fit / Review), a recommended next step, a plain-language "why now" rationale, and its open role count and locations.

The dashboard runs as a live sourcing queue rather than a static report: companies tracked, new companies found this week, follow-ups due, and a ranked top-20 list of the best opportunities currently open, so a rep opens the tool already knowing where to start the day.

## Architecture

**Stack:** Next.js on Neon Postgres, deployed to Vercel. Job data comes in from a set of free public APIs — Remotive, Arbeitnow, RemoteOK, and Jobicy — supplemented by direct reads against Greenhouse, Lever, and Ashby, the three ATS platforms that make up most of the postings actually worth scoring. A signal-aware outreach generator sits on top of the scoring layer, and a full sales pipeline tracker carries a scored company from first flag through to a closed conversation.

## A few decisions worth calling out

**Free data sources instead of a paid job-data API.** Remotive, Arbeitnow, RemoteOK, and Jobicy each expose enough listing data on their own free tiers to build a usable signal feed, and reading ATS platforms directly covers the postings those aggregators miss. Together they replace what would otherwise be a recurring data-vendor bill.

**Scoring six dimensions instead of one.** A single "is this company hiring a lot" signal produces false positives constantly — ordinary headcount growth looks identical to outsourcing intent on that axis alone. Scoring role mix, seniority depth, work model, and repost patterns alongside raw volume is what turns a noisy hiring feed into a short list actually worth calling.

**A ranked top-20, not a raw feed.** Two hundred and forty-eight tracked companies is not a list anyone works from directly. Surfacing five high-priority, ready-to-contact opportunities alongside the full count is what makes the tool usable in the first five minutes of a day, not just accurate in aggregate.

## Result

A live sourcing tool that replaces a manual job-board scan with a scored, ranked, pipeline-ready prospect list — turning hiring activity into prioritized outreach before the company knows it needs the call.
