import "@/lib/env";
import { withAuth } from "next-auth/middleware";

// Protects every /admin/* page except the login page itself (allowed
// through explicitly in `authorized`, since it has to be reachable without
// a session). API routes under /api/platforms do their own session check
// (see route.ts) rather than relying on this middleware.
export default withAuth(
  function middleware() {},
  {
    pages: { signIn: "/admin/login" },
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/admin/login") return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
