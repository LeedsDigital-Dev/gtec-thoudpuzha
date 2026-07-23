import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockStaffPermissionFindUnique = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    employerProfile: {
      findMany: mockFindMany,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
    staffPermission: {
      findUnique: mockStaffPermissionFindUnique,
    },
  },
}));

const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("EmployersPage permission gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindMany.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
    mockStaffPermissionFindUnique.mockResolvedValue(null);
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
  });

  test("Centre Staff can view /admin/employers (read-only access)", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    mockFindMany.mockResolvedValue([]);

    const { default: EmployersPage } = await import("./page");

    // Should not throw — Centre Staff is allowed to view
    const result = await EmployersPage({
      params: Promise.resolve({ locale: "en" }),
      searchParams: Promise.resolve({}),
    });

    // Should render something (React element)
    expect(result).toBeDefined();
    expect(mockFindMany).toHaveBeenCalledTimes(1);
  });

  test("EMPLOYER role is denied (redirects to forbidden)", async () => {
    mockAuth.mockResolvedValue({
      userId: "employer_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });

    const { default: EmployersPage } = await import("./page");

    await expect(
      EmployersPage({
        params: Promise.resolve({ locale: "en" }),
        searchParams: Promise.resolve({}),
      }),
    ).rejects.toThrow("redirect:/en/forbidden");
  });

  test("SUPER_ADMIN can view /admin/employers", async () => {
    mockAuth.mockResolvedValue({
      userId: "super_admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockFindMany.mockResolvedValue([
      {
        id: "ep_1",
        companyName: "Acme Corp",
        contactPersonName: "John Doe",
        phone: "9876543210",
        email: "john@acme.com",
        industrySector: "IT_SOFTWARE",
        status: "PENDING",
        autoPublishTrusted: false,
        rejectionReason: null,
      },
    ]);

    const { default: EmployersPage } = await import("./page");

    const result = await EmployersPage({
      params: Promise.resolve({ locale: "en" }),
      searchParams: Promise.resolve({}),
    });

    expect(result).toBeDefined();
    expect(mockFindMany).toHaveBeenCalledTimes(1);
  });
});
