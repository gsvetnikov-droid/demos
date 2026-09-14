## The problem

Enterprise recruiting teams run their day across a half-dozen disconnected tools: an ATS for the pipeline, a separate video tool for interviews, a CRM the recruiting team doesn't fully control, and no consistent way to apply structured, auditable judgment to interview evaluation. A white-label buyer also can't ship a recruiting tool that looks like someone else's product with a different logo on top.

## What it is

An enterprise SaaS prototype: six navigable screens — Dashboard, Candidate Profile, HR Pipeline, Interview Schedule, Tasks, Messages — each client-side routed with scroll-position memory and full undo/redo on keyboard shortcuts, plus:

- **In-app video meetings** — Zoom, Google Meet, and Microsoft Teams rooms open directly inside the platform, with a live timer, mute/camera controls, in-meeting chat, and a per-candidate meeting link.
- **Candidate-facing welcome screen** — personalized recruiter messages, interviewer photos, and per-tenant branding pulled from that client's own configuration.
- **CRM integration layer** — a bidirectional sync spanning 15 CRM systems, pushing and pulling data both ways rather than only exporting into the client's existing system.
- **Behavioral interview intelligence module** — scores communication across 6 categories, with a hardcoded ethics and compliance layer that no client can disable or override, and a full audit trail on every score.
- **Master roadmap file** (`platform_master_roadmap.html`) — a three-tab interactive document tracking 130+ build tasks across 16 phases, a 30+ vendor registry (all enterprise-contracted, not self-serve), and a 63-item go-to-market checklist, each tab with persistent checkbox state and progress bars stored in localStorage.
- **Self-running demo landing page** — 10 automated feature walkthroughs, built so the product can be evaluated without a live presenter in the room.

## Architecture

Fully white-labeled per tenant: no visible product branding anywhere in the UI, with each client configuring its own name, logo, and color scheme. The platform is multi-tenant by design — one deployment serving multiple client organizations — priced on enterprise SaaS subscription tiers.

The design system went through one full revision during the build. An initial palette (background #F1EFE9, dark sidebar, teal accent, Plus Jakarta Sans) gave way to the current Graphite background (#F2F2F0) with a Cobalt accent (#2A6FDB) on Geologica, after the teal read too close to a specific competitor's brand color.

## A few decisions worth calling out

**Video stays inside the platform.** Sending a recruiter out to a separate video tab breaks the workflow the moment an interview starts. Keeping the meeting, the notes, and the scoring in one screen was the point of building this module at all rather than linking out to Zoom.

**The ethics layer is compiled in, not a setting.** Behavioral scoring on a candidate is compliance-sensitive by nature. Making the guardrail a client-configurable toggle would turn a safety feature into a liability the moment one client decided to turn it off.

## Result

A fully click-through prototype and a 130+ task build roadmap ready to hand to an engineering team — the product decisions, the design system, and the compliance boundary are already made, so what's left is implementation, not discovery.
