## Executive overview

AI Edge Academy was developed for professionals responsible for sales, operations, workforce management, and enterprise enablement. Its purpose is to make operational AI accessible through practical learning resources and examples of working systems.

The project expanded a course landing page into a broader marketing and resource platform. The documented scope includes 44 pages, course content structures, an insights hub, enterprise enquiry forms, careers content, and supporting campaign infrastructure.

The build also connected outbound activity and website enquiries to CRM workflows. This made the project more than a website redesign: it combined content presentation, acquisition, event handling, and contact management.

## Operational problem

Educational content and commercial follow-up often sit in separate systems. A prospect may read an article, respond to an email, or submit an enquiry without that activity reaching the person responsible for the next step.

The project addressed that fragmentation by creating defined paths from campaign engagement and form submissions into contact records and notifications.

## Delivered solution

The website provides course pages, articles, glossary content, enterprise enquiries, and navigation across the resource collection. Campaign-specific links direct different audiences to relevant content rather than sending every visitor to the same landing page.

A server-side webhook proxy normalizes outbound event payloads before forwarding them to automation workflows. Documented events include replies, bounces, unsubscribes, clicks, opens, and sends.

Enterprise enquiries follow a separate workflow that creates or updates a contact, records the submitted information, and sends an internal notification.

## Architecture and implementation

The documented stack combines custom HTML/CSS, Netlify Functions, Make.com, HubSpot, and Smartlead. Temporary redirects support campaign links whose destinations may change.

Smoke-test pages were built to exercise event handling and enquiry submission paths. These provide a repeatable way to inspect workflow responses during maintenance.

## Boundaries and further work

The export lists newsletter synchronization, careers automation, and parts of the market-signals workflow as open items — they are not completed integrations.

Tracking architecture should be read as tracking architecture: open and click events indicate that a message was opened or a link was clicked, not confirmation of human intent. Deliverability checks recorded during the build (clean DNS, no blacklist hits) were a point-in-time result, not a permanent guarantee.

## What this demonstrates

Connected product thinking across education, marketing, automation, and operational follow-up.
