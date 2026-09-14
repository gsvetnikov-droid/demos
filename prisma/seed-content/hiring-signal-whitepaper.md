## The problem

A business development function at a BPO services company found new outsourcing prospects by watching job boards by hand — a rep scanning postings, guessing whether a hiring pattern signaled outsourcing potential, and logging whatever they remembered to in a spreadsheet. No scoring, no pipeline, no way to tell at a glance which of fifty flagged companies that week were actually worth a call.

## What it is

A single-user sourcing tool that replaces the manual scan with an automated intelligence layer:

- **Signal detection** — ingests job posting data and flags hiring patterns that indicate outsourcing opportunity: a sudden spike in a support or ops function, roles shaped like a vendor backfill, and similar patterns a rep would otherwise have to notice by eye.
- **Fit scoring** — scores each flagged company against BPO-services fit criteria, so the output is a ranked list, not a raw feed.
- **Prospect pipeline** — carries scored companies into a pipeline with stage, status, and follow-up tracking, so a flagged company gets worked instead of sitting unread.

The tool has no auth system, no user roles, and no multi-tenant data model. It's built for exactly one person's daily sourcing routine, and every part of the build reflects that.

## Architecture

**Stack:** Next.js 15, Neon Postgres (serverless) via Prisma, deployed to Vercel. Make.com handles ingestion into the pipeline; the Claude API does the actual signal classification and scoring.

Two build problems came up on this stack. Prisma's client needed a specific adapter configuration to run correctly inside Next.js Edge functions against Neon's connection model, which behaves differently from a persistent server connection. Separately, a Next.js 15 version bump changed how middleware matchers resolve, which broke route protection until the middleware config was reworked.

## A few decisions worth calling out

**Single-user by design.** Multi-tenant auth, roles, and team-scoped visibility are real engineering work with no payoff for a tool one person uses every morning. Skipping all of it kept the build focused on what actually mattered: signal quality and pipeline speed.

**Claude API for scoring, not a keyword engine.** Deciding whether a hiring pattern actually indicates outsourcing intent — versus ordinary headcount growth — is closer to judgment than a rule can capture. The scoring step calls the Claude API on each posting rather than trying to hand-write every rule that would matter.

## Result

A live, solo-maintained tool covering the full loop from raw job posting to a scored, pipeline-ready prospect, with no manual spreadsheet step anywhere in between.
