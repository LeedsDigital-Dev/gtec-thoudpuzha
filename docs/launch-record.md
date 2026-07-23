# Launch Record — GTEC Thodupuzha

> **Status:** Go-live in progress  
> **Date prepared:** 2026-07-23  
> **Task:** s12-t4

---

## Go-live Date/Time

- **Scheduled:** TBD — awaiting client go/no-go confirmation
- **Actual:** TBD

---

## DNS Cutover Confirmation

- **Domain:** TBD (to be pointed from Hostinger to production hosting target)
- **SSL/TLS:** TBD (auto-provisioned after DNS resolves)
- **Production hosting:** Vercel
- **Notes:** DNS records must be configured in Hostinger to point at Vercel's provided CNAME/ALIAS target. SSL is auto-provisioned by Vercel once DNS resolves.

---

## Environment Variable Audit

| Variable | Status | Notes |
|---|---|---|
| `DATABASE_URL` | ✅ Verified | Set in environment; connects to Neon Postgres |
| `CLERK_SECRET_KEY` | ✅ Verified | Set in environment |
| `CLERK_PUBLISHABLE_KEY` | ❌ Not set | Required for Clerk middleware — must be configured in Vercel Production |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ❌ Not set | Required for client-side Clerk |
| `NEXT_PUBLIC_SITE_URL` | ❌ Not set | Must be set to the production domain URL |
| `R2_ACCOUNT_ID` | ❌ Not set | Required for media storage |
| `R2_ACCESS_KEY_ID` | ❌ Not set | Required for media storage |
| `R2_SECRET_ACCESS_KEY` | ❌ Not set | Required for media storage |
| `R2_BUCKET_NAME` | ❌ Not set | Required for media storage |
| `RESEND_API_KEY` | ✅ Verified | Set in environment |
| `INNGEST_EVENT_KEY` | ❌ Not set | Required for background jobs |
| `INNGEST_SIGNING_KEY` | ❌ Not set | Required for background jobs |
| `SENTRY_DSN` | ✅ Verified | Set correctly to Sentry.io DSN |

**Findings:** Several env vars are not yet set in the current shell. These must be configured in Vercel's Production environment before go-live.

---

## Smoke Test Results

*To be filled after running against the live production domain.*

| Test | Result | Notes |
|---|---|---|
| Homepage loads (200) | ⏳ Pending | Requires production URL |
| Enquiry form submits | ⏳ Pending | Requires production URL |
| Sign-up (Student) | ⏳ Pending | Requires production URL |
| Sign-up (Job Seeker) | ⏳ Pending | Requires production URL |
| Sign-up (Employer) | ⏳ Pending | Requires production URL |
| Admin login | ⏳ Pending | Requires production URL |
| Course page renders | ⏳ Pending | Requires production URL |
| Gallery page renders | ⏳ Pending | Requires production URL |
| News page renders | ⏳ Pending | Requires production URL |

---

## Sentry Confirmation

- **Sentry SDK:** ✅ Installed and configured (`@sentry/nextjs@10.67.0`)
- **DSN:** ✅ Verified in environment — points to `o4511781135974400.ingest.de.sentry.io`
- **Build integration:** ✅ `withSentryConfig` wraps Next.js config
- **Runtime instrumentation:** ✅ `src/instrumentation.ts` initializes Sentry
- **Production verification:** ⏳ Pending — trigger test error after deployment and confirm receipt in Sentry dashboard

---

## Post-Deploy Tests

Three Playwright tests written at `tests/e2e/post-deploy.spec.ts`:

1. **Homepage 200** — Verifies the production homepage returns HTTP 200 and renders hero content
2. **Enquiry submission** — Submits a full enquiry form with unique test data and confirms success
3. **Sentry error capture** — Verifies Sentry is instrumented in the client bundle (`window.__SENTRY__`) and triggers a test error

These tests require `PRODUCTION_URL` env var to be set to the live domain. They are designed as post-deploy verification steps, not CI gates.

---

## Known Post-Launch Follow-Up Items

1. **Send all Vercel Production env vars** to the client for secure entry into the Vercel dashboard
2. **Configure DNS** in Hostinger: point domain to Vercel's production CNAME
3. **Wait for DNS propagation**, then verify SSL provisioned
4. **Check Malayalam (ML) content** — translations are not fully backfilled per Sprint 10 notes
5. **Verify Sentry alerts** are configured in the Sentry dashboard (email/Slack notifications)
6. **Set up Vercel monitoring** (if desired)
7. **Create production backup schedule** for the Neon database
8. **Train Centre Staff** on admin panel workflows
9. **Remove `Sentry.captureMessage`/test error triggers** after confirming Sentry works in production
10. **Update `plan/manual-content.md`** to track remaining unchecked content items

---

## Sign-Off

| Role | Name | Date | Signature |
|---|---|---|---|
| Client / Stakeholder | TBD | TBD | TBD |
| Technical Lead | TBD | TBD | TBD |
