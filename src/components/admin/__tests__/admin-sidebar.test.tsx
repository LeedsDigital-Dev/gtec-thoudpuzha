import React from "react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ADMIN_ROUTES } from "@/lib/admin-routes";

const mockUsePathname = vi.hoisted(() => vi.fn(() => "/admin"));

vi.mock("@/lib/i18n/navigation", () => ({
  Link: React.forwardRef<HTMLAnchorElement, { href: string; className?: string; children: React.ReactNode }>(
    ({ href, className, children }, ref) =>
      React.createElement("a", { ref, href, "data-testid": "nav-link", className }, children),
  ),
  usePathname: mockUsePathname,
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
  redirect: vi.fn(),
}));

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

import { AdminSidebar } from "@/components/admin/admin-sidebar";

function renderWithProvider(ui: React.ReactElement) {
  return render(
    React.createElement(SidebarProvider, { defaultOpen: true }, ui),
  );
}

describe("AdminSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue("/admin");
  });

  test("renders all routes for Super Admin", () => {
    renderWithProvider(
      React.createElement(AdminSidebar, { isSuperAdmin: true, permissions: {} }),
    );

    for (const route of ADMIN_ROUTES) {
      expect(screen.getByText(route.label)).toBeInTheDocument();
    }
  });

  test("hides super-admin-only routes from Centre Staff", () => {
    renderWithProvider(
      React.createElement(AdminSidebar, { isSuperAdmin: false, permissions: {} }),
    );

    const superAdminRoutes = ADMIN_ROUTES.filter((r) => r.superAdminOnly);
    for (const route of superAdminRoutes) {
      expect(screen.queryByText(route.label)).not.toBeInTheDocument();
    }

    const unrestricted = ADMIN_ROUTES.filter(
      (r) => !r.superAdminOnly && !r.permissionKey,
    );
    for (const route of unrestricted) {
      expect(screen.getByText(route.label)).toBeInTheDocument();
    }
  });

  test("hides permission-gated routes from Centre Staff lacking that permission", () => {
    renderWithProvider(
      React.createElement(AdminSidebar, {
        isSuperAdmin: false,
        permissions: {
          canEditCourses: true,
          canApproveEmployers: true,
        },
      }),
    );

    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Employers")).toBeInTheDocument();

    expect(screen.queryByText("Gallery")).not.toBeInTheDocument();
    expect(screen.queryByText("Job Postings")).not.toBeInTheDocument();
    expect(screen.queryByText("Flash News")).not.toBeInTheDocument();
  });

  test("highlights the currently active route", () => {
    mockUsePathname.mockReturnValue("/admin/students");

    renderWithProvider(
      React.createElement(AdminSidebar, { isSuperAdmin: true, permissions: {} }),
    );

    const studentsLink = screen.getByText("Students").closest("a");
    expect(studentsLink?.className).toContain("bg-sidebar-accent");
    expect(studentsLink?.className).toContain("font-medium");
  });

  test("student/job-seeker/employer/unauthenticated cannot see admin sidebar", () => {
    renderWithProvider(
      React.createElement(AdminSidebar, { isSuperAdmin: false, permissions: {} }),
    );

    const unrestricted = ADMIN_ROUTES.filter(
      (r) => !r.superAdminOnly && !r.permissionKey,
    );

    for (const route of unrestricted) {
      expect(screen.getByText(route.label)).toBeInTheDocument();
    }

    const gated = ADMIN_ROUTES.filter(
      (r) => r.superAdminOnly || r.permissionKey,
    );
    for (const route of gated) {
      expect(screen.queryByText(route.label)).not.toBeInTheDocument();
    }
  });
});
