## The problem

Most AI explanations optimize for sounding complete on the first pass: a single well-organized answer that reads well but leaves whoever asked no clearer on where their own understanding actually breaks down. Learning a genuinely hard topic requires finding the specific place someone's mental model is wrong and repairing it directly, not restating the subject from the top.

## What it is

A standing Claude project: a prompt architecture built around Richard Feynman's approach to learning — simplify, identify gaps, question assumptions, refine, apply, compress. Every session runs the same structured loop instead of a single freeform explanation:

1. Ask for the topic and current understanding level
2. Give a simple explanation with one clean analogy
3. Highlight common points of confusion
4. Ask 3–5 targeted questions designed to surface actual gaps, not test recall
5. Refine the explanation across 2–3 cycles, each one required to be clearer than the one before it
6. Test understanding by having the person apply the concept or teach it back
7. Compress the whole thing into a final teaching snapshot — the version they'd actually use to explain it to someone else

Standing constraints keep every session honest to the method: an analogy in every explanation, no jargon before it's defined in plain language, and a fixed rule that each refinement cycle has to be clearer than the last.

## A few decisions worth calling out

**Understanding over recall, enforced structurally.** The targeted-questions step exists to find what's still shaky, not to confirm what's already understood. A loop that only ever validated existing knowledge wouldn't do anything a plain Q&A session couldn't already do.

**A known conflict with a broader writing standard, left unresolved on purpose.** This project's constraints require an analogy in every explanation. A separate, global writing standard for the same user bans analogies by default across most other content. The two rules disagree, and rather than quietly picking one to win everywhere, the project's own instructions take precedence only inside this specific context — nowhere else.

## Result

A repeatable teaching method turned into a fixed set of operating instructions, so a complex topic — technical, financial, legal, or operational — gets the same structured breakdown every time, instead of depending on how the question happened to be phrased.
