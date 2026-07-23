import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockCreateJobPosting = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    employerProfile: {
      findUnique: mockFindUnique,
    },
    jobPosting: {
      create: mockCreateJobPosting,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("submitVacancy — auto-publish branching and salary visibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindUnique.mockReset();
    mockCreateJobPosting.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
  });

  function validFormData(overrides?: Record<string, string>): FormData {
    const fd = new FormData();
    fd.set("title", overrides?.title ?? "Software Engineer");
    fd.set("department", overrides?.department ?? "Engineering");
    fd.set("salaryMin", overrides?.salaryMin ?? "50000");
    fd.set("salaryMax", overrides?.salaryMax ?? "80000");
    fd.set("salaryVisibility", overrides?.salaryVisibility ?? "DISCLOSE");
    fd.set("jobType", overrides?.jobType ?? "FULL_TIME");
    fd.set("skillIds", overrides?.skillIds ?? '["skill_1","skill_2"]');
    fd.set("applicationDeadline", overrides?.applicationDeadline ?? "2026-12-31");
    fd.set("description", overrides?.description ?? "Great job opportunity");
    return fd;
  }

  test("2. Approved but non-trusted employer gets status=PENDING and autoPublished=false", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      status: "APPROVED",
      autoPublishTrusted: false,
    });
    mockCreateJobPosting.mockResolvedValue({ id: "jp_1" });

    const { submitVacancy } = await import("./actions");

    await expect(submitVacancy(validFormData())).rejects.toThrow(
      "redirect:/portal/employer",
    );

    expect(mockCreateJobPosting).toHaveBeenCalledTimes(1);
    const callData = mockCreateJobPosting.mock.calls[0][0].data;
    expect(callData.status).toBe("PENDING");
    expect(callData.autoPublished).toBe(false);
  });

  test("3. Approved AND trusted employer gets status=APPROVED and autoPublished=true", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_2",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_2",
      userId: "user_emp_2",
      status: "APPROVED",
      autoPublishTrusted: true,
    });
    mockCreateJobPosting.mockResolvedValue({ id: "jp_2" });

    const { submitVacancy } = await import("./actions");

    await expect(submitVacancy(validFormData())).rejects.toThrow(
      "redirect:/portal/employer",
    );

    expect(mockCreateJobPosting).toHaveBeenCalledTimes(1);
    const callData = mockCreateJobPosting.mock.calls[0][0].data;
    expect(callData.status).toBe("APPROVED");
    expect(callData.autoPublished).toBe(true);
  });

  test("4. Salary visibility DISCLOSE persists correctly", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_3",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_3",
      userId: "user_emp_3",
      status: "APPROVED",
      autoPublishTrusted: false,
    });
    mockCreateJobPosting.mockResolvedValue({ id: "jp_3" });

    const { submitVacancy } = await import("./actions");
    const fd = validFormData({ salaryVisibility: "DISCLOSE" });

    await expect(submitVacancy(fd)).rejects.toThrow(
      "redirect:/portal/employer",
    );

    expect(mockCreateJobPosting).toHaveBeenCalledTimes(1);
    expect(mockCreateJobPosting.mock.calls[0][0].data.salaryVisibility).toBe(
      "DISCLOSE",
    );
  });

  test("4b. Salary visibility PRIVATE persists correctly", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_4",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_4",
      userId: "user_emp_4",
      status: "APPROVED",
      autoPublishTrusted: false,
    });
    mockCreateJobPosting.mockResolvedValue({ id: "jp_4" });

    const { submitVacancy } = await import("./actions");
    const fd = validFormData({ salaryVisibility: "PRIVATE" });

    await expect(submitVacancy(fd)).rejects.toThrow(
      "redirect:/portal/employer",
    );

    expect(mockCreateJobPosting).toHaveBeenCalledTimes(1);
    expect(mockCreateJobPosting.mock.calls[0][0].data.salaryVisibility).toBe(
      "PRIVATE",
    );
  });

  test("1. Non-approved employer is blocked from submitting (redirects to status)", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_5",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_5",
      userId: "user_emp_5",
      status: "PENDING",
      autoPublishTrusted: false,
    });

    const { submitVacancy } = await import("./actions");

    await expect(submitVacancy(validFormData())).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );

    expect(mockCreateJobPosting).not.toHaveBeenCalled();
  });
});
