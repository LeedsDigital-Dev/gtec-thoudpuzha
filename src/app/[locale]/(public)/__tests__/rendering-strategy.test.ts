import { describe, expect, test } from "vitest";

describe("Public route rendering strategy audit", () => {
  test("/ (homepage) uses ISR via revalidate export", async () => {
    const mod = await import("../page");
    expect((mod as { revalidate: number }).revalidate).toBe(60);
  });

  test("/news listing uses ISR via revalidate export", async () => {
    const mod = await import("../news/page");
    expect((mod as { revalidate: number }).revalidate).toBe(60);
  });

  test("/news/[slug] uses ISR via revalidate export", async () => {
    const mod = await import("../news/[slug]/page");
    expect((mod as { revalidate: number }).revalidate).toBe(60);
  });

  test("/placement uses ISR via revalidate export", async () => {
    const mod = await import("../placement/page");
    expect((mod as { revalidate: number }).revalidate).toBe(60);
  });

  test("/about uses ISR via revalidate export", async () => {
    const mod = await import("../about/page");
    expect((mod as { revalidate: number }).revalidate).toBe(60);
  });

  test("public layout declares revalidate=60 (checked via file scan)", async () => {
    // We check via file read rather than import to avoid transitive import issues
    // with next-intl dependencies in the vitest environment.
    const pattern = /export\s+const\s+revalidate\s*=\s*60/;
    // Can't use import because layout pulls in dependencies that need next/navigation
    // This assertion confirms the export is present in the source.
    const { existsSync, readFileSync } = await import("fs");
    const { resolve } = await import("path");
    const filePath = resolve(__dirname, "../layout.tsx");
    expect(existsSync(filePath)).toBe(true);
    expect(pattern.test(readFileSync(filePath, "utf-8"))).toBe(true);
  });
});
