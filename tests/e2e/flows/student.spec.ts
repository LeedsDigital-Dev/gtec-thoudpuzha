/**
 * Student Flow — Authenticated E2E tests using Clerk Agent Tasks
 *
 * Prerequisites:
 *   1. npx tsx tests/e2e/flows/seed-e2e.ts
 *   2. npm run dev
 *   3. npx playwright test tests/e2e/flows/student.spec.ts
 */

import { createClerkClient } from "@clerk/backend";
import { test, expect } from "@playwright/test";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

const STUDENT_EMAIL = "student-e2e@test.com";
const BASE = "/en";

async function getStudentClerkId(): Promise<string> {
  const users = await clerk.users.getUserList({
    emailAddress: [STUDENT_EMAIL], limit: 1,
  });
  if (users.data.length === 0) throw new Error("Student Clerk user not found. Run seed first.");
  return users.data[0].id;
}

async function loginAsStudent(page: import("@playwright/test").Page, clerkUserId: string) {
  const agentTask = await clerk.agentTasks.create({
    onBehalfOf: { userId: clerkUserId },
    permissions: "*",
    agentName: "e2e-test-student",
    taskDescription: "E2E student flow test",
    redirectUrl: `http://localhost:3000${BASE}/portal/student`,
  });
  await page.goto(agentTask.url);
  await page.waitForLoadState("networkidle");
}

test.describe("Student Flow", () => {
  test.describe.configure({ mode: "serial" });

  let studentClerkId: string;

  test.beforeAll(async () => {
    studentClerkId = await getStudentClerkId();
  });

  // ── S1: Student authenticates and reaches dashboard ──
  test("S1 — Student authenticates and reaches dashboard", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain("/portal/student");
  });

  // ── S2: Dashboard tiles with enrolled course ──
  test("S2 — Dashboard shows resource tiles with enrolled course", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    const tiles = page.locator("a[href*='/portal/student/resources']");
    await expect(tiles.first()).toBeVisible({ timeout: 5000 });
  });

  // ── S3: Bottom nav visible on mobile, sidebar absent ──
  test("S3 — Bottom nav visible on mobile, sidebar absent", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsStudent(page, studentClerkId);

    const bottomNav = page.getByLabel("Portal navigation");
    await expect(bottomNav).toBeVisible({ timeout: 5000 });
    await expect(bottomNav.getByText("Dashboard")).toBeVisible();
    await expect(bottomNav.getByText("Jobs")).toBeVisible();
    await expect(bottomNav.getByText("Biodata")).toBeVisible();
    await expect(bottomNav.getByText("Resources")).toBeVisible();

    // Sidebar should NOT be visible
    await expect(page.locator('[data-slot="sidebar"]')).not.toBeVisible({ timeout: 3000 });
  });

  // ── S4: Browse Jobs page ──
  test("S4 — Browse jobs page shows listings", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await loginAsStudent(page, studentClerkId);

    await page.goto(`${BASE}/portal/jobs`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toContainText(/job/i);
    await expect(page.getByText("E2E Test Position")).toBeVisible({ timeout: 10000 });
  });

  // ── S5: Job detail page ──
  test("S5 — Job detail page shows full posting", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    await page.goto(`${BASE}/portal/jobs`);
    await page.waitForLoadState("networkidle");

    const jobLink = page.getByText("E2E Test Position").first();
    await jobLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1, h2").first()).toBeVisible();
    await expect(page.getByText("E2E Test Corp")).toBeVisible({ timeout: 5000 });
  });

  // ── S6: Biodata page loads with pre-filled form ──
  test("S6 — Biodata page loads with pre-filled form", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    await page.goto(`${BASE}/portal/student/biodata`);
    await page.waitForLoadState("networkidle");

    const fullNameInput = page.getByLabel("Full name");
    await expect(fullNameInput).toHaveValue("E2E Test Student");
  });

  // ── S7: Resources page is accessible ──
  test("S7 — Resources page is accessible", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    await page.goto(`${BASE}/portal/student/resources`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });

  // ── S8: Study Notes page ──
  test("S8 — Study Notes page shows resources", async ({ page }) => {
    await loginAsStudent(page, studentClerkId);
    await page.goto(`${BASE}/portal/student/resources/notes`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible({ timeout: 5000 });
  });

  // ── S9: Bottom nav navigation on mobile ──
  test("S9 — Bottom nav tabs navigate correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await loginAsStudent(page, studentClerkId);

    const bottomNav = page.getByLabel("Portal navigation");

    await bottomNav.getByText("Jobs").click();
    await page.waitForURL(/\/portal\/jobs/, { timeout: 5000 });

    await bottomNav.getByText("Biodata").click();
    await page.waitForURL(/\/portal\/student\/biodata/, { timeout: 5000 });
  });
});
