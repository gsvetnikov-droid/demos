## Executive overview

Discovery Call Prep was built to make preparation more consistent across sales conversations.

The user supplies prospect information and receives a package containing a fit score, supporting rationale, business context, and targeted discovery questions. Each question can include its purpose and a suggested follow-up.

The output is designed to support a better conversation — not replace one. It helps the salesperson enter the call with organized hypotheses and a clearer understanding of what needs to be validated.

## Operational problem

Preparation quality often depends on the time available and the habits of the individual salesperson. Notes may be superficial, questions repetitive, and assumptions difficult to distinguish from established facts.

This tool standardizes the structure of preparation while leaving the salesperson responsible for judgment and validation.

## Delivered solution

The documented output includes:

- A 1–100 fit score with written rationale.
- Company and industry context.
- Ten to twelve categorized discovery questions.
- Suggested follow-up questions.
- A uniquely named PDF generated in the browser.

The application also uses browser storage to retain information between sessions.

## Architecture and implementation

The export identifies Next.js 15, TypeScript, Tailwind CSS, Groq with Llama 3.3 70B, jsPDF, and localStorage.

PDF generation is client-side. AI generation depends on an external API, so the application should not be described as entirely offline or as keeping all processing on the device.

Local execution also does not eliminate security considerations — API credentials and submitted prospect information still require appropriate handling.

## Performance and boundaries

The export reports generation in under 30 seconds and a free-tier configuration. These are historical build results, not guaranteed service levels or permanent pricing commitments.

Without verified retrieval or source citations, generated company context should be presented as material to validate — not independently verified research.

## What this demonstrates

A focused application that combines AI generation, structured sales methodology, local persistence, and browser-based document export.
