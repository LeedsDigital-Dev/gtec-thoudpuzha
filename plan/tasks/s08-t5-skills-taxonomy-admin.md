# Build Skills Taxonomy table + /admin/skills-taxonomy merge/approve tooling

**ID:** `s08-t5`  
**Sprint:** Sprint 8 - Job Portal & Candidate Search  
**Epic:** Job Portal & Candidate Search  
**Track:** Backend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s05-t2, s07-t3  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the admin curation tooling for the Skill model that's been seeded organically since Sprint 5.

Requirements:
- Build /admin/skills-taxonomy: list of Skill rows filterable by status, showing reference counts. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]).
- Approve action: sets status=APPROVED.
- Merge action: re-points every CandidateProfile/JobPosting reference from a duplicate skill to a canonical one, then deletes/marks the duplicate. Must NOT silently drop any association.
- Reject/delete for junk entries, ONLY for skills with zero references.
- Mutations call logAdminAction.

Write tests (Vitest) covering:
1. Approving a PENDING skill makes it appear as a suggestion in SkillMultiSelect.
2. Merging skill A into skill B re-points all CandidateProfile references.
3. Merging skill A into skill B re-points all JobPosting references too.
4. Deleting a skill with active references is blocked, suggesting merge instead.
5. /admin/skills-taxonomy is denied to a job_seeker-role user (403).

Definition of done: approve/merge/delete all work correctly with no silent data loss on merge, and all 5 tests pass.
```

## Definition of Done
- [ ] /admin/skills-taxonomy lists skills with reference counts
- [ ] Approve action works, reflects in SkillMultiSelect
- [ ] Merge re-points both candidate AND job posting references correctly
- [ ] Delete blocked for skills still in active use
- [ ] All 5 tests pass in CI
