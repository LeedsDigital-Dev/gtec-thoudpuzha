# Build /admin/job-postings moderation queue + auto-publish bypass logic for trusted employers

**ID:** `s07-t4`  
**Sprint:** Sprint 7 - Employer Registration & Vacancy Posting  
**Epic:** Employer Registration & Vacancy Posting  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s07-t3  
**Model tier:** premium — Moderation gate + auto-publish bypass logic — wrong branching publishes unreviewed postings.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the Super Admin moderation queue for job postings, mirroring the employer moderation queue's pattern.

Requirements:
- Build /admin/job-postings: table filterable by status. Gate mutating actions with requireRole([SUPER_ADMIN]) only; Centre Staff read-only.
- Approve/Reject (reason required)/"Edit & Approve" actions.
- PENDING postings from a non-trusted employer must correctly appear in this queue. APPROVED postings with autoPublished=true do NOT need manual action but must appear in a filtered "Auto-published (for audit)" view, visually distinguished from manually-approved ones.
- All actions call logAdminAction.

Write tests (Vitest) covering:
1. A PENDING posting from a non-trusted employer appears in the moderation queue.
2. An APPROVED, autoPublished=true posting does NOT appear in the "needs action" filter but DOES appear in the "auto-published" audit filter.
3. Approving a posting notifies the employer by email.
4. Rejecting without a reason is blocked.
5. "Edit & Approve" persists both the edited fields and the status change in one action.

Definition of done: the moderation queue correctly separates postings needing action from auto-published ones needing only audit visibility, and all 5 tests pass.
```

## Definition of Done
- [ ] /admin/job-postings lists and filters correctly
- [ ] Approve/Reject/Edit & Approve actions work with notifications
- [ ] Auto-published postings visible in a distinct audit view
- [ ] Reject requires a reason
- [ ] All 5 tests pass in CI
