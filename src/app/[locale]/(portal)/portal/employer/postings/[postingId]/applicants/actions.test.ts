// @vitest-environment node
import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockUpdate = vi.hoisted(() => vi.fn());
const mockRevalidatePath = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

vi.mock("@/lib/db", () => ({
  prisma: {
    application: { findUnique: mockFindUnique, update: mockUpdate },
    employerProfile: { findUnique: vi.fn() },
  },
}));

vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));

import { updateApplicationStatus } from "./actions";

beforeEach(() => {
  vi.clearAllMocks();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("updateApplicationStatus", () => {
  test("4. employer can move VIEWED application to SHORTLISTED", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique
      // First call: find the app + verify employer ownership
      .mockResolvedValueOnce({
        id: "app_1",
        jobPosting: { employerId: "ep_1" },
      });
    // employerProfile lookup
    vi.mocked(
      (await import("@/lib/db")).prisma.employerProfile.findUnique,
    ).mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Acme Corp",
      industrySector: "IT_SOFTWARE",
      contactPersonName: "Alice",
      designation: "HR Manager",
      phone: "9876543210",
      email: "alice@acme.com",
      companyAddress: "123 Main St",
      hasWebsite: false,
      websiteUrl: null,
      employeeCountRange: "RANGE_11_50",
      aboutCompany: "A great company",
      status: "APPROVED",
      autoPublishTrusted: false,
      rejectionReason: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockUpdate.mockResolvedValueOnce({ id: "app_1", status: "SHORTLISTED" });

    const result = await updateApplicationStatus("app_1", "SHORTLISTED");
    expect(result).toEqual({ success: true });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "app_1" },
      data: { status: "SHORTLISTED", statusUpdatedAt: expect.any(Date) },
    });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/portal/employer");
  });

  test("5. employer can move VIEWED application to REJECTED", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValueOnce({
      id: "app_2",
      jobPosting: { employerId: "ep_1" },
    });
    vi.mocked(
      (await import("@/lib/db")).prisma.employerProfile.findUnique,
    ).mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Acme Corp",
      industrySector: "IT_SOFTWARE",
      contactPersonName: "Alice",
      designation: "HR Manager",
      phone: "9876543210",
      email: "alice@acme.com",
      companyAddress: "123 Main St",
      hasWebsite: false,
      websiteUrl: null,
      employeeCountRange: "RANGE_11_50",
      aboutCompany: "A great company",
      status: "APPROVED",
      autoPublishTrusted: false,
      rejectionReason: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockUpdate.mockResolvedValueOnce({ id: "app_2", status: "REJECTED" });

    const result = await updateApplicationStatus("app_2", "REJECTED");
    expect(result).toEqual({ success: true });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "app_2" },
      data: { status: "REJECTED", statusUpdatedAt: expect.any(Date) },
    });
  });

  test("5. employer can move VIEWED application to HIRED", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValueOnce({
      id: "app_3",
      jobPosting: { employerId: "ep_1" },
    });
    vi.mocked(
      (await import("@/lib/db")).prisma.employerProfile.findUnique,
    ).mockResolvedValueOnce({
      id: "ep_1",
      userId: "user_emp_1",
      companyName: "Acme Corp",
      industrySector: "IT_SOFTWARE",
      contactPersonName: "Alice",
      designation: "HR Manager",
      phone: "9876543210",
      email: "alice@acme.com",
      companyAddress: "123 Main St",
      hasWebsite: false,
      websiteUrl: null,
      employeeCountRange: "RANGE_11_50",
      aboutCompany: "A great company",
      status: "APPROVED",
      autoPublishTrusted: false,
      rejectionReason: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    mockUpdate.mockResolvedValueOnce({ id: "app_3", status: "HIRED" });

    const result = await updateApplicationStatus("app_3", "HIRED");
    expect(result).toEqual({ success: true });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "app_3" },
      data: { status: "HIRED", statusUpdatedAt: expect.any(Date) },
    });
  });

  test("employer from another company cannot update application", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_other",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValueOnce({
      id: "app_other",
      jobPosting: { employerId: "ep_1" },
    });
    vi.mocked(
      (await import("@/lib/db")).prisma.employerProfile.findUnique,
    ).mockResolvedValueOnce({
      id: "ep_other",
      userId: "user_emp_other",
      companyName: "Other Corp",
      industrySector: "RETAIL",
      contactPersonName: "Bob",
      designation: "CTO",
      phone: "1234567890",
      email: "bob@othercorp.com",
      companyAddress: "456 Other St",
      hasWebsite: true,
      websiteUrl: "https://othercorp.com",
      employeeCountRange: "RANGE_51_200",
      aboutCompany: "Another great company",
      status: "APPROVED",
      autoPublishTrusted: false,
      rejectionReason: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await updateApplicationStatus("app_other", "SHORTLISTED");
    expect(result).toEqual({ error: "Forbidden" });
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("non-employer cannot update status", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_student",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const result = await updateApplicationStatus("app_1", "SHORTLISTED");
    expect(result).toEqual({ error: "Forbidden" });
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
