# Build /admin/employers moderation queue (approve/reject + set auto-publish trust flag)

**ID:** `s07-t2`  
**Sprint:** Sprint 7 - Employer Registration & Vacancy Posting  
**Epic:** Employer Registration & Vacancy Posting  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s07-t1  
**Model tier:** premium — Moderation gate — a logic error here lets unapproved employers through.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the Super Admin moderation tooling for employer registrations.

Requirements:
- Build /admin/employers: table of EmployerProfile rows filterable by status. Gate MUTATING actions with requireRole([SUPER_ADMIN]) only until Sprint 9's granular permissions ship. Centre Staff may VIEW (read-only) but not approve/reject/trust.
- Approve action: sets status=APPROVED, sends a notification email. Reject action: requires a rejectionReason, sends notification with the reason. "Approve + Mark as Auto-Publish Trusted" sets both fields in one step.
- A separate toggle allows flipping autoPublishTrusted on an already-APPROVED employer at any time.
- All actions call logAdminAction.

Write tests (Vitest) covering:
1. Approving a PENDING employer sets status=APPROVED and sends a notification email.
2. Rejecting requires a rejectionReason.
3. "Approve + Mark as Auto-Publish Trusted" correctly sets both fields in one action.
4. Toggling autoPublishTrusted on an already-approved employer works independently of the approve action.
5. Centre Staff can view /admin/employers (read-only) but cannot trigger approve/reject/trust actions.

Definition of done: the moderation queue supports all four actions correctly with appropriate notifications, Centre Staff has read-only access, and all 5 tests pass.
```

## Definition of Done
- [ ] /admin/employers lists and filters by status
- [ ] Approve/Reject/Approve+Trust actions work with email notifications
- [ ] Reject requires a reason
- [ ] autoPublishTrusted independently toggleable post-approval
- [ ] Centre Staff read-only, Super Admin can mutate
- [ ] All 5 tests pass in CI
