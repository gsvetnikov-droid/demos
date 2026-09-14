## The problem

Proper discovery-call prep takes 30 to 60 minutes per prospect: reading up on the company, guessing at likely pain points, and drafting questions that don't just restate whatever's on the homepage. Most reps skip most of it most of the time, so call quality depends on who happened to prep and how much time they had that morning — not on a repeatable standard.

## What it is

An internal sales enablement tool that takes a single form submission — company name, a few basic details — and generates a full discovery-call package in under 30 seconds:

- **Fit score (1–100)** with a written rationale explaining why the prospect is or isn't a strong match, not just a bare number.
- **Company context** — industry trends, likely pain points, and talking points a rep can actually open a call with.
- **Discovery questions** — 10 to 12 questions grouped by category, each carrying a stated purpose and a suggested follow-up, so the rep isn't just reading off a script without knowing why a question matters.
- **PDF export** — generated client-side with a unique filename, no upload or server round-trip required.

## Architecture

**Stack:** Next.js 15, TypeScript, and Tailwind CSS, running entirely client-side apart from one API call. The AI step uses Groq's free tier serving Llama 3.3 70B — production-quality output with no subscription cost. PDF generation runs through jsPDF directly in the browser, so there's no server involved in producing the file at all. Session data is kept in localStorage, so a prep package persists on the device between sessions without a database or an auth system. The tool runs locally via `npm run dev`, since it's an internal tool with no need for hosting.

## A few decisions worth calling out

**Groq and Llama 3.3 70B over a paid model API.** The output only needs to be good enough to save a rep 30 minutes of research, not state-of-the-art — Groq's free tier clears that bar at zero ongoing cost, which matters for a tool with no budget line of its own.

**Client-side PDF generation, not a server render.** Running jsPDF in the browser means the tool works fully offline once the page has loaded and never has to hold a copy of the generated document anywhere but the user's own machine.

**Under 30 seconds was a hard requirement, not an aspiration.** If the tool is slower than opening a browser tab and Googling the company, nobody uses it. The whole design — a single form, one AI call, client-side rendering — is built around clearing that bar.

## Result

A zero-cost internal tool that replaces 30 to 60 minutes of inconsistent manual research with a standardized, ready-to-use discovery package in under 30 seconds.
