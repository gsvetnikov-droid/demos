import "@/lib/env";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Single-admin auth — this is a one-person editing tool (you), not a
// multi-user app, so there's no User table: just a username and a bcrypt
// hash in env vars (ADMIN_USERNAME / ADMIN_PASSWORD_HASH — generate the
// hash with `npm run hash-password`). Swap this for a real user table if
// this ever grows past one editor.
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!expectedUsername || !expectedHash) return null;

        if (credentials.username.toLowerCase() !== expectedUsername.toLowerCase()) return null;
        const valid = await bcrypt.compare(credentials.password, expectedHash);
        if (!valid) return null;

        return { id: "admin", username: expectedUsername, name: expectedUsername } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.username = (user as any).username;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).username = token.username;
      return session;
    },
  },
};
