import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isPortalRoute = createRouteMatcher([
  "/portal",
  "/portal/(.*)",
  "/:locale/portal",
  "/:locale/portal/(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin",
  "/admin/(.*)",
  "/:locale/admin",
  "/:locale/admin/(.*)",
]);

function getRequestLocale(req: NextRequest): "en" | "ml" {
  const firstSegment = req.nextUrl.pathname.split("/")[1];
  return firstSegment === "ml" ? "ml" : "en";
}

export function handleRouteProtection(
  req: NextRequest,
  userId: string | null,
  role: string | undefined,
): NextResponse | null {
  const locale = getRequestLocale(req);

  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL(`/${locale}/sign-in`, req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (!role) {
      return NextResponse.redirect(
        new URL(`/${locale}/account-setup-incomplete`, req.url),
      );
    }
    if (role !== "CENTRE_STAFF" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL(`/${locale}/forbidden`, req.url));
    }
    return null;
  }

  if (isPortalRoute(req)) {
    if (!userId) {
      const signInUrl = new URL(`/${locale}/sign-in`, req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (!role) {
      return NextResponse.redirect(
        new URL(`/${locale}/account-setup-incomplete`, req.url),
      );
    }
  }

  return null;
}

export default clerkMiddleware(async (auth, req) => {
  const intlResponse = intlMiddleware(req);
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  const session = await auth();
  const userId = session.userId ?? null;
  const role = session.sessionClaims?.metadata?.role as string | undefined;

  const result = handleRouteProtection(req, userId, role);
  if (result) return result;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
