import { describe, expect, test } from "vitest";

describe("About page route accessibility", () => {
  test("/about page module exports default async component", async () => {
    const mod = await import("../about/page");
    expect(mod.default).toBeTypeOf("function");
  });
});
