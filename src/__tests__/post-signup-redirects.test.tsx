import { describe, expect, test, vi, beforeEach } from "vitest";

const mockAuth = vi.hoisted(() => vi.fn());

const mockRedirect = vi.hoisted(() =>
  vi.fn((url: string) => {
    throw new Error(`redirect:${url}`);
  }),
);

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("next/navigation", () => ({ redirect: mockRedirect }));

describe("PortalPage (role-based router)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. STUDENT visiting /portal is redirected to /portal/student", async () => {
    mockAuth.mockResolvedValue({
      userId: "student_1",
      sessionClaims: { metadata: { role: "STUDENT" } },
    });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/portal/student");
  });

  test("2. JOB_SEEKER visiting /portal is redirected to /portal/job-seeker", async () => {
    mockAuth.mockResolvedValue({
      userId: "js_1",
      sessionClaims: { metadata: { role: "JOB_SEEKER" } },
    });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/portal/job-seeker");
  });

  test("3. EMPLOYER visiting /portal is redirected to /portal/employer", async () => {
    mockAuth.mockResolvedValue({
      userId: "emp_1",
      sessionClaims: { metadata: { role: "EMPLOYER" } },
    });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/portal/employer");
  });

  test("4. CENTRE_STAFF visiting /portal is redirected to /admin", async () => {
    mockAuth.mockResolvedValue({
      userId: "staff_1",
      sessionClaims: { metadata: { role: "CENTRE_STAFF" } },
    });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/admin");
  });

  test("5. SUPER_ADMIN visiting /portal is redirected to /admin", async () => {
    mockAuth.mockResolvedValue({
      userId: "sa_1",
      sessionClaims: { metadata: { role: "SUPER_ADMIN" } },
    });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/admin");
  });

  test("6. Unauthenticated user visiting /portal is redirected to /sign-in", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const { default: PortalPage } = await import(
      "@/app/[locale]/(portal)/portal/page"
    );

    await expect(
      PortalPage({ params: Promise.resolve({ locale: "en" }) }),
    ).rejects.toThrow("redirect:/en/sign-in");
  });
});
