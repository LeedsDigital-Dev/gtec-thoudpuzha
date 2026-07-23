// @vitest-environment node
//
// Security review tests (s11-t2)
// ==============================
// 1. Enquiry endpoint rejects a 6th request within a minute from the same IP.
// 2. Student ID verification lookup is rate-limited.
// 3. Gallery caption / News body with script-tag-like content is stored without tags.
// 4. Full negative-permission regression suite — checked by running the full suite.

import { describe, expect, test, vi, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimiter } from "./rate-limiter";
import { stripHtml } from "./sanitize";

// ─── Test 1: Enquiry rate-limiting ─────────────────────────────────────────

describe("Test 1 — Enquiry rate-limiting", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  test("allows 5 requests per minute per IP", () => {
    const config = { windowMs: 60_000, maxRequests: 5 };
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit("enquiry:192.168.1.1", config);
      expect(result.allowed).toBe(true);
      // Remaining count decreases from 4 to 0
      expect(result.remaining).toBe(4 - i);
    }
  });

  test("rejects the 6th request within a minute from the same IP", () => {
    const config = { windowMs: 60_000, maxRequests: 5 };
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("enquiry:192.168.1.1", config).allowed).toBe(true);
    }
    const sixth = checkRateLimit("enquiry:192.168.1.1", config);
    expect(sixth.allowed).toBe(false);
    expect(sixth.remaining).toBe(0);
  });

  test("different IPs have independent counters", () => {
    const config = { windowMs: 60_000, maxRequests: 5 };
    // Exhaust IP A
    for (let i = 0; i < 5; i++) {
      checkRateLimit("enquiry:10.0.0.1", config);
    }
    // IP B should still be allowed (two calls use 2 of 5 slots)
    expect(checkRateLimit("enquiry:10.0.0.2", config).allowed).toBe(true);
    expect(checkRateLimit("enquiry:10.0.0.2", config).remaining).toBe(3);
  });
});

// ─── Test 2: Student ID lookup rate-limiting ───────────────────────────────

describe("Test 2 — Student ID verification lookup rate-limiting", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  test("allows 5 lookups per minute per IP", () => {
    const config = { windowMs: 60_000, maxRequests: 5 };
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit("student-lookup:10.0.0.1", config);
      expect(result.allowed).toBe(true);
    }
  });

  test("blocks a 6th lookup from the same IP within the window", () => {
    const config = { windowMs: 60_000, maxRequests: 5 };
    for (let i = 0; i < 5; i++) {
      checkRateLimit("student-lookup:192.168.1.100", config);
    }
    expect(
      checkRateLimit("student-lookup:192.168.1.100", config).allowed,
    ).toBe(false);
  });
});

// ─── Test 3: XSS — script tags stripped from stored content ────────────────

describe("Test 3 — Script-tag XSS sanitization", () => {
  test("stripHtml removes <script> tags from gallery caption input", () => {
    const malicious = 'Hello <script>alert("xss")</script>World';
    expect(stripHtml(malicious)).toBe('Hello alert("xss")World');
  });

  test("stripHtml removes arbitrary HTML tags from news body input", () => {
    const malicious =
      '<p>Normal text</p><img src=x onerror=alert(1)><a href="javascript:void(0)">click</a>';
    const result = stripHtml(malicious);
    expect(result).not.toContain("<p>");
    expect(result).not.toContain("<img");
    expect(result).not.toContain("<a ");
    expect(result).toContain("Normal text");
  });

  test("stripHtml leaves plain text unchanged", () => {
    const plain = "This is a perfectly normal caption with 123 numbers.";
    expect(stripHtml(plain)).toBe(plain);
  });

  test("stripHtml handles null-like input gracefully via calling code", () => {
    // The helper is called with a string; null/undefined is guarded
    // at the call site (e.g. `raw ? stripHtml(raw) : null`).
    expect(stripHtml("")).toBe("");
  });
});
