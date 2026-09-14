# Showcase

A gallery of platforms you've built, each with a full written case study
("whitepaper"). Public gallery + whitepaper pages, plus a single-admin
backend to add/edit/publish platforms — no code changes needed to add the
next one.

## Stack

- **Next.js 14** (App Router, TypeScript) — one app for UI + API routes.
- **Prisma + Postgres** — same free-tier Neon pattern as the CRM project.
- **NextAuth.js** — single-admin credentials auth (you), no user table.
- **Tailwind CSS** (+ `@tailwindcss/typography` for the whitepaper prose).
- **react-markdown** — renders each platform's whitepaper.

## Local setup

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL / DIRECT_URL (any Postgres works for local dev)
# generate NEXTAUTH_SECRET: openssl rand -base64 32
# generate ADMIN_PASSWORD_HASH: npm run hash-password -- 'your-password'
npm run db:push      # creates the schema (no migrations folder yet — see below)
npm run db:seed      # seeds the CRM platform as a DRAFT
npm run dev
```

Log in at `/admin/login` with `ADMIN_USERNAME` / whatever password you
hashed. The seeded CRM platform starts as a **draft** — review the
whitepaper text, fill in its live URL once the demo CRM deployment exists,
then flip it to Published from `/admin`.

## Adding another platform

From `/admin` → **New platform**. Fill in the name, tagline, summary, tags,
tech stack, links, and the whitepaper itself (Markdown, with a live
preview toggle in the form). Nothing here requires a code change or
redeploy — that's the whole point of the admin layer.

## Deploying

1. Create a new Vercel project pointed at wherever you push this repo.
2. Create a Postgres database (Neon's free tier works fine) and set
   `DATABASE_URL` / `DIRECT_URL`.
3. Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_USERNAME`, and
   `ADMIN_PASSWORD_HASH` (see `.env.example`).
4. Deploy. `vercel-build` runs `prisma migrate deploy` automatically — but
   since this repo doesn't have a `prisma/migrations` folder yet (it was
   built with `db push` during development), run `npx prisma migrate dev
   --name init` once locally against a real database before your first
   deploy, commit the generated `prisma/migrations/` folder, then deploy.
   (Or keep using `prisma db push` against production directly if you'd
   rather skip migrations entirely for a single-editor site like this —
   just don't mix the two approaches on the same database.)
5. Run `npm run db:seed` once (locally, pointed at the production
   `DATABASE_URL`) to seed the first platform.

## Notes

- Images: `coverImageUrl` on a platform just needs to be a reachable HTTPS
  URL (Vercel Blob, S3, GitHub raw, wherever) — there's no upload/storage
  built in yet. Leave it blank and the `iconEmoji` shows instead.
- This is intentionally a single-editor tool — no roles, no invite flow.
  If that ever changes, replace the env-var admin check in `src/lib/auth.ts`
  with a real `User` table (the CRM project's `src/lib/auth.ts` is a
  reasonable model to copy from).
