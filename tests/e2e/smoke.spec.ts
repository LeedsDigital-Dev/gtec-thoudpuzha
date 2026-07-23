import { test, expect } from "@playwright/test";

const PUBLIC_PAGES = [
  "/en",
  "/en/about",
  "/en/courses",
  "/en/placement",
  "/en/gallery",
  "/en/news",
  "/en/contact",
];

test.describe("Multi-engine smoke test — public pages", () => {
  for (const path of PUBLIC_PAGES) {
    test(`GET ${path} returns 200 and has expected content`, async ({
      page,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }

  test("header contains brand name and CTA buttons", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByLabel("G-TEC Thodupuzha home")).toBeVisible();
    await expect(page.getByLabel("Call Now")).toBeVisible();
  });

  test("lightbox opens when a gallery image is clicked", async ({ page }) => {
    await page.goto("/en/gallery");

    // If a gallery image exists, try clicking it
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
      // No gallery items — just verify the page loaded
      await expect(page.locator("h1")).toBeVisible();
      test.info().annotations.push({
        type: "info",
        description: "No gallery images found to click",
      });
    }
  });
});
