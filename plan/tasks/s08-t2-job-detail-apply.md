# Build /portal/jobs/[id] detail page + one-click Apply from saved Biodata

**ID:** `s08-t2`  
**Sprint:** Sprint 8 - Job Portal & Candidate Search  
**Epic:** Job Portal & Candidate Search  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s08-t1, s05-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the job detail page and the one-click Apply flow — this is the moment the Biodata built in Sprint 5 becomes useful.

Requirements:
- Build /portal/jobs/[id]: full detail using getActiveJobPostings() (or a single-record equivalent respecting the same filters) — non-existent/inactive/expired ids return 404.
- Show an "Apply" button. If CandidateProfile.isComplete is false, show "Complete your profile to apply" instead.
- If complete, clicking Apply immediately creates an Application record using the candidate's saved Biodata — no separate form.
- After applying, the button becomes "Applied ✓" and disabled, driven by a real Application record, persisting across reloads.

Write tests (Vitest + React Testing Library) covering:
1. A candidate with an incomplete profile sees "Complete your profile to apply" instead of an active Apply button.
2. A candidate with a complete profile can click Apply and an Application record is created.
3. Attempting to apply a second time to the same job is blocked.
4. Reloading the job detail page after applying still shows "Applied ✓".
5. Requesting a non-existent or expired job id returns 404.

Definition of done: one-click apply works correctly gated on profile completeness, duplicate-apply is prevented and persists across reloads, and all 5 tests pass.
```

## Definition of Done
- [ ] /portal/jobs/[id] renders detail, 404s for invalid/expired ids
- [ ] Apply disabled with a clear prompt for incomplete profiles
- [ ] One-click apply creates an Application with no re-entry of data
- [ ] Duplicate-apply blocked, state persists across reloads
- [ ] All 5 tests pass in CI
