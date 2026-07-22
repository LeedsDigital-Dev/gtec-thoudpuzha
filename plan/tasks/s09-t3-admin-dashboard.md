# Build /admin dashboard summarizing pending approvals + enquiries

**ID:** `s09-t3`  
**Sprint:** Sprint 9 - Admin Staff & Permissions  
**Epic:** Admin Staff & Permissions  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s09-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the admin landing dashboard tying together the moderation and enquiry systems built across previous sprints.

Requirements:
- Build /admin (replacing Sprint 0's placeholder): summary cards for pending employer registrations, pending job postings, pending skills taxonomy entries, and recent enquiries (last 5) with a "View all" link.
- Each card should only be prominent for a user with permission to act on it — reuse requirePermission()/requireRole() checks.
- Include a quick link to /admin/audit-log for Super Admin only.

Write tests (Vitest) covering:
1. The pending employer registrations count matches the actual count of PENDING EmployerProfile rows.
2. The pending job postings count matches the actual count of PENDING JobPosting rows.
3. The recent enquiries list shows the 5 most recent Enquiry rows, newest first.
4. The audit-log quick link is visible to super_admin but not to centre_staff.

Definition of done: the dashboard accurately summarizes pending work across all moderation queues and enquiries, and all 4 tests pass.
```

## Definition of Done
- [ ] /admin dashboard shows accurate counts for employers/job postings/skills pending
- [ ] Recent enquiries list shows correct 5 most recent
- [ ] Cards respect permission visibility appropriately
- [ ] Audit-log link Super-Admin-only
- [ ] All 4 tests pass in CI
