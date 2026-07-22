# Build Application entity + status tracking (Applied/Viewed/Shortlisted/Rejected/Hired)

**ID:** `s08-t3`  
**Sprint:** Sprint 8 - Job Portal & Candidate Search  
**Epic:** Job Portal & Candidate Search  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s08-t2  
**Model tier:** premium — Data isolation correctness (DB-level uniqueness, per-employer/per-candidate scoping) underpins trust in the whole job pipeline.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the Application data model and the status-tracking surfaces for both candidates and employers — this formalizes what the previous task's Apply button creates.

Requirements:
- Add an Application model: id, candidateProfileId (FK), jobPostingId (FK), status (enum APPLIED|VIEWED|SHORTLISTED|REJECTED|HIRED, default APPLIED), appliedAt, statusUpdatedAt, createdAt. UNIQUE constraint on (candidateProfileId, jobPostingId). Migrate.
- Build /portal/student/applications: lists the candidate's own applications, newest first. Never another candidate's.
- Build the employer-side view within /portal/employer: each posting shows its applicant list with a status-update control.
- Viewing an APPLIED applicant's detail from the employer side automatically transitions it to VIEWED.

Write tests (Vitest) covering:
1. The DB-level unique constraint prevents a duplicate Application.
2. A candidate's applications list shows only their own applications.
3. An employer's applicant list shows only applicants to THEIR posting.
4. Viewing an APPLIED applicant transitions it to VIEWED automatically.
5. An employer can explicitly move a VIEWED application to SHORTLISTED, REJECTED, or HIRED.

Definition of done: applications are correctly isolated per-candidate and per-employer, status transitions work as specified, and all 5 tests pass.
```

## Definition of Done
- [ ] Application model migrated with DB-level unique constraint
- [ ] Candidate applications list correctly isolated
- [ ] Employer applicant list correctly isolated per-employer
- [ ] Auto-transition to VIEWED on employer view
- [ ] Manual status transitions work correctly
- [ ] All 5 tests pass in CI
