# Build granular permission toggle matrix per staff member

**ID:** `s09-t2`  
**Sprint:** Sprint 9 - Admin Staff & Permissions  
**Epic:** Admin Staff & Permissions  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s09-t1, s07-t2, s07-t4  
**Model tier:** premium — Security-critical rewrite of previously-hardcoded access gates across two earlier modules.  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Replace the fixed "all Centre Staff can do X, only Super Admin can do Y" checks used so far with a per-staff-member permission grid.

Requirements:
- Add a StaffPermission model: id, userId (FK, unique), boolean flags: canEditCourses, canEditGallery, canEditCertificationPartners, canEditNewsEvents, canEditFlashNews, canProvisionStudents, canApproveEmployers (default false), canApproveJobPostings (default false), canModerateSkillsTaxonomy. Migrate. New Centre Staff get sensible default flags (content-editing true, approval flags false).
- Add requirePermission(permissionKey) in lib/auth.ts — Super Admin always passes.
- GO BACK and migrate Sprint 7's hardcoded Super-Admin-only gates (/admin/employers, /admin/job-postings approve/reject) to use requirePermission('canApproveEmployers') / requirePermission('canApproveJobPostings').
- Build a UI on /admin/staff for Super Admin to toggle each permission per staff member. All changes call logAdminAction.

Write tests (Vitest) covering:
1. A Centre Staff member without canApproveEmployers=true is still denied the approve action.
2. Granting canApproveEmployers=true to a specific staff member allows THAT user only.
3. Super Admin can always approve/reject regardless of any StaffPermission row state.
4. Toggling a permission writes an audit log entry.

Definition of done: the permission grid replaces the hardcoded Sprint 7 restriction without breaking its default-denied behavior, per-staff-member grants work correctly, and all 4 tests pass.
```

## Definition of Done
- [ ] StaffPermission model migrated with sensible defaults
- [ ] requirePermission() helper built, Super Admin always passes
- [ ] Sprint 7's hardcoded Super-Admin-only gates migrated to use requirePermission()
- [ ] Per-staff-member grants work correctly and are isolated
- [ ] All 4 tests pass in CI
