# Build /admin/staff Centre Staff invite flow via Clerk

**ID:** `s09-t1`  
**Sprint:** Sprint 9 - Admin Staff & Permissions  
**Epic:** Admin Staff & Permissions  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s00-t2, s00-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the first in-app way to onboard Centre Staff — until now, only the v1 Super Admin was seeded manually via the Clerk dashboard.

Requirements:
- Build /admin/staff: list of all users with role=CENTRE_STAFF or SUPER_ADMIN, with an "Invite Staff" action. Gate with requireRole([SUPER_ADMIN]) ONLY.
- Invite flow: Super Admin enters an email, system sends a Clerk invitation with publicMetadata.role pre-set to CENTRE_STAFF.
- Support deactivating a staff member (deactivatedAt field, not hard-delete) — deactivated staff must fail role checks even with a technically-valid session, so requireRole must additionally check this flag.
- Support reactivating.
- All actions call logAdminAction.

Write tests (Vitest, mocking Clerk's invitation API) covering:
1. Sending a staff invite creates a Clerk invitation with role=CENTRE_STAFF pre-set.
2. /admin/staff is denied to a centre_staff-role user (403).
3. Deactivating sets deactivatedAt and requireRole subsequently fails for that user even though the role string is unchanged.
4. Reactivating clears deactivatedAt and requireRole succeeds again.

Definition of done: Super Admin can invite, deactivate, and reactivate Centre Staff entirely in-app, deactivation is enforced at the auth-check level, and all 4 tests pass.
```

## Definition of Done
- [ ] /admin/staff lists staff, Super-Admin-only
- [ ] Invite flow pre-sets role via Clerk invitation
- [ ] Deactivate/reactivate works and is enforced in requireRole itself
- [ ] All 4 tests pass in CI
