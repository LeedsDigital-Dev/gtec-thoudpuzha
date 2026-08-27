import { describe, expect, test } from "vitest";

describe("Contact page route accessibility", () => {
  test("/contact page module exports default async component", async () => {
    const mod = await import("../contact/page");
    expect(mod.default).toBeTypeOf("function");
  });
});
