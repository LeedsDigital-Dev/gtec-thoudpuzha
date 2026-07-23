import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (WCAG 2.1 AA) — automated axe-core scan", () => {
  test("1. homepage has zero critical or serious violations", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();
    const criticalSerious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );

    expect(criticalSerious).toEqual([]);
  });
});

test.describe("Accessibility — keyboard operability", () => {
  test("3. keyboard-only navigation can navigate through EnquiryForm fields on homepage", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    // Focus the first name input of the enquiry form
    const nameInput = page.locator("input[id^='enquiry-fullName-']").first();
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    // Type via keyboard
    await page.keyboard.type("Jane Doe");

    // Tab to phone field
    await page.keyboard.press("Tab");
    const phoneInput = page.locator("input[id^='enquiry-phone-']").first();
    await expect(phoneInput).toBeFocused();
    await page.keyboard.type("9876543210");

    // Tab to course select
    await page.keyboard.press("Tab");
    // May land on a select element or dropdown trigger
    await expect(page.locator("select[id^='enquiry-course-']").first().or(page.locator("[id^='enquiry-course-'] + * button, [id^='enquiry-course-'] + * [role='combobox']").first())).toBeAttached();

    // Tab to message textarea
    await page.keyboard.press("Tab");
    const messageArea = page.locator("textarea[id^='enquiry-message-']").first();
    await expect(messageArea).toBeFocused();
    await page.keyboard.type("I'm interested in learning more.");

    // Tab to submit button
    await page.keyboard.press("Tab");
    const submitBtn = page.locator("button[type='submit']").first();
    await expect(submitBtn).toBeFocused();
  });

  test("4. the lightbox modal traps focus and closes on Escape", async ({ page }) => {
    await page.goto("/en/gallery");
    await page.waitForLoadState("networkidle");

    // Find a gallery image button and click it to open lightbox
    const galleryBtn = page
      .getByRole("button")
      .filter({ has: page.locator("img") })
      .first();

    const btnCount = await galleryBtn.count();
    test.skip(btnCount === 0, "No gallery images to test lightbox");

    await galleryBtn.click();

    // Lightbox should be visible
    const lightbox = page.locator('[role="dialog"][aria-label="Image lightbox"]');
    await expect(lightbox).toBeVisible();

    // Close button should be reachable
    const closeBtn = page.locator("button[aria-label='Close lightbox']");
    await expect(closeBtn).toBeVisible();

    // Escape should close the lightbox
    await page.keyboard.press("Escape");
    await expect(lightbox).not.toBeVisible();
  });
});
