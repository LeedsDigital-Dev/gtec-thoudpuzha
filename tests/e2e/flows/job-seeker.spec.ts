/**
 * Job Seeker Flow — Authenticated E2E tests using Clerk Agent Tasks
 */

import { createClerkClient } from "@clerk/backend";
import { test, expect } from "@playwright/test";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

const EMAIL = "jobseeker-e2e@test.com";
const BASE = "/en";

async function getClerkId(): Promise<string> {
  const users = await clerk.users.getUserList({ emailAddress: [EMAIL], limit: 1 });
  if (users.data.length === 0) throw new Error("Job seeker Clerk user not found. Run seed first.");
  return users.data[0].id;
}

async function login(page: import("@playwright/test").Page, clerkUserId: string) {
  const agentTask = await clerk.agentTasks.create({
    onBehalfOf: { userId: clerkUserId },
    permissions: "*",
    agentName: "e2e-test-jobseeker",
    taskDescription: "E2E job seeker flow test",
    redirectUrl: `http://localhost:3000${BASE}/portal/job-seeker`,
  });
  await page.goto(agentTask.url);
  await page.waitForLoadState("networkidle");
}

test.describe("Job Seeker Flow", () => {
  test.describe.configure({ mode: "serial" });
  let clerkId: string;
  test.beforeAll(async () => { clerkId = await getClerkId(); });

  test("JS1 — Job seeker authenticates and reaches dashboard", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
  });

  test("JS2 — Dashboard shows action tiles", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.getByRole("link", { name: "Browse Jobs" }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole("link", { name: /My Applications/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Update Profile|Complete Profile/i }).first()).toBeVisible();
  });

  test("JS3 — Bottom nav visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await login(page, clerkId);
    const nav = page.getByLabel("Portal navigation");
    await expect(nav).toBeVisible({ timeout: 5000 });
    await expect(nav.getByText("Dashboard")).toBeVisible();
    await expect(nav.getByText("Jobs")).toBeVisible();
  });

  test("JS4 — Browse jobs shows listings", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/jobs`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("E2E Test Position")).toBeVisible({ timeout: 10000 });
  });

  test("JS5 — Biodata form shows pre-filled data", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/student/biodata`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByLabel("Full name")).toHaveValue("E2E Job Seeker");
  });

  test("JS6 — Applications page loads", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/student/applications`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("JS7 — Student resources blocked for job seeker", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/student/resources/notes`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(/not for your account|This area isn/i)).toBeVisible({ timeout: 5000 });
  });
});
