/**
 * Employer Flow — Authenticated E2E tests using Clerk Agent Tasks
 */

import { createClerkClient } from "@clerk/backend";
import { test, expect } from "@playwright/test";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

const EMAIL = "employer-e2e@test.com";
const BASE = "/en";

async function getClerkId(): Promise<string> {
  const users = await clerk.users.getUserList({ emailAddress: [EMAIL], limit: 1 });
  if (users.data.length === 0) throw new Error("Employer Clerk user not found. Run seed first.");
  return users.data[0].id;
}

async function login(page: import("@playwright/test").Page, clerkUserId: string) {
  const agentTask = await clerk.agentTasks.create({
    onBehalfOf: { userId: clerkUserId },
    permissions: "*",
    agentName: "e2e-test-employer",
    taskDescription: "E2E employer flow test",
    redirectUrl: `http://localhost:3000${BASE}/portal/employer`,
  });
  await page.goto(agentTask.url);
  await page.waitForLoadState("networkidle");
}

test.describe("Employer Flow", () => {
  test.describe.configure({ mode: "serial" });
  let clerkId: string;
  test.beforeAll(async () => { clerkId = await getClerkId(); });

  test("E1 — Employer authenticates and reaches dashboard", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
  });

  test("E2 — Dashboard shows company name and postings", async ({ page }) => {
    await login(page, clerkId);
    await expect(page.getByText("E2E Test Corp")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("E2E Test Position")).toBeVisible();
  });

  test("E3 — Bottom nav visible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await login(page, clerkId);
    const nav = page.getByLabel("Portal navigation");
    await expect(nav).toBeVisible({ timeout: 5000 });
    await expect(nav.getByText("Dashboard")).toBeVisible();
    await expect(nav.getByText("Profile")).toBeVisible();
    await expect(nav.getByText("Post Vacancy")).toBeVisible();
    await expect(nav.getByText("Candidates")).toBeVisible();
  });

  test("E4 — Profile page shows employer details", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/employer/profile`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByLabel("Company Name")).toHaveValue("E2E Test Corp");
  });

  test("E5 — Post a Vacancy form loads", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/employer/post-vacancy`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByLabel("Job Title")).toBeVisible({ timeout: 5000 });
  });

  test("E6 — Candidates page loads", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/employer/candidates`);
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /candidate/i })).toBeVisible({ timeout: 5000 });
  });

  test("E7 — Posting applicants page is accessible", async ({ page }) => {
    await login(page, clerkId);
    await page.goto(`${BASE}/portal/employer`);
    await page.waitForLoadState("networkidle");
    const postingLink = page.getByText("E2E Test Position").first();
    await postingLink.click();
    await page.waitForURL(/\/applicants/, { timeout: 10000 });
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 5000 });
  });
});
