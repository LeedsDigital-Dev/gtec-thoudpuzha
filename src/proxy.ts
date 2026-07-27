import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";
import { fetchRoleFromApi } from "@/lib/role-fallback";
export { fetchRoleFromApi };

const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (_auth, req: NextRequest) => {
  const intlResponse = intlMiddleware(req);
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }
  // Resource-based auth is handled in layouts and pages.
  // No route-pattern gating here.
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
