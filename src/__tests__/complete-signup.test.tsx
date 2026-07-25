import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());
const mockClerkClient = vi.hoisted(() => vi.fn());
const mockGetUser = vi.hoisted(() => vi.fn());
const mockUpdateUserMetadata = vi.hoisted(() => vi.fn());
const mockUserUpsert = vi.hoisted(() => vi.fn());
const mockCandidateProfileFindUnique = vi.hoisted(() => vi.fn());
const mockCandidateProfileCreate = vi.hoisted(() => vi.fn());
const mockStaffPermissionFindUnique = vi.hoisted(() => vi.fn());
const mockStaffPermissionCreate = vi.hoisted(() => vi.fn());

const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  clerkClient: mockClerkClient,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    user: {
      upsert: mockUserUpsert,
    },
    candidateProfile: {
      findUnique: mockCandidateProfileFindUnique,
      create: mockCandidateProfileCreate,
    },
    staffPermission: {
      findUnique: mockStaffPermissionFindUnique,
      create: mockStaffPermissionCreate,
    },
  },
}));

vi.mock("next/navigation", () => ({ redirect: mockRedirect }));

describe("CompleteSignupPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockClerkClient.mockResolvedValue({
      users: {
        getUser: mockGetUser,
        updateUserMetadata: mockUpdateUserMetadata,
      },
    });
    mockGetUser.mockResolvedValue({ publicMetadata: {} });
    mockUserUpsert.mockResolvedValue({});
  });

  test("1. STAFF-invited user gets Prisma rows created and is redirected to /admin", async () => {
    mockAuth.mockResolvedValue({
      userId: "invited_staff",
      sessionClaims: {},
    });
    mockGetUser.mockResolvedValue({
      publicMetadata: { role: "CENTRE_STAFF" },
    });
    mockStaffPermissionFindUnique.mockResolvedValue(null);

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({}),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/en/admin");

    expect(mockUserUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "invited_staff" },
        create: expect.objectContaining({ role: "CENTRE_STAFF" }),
      }),
    );
    expect(mockStaffPermissionCreate).toHaveBeenCalledWith({
      data: { userId: "invited_staff" },
    });
  });

  test("2. STAFF-invited user with existing StaffPermission row does not duplicate it", async () => {
    mockAuth.mockResolvedValue({
      userId: "invited_staff",
      sessionClaims: {},
    });
    mockGetUser.mockResolvedValue({
      publicMetadata: { role: "CENTRE_STAFF" },
    });
    mockStaffPermissionFindUnique.mockResolvedValue({ id: "perm_1", userId: "invited_staff" });

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({}),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/en/admin");

    expect(mockStaffPermissionCreate).not.toHaveBeenCalled();
  });

  test("3. job_seeker intent still works — creates profile and redirects to biodata", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: {},
    });
    mockGetUser.mockResolvedValue({ publicMetadata: {} });
    mockCandidateProfileFindUnique.mockResolvedValue(null);

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({ intent: "job_seeker" }),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/en/portal/student/biodata");

    expect(mockUpdateUserMetadata).toHaveBeenCalledWith("js_1", {
      publicMetadata: { role: "JOB_SEEKER" },
    });
    expect(mockUserUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({ role: "JOB_SEEKER" }),
      }),
    );
    expect(mockCandidateProfileCreate).toHaveBeenCalledWith({
      data: { userId: "js_1", isVerifiedStudent: false },
    });
  });

  test("4. employer intent still works — redirects to employer register", async () => {
    mockAuth.mockResolvedValue({
      userId: "emp_1",
      sessionClaims: {},
    });
    mockGetUser.mockResolvedValue({ publicMetadata: {} });

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({ intent: "employer" }),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/en/portal/employer/register");

    expect(mockUpdateUserMetadata).toHaveBeenCalledWith("emp_1", {
      publicMetadata: { role: "EMPLOYER" },
    });
  });

  test("5. No intent and no invited role redirects to homepage", async () => {
    mockAuth.mockResolvedValue({
      userId: "unknown_user",
      sessionClaims: {},
    });
    mockGetUser.mockResolvedValue({ publicMetadata: {} });

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({}),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/en");

    expect(mockUserUpsert).not.toHaveBeenCalled();
  });

  test("6. Unauthenticated user is redirected to /sign-in", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const { default: CompleteSignupPage } = await import(
      "@/app/[locale]/complete-signup/page"
    );

    await expect(
      CompleteSignupPage({
        searchParams: Promise.resolve({}),
        params: Promise.resolve({ locale: "en" }),
      }),
    ).rejects.toThrow("redirect:/sign-in");
  });
});
