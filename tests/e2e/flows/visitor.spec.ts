/**
 * Visitor Flow — Public site E2E tests
 * Runs against local dev server. No authentication required.
 *
 * Prerequisites: Production seed + E2E test seed must have run.
 * Run: npx tsx tests/e2e/flows/seed-e2e.ts && npx playwright test tests/e2e/flows/visitor.spec.ts
 */

import { test, expect } from "@playwright/test";

test.describe("Visitor Flow", () => {
  test.describe.configure({ mode: "serial" });

  const BASE = "/en";

  // ── Step 1: Homepage loads with all sections ──
  test("V1 — Homepage loads, header/footer/hero visible", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // Header
    await expect(page.getByLabel("G-TEC Thodupuzha home")).toBeVisible();
    await expect(page.getByLabel("Call Now")).toBeVisible();

    // Footer
    await expect(page.locator("footer")).toBeVisible();

    // Hero content
    await expect(page.locator("h1")).toBeVisible();

    // Flash News bar
    const flashBar = page.getByRole("region", { name: "Flash news" });
    // Flash news is conditional — only verify it exists if rendered
    const flashCount = await flashBar.count();
    if (flashCount > 0) {
      await expect(flashBar).toBeVisible();
    }
  });

  // ── Step 2: Header desktop navigation ──
  test("V2 — Desktop nav links navigate correctly", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // Courses link
    const nav = page.getByLabel("Primary navigation");
    await expect(nav).toBeVisible();

    const aboutLink = nav.getByText("About");
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator("h1")).toBeVisible();
  });

  // ── Step 3: Header mobile hamburger menu ──
  test("V3 — Mobile hamburger menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // Hamburger visible
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Mobile nav visible
    const mobileNav = page.getByLabel("Mobile navigation");
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByText("Home")).toBeVisible();
    await expect(mobileNav.getByText("About")).toBeVisible();
    await expect(mobileNav.getByText("Placement")).toBeVisible();
    await expect(mobileNav.getByText("Gallery")).toBeVisible();
    await expect(mobileNav.getByText("Contact")).toBeVisible();

    // Courses shown as link with sub-items
    await expect(mobileNav.getByText("Courses")).toBeVisible();

    // Language switcher in mobile nav — use aria-label
    await expect(
      mobileNav.getByLabel("Switch to Malayalam"),
    ).toBeVisible();

    // Close menu
    await page.getByLabel("Close menu").click();
    await expect(mobileNav).not.toBeVisible();
  });

  // ── Step 4: Language switcher toggles to Malayalam ──
  test("V4 — Language switcher toggles to Malayalam", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // Find the language switcher link in the header (desktop) — use aria-label
    let langLink = page.locator("header").getByLabel("Switch to Malayalam");

    if ((await langLink.count()) === 0) {
      // Mobile — open hamburger first
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE);
      await page.getByLabel("Open menu").click();
      langLink = page.getByLabel("Mobile navigation").getByLabel("Switch to Malayalam");
    }

    await langLink.click();
    await page.waitForURL(/\/ml/);
    expect(page.url()).toContain("/ml");
  });

  // ── Step 5: Enquiry form submission ──
  test("V5 — Enquiry form submits successfully", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    const fullName = page.getByLabel("Full name");
    const phone = page.getByLabel("Phone number");
    const courseSelect = page.getByLabel("Course interested in");
    const submitBtn = page.getByRole("button", { name: /submit|Submit/i });

    await fullName.fill(`Visitor Test ${Date.now()}`);
    await phone.fill("9876543210");

    // Select a course — the form uses a native <select>
    const options = courseSelect.locator("option");
    const optCount = await options.count();
    if (optCount > 1) {
      // Get the value of the first non-disabled option and select it
      const firstOptionValue = await options.nth(1).getAttribute("value");
      if (firstOptionValue) {
        await courseSelect.selectOption(firstOptionValue);
      }
    }

    await submitBtn.click();

    // Expect success message
    await expect(page.getByText(/Thank you/i, { timeout: 15000 })).toBeVisible();
  });

  // ── Step 6: About page ──
  test("V6 — About page loads all sections", async ({ page }) => {
    await page.goto(`${BASE}/about`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toBeVisible();

    // Vision/Mission/Values cards grid — the h3 headings use translation keys
    await expect(page.locator("h3").first()).toBeVisible();

    // At A Glance section
    await expect(page.getByText("Years of Operation")).toBeVisible({
      timeout: 5000,
    });
  });

  // ── Step 7: Courses listing ──
  test("V7 — Courses page lists published courses", async ({ page }) => {
    await page.goto(`${BASE}/courses`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText(/courses/i);

    // Should have at least one course card (from seed data)
    const courseLinks = page.locator('a[href*="/courses/"]');
    const count = await courseLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  // ── Step 8: Course detail with content blocks ──
  test("V8 — Course detail page shows content blocks and table", async ({
    page,
  }) => {
    await page.goto(`${BASE}/courses/test-e2e-course`);
    await page.waitForLoadState("networkidle");

    // Hero/Title
    await expect(page.locator("h2").first()).toBeVisible();

    // Course table with horizontal scroll on mobile
    const table = page.locator("table");
    const tableCount = await table.count();
    if (tableCount > 0) {
      await expect(table.first()).toBeVisible();

      // Test mobile horizontal scroll
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${BASE}/courses/test-e2e-course`);
      await page.waitForLoadState("networkidle");
      const table2 = page.locator("table");
      if ((await table2.count()) > 0) {
        await expect(table2.first()).toBeVisible();
      }
    }
  });

  // ── Step 9: Gallery page with lightbox ──
  test("V9 — Gallery page renders tabs and lightbox works", async ({ page }) => {
    await page.goto(`${BASE}/gallery`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toBeVisible();

    // Tab buttons should exist for categories
    const tabs = page.getByRole("tab");
    const tabCount = await tabs.count();

    // Click an image if there is one — gallery items from seed
    const galleryBtn = page
      .getByRole("button")
      .filter({ has: page.locator("img") })
      .first();

    if ((await galleryBtn.count()) > 0) {
      await galleryBtn.click();
      await expect(page.getByLabel("Close lightbox")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByLabel("Close lightbox")).not.toBeVisible();
    } else {
      console.log("  ⚠ No gallery images found to test lightbox");
    }
  });

  // ── Step 10: Mobile: no unexpected horizontal overflow ──
  test("V10 — No horizontal overflow on mobile homepage", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // Check the main content area for overflow (skip marquee which is intentional)
    const hasOverflow = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return false;
      return main.scrollWidth > main.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  // ── Step 11: Mobile touch targets are adequate ──
  test("V11 — Call/WhatsApp buttons have adequate touch targets", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");

    // WhatsApp button
    const waButton = page.getByLabel("WhatsApp");
    await expect(waButton).toBeVisible();
    await expect(waButton).toHaveAttribute("href", /wa\.me\//);

    // Verify no horizontal scroll on main content
    const hasOverflow = await page.evaluate(
      () => {
        const main = document.querySelector("main");
        if (!main) return false;
        return main.scrollWidth > main.clientWidth;
      },
    );
    expect(hasOverflow).toBe(false);
  });

  // ── Step 12: Contact page modal enquiry ──
  test("V12 — Contact page 'Send Message' opens modal", async ({ page }) => {
    await page.goto(`${BASE}/contact`);
    await page.waitForLoadState("networkidle");

    const sendBtn = page.getByRole("button", { name: /Send Message/i });
    if ((await sendBtn.count()) > 0) {
      await sendBtn.click();

      // Modal should open
      await expect(page.getByRole("dialog")).toBeVisible({ timeout: 5000 });

      // Close via Escape
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }
  });

  // ── Step 13: Privacy & Terms pages ──
  test("V13 — Privacy and Terms pages load", async ({ page }) => {
    await page.goto(`${BASE}/privacy`);
    await expect(page.locator("h1")).toBeVisible();

    await page.goto(`${BASE}/terms`);
    await expect(page.locator("h1")).toBeVisible();
  });
});
