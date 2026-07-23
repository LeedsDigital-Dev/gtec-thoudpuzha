import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── hoisted mocks (before vi.mock) ────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockClerkClient = vi.hoisted(() => vi.fn());
const mockUpdateUser = vi.hoisted(() => vi.fn());
const mockUpsert = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockCreate = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  clerkClient: mockClerkClient,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    user: { upsert: mockUpsert },
    candidateProfile: { findUnique: mockFindUnique, create: mockCreate },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/link", () => ({
  default: vi.fn(
    ({ href, children }: { href: string; children: ReactNode }) =>
      `<a href="${href}">${Array.isArray(children) ? children[0]?.toString() ?? "" : children?.toString() ?? ""}</a>`,
  ),
}));

// Helper to render a Next.js page component given its module
async function renderPage(
  pageModule: Record<string, unknown>,
  searchParams: Record<string, string> = {},
) {
  const Component = pageModule.default as (
    props: Record<string, unknown>,
  ) => Promise<React.ReactElement>;
  const element = await Component({
    params: Promise.resolve({ locale: "en" }),
    searchParams: Promise.resolve(searchParams),
  });
  return renderToString(element);
}

// ─── Tests ─────────────────────────────────────────────────────────────────

describe("Complete Signup page — role assignment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockClerkClient.mockReturnValue(
      Promise.resolve({ users: { updateUser: mockUpdateUser } }),
    );
    mockAuth.mockResolvedValue({ userId: "user_test_1" });
    mockUpsert.mockResolvedValue({});
  });

  test("1. Job Seeker path sets publicMetadata.role = JOB_SEEKER and creates CandidateProfile with isVerifiedStudent: false", async () => {
    mockCreate.mockResolvedValue({ id: "cp_1", userId: "user_test_1", isVerifiedStudent: false });
    mockFindUnique.mockResolvedValue(null);

    const mod = await import(
      "@/app/[locale]/complete-signup/page"
    );

    try {
      await renderPage(mod, { intent: "job_seeker" });
    } catch {
      // redirect throws, that's expected
    }

    expect(mockUpdateUser).toHaveBeenCalledWith("user_test_1", {
      publicMetadata: { role: "JOB_SEEKER" },
    });
    expect(mockUpsert).toHaveBeenCalledWith({
      where: { id: "user_test_1" },
      update: { role: "JOB_SEEKER" },
      create: { id: "user_test_1", role: "JOB_SEEKER" },
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { userId: "user_test_1" },
    });
    expect(mockCreate).toHaveBeenCalledWith({
      data: { userId: "user_test_1", isVerifiedStudent: false },
    });
    expect(mockRedirect).toHaveBeenCalledWith("/portal/student/biodata");
  });

  test("2. Employer path sets publicMetadata.role = EMPLOYER", async () => {
    mockFindUnique.mockReset();
    mockCreate.mockReset();

    const mod = await import(
      "@/app/[locale]/complete-signup/page"
    );

    try {
      await renderPage(mod, { intent: "employer" });
    } catch {
      // redirect throws, that's expected
    }

    expect(mockUpdateUser).toHaveBeenCalledWith("user_test_1", {
      publicMetadata: { role: "EMPLOYER" },
    });
    // Should NOT attempt to create CandidateProfile for employer
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith("/portal/employer/register");
  });
});

describe("Sign-up picker page — redirect logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedirect.mockReset();
    mockAuth.mockReset();
  });

  test("3. Already-authenticated user with role=student visiting /portal/sign-up is redirected away from the picker", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_student_1",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const mod = await import(
      "@/app/[locale]/(portal)/portal/sign-up/page"
    );

    try {
      await renderPage(mod);
    } catch {
      // redirect throws, that's expected
    }

    expect(mockRedirect).toHaveBeenCalledWith("/portal");
  });

  test("4. Selecting the Student option routes to /portal/sign-up/student WITHOUT setting a role yet", async () => {
    // Unauthenticated — should render the picker with options
    mockAuth.mockResolvedValue({ userId: null });

    const mod = await import(
      "@/app/[locale]/(portal)/portal/sign-up/page"
    );

    const html = await renderPage(mod);

    // The student card should link to /portal/sign-up/student
    expect(html).toContain("href=&quot;/portal/sign-up/student&quot;");
    // The job seeker card should link to /sign-up?intent=job_seeker
    expect(html).toContain("href=&quot;/sign-up?intent=job_seeker&quot;");
    // The employer card should link to /sign-up?intent=employer
    expect(html).toContain("href=&quot;/sign-up?intent=employer&quot;");
    // Should reference key text content
    expect(html).toContain("Create Your Account");
    expect(html).toContain("Select the option");
  });
});
