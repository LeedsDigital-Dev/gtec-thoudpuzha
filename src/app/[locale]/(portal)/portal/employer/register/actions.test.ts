import { describe, expect, test, vi, beforeEach } from "vitest";
import { submitEmployerRegistration } from "./actions";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockClerkClient = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockCreate = vi.hoisted(() => vi.fn());
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
    employerProfile: {
      findUnique: mockFindUnique,
      create: mockCreate,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

// ─── Helpers ────────────────────────────────────────────────────────────────

function validFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.set("companyName", overrides.companyName ?? "Acme Corp");
  fd.set("industrySector", overrides.industrySector ?? "IT_SOFTWARE");
  fd.set("contactPersonName", overrides.contactPersonName ?? "Jane Doe");
  fd.set("designation", overrides.designation ?? "HR Manager");
  fd.set("phone", overrides.phone ?? "9876543210");
  fd.set("email", overrides.email ?? "jane@acme.com");
  fd.set("companyAddress", overrides.companyAddress ?? "123 Main St");
  fd.set("hasWebsite", overrides.hasWebsite ?? "no");
  fd.set("employeeCountRange", overrides.employeeCountRange ?? "RANGE_11_50");
  fd.set("aboutCompany", overrides.aboutCompany ?? "A software company.");
  if (overrides.websiteUrl !== undefined) {
    fd.set("websiteUrl", overrides.websiteUrl);
  }
  return fd;
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("submitEmployerRegistration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindUnique.mockReset();
    mockCreate.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    mockAuth.mockResolvedValue({
      userId: "user_employer_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue(null);
  });

  test("1. Submitting with 'No website' selected succeeds without a URL", async () => {
    mockCreate.mockResolvedValue({ id: "ep_1" });

    const fd = validFormData({ hasWebsite: "no" });

    await expect(submitEmployerRegistration(fd)).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );

    expect(mockCreate).toHaveBeenCalledTimes(1);
    const callArgs = mockCreate.mock.calls[0][0] as { data: Record<string, unknown> };
    expect(callArgs.data.userId).toBe("user_employer_1");
    expect(callArgs.data.companyName).toBe("Acme Corp");
    expect(callArgs.data.hasWebsite).toBe(false);
    expect(callArgs.data.websiteUrl).toBeNull();
  });

  test("2. Submitting with 'Add link' but no URL provided is rejected server-side", async () => {
    const fd = validFormData({
      hasWebsite: "yes",
      websiteUrl: "",
    });

    const result = await submitEmployerRegistration(fd);

    expect(result?.success).toBe(false);
    expect(result?.error).toContain("website URL");
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("3. A newly registered employer has status=PENDING and autoPublishTrusted=false by default", async () => {
    mockCreate.mockResolvedValue({ id: "ep_1" });

    const fd = validFormData();

    await expect(submitEmployerRegistration(fd)).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );

    // Verify the create call includes defaults from Prisma
    expect(mockCreate).toHaveBeenCalledTimes(1);
    const callArgs = mockCreate.mock.calls[0][0] as { data: Record<string, unknown> };
    expect(callArgs.data.status).toBe("PENDING");
    expect(callArgs.data.autoPublishTrusted).toBe(false);
  });

  test("5. An employer who already has an EmployerProfile cannot submit the registration form again", async () => {
    mockFindUnique.mockResolvedValue({
      id: "ep_1",
      userId: "user_employer_1",
      status: "PENDING",
    });

    const fd = validFormData();

    await expect(submitEmployerRegistration(fd)).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );

    expect(mockCreate).not.toHaveBeenCalled();
  });
});
