import { renderToString } from "react-dom/server";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { PortalRoleGate } from "@/components/shared/PortalRoleGate";
import { Role } from "@/lib/auth";

const mockAuth = vi.hoisted(() => vi.fn());

const mockCreateRouteMatcher = vi.hoisted(
  () => (patterns: string[]) => (req: { url: string }) => {
    const pathname = new URL(req.url).pathname;
    return patterns.some((pattern) => {
      const segments = pattern.split("/").filter(Boolean);
      const regexSegments = segments.map((segment) => {
        if (segment === ":locale") return "(?:en|ml)";
        if (segment === "(.*)") return ".*";
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      });
      return new RegExp(`^/${regexSegments.join("/")}$`).test(pathname);
    });
  },
);

const mockClerkMiddleware = vi.hoisted(
  () =>
    (
      _handler: (
        auth: unknown,
        req: Request,
      ) => Promise<Response | undefined>,
    ) => {
      // no-op — tests test handleRouteProtection directly
    },
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  createRouteMatcher: mockCreateRouteMatcher,
  clerkMiddleware: mockClerkMiddleware,
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

function withAuth(role: Role | undefined, userId = "user_1") {
  mockAuth.mockResolvedValue({
    userId,
    sessionClaims: role
      ? { metadata: { role } }
      : {},
  });
}

describe("PortalRoleGate — fine-grained role gating", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. job_seeker is denied /portal/student/resources with friendly message", async () => {
    withAuth(Role.JOB_SEEKER);
    const element = await PortalRoleGate({
      allowedRoles: [Role.STUDENT],
      children: <div>Academic Resources Content</div>,
    });
    const html = renderToString(element);
    expect(html).toContain("&#x27;t for your account type");
    expect(html).toContain("Student");
    expect(html).not.toContain("Academic Resources Content");
    expect(html).not.toContain("403");
  });

  test("2. student succeeds at /portal/student/resources", async () => {
    withAuth(Role.STUDENT);
    const element = await PortalRoleGate({
      allowedRoles: [Role.STUDENT],
      children: <div>Academic Resources Content</div>,
    });
    const html = renderToString(element);
    expect(html).toContain("Academic Resources Content");
    expect(html).not.toContain("&#x27;t for your account type");
  });

  test("3. both student and job_seeker succeed at /portal/student/biodata", async () => {
    for (const role of [Role.STUDENT, Role.JOB_SEEKER]) {
      withAuth(role);
      const element = await PortalRoleGate({
        allowedRoles: [Role.STUDENT, Role.JOB_SEEKER],
        children: <div>Biodata Content</div>,
      });
      const html = renderToString(element);
      expect(html).toContain("Biodata Content");
      expect(html).not.toContain("not for your account type");
    }
  });

  test("4. student is denied /portal/employer/* with friendly message", async () => {
    withAuth(Role.STUDENT);
    const element = await PortalRoleGate({
      allowedRoles: [Role.EMPLOYER],
      children: <div>Employer Content</div>,
    });
    const html = renderToString(element);
    expect(html).toContain("&#x27;t for your account type");
    expect(html).toContain("Employer");
    expect(html).not.toContain("Employer Content");
    expect(html).not.toContain("403");
  });

  test("5. employer succeeds at /portal/employer/*", async () => {
    withAuth(Role.EMPLOYER);
    const element = await PortalRoleGate({
      allowedRoles: [Role.EMPLOYER],
      children: <div>Employer Content</div>,
    });
    const html = renderToString(element);
    expect(html).toContain("Employer Content");
    expect(html).not.toContain("not for your account type");
  });

  test("6. regression: unauthenticated request to /en/admin still redirects (Sprint 0 protection)", async () => {
    const { handleRouteProtection } = await import("@/middleware");
    const { NextRequest } = await import("next/server");

    const req = new NextRequest(new URL("https://example.com/en/admin"));
    const result = handleRouteProtection(req, null, undefined);
    expect(result?.status).toBe(307);
    expect(result?.headers.get("Location")).toContain("/en/sign-in");

    // Staff still passes
    const staffResult = handleRouteProtection(req, "user_4", "CENTRE_STAFF");
    expect(staffResult).toBeNull();

    // Non-admin role still denied
    const deniedResult = handleRouteProtection(req, "user_student", "STUDENT");
    expect(deniedResult?.status).toBe(307);
    expect(deniedResult?.headers.get("Location")).toContain("/en/forbidden");
  });
});
