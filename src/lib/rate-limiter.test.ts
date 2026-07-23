// @vitest-environment node

import { describe, expect, test, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimiter } from "./rate-limiter";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  test("allows requests within the limit", () => {
    const config = { windowMs: 60_000, maxRequests: 3 };

    for (let i = 0; i < 3; i++) {
      const result = checkRateLimit("key-a", config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(2 - i);
    }
  });

  test("blocks requests that exceed the limit", () => {
    const config = { windowMs: 60_000, maxRequests: 3 };

    for (let i = 0; i < 3; i++) {
      const result = checkRateLimit("key-b", config);
      expect(result.allowed).toBe(true);
    }

    const blocked = checkRateLimit("key-b", config);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  test("different keys have independent counters", () => {
    const config = { windowMs: 60_000, maxRequests: 1 };

    expect(checkRateLimit("key-c", config).allowed).toBe(true);
    expect(checkRateLimit("key-d", config).allowed).toBe(true);

    // Both keys have now exhausted their single slot
    expect(checkRateLimit("key-c", config).allowed).toBe(false);
    expect(checkRateLimit("key-d", config).allowed).toBe(false);
  });

  test("expired entries roll off after the window passes", () => {
    const config = { windowMs: 60_000, maxRequests: 1 };
    const now = 1_000_000_000_000;

    expect(checkRateLimit("key-e", config, now).allowed).toBe(true);
    expect(checkRateLimit("key-e", config, now).allowed).toBe(false);

    // 61 seconds later — the window has moved
    const later = now + 61_000;
    expect(checkRateLimit("key-e", config, later).allowed).toBe(true);
  });

  test("returns a resetAt timestamp", () => {
    const config = { windowMs: 10_000, maxRequests: 1 };
    const now = 1_000_000_000_000;

    // First request — the slot is used. resetAt should point ahead.
    const first = checkRateLimit("key-f", config, now);
    expect(first.resetAt).toBeGreaterThan(now);

    // Blocked — resetAt is now the (windowStart + windowMs) for the first
    // request, which is the same as what was returned for the first request
    const blocked = checkRateLimit("key-f", config, now);
    expect(blocked.resetAt).toBe(first.resetAt);
  });
});
