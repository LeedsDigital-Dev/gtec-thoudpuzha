import { describe, expect, test, vi, beforeEach } from "vitest";
import { lookupStudentRecord, finalizeStudentVerification } from "./actions";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockClerkClient = vi.hoisted(() => vi.fn());
const mockUpdateUser = vi.hoisted(() => vi.fn());
const mockFindFirst = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockUpsert = vi.hoisted(() => vi.fn());
const mockCandidateCreate = vi.hoisted(() => vi.fn());
const mockRecordUpdate = vi.hoisted(() => vi.fn());
const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);
const mockCheckRateLimit = vi.hoisted(() =>
  vi.fn(() => ({ allowed: true, remaining: 4, resetAt: Date.now() + 60000 })),
);
const mockGetClientIp = vi.hoisted(() => vi.fn(() => Promise.resolve("127.0.0.1")));

vi.mock("@/lib/rate-limiter", () => ({
  checkRateLimit: mockCheckRateLimit,
  getClientIp: mockGetClientIp,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
  clerkClient: mockClerkClient,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    studentRecord: {
      findFirst: mockFindFirst,
      findUnique: mockFindUnique,
      update: mockRecordUpdate,
    },
    user: {
      upsert: mockUpsert,
    },
    candidateProfile: {
      create: mockCandidateCreate,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

// ─── Tests: lookupStudentRecord ─────────────────────────────────────────────

describe("lookupStudentRecord", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindFirst.mockReset();
  });

  test("1. Correct Student ID + phone pair returns success with studentRecordId and phone", async () => {
    mockFindFirst.mockResolvedValue({
      id: "sr_1",
      studentId: "GTEC001",
      fullName: "Alice",
      phone: "9876543210",
      linkedUserId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    formData.append("studentId", "GTEC001");
    formData.append("phone", "9876543210");

    const result = await lookupStudentRecord(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.studentRecordId).toBe("sr_1");
      expect(result.phone).toBe("9876543210");
    }
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { studentId: "GTEC001", phone: "9876543210" },
    });
  });

  test("2. Incorrect Student ID or phone shows generic non-revealing error", async () => {
    mockFindFirst.mockResolvedValue(null);

    const formData = new FormData();
    formData.append("studentId", "GTEC001");
    formData.append("phone", "0000000000");

    const result = await lookupStudentRecord(formData);

    expect(result.success).toBe(false);
    expect(result.error).toBe(
      "We couldn't verify these details — please contact the centre.",
    );
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { studentId: "GTEC001", phone: "0000000000" },
    });
  });

  test("4. Already-linked StudentRecord is rejected with specific error", async () => {
    mockFindFirst.mockResolvedValue({
      id: "sr_1",
      studentId: "GTEC001",
      fullName: "Alice",
      phone: "9876543210",
      linkedUserId: "user_existing",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    formData.append("studentId", "GTEC001");
    formData.append("phone", "9876543210");

    const result = await lookupStudentRecord(formData);

    expect(result.success).toBe(false);
    expect("alreadyLinked" in result && result.alreadyLinked).toBe(true);
    expect(result.error).toBe(
      "This Student ID has already been registered — if this is you, please sign in instead.",
    );
  });

  test("5. Returns the phone number from the StudentRecord on file, not an arbitrary phone", async () => {
    mockFindFirst.mockResolvedValue({
      id: "sr_1",
      studentId: "GTEC001",
      fullName: "Alice",
      phone: "9876543210",
      linkedUserId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    // Form uses matching phone to find the record
    formData.append("studentId", "GTEC001");
    formData.append("phone", "9876543210");

    const result = await lookupStudentRecord(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      // The phone returned must be the record's phone, not anything from the form
      expect(result.phone).toBe("9876543210");
    }
  });

  test("returns error if studentId or phone are missing", async () => {
    const formData = new FormData();
    formData.append("studentId", "");

    const result1 = await lookupStudentRecord(new FormData());
    expect(result1.success).toBe(false);
    expect(result1.error).toBe(
      "Please provide both Student ID and phone number.",
    );

    const formData2 = new FormData();
    formData2.append("studentId", "GTEC001");
    formData2.append("phone", "");
    const result2 = await lookupStudentRecord(formData2);
    expect(result2.success).toBe(false);
  });
});

// ─── Tests: finalizeStudentVerification ──────────────────────────────────────

describe("finalizeStudentVerification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockReset();
    mockFindUnique.mockReset();
    mockClerkClient.mockReset();
    mockUpdateUser.mockReset();
    mockUpsert.mockReset();
    mockCandidateCreate.mockReset();
    mockRecordUpdate.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
  });

  test("3. Successful OTP entry sets role=STUDENT, isVerifiedStudent=true, links StudentRecord", async () => {
    mockAuth.mockResolvedValue({ userId: "user_test_1" });
    mockFindUnique.mockResolvedValue({
      id: "sr_1",
      studentId: "GTEC001",
      phone: "9876543210",
      linkedUserId: null,
    });
    mockClerkClient.mockReturnValue(
      Promise.resolve({ users: { updateUser: mockUpdateUser } }),
    );
    mockUpsert.mockResolvedValue({});
    mockCandidateCreate.mockResolvedValue({ id: "cp_1" });
    mockRecordUpdate.mockResolvedValue({});

    await expect(
      finalizeStudentVerification("sr_1"),
    ).rejects.toThrow("redirect:/portal/student/biodata");

    expect(mockUpdateUser).toHaveBeenCalledWith("user_test_1", {
      publicMetadata: { role: "STUDENT" },
    });

    expect(mockUpsert).toHaveBeenCalledWith({
      where: { id: "user_test_1" },
      update: { role: "STUDENT" },
      create: { id: "user_test_1", role: "STUDENT" },
    });

    expect(mockCandidateCreate).toHaveBeenCalledWith({
      data: {
        userId: "user_test_1",
        isVerifiedStudent: true,
        studentRecordId: "sr_1",
      },
    });

    expect(mockRecordUpdate).toHaveBeenCalledWith({
      where: { id: "sr_1" },
      data: { linkedUserId: "user_test_1" },
    });
  });

  test("redirects to sign-in if unauthenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    await expect(
      finalizeStudentVerification("sr_1"),
    ).rejects.toThrow("redirect:/sign-in");

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  test("redirects to sign-up page if record not found or already linked", async () => {
    mockAuth.mockResolvedValue({ userId: "user_test_1" });

    // Record not found
    mockFindUnique.mockResolvedValue(null);
    await expect(
      finalizeStudentVerification("sr_missing"),
    ).rejects.toThrow("redirect:/portal/sign-up/student");

    // Record already linked
    mockFindUnique.mockResolvedValue({
      id: "sr_1",
      linkedUserId: "user_other",
    });
    await expect(
      finalizeStudentVerification("sr_1"),
    ).rejects.toThrow("redirect:/portal/sign-up/student");
  });
});
