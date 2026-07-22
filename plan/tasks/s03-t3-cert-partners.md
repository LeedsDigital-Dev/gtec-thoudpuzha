# Build /admin/certification-partners CRUD + public logo strip component

**ID:** `s03-t3`  
**Sprint:** Sprint 3 - Content Modules  
**Epic:** Content Modules  
**Track:** Backend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s00-t3, s02-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Certification partner logo files from the client (confirm which apply to Thodupuzha specifically)

## Task Breakdown

```
Read AGENTS.md first. Build the Certification Partners data model, admin CRUD, and public display.

Requirements:
- Add a CertificationPartner model: id, name, logoUrl, link (nullable), sortOrder, createdAt. Migrate.
- Build /admin/certification-partners: add/edit/delete/reorder, logo upload via lib/storage.ts. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]). Mutations call logAdminAction.
- Build a public CertificationPartnerStrip component: horizontal logo strip in sortOrder, each logo optionally linking out if `link` is set.

Write tests (Vitest) covering:
1. The public strip renders partners in sortOrder.
2. A partner with no link set renders as a non-clickable logo rather than a broken/empty link.
3. Reordering partners persists and reflects in the public strip's order.
4. /admin/certification-partners is denied to a job_seeker-role user (403).

Definition of done: admin CRUD works including reordering, the public strip renders correctly with and without links, and all 4 tests pass.
```

## Definition of Done
- [ ] CertificationPartner model migrated
- [ ] Admin CRUD including logo upload and reorder
- [ ] Public strip renders in correct order, handles missing link gracefully
- [ ] /admin/certification-partners gated correctly
- [ ] All 4 tests pass in CI
