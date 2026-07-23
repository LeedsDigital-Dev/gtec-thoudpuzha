# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-viewport.spec.ts >> Mobile viewport (375px) smoke tests >> page renders without visible overflow on mobile
- Location: tests/e2e/mobile-viewport.spec.ts:60:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en
Call log:
  - navigating to "http://localhost:3000/en", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Mobile viewport (375px) smoke tests", () => {
  4  |   test.use({ viewport: { width: 375, height: 667 } });
  5  | 
  6  |   test("hamburger menu button is visible and opens nav on mobile", async ({
  7  |     page,
  8  |   }) => {
  9  |     await page.goto("/en");
  10 | 
  11 |     // Hamburger button should be visible (lg:hidden)
  12 |     const menuButton = page.getByLabel("Open menu");
  13 |     await expect(menuButton).toBeVisible();
  14 | 
  15 |     // Click to open mobile nav
  16 |     await menuButton.click();
  17 |     const mobileNav = page.getByLabel("Mobile navigation");
  18 |     await expect(mobileNav).toBeVisible();
  19 | 
  20 |     // Close menu
  21 |     await page.getByLabel("Close menu").click();
  22 |     await expect(mobileNav).not.toBeVisible();
  23 |   });
  24 | 
  25 |   test("WhatsApp CTA is tappable without overflow on mobile", async ({
  26 |     page,
  27 |   }) => {
  28 |     await page.goto("/en");
  29 | 
  30 |     // Check no horizontal overflow
  31 |     const overflowX = await page.evaluate(() =>
  32 |       document.documentElement.scrollWidth >
  33 |       document.documentElement.clientWidth
  34 |         ? "overflow"
  35 |         : "ok",
  36 |     );
  37 |     expect(overflowX).toBe("ok");
  38 | 
  39 |     // WhatsApp button should be visible and have correct href
  40 |     const waButton = page.getByLabel("WhatsApp");
  41 |     await expect(waButton).toBeVisible();
  42 |     await expect(waButton).toHaveAttribute("href", /wa\.me\//);
  43 |   });
  44 | 
  45 |   test("all navigation items accessible from hamburger menu", async ({
  46 |     page,
  47 |   }) => {
  48 |     await page.goto("/en");
  49 |     await page.getByLabel("Open menu").click();
  50 | 
  51 |     const mobileNav = page.getByLabel("Mobile navigation");
  52 |     await expect(mobileNav).toBeVisible();
  53 | 
  54 |     // Verify at least a few key nav links are in the mobile menu
  55 |     await expect(mobileNav.getByText("Home")).toBeVisible();
  56 |     await expect(mobileNav.getByText("About")).toBeVisible();
  57 |     await expect(mobileNav.getByText("Placement")).toBeVisible();
  58 |   });
  59 | 
  60 |   test("page renders without visible overflow on mobile", async ({
  61 |     page,
  62 |   }) => {
> 63 |     await page.goto("/en");
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/en
  64 | 
  65 |     const hasOverflow = await page.evaluate(() => {
  66 |       return (
  67 |         document.documentElement.scrollWidth >
  68 |         document.documentElement.clientWidth
  69 |       );
  70 |     });
  71 |     expect(hasOverflow).toBe(false);
  72 |   });
  73 | });
  74 | 
```