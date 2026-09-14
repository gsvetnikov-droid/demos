// next-auth v4's internal parseUrl() does `new URL(process.env.NEXTAUTH_URL ?? default)`.
// `??` only catches null/undefined — an env var that's *set but empty* (e.g. a
// blank value typed into Vercel's dashboard) sails through as "" and crashes
// with "TypeError: Invalid URL". Normalize it here, imported for its side
// effect before any next-auth code runs (see auth.ts and middleware.ts).
if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_URL.trim()) {
  if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else {
    delete process.env.NEXTAUTH_URL;
  }
}

export {};
