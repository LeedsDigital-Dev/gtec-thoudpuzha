import { renderToString } from "react-dom/server";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { describe, expect, test, vi, beforeEach } from "vitest";
import AccountSetupIncompletePage from "@/app/[locale]/account-setup-incomplete/page";
import ForbiddenPage from "@/app/[locale]/forbidden/page";

const mockAuth = vi.hoisted(() => vi.fn());
const mockEmployerProfileCount = vi.hoisted(() => vi.fn());
const mockJobPostingCount = vi.hoisted(() => vi.fn());
const mockSkillCount = vi.hoisted(() => vi.fn());
const mockEnquiryFindMany = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockStaffPermissionFindUnique = vi.hoisted(() => vi.fn());

const mockClerkMiddleware = vi.hoisted(
  () => (_handler: (req: NextRequest, evt: NextFetchEvent) => NextResponse | Promise<NextResponse>) => {},
);

vi.mock("@/lib/db", () => ({
  prisma: {
    employerProfile: { count: mockEmployerProfileCount },
    jobPosting: { count: mockJobPostingCount },
    skill: { count: mockSkillCount },
    enquiry: { findMany: mockEnquiryFindMany },
    user: { findUnique: mockUserFindUnique },
    staffPermission: { findUnique: mockStaffPermissionFindUnique },
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  clerkMiddleware: mockClerkMiddleware,
}));

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
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
    mockStaffPermissionFindUnique.mockResolvedValue({
      canApproveEmployers: true,
      canApproveJobPostings: true,
      canModerateSkillsTaxonomy: true,
    });
    mockEmployerProfileCount.mockResolvedValue(0);
    mockJobPostingCount.mockResolvedValue(0);
    mockSkillCount.mockResolvedValue(0);
    mockEnquiryFindMany.mockResolvedValue([]);
  });

  test("admin dashboard shows Welcome, Staff for CENTRE_STAFF", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const { default: AdminDashboardPage } = await import(
      "@/app/[locale]/(admin)/admin/page"
    );
    const element = await AdminDashboardPage({
      params: Promise.resolve({ locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("Welcome");
    expect(html).toContain("Staff");
  });

  test("admin dashboard shows Welcome, Super Admin for SUPER_ADMIN", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_2",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const { default: AdminDashboardPage } = await import(
      "@/app/[locale]/(admin)/admin/page"
    );
    const element = await AdminDashboardPage({
      params: Promise.resolve({ locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("Welcome");
    expect(html).toContain("Super Admin");
  });

  test("portal dashboard redirects STUDENT to /portal/student", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_3",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const { default: PortalDashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );
    await expect(
      PortalDashboardPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("NEXT_REDIRECT");
  });

  test("portal dashboard redirects JOB_SEEKER to /portal/job-seeker", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_4",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { default: PortalDashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );
    await expect(
      PortalDashboardPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("NEXT_REDIRECT");
  });
});
