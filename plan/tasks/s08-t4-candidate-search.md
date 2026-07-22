# Build /portal/employer/candidates search with filters over CandidateProfile

**ID:** `s08-t4`  
**Sprint:** Sprint 8 - Job Portal & Candidate Search  
**Epic:** Job Portal & Candidate Search  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s05-t4, s07-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the employer-side candidate search, consuming the getSearchableCandidates() helper from Sprint 5.

Requirements:
- Build /portal/employer/candidates: accessible only to APPROVED employers. Uses getSearchableCandidates() as its base query.
- Filters: course completed, certification earned, skills, preferred location, preferred job type, educational qualification, languages known.
- Each result shows a summary card with a link to the full profile detail, reusing Sprint 5's PDF access-control pattern.
- Add an "Invite to Apply" action: employer selects one of their own APPROVED postings, sends a notification email. Does NOT auto-create an Application.

Write tests (Vitest) covering:
1. Search results only include candidates with profileVisible=true and isComplete=true.
2. Each filter correctly narrows results when applied.
3. A non-approved employer is blocked.
4. "Invite to Apply" sends a notification email but does NOT create an Application record.
5. An employer can only select from their OWN approved postings when sending an invite.

Definition of done: candidate search correctly respects visibility/completeness, all filters work, invite-to-apply notifies without auto-applying, and all 5 tests pass.
```

## Definition of Done
- [ ] Candidate search uses getSearchableCandidates(), gated to APPROVED employers
- [ ] All 7 filters work correctly
- [ ] Full profile detail viewable by employer
- [ ] "Invite to Apply" sends notification without creating an Application
- [ ] Employer restricted to inviting via their own postings
- [ ] All 5 tests pass in CI
