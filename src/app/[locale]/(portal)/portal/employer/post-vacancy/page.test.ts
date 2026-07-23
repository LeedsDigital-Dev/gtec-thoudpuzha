import { renderToString } from "react-dom/server";
import { describe, expect, test, vi, beforeEach } from "vitest";

// ─── Hoisted mocks ──────────────────────────────────────────────────────────

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
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
  },
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("Post Vacancy page — employer status gate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindUnique.mockReset();
    mockRedirect.mockReset();
    mockRedirect.mockImplementation((url: string) => {
      throw new Error(`redirect:${url}`);
    });
  });

  test("4. An employer with status=PENDING is blocked from the post-vacancy route, redirected to status page", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_1",
      userId: "user_emp_1",
      status: "PENDING",
    });

    const mod = await import("./page");

    await expect(mod.default()).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );
  });

  test("An employer with status=REJECTED is also blocked", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_2",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_2",
      userId: "user_emp_2",
      status: "REJECTED",
    });

    const mod = await import("./page");

    await expect(mod.default()).rejects.toThrow(
      "redirect:/portal/employer/register/status",
    );
  });

  test("An employer with status=APPROVED can access the post-vacancy page", async () => {
    mockAuth.mockResolvedValue({
      userId: "user_emp_3",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });
    mockFindUnique.mockResolvedValue({
      id: "ep_3",
      userId: "user_emp_3",
      status: "APPROVED",
    });

    const mod = await import("./page");

    const element = await mod.default();
    const html = renderToString(element);
    expect(html).toContain("Post a Vacancy");
  });
});
