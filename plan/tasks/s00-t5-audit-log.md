# Build audit-log service skeleton for admin actions

**ID:** `s00-t5`  
**Sprint:** Sprint 0 - Foundation & Environment  
**Epic:** Foundation & Infra  
**Track:** Backend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s00-t3  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None — pure code task, no external accounts needed

## Task Breakdown

```
Read AGENTS.md first. Build the audit-log skeleton that later admin-mutating tasks (Sprint 1 onward) will call into. This task builds the service and a minimal viewer only — wiring every future mutation to call it is each future task's own responsibility.

Requirements:
- Add an AuditLogEntry model to prisma/schema.prisma: id, actorUserId (FK to User), actorRole (Role), action (String, e.g. "course.create"), entityType (String), entityId (String), metadata (Json, nullable), createdAt. Run the migration.
- Build lib/audit.ts exporting logAdminAction({ actorUserId, actorRole, action, entityType, entityId, metadata }) that writes a row. It must never throw in a way that blocks the calling mutation — wrap the write in a try/catch and log to console on failure.
- Build a minimal, unstyled /admin/audit-log page (not yet linked in navigation) that lists the 50 most recent entries, newest first, gated by requireRole([CENTRE_STAFF, SUPER_ADMIN]).

Write tests (Vitest) covering:
1. logAdminAction successfully writes a row with all fields populated.
2. logAdminAction does not throw when the database write fails (simulate a DB error and assert the function resolves without throwing).
3. The /admin/audit-log page is denied to a student-role user (403) and accessible to centre_staff.

Definition of done: the AuditLogEntry model exists and migrates cleanly, logAdminAction is callable from anywhere in the app, it never throws, and all 3 tests pass.
```

## Definition of Done
- [ ] AuditLogEntry model exists and migrates cleanly
- [ ] logAdminAction() helper never throws on failure
- [ ] /admin/audit-log lists recent entries, gated by role
- [ ] All 3 tests pass in CI
