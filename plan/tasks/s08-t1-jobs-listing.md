# Build /portal/jobs listing with filters (course/skill/location/job type)

**ID:** `s08-t1`  
**Sprint:** Sprint 8 - Job Portal & Candidate Search  
**Epic:** Job Portal & Candidate Search  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s07-t4, s07-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the gated job listing page, consuming the JobPosting model from Sprint 7.

Requirements:
- Build a getActiveJobPostings() query helper that ONLY returns JobPosting rows where status=APPROVED, deletedAt is null, and applicationDeadline is in the future.
- Build /portal/jobs: accessible to both student and job_seeker. Lists results from getActiveJobPostings(), with REQUIRED filters for location, job type, skill.
- Salary only shown when salaryVisibility=DISCLOSE; otherwise a "Salary: disclosed at interview" label.
- Build a small public teaser on /placement with "View all vacancies" into the gated listing.

Write tests (Vitest) covering:
1. getActiveJobPostings() excludes PENDING, REJECTED, CLOSED, and soft-deleted postings.
2. getActiveJobPostings() excludes postings past their applicationDeadline.
3. The location and job type filters correctly narrow results.
4. A PRIVATE-salary posting shows the "disclosed at interview" label.
5. /portal/jobs is accessible to both student and job_seeker roles but denied to employer.

Definition of done: the listing correctly filters to only active, approved, non-expired postings, salary visibility is respected, and all 5 tests pass.
```

## Definition of Done
- [ ] getActiveJobPostings() helper enforces status/deletion/deadline filters
- [ ] /portal/jobs accessible to student + job_seeker, denied to employer
- [ ] Location/job type/skill filters work
- [ ] Salary visibility correctly respected
- [ ] /placement teaser shows a subset with CTA
- [ ] All 5 tests pass in CI
