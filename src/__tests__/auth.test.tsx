import { describe, expect, test, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { renderToString } from "react-dom/server";
import { handleRouteProtection } from "@/middleware";
import AccountSetupIncompletePage from "@/app/account-setup-incomplete/page";
import ForbiddenPage from "@/app/forbidden/page";

const mockAuth = vi.hoisted(() => vi.fn());
const mockCreateRouteMatcher = vi.hoisted(
  () => (patterns: string[]) => {
    const regexes = patterns.map(
      (p) =>
        new RegExp(
          "^" + p.replace(/\//g, "\\/").replace(/\(\.\*\)/g, ".*") + "$",
        ),
    );
    return (req: { url: string }) => {
      const pathname = new URL(
        typeof req === "string" ? req : req.url,
      ).pathname;
      return regexes.some((r) => r.test(pathname));
    };
  },
);
const mockClerkMiddleware = vi.hoisted(
  () => (_handler: any) => {
    // no-op default export — tests test handleRouteProtection directly
  },
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  createRouteMatcher: mockCreateRouteMatcher,
  clerkMiddleware: mockClerkMiddleware,
}));

function makeRequest(path: string) {
  return new NextRequest(new URL(`https://example.com${path}`));
}

describe("handleRouteProtection — /admin", () => {
  test("1. unauthenticated request to /admin redirects to sign-in", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, null, undefined);
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/sign-in");
    expect(result?.headers.get("Location")).toContain("redirect_url=");
  });

  test("2. unauthenticated request to /portal redirects to sign-in", () => {
    const req = makeRequest("/portal");
    const result = handleRouteProtection(req, null, undefined);
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/sign-in");
  });

  test("3. student role is denied /admin — redirected to /forbidden", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_1", "STUDENT");
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/forbidden");
  });

  test("3b. job_seeker role is denied /admin — redirected to /forbidden", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_2", "JOB_SEEKER");
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/forbidden");
  });

  test("3c. employer role is denied /admin — redirected to /forbidden", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_3", "EMPLOYER");
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/forbidden");
  });

  test("4. centre_staff role passes /admin protection", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_4", "CENTRE_STAFF");
    expect(result).toBeNull();
  });

  test("5. super_admin role passes /admin protection", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_5", "SUPER_ADMIN");
    expect(result).toBeNull();
  });

  test("6. authenticated user with no role is redirected to account-setup-incomplete", () => {
    const req = makeRequest("/admin");
    const result = handleRouteProtection(req, "user_6", undefined);
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain(
      "/account-setup-incomplete",
    );
  });

  test("6b. authenticated user with no role on /portal also redirected to account-setup-incomplete", () => {
    const req = makeRequest("/portal");
    const result = handleRouteProtection(req, "user_7", undefined);
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain(
      "/account-setup-incomplete",
    );
  });
});

describe("handleRouteProtection — public routes pass through", () => {
  test("public route passes through regardless of auth state", () => {
    const req = makeRequest("/about");
    const result = handleRouteProtection(req, null, undefined);
    expect(result).toBeNull();
  });

  test("public route passes through for authenticated admin", () => {
    const req = makeRequest("/");
    const result = handleRouteProtection(req, "user_1", "SUPER_ADMIN");
    expect(result).toBeNull();
  });
});

describe("Account Setup Incomplete page", () => {
  test("renders the account setup incomplete message", () => {
    const html = renderToString(<AccountSetupIncompletePage />);
    expect(html).toContain("Account setup incomplete");
    expect(html).toContain("contact the centre");
  });
});

describe("Forbidden page", () => {
  test("renders the 403 forbidden message", () => {
    const html = renderToString(<ForbiddenPage />);
    expect(html).toContain("403");
    expect(html).toContain("Forbidden");
  });
});

describe("Dashboard pages display role-based welcome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("admin dashboard shows Welcome, CENTRE_STAFF", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const { default: AdminDashboardPage } = await import(
      "@/app/(admin)/admin/page"
    );
    const element = await AdminDashboardPage();
    const html = renderToString(element);
    expect(html).toMatch(/Welcome.*CENTRE_STAFF/);
  });

  test("admin dashboard shows Welcome, SUPER_ADMIN", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_2",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const { default: AdminDashboardPage } = await import(
      "@/app/(admin)/admin/page"
    );
    const element = await AdminDashboardPage();
    const html = renderToString(element);
    expect(html).toMatch(/Welcome.*SUPER_ADMIN/);
  });

  test("portal dashboard shows Welcome, STUDENT", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_3",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const { default: PortalDashboardPage } = await import(
      "@/app/(portal)/portal/page"
    );
    const element = await PortalDashboardPage();
    const html = renderToString(element);
    expect(html).toMatch(/Welcome.*STUDENT/);
  });

  test("portal dashboard shows Welcome, JOB_SEEKER", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_4",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { default: PortalDashboardPage } = await import(
      "@/app/(portal)/portal/page"
    );
    const element = await PortalDashboardPage();
    const html = renderToString(element);
    expect(html).toMatch(/Welcome.*JOB_SEEKER/);
  });
});
