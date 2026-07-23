import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockFindMany = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    candidateProfile: { findUnique: mockFindUnique },
    course: { findMany: mockFindMany },
    skill: { findMany: mockFindMany },
  },
}));

vi.mock("@react-pdf/renderer", () => ({
  renderToBuffer: vi
    .fn()
    .mockResolvedValue(Buffer.from("%PDF-1.3 mock pdf buffer")),
  StyleSheet: { create: () => ({}) },
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
}));

function makeParams(candidateId: string) {
  return { params: Promise.resolve({ candidateId }) };
}

describe("GET /api/biodata/[candidateId]/pdf — access control", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("student accessing another candidate's PDF is rejected with 403", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_self",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    mockFindUnique.mockResolvedValue({
      id: "profile_other",
      userId: "user_other",
      fullName: "Other Person",
      dateOfBirth: null,
      phone: null,
      email: null,
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: null,
      yearOfPassing: null,
      address: null,
      languagesKnown: [],
      skillIds: [],
      preferredJobLocation: null,
      preferredJobType: null,
      careerObjective: null,
      photoUrl: null,
    });

    const { GET } = await import("./route");
    const response = await GET(
      new Request("http://localhost/api/biodata/profile_other/pdf"),
      makeParams("profile_other"),
    );

    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.error).toBe("Forbidden");
  });

  test("employer CAN download another candidate's PDF", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_employer",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });

    mockFindUnique.mockResolvedValue({
      id: "profile_candidate",
      userId: "user_candidate",
      fullName: "Candidate Name",
      dateOfBirth: new Date("2001-06-15"),
      phone: "1234567890",
      email: "candidate@example.com",
      courseCompletedIds: [],
      certificationIds: [],
      educationalQualification: "GRADUATE",
      yearOfPassing: 2023,
      address: "Some address",
      languagesKnown: ["English"],
      skillIds: [],
      preferredJobLocation: "Kochi",
      preferredJobType: "FULL_TIME",
      careerObjective: "A career",
      photoUrl: null,
    });

    mockFindMany.mockResolvedValue([]);

    const { GET } = await import("./route");
    const response = await GET(
      new Request("http://localhost/api/biodata/profile_candidate/pdf"),
      makeParams("profile_candidate"),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
  });
});
