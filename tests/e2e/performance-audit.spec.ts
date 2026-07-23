import { test, expect } from "@playwright/test";

test.describe("Performance audit — LCP target", () => {
  test("homepage LCP is under 2.5s on simulated 4G", async ({ page }) => {
    await page.goto("/en", { waitUntil: "networkidle" });

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            resolve(entries[entries.length - 1].startTime);
          } else {
            resolve(-1);
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        // Fallback in case LCP hasn't fired yet
        setTimeout(() => resolve(-1), 3000);
      });
    });

    expect(lcp).toBeGreaterThanOrEqual(0);
    expect(lcp).toBeLessThan(2500);
  });
});
