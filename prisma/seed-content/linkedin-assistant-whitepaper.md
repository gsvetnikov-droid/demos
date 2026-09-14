## Executive overview

LinkedIn Assistant was built to support consistent professional activity without turning publishing or outreach into an unattended process.

The application combines content planning with relationship tracking. Drafts, planned publishing dates, connection activity, and follow-ups can be organized in one place.

Its defining constraint is architectural: the tool has no LinkedIn API write capability. Publishing and sending remain manual actions.

## Operational problem

Content ideas and outreach notes often accumulate across documents, reminders, and messaging interfaces. That makes it easy to lose promising ideas, repeat outreach, or overlook a follow-up.

The application provides structure around those activities while preserving personal review and judgment.

## Delivered solution

The documented capabilities include drafting, queuing, and planning posts; tracking connection requests and conversations; and managing follow-ups.

Scheduling should be understood as planning within the workspace — not automatic publication.

The intended operating pattern is to prepare content, review it, publish manually, and maintain a record of the associated activity.

## Architecture and implementation

The documented stack uses Next.js 15, TypeScript, Neon PostgreSQL, Prisma, and Vercel.

Implementation work included resolving Prisma/runtime compatibility and middleware issues. The export also records an earlier hosting-related form-detection issue before moving to Vercel.

## Boundaries

The absence of automatic publishing is a product boundary, not a blanket guarantee of compliance with every platform rule.

This should not be described as supporting automated connection requests, unattended messaging, engagement automation, or direct LinkedIn publishing — none of those are capabilities of the tool.

Contact notes and outreach records are handled as potentially sensitive professional information.

## What this demonstrates

Designing a productivity tool with a deliberate boundary between assistance and external action.
