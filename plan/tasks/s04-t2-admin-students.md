# Build /admin/students provisioning (single entry + CSV bulk import of Student ID + name + phone)

**ID:** `s04-t2`  
**Sprint:** Sprint 4 - Auth & Account System  
**Epic:** Auth & Account System  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t3, s00-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Confirm with the client whether existing enrolled-student data is available as a CSV, or whether Centre Staff will enter students one by one going forward

## Task Breakdown

```
Read AGENTS.md first. Build the Centre Staff-side tooling that pre-provisions Student ID records before a student can self-verify — the next task consumes this data.

Requirements:
- Add a StudentRecord model: id, studentId (String, unique), fullName, phone (String), linkedUserId (String, nullable), createdAt. Migrate.
- Build /admin/students: table of all StudentRecord rows showing verification status, a single-entry create form, and a CSV bulk-import (studentId,fullName,phone columns; validate each row, report per-row success/failure rather than failing the whole batch, skip/report duplicates on studentId). Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]).
- studentId must be unique — duplicate attempts fail that specific entry with a clear error, not the whole operation.
- Mutations call logAdminAction (bulk import logs one summary entry).

Write tests (Vitest) covering:
1. Single-entry creation of a StudentRecord succeeds with valid data.
2. CSV bulk import with 5 valid rows creates 5 StudentRecord rows.
3. A CSV bulk import containing one duplicate studentId and four valid rows creates the four valid ones and reports the duplicate as a per-row failure.
4. /admin/students is denied to an employer-role user (403).

Definition of done: single and bulk student provisioning both work with correct duplicate handling and per-row error reporting, and all 4 tests pass.
```

## Definition of Done
- [ ] StudentRecord model migrated
- [ ] Single-entry creation works
- [ ] CSV bulk import works with per-row success/failure reporting
- [ ] Duplicate studentId handled gracefully, doesn't fail whole batch
- [ ] /admin/students gated correctly
- [ ] All 4 tests pass in CI
