import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockGetUser = vi.hoisted(() => vi.fn());
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
      // no-op — tests test handleRouteProtection / requireRole directly
    },
);
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockStaffPermissionFindUnique = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  clerkClient: () => Promise.resolve({ users: { getUser: mockGetUser } }),
  createRouteMatcher: mockCreateRouteMatcher,
  clerkMiddleware: mockClerkMiddleware,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    user: { findUnique: mockUserFindUnique },
    staffPermission: { findUnique: mockStaffPermissionFindUnique },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("requireRole — stale-JWT-claim fallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. reproduction: empty sessionClaims, Backend API has role → authorized:true", async () => {
    // The exact bug scenario: JWT hasn't been re-minted yet, so
    // sessionClaims.metadata.role is absent, but the Clerk Backend API
    // (publicMetadata.role) has the correct role.
    mockAuth.mockResolvedValue({
      userId: "user_stale_jwt",
      sessionClaims: {}, // no metadata.role — stale JWT
    });
    mockGetUser.mockResolvedValue({
      publicMetadata: { role: "CENTRE_STAFF" },
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });

    const { requireRole, Role } = await import("@/lib/auth");
    const result = await requireRole([Role.CENTRE_STAFF, Role.SUPER_ADMIN]);

    expect(result).toEqual({
      authorized: true,
      role: "CENTRE_STAFF",
      userId: "user_stale_jwt",
    });
    // Confirm the fallback was actually triggered
    expect(mockGetUser).toHaveBeenCalledWith("user_stale_jwt");
  });

  test("2. empty sessionClaims and no role in Backend API → no_role", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_no_role",
      sessionClaims: {},
    });
    // API also returns no role — user genuinely has no role
    mockGetUser.mockResolvedValue({
      publicMetadata: {},
    });

    const { requireRole, Role } = await import("@/lib/auth");
    const result = await requireRole([Role.CENTRE_STAFF]);

    expect(result).toEqual({
      authorized: false,
      reason: "no_role",
    });
  });

  test("3. sessionClaims has role → fast path, Backend API NOT called", async () => {
    // This is the common case — JWT claims are fresh, no fallback needed
    mockAuth.mockResolvedValue({
      userId: "user_fresh",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });

    const { requireRole, Role } = await import("@/lib/auth");
    const result = await requireRole([Role.STUDENT]);

    expect(result).toEqual({
      authorized: true,
      role: "STUDENT",
      userId: "user_fresh",
    });
    // Fast path — Clerk Backend API was never called
    expect(mockGetUser).not.toHaveBeenCalled();
  });
});

describe("fetchRoleFromApi — same function is shared", () => {
  test("middleware's re-export IS the same function from role-fallback", async () => {
    // This is the regression guard: if someone later copies the fallback
    // logic into middleware.ts instead of importing the shared function,
    // this test fails — preventing the two implementations from drifting apart.
    const { fetchRoleFromApi: middlewareReExport } = await import(
      "@/middleware"
    );
    const { fetchRoleFromApi: sharedFn } = await import(
      "@/lib/role-fallback"
    );

    expect(middlewareReExport).toBe(sharedFn);
  });
});
