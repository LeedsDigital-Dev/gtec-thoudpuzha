import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());
const mockUpsert = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
    auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
    prisma: {
        candidateProfile: {
            upsert: mockUpsert,
        },
    },
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

const mockRedirect = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
    redirect: mockRedirect,
}));

const validData = {
    courseCompletedIds: [],
    certificationIds: [],
    languagesKnown: [],
    skillIds: [],
};

beforeEach(() => {
    vi.clearAllMocks();
    mockAuth.mockResolvedValue({
        userId: "user_1",
        sessionClaims: { metadata: { role: "STUDENT" } },
    });
    mockUpsert.mockResolvedValue({ id: "profile_1" });
    mockRedirect.mockImplementation((url: string) => {
        throw new Error(`redirect:${url}`);
    });
});

describe("submitBiodataForm", () => {
    test("redirects STUDENT to /portal/student after save", async () => {
        const { submitBiodataForm } = await import("./actions");

        await expect(submitBiodataForm(validData)).rejects.toThrow(
            "redirect:/portal/student",
        );
        expect(mockUpsert).toHaveBeenCalledTimes(1);
    });

    test("still persists the profile via saveBiodata's underlying logic", async () => {
        const { submitBiodataForm } = await import("./actions");

        try { await submitBiodataForm({ ...validData, fullName: "Alice" }); } catch { /* redirect */ }

        expect(mockUpsert).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { userId: "user_1" },
                update: expect.objectContaining({ fullName: "Alice" }),
                create: expect.objectContaining({ fullName: "Alice" }),
            }),
        );
    });
});