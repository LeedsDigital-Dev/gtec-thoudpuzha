import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";

const mockAuth = vi.hoisted(() => vi.fn());
const mockEnquiryFindMany = vi.hoisted(() => vi.fn());
const mockUserFindUnique = vi.hoisted(() => vi.fn());
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
    enquiry: {
      findMany: mockEnquiryFindMany,
    },
    user: {
      findUnique: mockUserFindUnique,
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

describe("EnquiriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
    mockUserFindUnique.mockResolvedValue({ deactivatedAt: null });
  });

  test("is denied to an employer-role user", async () => {
    mockAuth.mockResolvedValue({
      userId: "employer_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });

    const { default: EnquiriesPage } = await import("./page");

    await expect(
      EnquiriesPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/forbidden");
  });

  test("is accessible to a centre_staff-role user and lists enquiries", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    mockEnquiryFindMany.mockResolvedValue([
      {
        id: "enquiry_1",
        name: "Jane Doe",
        phone: "9876543210",
        course: { titleEn: "Diploma in Computer Application" },
        source: "homepage-hero",
        createdAt: new Date("2026-01-15T10:00:00Z"),
      },
    ]);

    const { default: EnquiriesPage } = await import("./page");
    const element = await EnquiriesPage({
      params: Promise.resolve({ locale: "en" }),
    });
    const html = renderToString(element);

    expect(html).toContain("Jane Doe");
    expect(html).toContain("9876543210");
    expect(html).toContain("Diploma in Computer Application");
    expect(html).toContain("homepage-hero");
  });
});
