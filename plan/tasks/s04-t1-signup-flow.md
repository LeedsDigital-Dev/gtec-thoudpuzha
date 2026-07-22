# Build role-selection sign-up flow (Student / Job Seeker / Employer) on top of Clerk

**ID:** `s04-t1`  
**Sprint:** Sprint 4 - Auth & Account System  
**Epic:** Auth & Account System  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t2, s00-t3  
**Model tier:** premium — Auth core — sets the role that gates every subsequent portal decision.  

## Manual Prerequisites
- [ ] None beyond what's already set up

## Task Breakdown

```
Read AGENTS.md first. Build the public-facing sign-up entry point that routes new users into the correct onboarding sub-flow.

Requirements:
- Build /portal/sign-up: presents three clear options — "I'm a G-TEC Thodupuzha student", "I'm looking for a job", "I'm an employer looking to hire" — each a distinct, clickable card/button, not a dropdown.
- Selecting "I'm a G-TEC Thodupuzha student" routes to /portal/sign-up/student (a placeholder page for now — real Student ID + OTP verification is the next task).
- Selecting "I'm looking for a job" routes to Clerk's standard sign-up flow; on success sets publicMetadata.role = JOB_SEEKER and creates a corresponding CandidateProfile row (isVerifiedStudent: false).
- Selecting "I'm an employer looking to hire" routes to Clerk's standard sign-up flow; on success sets publicMetadata.role = EMPLOYER, then redirects to /portal/employer/register (placeholder until Sprint 7).
- After the Job Seeker path completes, redirect to /portal/student/biodata (placeholder until Sprint 5).
- Re-visiting /portal/sign-up while already authenticated redirects sensibly based on existing role.

Write tests (Vitest, mocking Clerk) covering:
1. Completing the Job Seeker path sets publicMetadata.role = JOB_SEEKER and creates a CandidateProfile with isVerifiedStudent: false.
2. Completing the Employer path sets publicMetadata.role = EMPLOYER.
3. An already-authenticated user with role=student visiting /portal/sign-up is redirected away from the picker.
4. Selecting the Student option routes to /portal/sign-up/student WITHOUT setting a role yet.

Definition of done: the three-way picker works, Job Seeker and Employer paths correctly set role and create baseline records, the Student path defers role-setting to the next task, and all 4 tests pass.
```

## Definition of Done
- [ ] /portal/sign-up shows 3-way picker (Student/Job Seeker/Employer)
- [ ] Job Seeker path sets role + creates CandidateProfile
- [ ] Employer path sets role, redirects toward registration
- [ ] Student path routes to placeholder without setting role prematurely
- [ ] Already-authenticated users don't see the picker again
- [ ] All 4 tests pass in CI
