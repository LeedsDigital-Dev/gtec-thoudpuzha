# Integrate Clerk auth with role-based session claims (Student/Job Seeker/Employer/Centre Staff/Super Admin)

**ID:** `s00-t2`  
**Sprint:** Sprint 0 - Foundation & Environment  
**Epic:** Foundation & Infra  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t1  
**Model tier:** premium — Auth foundation — Clerk role model every later access-control decision builds on.  

## Manual Prerequisites
- [ ] Clerk account and application created
- [ ] Clerk API keys (publishable + secret) added to .env.local and Vercel env vars
- [ ] Check India SMS/phone-OTP pricing and deliverability in the Clerk dashboard (fully needed by Sprint 4, worth confirming now)

## Task Breakdown

```
Read AGENTS.md first. Integrate Clerk authentication into the Next.js app for all five roles: student, job_seeker, employer, centre_staff, super_admin. This app has real external users logging in (students, job seekers, employers) — do not build this as an internal-only admin auth system.

Requirements:
- Install and configure @clerk/nextjs. Wrap the app in <ClerkProvider>.
- Store a `role` field in each Clerk user's publicMetadata, one of the five values in AGENTS.md's Role enum.
- Build a `requireRole(allowedRoles: Role[])` server-side helper in lib/auth.ts that reads the current user's role from Clerk session claims and redirects/throws if unauthorized. This must run server-side only — never trust a client-side role check alone for anything that gates data access.
- Add Next.js middleware (middleware.ts): unauthenticated users hitting any /portal/* or /admin/* route are redirected to Clerk's sign-in page. Authenticated users hitting /admin/* with a role other than centre_staff or super_admin get a 403 page, not a raw error.
- Authenticated users with NO role set see a friendly "account setup incomplete, please contact the centre" page rather than a crash.
- Append to AGENTS.md (do not overwrite existing content) that the single v1 Super Admin account is seeded manually via the Clerk dashboard (publicMetadata.role = SUPER_ADMIN) — there is no in-app Super Admin creation flow until Sprint 9.
- Build a minimal /admin dashboard placeholder page that displays "Welcome, {role}", and a minimal /portal placeholder page doing the same for any authenticated non-admin role.

Write tests (Vitest, mocking Clerk session claims via a manual mock of auth()) covering:
1. An unauthenticated request to /admin redirects to sign-in.
2. An unauthenticated request to /portal redirects to sign-in.
3. An authenticated user with role=student is denied access to /admin, receiving a 403, not a silent pass-through.
4. An authenticated user with role=centre_staff succeeds against /admin.
5. An authenticated user with role=super_admin succeeds against /admin.
6. An authenticated user with no role set sees the "account setup incomplete" page, not an error page.

Prioritize the negative-permission tests (1, 2, 3, 6) — they are the security foundation every later module depends on. Run the full test suite before finishing.
```

## Definition of Done
- [ ] Unauthenticated visits to /portal and /admin redirect to sign-in
- [ ] No-role user sees "account setup incomplete" page
- [ ] student/job_seeker/employer roles are denied /admin access with a 403
- [ ] centre_staff and super_admin roles succeed against /admin
- [ ] /admin and /portal placeholder pages show "Welcome, {role}"
- [ ] All 6 tests above pass in CI
