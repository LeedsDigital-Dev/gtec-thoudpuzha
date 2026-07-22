# Build Post-a-Vacancy form with salary disclose/private toggle

**ID:** `s07-t3`  
**Sprint:** Sprint 7 - Employer Registration & Vacancy Posting  
**Epic:** Employer Registration & Vacancy Posting  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s07-t1, s05-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the JobPosting data model and the employer-facing form to create one.

Requirements:
- Add a JobPosting model: id, employerId (FK), title, department, salaryMin/salaryMax (Int, nullable), salaryVisibility (enum DISCLOSE|PRIVATE, default PRIVATE), jobType (enum FULL_TIME|PART_TIME|CONTRACT), skillIds (reusing Skill model), applicationDeadline (DateTime), description, status (enum PENDING|APPROVED|REJECTED|CLOSED, default PENDING), autoPublished (Boolean, default false), deletedAt (nullable), createdAt, updatedAt. Migrate.
- Build /portal/employer/post-vacancy with all fields above. Only reachable by an employer with EmployerProfile.status=APPROVED. Skills field reuses SkillMultiSelect.
- On submit: if EmployerProfile.autoPublishTrusted is true, create with status=APPROVED and autoPublished=true immediately. Otherwise status=PENDING.
- Build /portal/employer as the employer dashboard: lists the employer's own postings with status.

Write tests (Vitest) covering:
1. A non-approved employer is blocked from /portal/employer/post-vacancy.
2. An approved but non-trusted employer's new posting has status=PENDING and autoPublished=false.
3. An approved AND trusted employer's new posting has status=APPROVED and autoPublished=true immediately.
4. The salaryVisibility toggle correctly persists as DISCLOSE or PRIVATE.
5. The employer dashboard lists only that employer's own postings.

Definition of done: vacancy posting correctly branches on auto-publish trust, salary visibility persists correctly, and all 5 tests pass.
```

## Definition of Done
- [ ] JobPosting model migrated
- [ ] Form gated to APPROVED employers only
- [ ] Auto-publish-trusted employers skip the moderation queue
- [ ] Non-trusted employers enter PENDING status
- [ ] Salary visibility toggle works
- [ ] Employer dashboard shows only own postings
- [ ] All 5 tests pass in CI
