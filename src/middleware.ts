import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPortalRoute = createRouteMatcher(["/portal", "/portal/(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin", "/admin/(.*)"]);

export function handleRouteProtection(
  req: NextRequest,
  userId: string | null,
  role: string | undefined,
): NextResponse | null {
  if (isAdminRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (!role) {
      return NextResponse.redirect(
        new URL("/account-setup-incomplete", req.url),
      );
    }
    if (role !== "CENTRE_STAFF" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    return null;
  }

  if (isPortalRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (!role) {
      return NextResponse.redirect(
        new URL("/account-setup-incomplete", req.url),
      );
    }
  }

  return null;
}

export default clerkMiddleware(async (auth, req) => {
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
