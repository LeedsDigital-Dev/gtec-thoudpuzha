# Run UAT sessions with GTEC Thodupuzha Centre Staff + Super Admin

**ID:** `s12-t2`  
**Sprint:** Sprint 12 - UAT & Launch  
**Epic:** UAT & Launch  
**Track:** Content/Data  
**Priority:** Must Have  
**Story Points:** 2  
**Depends on:** s09-t3, s10-t3, s11-t1, s11-t2, s11-t3, s11-t4  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Centre Staff and Super Admin accounts provisioned in staging/production for UAT participants
- [ ] UAT session(s) scheduled with the client
- [ ] A UAT feedback tracking sheet/doc prepared

## Task Breakdown

```
Read AGENTS.md first. This is primarily a facilitation/coordination task with a scoped-down engineering deliverable: preparing a UAT script and triaging/fixing what's found, not building new features.

Requirements:
- Prepare a UAT script covering core flows: publishing a course, uploading gallery photos, approving/rejecting an employer registration, approving/rejecting a job posting, inviting a staff member and toggling permissions, viewing the admin dashboard and audit log. Base this on the Definition of Done checklists already written across every task.
- Run the sessions, capturing feedback in docs/uat-feedback-log.md, tagged Bug / UX Improvement / Out-of-Scope Request.
- Fix all Bugs (must-fix before launch). Small UX Improvements fixed now; larger ones documented as post-launch backlog. Out-of-Scope Requests logged for future phases, not built now.
- Re-run relevant automated test suites for any Bug fix, to confirm no regression.

Write tests (Vitest) covering:
1. For each Bug fixed as a result of UAT, add a new regression test that would have caught it.
2. The full existing test suite still passes after UAT-driven fixes.

Definition of done: UAT sessions are complete, the feedback log is committed with clear triage tags, all Bugs are fixed with regression tests added, and the full test suite passes.
```

## Definition of Done
- [ ] UAT script prepared covering core admin/staff flows
- [ ] UAT session(s) run with real Centre Staff + Super Admin
- [ ] docs/uat-feedback-log.md committed with triaged findings
- [ ] All confirmed Bugs fixed with regression tests added
- [ ] Full test suite still passes after fixes
