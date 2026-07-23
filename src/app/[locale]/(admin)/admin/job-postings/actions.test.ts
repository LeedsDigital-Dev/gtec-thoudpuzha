import { describe, expect, test, vi, beforeEach } from "vitest";
import {
  approveJobPosting,
  rejectJobPosting,
  editAndApproveJobPosting,
} from "./actions";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());
const mockUpdate = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
const mockAuditCreate = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);
const mockRevalidatePath = vi.hoisted(() => vi.fn());
const mockSendModerationNotification = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    jobPosting: {
      findMany: mockFindMany,
      update: mockUpdate,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
    auditLogEntry: {
      create: mockAuditCreate,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));

vi.mock("@/lib/email", () => ({
  sendJobPostingModerationNotification: mockSendModerationNotification,
}));

describe("approveJobPosting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockUpdate.mockReset();
    mockAuditCreate.mockReset();
    mockRevalidatePath.mockReset();
    mockSendModerationNotification.mockReset();
    mockUserFindUnique.mockReset();
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("1. approving sets status=APPROVED and sends notification", async () => {
    mockAuth.mockResolvedValue({
      userId: "super_admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockUpdate.mockResolvedValue({
      id: "jp_1",
      title: "Software Engineer",
      status: "APPROVED",
      employer: {
        companyName: "Acme Corp",
        email: "hr@acme.com",
      },
    });
    mockAuditCreate.mockResolvedValue({ id: "audit_1" });
    mockSendModerationNotification.mockResolvedValue(undefined);

    const formData = new FormData();
    formData.append("postingId", "jp_1");
    formData.append("locale", "en");

    await approveJobPosting(formData);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "jp_1" },
      data: { status: "APPROVED" },
      include: { employer: true },
    });

    expect(mockAuditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        actorUserId: "super_admin_1",
        actorRole: "SUPER_ADMIN",
        action: "jobPosting.approve",
        entityType: "JobPosting",
        entityId: "jp_1",
      }),
    });

    expect(mockSendModerationNotification).toHaveBeenCalledWith({
      jobTitle: "Software Engineer",
      companyName: "Acme Corp",
      employerEmail: "hr@acme.com",
      status: "APPROVED",
    });

    expect(mockRevalidatePath).toHaveBeenCalledWith("/en/admin/job-postings");
  });

  test("2. rejecting requires a rejectionReason", async () => {
    mockAuth.mockResolvedValue({
      userId: "super_admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const formData = new FormData();
    formData.append("postingId", "jp_1");
    formData.append("locale", "en");
    // No rejectionReason

    await expect(rejectJobPosting(formData)).rejects.toThrow(
      "rejectionReason is required",
    );

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockAuditCreate).not.toHaveBeenCalled();
    expect(mockSendModerationNotification).not.toHaveBeenCalled();
  });

  test("3. rejecting with reason sets status=REJECTED and notifies", async () => {
    mockAuth.mockResolvedValue({
      userId: "super_admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockUpdate.mockResolvedValue({
      id: "jp_1",
      title: "Software Engineer",
      status: "REJECTED",
      employer: {
        companyName: "Acme Corp",
        email: "hr@acme.com",
      },
    });
    mockAuditCreate.mockResolvedValue({ id: "audit_1" });
    mockSendModerationNotification.mockResolvedValue(undefined);

    const formData = new FormData();
    formData.append("postingId", "jp_1");
    formData.append("rejectionReason", "Missing details");
    formData.append("locale", "en");

    await rejectJobPosting(formData);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "jp_1" },
      data: { status: "REJECTED" },
      include: { employer: true },
    });

    expect(mockAuditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: "jobPosting.reject",
        metadata: expect.objectContaining({ rejectionReason: "Missing details" }),
      }),
    });

    expect(mockSendModerationNotification).toHaveBeenCalledWith({
      jobTitle: "Software Engineer",
      companyName: "Acme Corp",
      employerEmail: "hr@acme.com",
      status: "REJECTED",
      rejectionReason: "Missing details",
    });
  });

  test("4. editAndApprove persists both edited fields and status change", async () => {
    mockAuth.mockResolvedValue({
      userId: "super_admin_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    mockUpdate.mockResolvedValue({
      id: "jp_1",
      title: "Senior Engineer",
      status: "APPROVED",
      employer: {
        companyName: "Acme Corp",
        email: "hr@acme.com",
      },
    });
    mockAuditCreate.mockResolvedValue({ id: "audit_1" });
    mockSendModerationNotification.mockResolvedValue(undefined);

    const formData = new FormData();
    formData.append("postingId", "jp_1");
    formData.append("title", "Senior Engineer");
    formData.append("description", "Updated description");
    formData.append("department", "Engineering");
    formData.append("salaryMin", "50000");
    formData.append("salaryMax", "80000");
    formData.append("locale", "en");

    await editAndApproveJobPosting(formData);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "jp_1" },
      data: {
        status: "APPROVED",
        title: "Senior Engineer",
        description: "Updated description",
        department: "Engineering",
        salaryMin: 50000,
        salaryMax: 80000,
      },
      include: { employer: true },
    });

    expect(mockAuditCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: "jobPosting.editAndApprove",
        metadata: expect.objectContaining({
          title: "Senior Engineer",
        }),
      }),
    });

    expect(mockSendModerationNotification).toHaveBeenCalledWith({
      jobTitle: "Senior Engineer",
      companyName: "Acme Corp",
      employerEmail: "hr@acme.com",
      status: "APPROVED",
    });
  });

  test("5. Centre Staff cannot approve (redirects to forbidden)", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const formData = new FormData();
    formData.append("postingId", "jp_1");
    formData.append("locale", "en");

    await expect(approveJobPosting(formData)).rejects.toThrow(
      "redirect:/en/forbidden",
    );

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockAuditCreate).not.toHaveBeenCalled();
    expect(mockSendModerationNotification).not.toHaveBeenCalled();
  });
});
