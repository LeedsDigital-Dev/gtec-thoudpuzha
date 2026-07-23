# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Multi-engine smoke test — public pages >> GET /en/gallery returns 200 and has expected content
- Location: tests/e2e/smoke.spec.ts:15:9

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en/gallery
Call log:
  - navigating to "http://localhost:3000/en/gallery", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const PUBLIC_PAGES = [
  4  |   "/en",
  5  |   "/en/about",
  6  |   "/en/courses",
  7  |   "/en/placement",
  8  |   "/en/gallery",
  9  |   "/en/news",
  10 |   "/en/contact",
  11 | ];
  12 | 
  13 | test.describe("Multi-engine smoke test — public pages", () => {
  14 |   for (const path of PUBLIC_PAGES) {
  15 |     test(`GET ${path} returns 200 and has expected content`, async ({
  16 |       page,
  17 |     }) => {
> 18 |       const response = await page.goto(path);
     |                                   ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en/gallery
  19 |       expect(response?.status()).toBe(200);
  20 |       await expect(page.locator("header")).toBeVisible();
  21 |       await expect(page.locator("footer")).toBeVisible();
  22 |     });
  23 |   }
  24 | 
  25 |   test("header contains brand name and CTA buttons", async ({ page }) => {
  26 |     await page.goto("/en");
  27 |     await expect(page.getByLabel("G-TEC Thodupuzha home")).toBeVisible();
  28 |     await expect(page.getByLabel("Call Now")).toBeVisible();
  29 |   });
  30 | 
  31 |   test("lightbox opens when a gallery image is clicked", async ({ page }) => {
  32 |     await page.goto("/en/gallery");
  33 | 
  34 |     // If a gallery image exists, try clicking it
  35 |     const galleryBtn = page
  36 |       .getByRole("button")
  37 |       .filter({ has: page.locator("img") })
  38 |       .first();
  39 | 
  40 |     if ((await galleryBtn.count()) > 0) {
  41 |       await galleryBtn.click();
  42 |       await expect(page.getByLabel("Close lightbox")).toBeVisible();
  43 |       await page.keyboard.press("Escape");
  44 |       await expect(page.getByLabel("Close lightbox")).not.toBeVisible();
  45 |     } else {
  46 |       // No gallery items — just verify the page loaded
  47 |       await expect(page.locator("h1")).toBeVisible();
  48 |       test.info().annotations.push({
  49 |         type: "info",
  50 |         description: "No gallery images found to click",
  51 |       });
  52 |     }
  53 |   });
  54 | });
  55 | 
```