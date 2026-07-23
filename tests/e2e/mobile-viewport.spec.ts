import { test, expect } from "@playwright/test";

test.describe("Mobile viewport (375px) smoke tests", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("hamburger menu button is visible and opens nav on mobile", async ({
    page,
  }) => {
    await page.goto("/en");

    // Hamburger button should be visible (lg:hidden)
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();

    // Click to open mobile nav
    await menuButton.click();
    const mobileNav = page.getByLabel("Mobile navigation");
    await expect(mobileNav).toBeVisible();

    // Close menu
    await page.getByLabel("Close menu").click();
    await expect(mobileNav).not.toBeVisible();
  });

  test("WhatsApp CTA is tappable without overflow on mobile", async ({
    page,
  }) => {
    await page.goto("/en");

    // Check no horizontal overflow
    const overflowX = await page.evaluate(() =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
        ? "overflow"
        : "ok",
    );
    expect(overflowX).toBe("ok");

    // WhatsApp button should be visible and have correct href
    const waButton = page.getByLabel("WhatsApp");
    await expect(waButton).toBeVisible();
    await expect(waButton).toHaveAttribute("href", /wa\.me\//);
  });

  test("all navigation items accessible from hamburger menu", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.getByLabel("Open menu").click();

    const mobileNav = page.getByLabel("Mobile navigation");
    await expect(mobileNav).toBeVisible();

    // Verify at least a few key nav links are in the mobile menu
    await expect(mobileNav.getByText("Home")).toBeVisible();
    await expect(mobileNav.getByText("About")).toBeVisible();
    await expect(mobileNav.getByText("Placement")).toBeVisible();
  });

  test("page renders without visible overflow on mobile", async ({
    page,
  }) => {
    await page.goto("/en");

    const hasOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    expect(hasOverflow).toBe(false);
  });
});
