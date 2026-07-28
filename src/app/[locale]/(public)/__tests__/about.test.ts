import { describe, expect, test } from "vitest";

describe("About page route accessibility", () => {
  test("/about page module exports default async component and revalidate=60", async () => {
    const mod = await import("../about/page");
    expect(mod.default).toBeTypeOf("function");
    expect(mod.revalidate).toBe(60);
  });
});
