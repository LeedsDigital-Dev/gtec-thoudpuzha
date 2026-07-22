# Build Clerk middleware route protection for /portal/* and /admin/* by role

**ID:** `s04-t4`  
**Sprint:** Sprint 4 - Auth & Account System  
**Epic:** Auth & Account System  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s04-t1, s04-t3  
**Model tier:** premium — Security — fine-grained authorization across every /portal/* sub-area.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Sprint 0 built coarse route protection (any authenticated role can access /portal/*, only centre_staff/super_admin can access /admin/*). Now that this sprint's sign-up flows produce role-differentiated users, extend protection to be fine-grained WITHIN /portal/*.

Requirements:
- Prefer requireRole()-style checks at the page/layout level over expanding middleware path-matching; middleware stays responsible only for the coarse "authenticated at all" check.
- Add a requirePortalRole(allowedRoles) helper alongside requireRole() in lib/auth.ts — renders a friendly "this area isn't for your account type" message rather than a hard 403.
- Apply requirePortalRole so that: /portal/employer/* requires role=EMPLOYER; /portal/student/resources/* requires role=STUDENT specifically (a JOB_SEEKER must NOT access Academic Resources — deliberate, not a bug); /portal/student/biodata is accessible to BOTH student and job_seeker; /portal/jobs is accessible to both student and job_seeker.

Write tests (Vitest) covering:
1. A job_seeker-role user is denied /portal/student/resources with the friendly message, not a raw 403.
2. A student-role user succeeds at /portal/student/resources.
3. Both student and job_seeker roles succeed at /portal/student/biodata.
4. A student-role user is denied /portal/employer/* with the friendly message.
5. An employer-role user succeeds at /portal/employer/*.
6. Regression: /admin/* protection from Sprint 0 is unaffected.

Definition of done: fine-grained role gating works correctly across all /portal/* sub-areas without breaking Sprint 0's /admin/* protection, and all 6 tests pass.
```

## Definition of Done
- [ ] /portal/employer/* restricted to EMPLOYER role
- [ ] /portal/student/resources/* restricted to STUDENT role only (not job_seeker)
- [ ] /portal/student/biodata and /portal/jobs open to both student and job_seeker
- [ ] Denied access shows a friendly message, not a raw 403
- [ ] /admin/* protection unaffected (regression check)
- [ ] All 6 tests pass in CI
