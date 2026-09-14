## The problem

A course landing page for AI training aimed at B2B operators — sales teams, GTM operators, BPO leaders, enablement functions — had no outbound engine feeding it, no CRM connected to the leads it did get, and no automated way to tell whether a click from a cold email actually turned into a signup. Traffic without a way to route, tag, and follow up on it doesn't compound into a pipeline.

## What it is

Turned a single course page into a 44-page marketing site and a full outbound and GTM stack:

- **Marketing site** — homepage, 6 course pages, an enterprise inquiry page, a free module page, a careers page (7 open roles), an apply page, a 13-article insights hub with 6 category pages, 5 glossary pages, and full legal pages, all carrying Organization, EducationalOrganization, WebSite, Course, and FAQPage schema markup plus a 44-URL sitemap.
- **Outbound infrastructure** — 5 campaigns across 5 sending domains and 15 mailboxes, SPF/DKIM/DMARC clean with zero blacklist hits across all 5 domains on MXToolbox, running a 3-email plain-text sequence per campaign written in an operator-memo tone rather than SDR copy. One email in three of the campaigns carries no call to action at all, just a plain sign-off.
- **Tracked shortlinks** — `/c1`–`/c5`, `/m1-c1`–`/m1-c5`, and `/indeed` all 302-redirect with full UTM parameters attached, so every link in an email stays clean while the click is still fully attributable.
- **Two Netlify Functions** — one normalizes Smartlead's inconsistently cased webhook event names before forwarding them to Make.com; the other posts site form submissions straight to HubSpot.
- **A 6-branch Make.com router** — turns each Smartlead event (reply, bounce, unsubscribe, click, open, sent) into the matching HubSpot contact property update, plus a second scenario that turns an enterprise inquiry into a HubSpot contact, a structured note, and an email notification.
- **8 custom HubSpot contact properties** — tracking send status, engagement level, campaign, mailbox, and lead origin per contact, so pipeline reporting doesn't require cross-referencing three tools by hand.
- **Two smoke-test pages** deployed on the live site — one fires every Smartlead event type at the webhook proxy with a live response log, the other fires real-shaped submissions at the enterprise form — so the whole pipeline can be checked end to end without waiting on a real lead.

## Architecture

A static HTML/CSS site (Inter and JetBrains Mono, dark background with a cyan accent) hosted on Netlify with Cloudflare in front, deployed by drag-and-drop with no git repository behind it — the fastest deploy cycle available for a solo operator making frequent copy changes. The event pipeline runs Smartlead → a Netlify Function proxy → Make.com → HubSpot, with the proxy doing one specific job: lowercasing and normalizing Smartlead's event names, since Make.com's filters can't match on mixed case, before forwarding to a single stable webhook URL.

## A few decisions worth calling out

**A proxy function sits between Smartlead and Make.com.** Smartlead's webhook event names arrive inconsistently cased. Pointing Smartlead straight at Make.com would have meant maintaining a filter variant for every casing quirk; the proxy fixes that once, in one place.

**Plain text, no HTML email.** Deliverability and tone point the same direction here — an operator memo reads as a message from a real person, while an HTML template with tracking pixels reads as a campaign, which is exactly what a spam filter is watching for.

**No resume field on the apply form.** The brand position is that a paragraph explaining how someone thinks says more than a document listing what they've done, so the form only asks for the paragraph.

## Result

A single-operator marketing site and outbound system running 5 live campaigns across 15 mailboxes, with every reply, click, and bounce landing in HubSpot as a scoped, reportable contact property.
