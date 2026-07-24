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
});

// Regression test: BiodataPage previously passed an inline arrow function
// wrapping saveBiodata as BiodataForm's onSubmit prop. Server Components
// can't pass non-Server-Action functions to Client Components (Next.js
// throws "Event handlers cannot be passed to Client Component props" at
// render time — this only surfaces when the page actually renders, not in
// unit tests of the action alone, which is why it slipped through). The
// fix was to export submitBiodataForm as its own real Server Action.
// Its defining property, and the one this test guards, is that it
// resolves to undefined — matching BiodataForm's
// onSubmit: (data) => Promise<void> — rather than returning profile data
// like saveBiodata does (see AGENTS.md rule 15).
describe("submitBiodataForm", () => {
    test("resolves to undefined, not the profile data saveBiodata returns", async () => {
        const { submitBiodataForm } = await import("./actions");

        const result = await submitBiodataForm(validData);

        expect(result).toBeUndefined();
        expect(mockUpsert).toHaveBeenCalledTimes(1);
    });

    test("still persists the profile via saveBiodata's underlying logic", async () => {
        const { submitBiodataForm } = await import("./actions");

        await submitBiodataForm({ ...validData, fullName: "Alice" });

        expect(mockUpsert).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { userId: "user_1" },
                update: expect.objectContaining({ fullName: "Alice" }),
                create: expect.objectContaining({ fullName: "Alice" }),
            }),
        );
    });
});