// Site-wide copy (name, tagline, hero, About, Contact, contact email) now
// lives in the database — see the SiteContent model in prisma/schema.prisma,
// the src/lib/getSiteContent.ts helper, and /admin/site for editing it.
// This file is kept only so old imports fail loudly instead of silently
// pointing at stale hardcoded text.
export {};
