import { describe, expect, test } from "vitest";

describe("Contact page route accessibility", () => {
  test("/contact page module exports default async component and revalidate=60", async () => {
    const mod = await import("../contact/page");
    expect(mod.default).toBeTypeOf("function");
    expect(mod.revalidate).toBe(60);
  });
});
