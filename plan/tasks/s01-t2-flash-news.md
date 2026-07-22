# Build Flash News Bar with admin CRUD (add/edit/expire/reorder)

**ID:** `s01-t2`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t3, s00-t5, s01-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None beyond what's already set up (Clerk, DB)

## Task Breakdown

```
Read AGENTS.md first. Build the Flash News ticker and its admin management page.

Requirements:
- Add a FlashNewsItem model: id, textEn, textMl (nullable), link (String, nullable), active (Boolean, default true), expiresAt (DateTime, nullable), sortOrder (Int), createdAt, updatedAt. Migrate.
- Build a public FlashNewsBar component rendered just below the Header on (public) pages: fetches active, non-expired items ordered by sortOrder, renders as a horizontally scrolling/rotating ticker. Zero qualifying items -> the bar renders nothing.
- Build /admin/flash-news: table of all items (including inactive/expired, visually distinguished), create/edit/delete, active toggle, reorder control, optional expiresAt picker. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]).
- Every create/update/delete calls logAdminAction from lib/audit.ts.

Write tests (Vitest) covering:
1. Public FlashNewsBar only renders items where active=true and expiresAt is null or in the future.
2. Public FlashNewsBar renders nothing when zero qualifying items.
3. Creating a flash news item writes an audit log entry.
4. /admin/flash-news is denied to a job_seeker-role user (403).

Definition of done: the ticker correctly filters by active/expiry, admin CRUD works end to end, audit logging fires, and all 4 tests pass.
```

## Definition of Done
- [ ] FlashNewsItem model migrated
- [ ] Public bar filters correctly by active/expiry, collapses when empty
- [ ] Admin CRUD (create/edit/delete/reorder/toggle active) works
- [ ] Audit log entries written on mutation
- [ ] /admin/flash-news gated correctly
- [ ] All 4 tests pass in CI
