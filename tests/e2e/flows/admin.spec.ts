/**
 * Admin Flow — Authenticated E2E tests using Clerk Agent Tasks
 */

import { createClerkClient } from "@clerk/backend";
import { test, expect } from "@playwright/test";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
const ADMIN_EMAIL = "superadmin-e2e@test.com";
const BASE = "/en";

async function getClerkId(): Promise<string> {
  const users = await clerk.users.getUserList({ emailAddress: [ADMIN_EMAIL], limit: 1 });
  if (users.data.length === 0) throw new Error("Admin user not found. Run seed first.");
  return users.data[0].id;
}

async function login(page: import("@playwright/test").Page, clerkUserId: string) {
  const agentTask = await clerk.agentTasks.create({
    onBehalfOf: { userId: clerkUserId },
    permissions: "*",
    agentName: "e2e-test-admin",
    taskDescription: "E2E admin flow test",
    redirectUrl: `http://localhost:3000${BASE}/admin`,
  });
  await page.goto(agentTask.url);
  await page.waitForLoadState("networkidle");
}

test.describe("Admin Flow (Super Admin)", () => {
  test.describe.configure({ mode: "serial" });
  let clerkId: string;
  test.beforeAll(async () => { clerkId = await getClerkId(); });

  test("A1 — Admin authenticates and reaches dashboard", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible({ timeout: 10000 });
  });

  test("A2 — Sidebar shows all admin modules", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await login(page, clerkId);
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toBeVisible({ timeout: 5000 });
    for (const label of ["Students", "Courses", "Employers", "Job Postings", "Enquiries", "Audit Log", "Site Settings", "Staff Management"]) {
      await expect(sidebar.getByText(label).first()).toBeVisible();
    }
  });

  test("A3 — Dashboard shows summary cards", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.getByText("Recent Enquiries")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("All Modules")).toBeVisible();
  });

  test("A4 — Enquiries page loads", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/enquiries`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Enquiries" })).toBeVisible();
  });

  test("A5 — Students page shows TEST001 record", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/students`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Students" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "TEST001" })).toBeVisible({ timeout: 5000 });
  });

  test("A6 — Courses page loads", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/courses`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Courses", exact: true })).toBeVisible();
  });

  test("A7 — Employers page shows test employer", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/employers`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Employer Registrations" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "E2E Test Corp" })).toBeVisible({ timeout: 5000 });
  });

  test("A8 — Job Postings page shows test posting", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/job-postings`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Job Postings Moderation" })).toBeVisible();
    await expect(page.getByRole("cell", { name: "E2E Test Position" })).toBeVisible({ timeout: 5000 });
  });

  test("A9 — Audit Log page is accessible", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/audit-log`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Audit Log" })).toBeVisible();
  });

  test("A10 — Site Settings page (Super Admin only)", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/settings/site`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Site Settings", exact: true })).toBeVisible({ timeout: 5000 });
  });

  test("A11 — Staff Management page is accessible", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/admin/staff`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Staff Management" })).toBeVisible({ timeout: 5000 });
  });

  test("A12 — Mobile admin bottom nav visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await login(page, clerkId);
    // The admin shell has a bottom nav bar on mobile with Dashboard, Students, Courses, Enquiries + More
    const bottomNav = page.getByLabel("Admin mobile navigation");
    await expect(bottomNav).toBeVisible({ timeout: 5000 });
  });

  test("A13 — Mobile viewport loads without errors", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await login(page, clerkId);
    // Just verify the admin dashboard loads on mobile without crashing
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible({ timeout: 5000 });
  });
});
