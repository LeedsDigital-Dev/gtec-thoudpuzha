# Security Review Log — s11-t2

**Date:** 2026-07-23  
**Reviewer:** Automated (Command Code agent)  
**Task:** Sprint 11 — Hardening: rate-limiting, XSS/sanitization audit, input validation

---

## Scope

Systematic security hardening pass on every public-facing mutation endpoint built across Sprints 0–10.

---

## 1. Rate-Limiting Implementation

### Backend

**`src/lib/rate-limiter.ts`** — In-memory sliding-window rate limiter.

- Algorithm: Sliding-window counter using a `Map<string, number[]>` of timestamps.
- Configurable window (`windowMs`) and request limit (`maxRequests`).
- `checkRateLimit(key, config, now?)` returns `{ allowed, remaining, resetAt }`.
- `getClientIp()` extracts IP from `x-forwarded-for` / `x-real-ip` headers.
- `resetRateLimiter()` for test cleanup.
- **Zero external dependencies.** Swappable to Upstash Redis by replacing the `store` implementation behind the same function signatures.

### Endpoints protected

| Endpoint | File | Limit | Identifier |
|---|---|---|---|
| Enquiry submission | `src/lib/enquiry.ts` | 5/min/IP | `enquiry:{ip}` |
| Student ID verification lookup | `portal/sign-up/student/actions.ts` | 5/min/IP | `student-lookup:{ip}` |
| Employer registration | `portal/employer/register/actions.ts` | 5/min/IP | `employer-reg:{ip}` |

**Rationale for limits:**
- **5/minute** is aggressive enough to deter enumeration/brute force but generous enough not to block legitimate users on flaky connections.
- **Per-IP** is the simplest identifier available without auth (the enrolment endpoint is fully public; the lookup endpoint is public). A deployed version behind a CDN should use the CDN's trusted IP header (`x-forwarded-for` is already the first check in `getClientIp()`).

### Endpoints not rate-limited (by design)
- `finalizeStudentVerification` — requires authentication (`auth().userId`), so already rate-limitable at the session level. Not public.
- `submitVacancy` (post-vacancy) — authenticated EMPLOYER role. Not public.
- `applyToJob` — authenticated STUDENT/JOB_SEEKER. Not public.
- `saveBiodata` — authenticated. Not public.

---

## 2. Input Validation & Sanitization Audit

### Audit method

Every server action and route handler was reviewed for:
- Server-side validation parity with client-side
- Input sanitization on fields rendered back to other users (XSS risk)
- `$queryRaw` / raw SQL injection risk
- Rule 14 compliance (`"use server"` files only exporting async functions)

### Findings

| Area | Status | Details |
|---|---|---|
| **Client/server validation parity** | ✅ **Gap-free** | All public endpoints have server-side validation that matches or exceeds client-side validation. Enquiry validates name/phone/course on both sides; employer registration validates required fields + enum values on the server. No client-only validation gaps found. |
| **`$queryRaw` usage** | ✅ **No risk** | Single occurrence in `src/__tests__/db.test.ts` for connectivity check (`SELECT 1`). No user input reaches any raw query. All other DB access uses Prisma's type-safe query builder. |
| **Rule 14 compliance** | ✅ **Clean** | No sync helper logic in `"use server"` files. |
| **XSS — Gallery captions** | ✅ **Sanitized** | `stripHtml()` applied to `captionEn`/`captionMl` in `uploadGalleryImages` and `addVideoItem`. Before this fix: captions were stored verbatim with no sanitization. React's default text-child escaping provided the only protection. After fix: HTML tags are stripped at the input layer. |
| **XSS — News body** | ✅ **Sanitized** | `stripHtml()` applied to `bodyEn`/`bodyMl` in `createNewsEvent` and `updateNewsEvent`. Same defense-in-depth reasoning as gallery captions. |
| **XSS — Other admin content** | ✅ **No risk** | Course titles/descriptions, certification partner names, flash news messages — all rendered as React text children, never `dangerouslySetInnerHTML`. No sanitization currently applied because these fields don't accept free-form body content, but the pattern is available if needed. |

### Sanitization helper

**`src/lib/sanitize.ts`** — `stripHtml(input: string): string`

Simple regex-based HTML tag stripping (`/<[^>]*>/g`). Defense-in-depth: React's default escaping already prevents script execution from text children; stripping tags at input eliminates risk from future code paths that might render these fields differently.

### No `dangerouslySetInnerHTML` usage

Confirmed: zero occurrences across the entire codebase. All user-content rendering is via React JSX text children (`{variable}`), which React escapes by default.

---

## 3. Prisma Schema Review — Soft-Delete Compliance

- `JobPosting`, `EmployerProfile`, `Application` — have `deletedAt: DateTime?` (soft-delete, as specified).
- Gallery items, News events, Flash news — hard-delete only (acceptable per convention for pure content).
- No schema-level SQL injection risks identified.

---

## 4. Regression: Sprint 0 + Sprint 4 Auth Tests

Full auth regression suite verified passing:

| Test file | What it tests |
|---|---|
| `src/__tests__/auth.test.tsx` | `handleRouteProtection` middleware — all 5 roles against `/admin` and `/portal`. |
| `src/__tests__/portal-role-gating.test.tsx` | `PortalRoleGate` component — student denied employer pages; job_seeker denied student resources. |
| `src/__tests__/signup-flow.test.tsx` | Role-assignment flow for JOB_SEEKER/EMPLOYER. |

All pass.

---

## 5. Environment Variables / Secrets

No hardcoded secrets found. All env vars referenced via `process.env.*`. `lib/email.ts` (Resend), `lib/storage.ts` (R2), and `lib/db.ts` (Prisma) all follow the lazy-initialization pattern (Rule 11).

---

## 6. Recommended Follow-Ups (post-v1)

- [ ] Swap in-memory rate limiter for Upstash Redis when the app scales beyond single-instance deployment.
- [ ] Add rate-limiting to the authenticated endpoints (vacancy posting, job application, biodata save) once per-user/multi-instance rate limiting is needed.
- [ ] Consider adding `sanitize-html` or `DOMPurify` as a dependency if rich-text editing is introduced (the current `stripHtml` is intentionally minimal — just enough for plain-text fields).
- [ ] Add CDN-level rate limiting (Vercel WAF / Cloudflare) for defense-in-depth at the infrastructure layer.
