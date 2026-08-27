import { renderToString } from "react-dom/server";
import { describe, expect, test, vi, beforeEach } from "vitest";
import type { ReactNode } from "react";
import { Role } from "@/lib/auth";

const mockAuth = vi.hoisted(() => vi.fn());
const mockFindUnique = vi.hoisted(() => vi.fn());
const mockApplicationCount = vi.hoisted(() => vi.fn());
const mockApplicationFindMany = vi.hoisted(() => vi.fn());

vi.mock("@clerk/nextjs/server", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    candidateProfile: {
      findUnique: mockFindUnique,
    },
    application: {
      count: mockApplicationCount,
      findMany: mockApplicationFindMany,
    },
  },
}));

vi.mock("next/link", () => ({
  default: vi.fn(
    ({ href, children }: { href: string; children: ReactNode }): string => {
      let text = "";
      function extract(nodes: ReactNode): void {
        if (typeof nodes === "string" || typeof nodes === "number") {
          text += String(nodes);
        } else if (Array.isArray(nodes)) {
          nodes.forEach(extract);
        } else if (
          nodes &&
          typeof nodes === "object" &&
          "props" in nodes
        ) {
          extract(((nodes as unknown) as { props: { children: ReactNode } }).props.children);
        }
      }
      extract(children);
      return `<a href="${href}">${text}</a>`;
    },
  ),
}));

vi.mock("lucide-react", () => ({
  Briefcase: () => "💼",
  FileText: () => "📄",
  User: () => "👤",
  Search: () => "🔍",
}));

function withAuth(role: Role | undefined, userId = "user_1") {
  mockAuth.mockResolvedValue({
    userId,
    sessionClaims: role ? { metadata: { role } } : {},
  });
}

describe("Job Seeker Dashboard — /portal/job-seeker", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockApplicationCount.mockResolvedValue(0);
    mockApplicationFindMany.mockResolvedValue([]);
  });

  test("1. JOB_SEEKER with biodata sees three action tiles", async () => {
    withAuth(Role.JOB_SEEKER);
    mockFindUnique.mockResolvedValue({ fullName: "Alice" });

    const { default: DashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/job-seeker/page"
    );
    const element = await DashboardPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(element);

    expect(html).toContain("Browse Jobs");
    expect(html).toContain("My Applications");
    expect(html).toContain("Update Profile");
  });

  test("2. JOB_SEEKER without biodata sees 'Complete Profile' button", async () => {
    withAuth(Role.JOB_SEEKER);
    mockFindUnique.mockResolvedValue(null);

    const { default: DashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/job-seeker/page"
    );
    const element = await DashboardPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(element);

    expect(html).toContain("Complete Profile");
    expect(html).not.toContain("Update Profile");
  });

  test("3. STUDENT visiting /portal/job-seeker is denied", async () => {
    withAuth(Role.STUDENT);

    const { default: DashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/job-seeker/page"
    );
    const element = await DashboardPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(element);

    expect(html).toContain("your account type");
    expect(html).toContain("Job Seeker");
    expect(html).not.toContain("Browse Jobs");
  });

  test("4. JOB_SEEKER with applications sees recent applications list", async () => {
    withAuth(Role.JOB_SEEKER);
    mockFindUnique.mockResolvedValue({ fullName: "Bob", id: "prof_1" });
    mockApplicationCount.mockResolvedValue(2);
    mockApplicationFindMany.mockResolvedValue([
      {
        id: "app_1",
        status: "APPLIED",
        jobPosting: {
          id: "job_1",
          title: "Frontend Developer",
          employer: { companyName: "Acme Corp" },
        },
      },
      {
        id: "app_2",
        status: "SHORTLISTED",
        jobPosting: {
          id: "job_2",
          title: "UX Designer",
          employer: { companyName: "Beta Inc" },
        },
      },
    ]);

    const { default: DashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/job-seeker/page"
    );
    const element = await DashboardPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(element);

    expect(html).toContain("Frontend Developer");
    expect(html).toContain("UX Designer");
    expect(html).toContain("SHORTLISTED");
    expect(html).toContain("View All");
  });

  test("5. tiles link to correct destinations", async () => {
    withAuth(Role.JOB_SEEKER);
    mockFindUnique.mockResolvedValue({ fullName: "Alice" });

    const { default: DashboardPage } = await import(
      "@/app/[locale]/(portal)/portal/job-seeker/page"
    );
    const element = await DashboardPage({ params: Promise.resolve({ locale: "en" }) });
    const html = renderToString(element);

    expect(html).toContain("href=&quot;/portal/jobs&quot;");
    expect(html).toContain("href=&quot;/portal/student/applications&quot;");
    expect(html).toContain("href=&quot;/portal/student/biodata&quot;");
  });
});
