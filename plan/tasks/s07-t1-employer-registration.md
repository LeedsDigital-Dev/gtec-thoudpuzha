# Build Employer Registration form + status workflow (Pending/Approved/Rejected)

**ID:** `s07-t1`  
**Sprint:** Sprint 7 - Employer Registration & Vacancy Posting  
**Epic:** Employer Registration & Vacancy Posting  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s04-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Fixed list of Industry/Sector options confirmed by the client
- [ ] No. of employees range bands confirmed (default: 1-10, 11-50, 51-200, 200+)

## Task Breakdown

```
Read AGENTS.md first. Build the EmployerProfile data model and its self-service registration form.

Requirements:
- Add an EmployerProfile model: id, userId (FK, unique), companyName, industrySector (enum from confirmed list), contactPersonName, designation, phone, email, companyAddress, hasWebsite (Boolean), websiteUrl (nullable, required if hasWebsite is true), employeeCountRange (enum), aboutCompany, status (enum PENDING|APPROVED|REJECTED, default PENDING), autoPublishTrusted (Boolean, default false), rejectionReason (nullable), createdAt, updatedAt. Migrate.
- Build /portal/employer/register with all fields above. The "Website" field must enforce the "one selection mandatory" rule BOTH client-side and server-side.
- On submit, create with status=PENDING and redirect to a "Your registration is under review" page. Pending/rejected employers attempting /portal/employer/post-vacancy (placeholder) are redirected back to this status page.
- An employer who already has an EmployerProfile is redirected away from /portal/employer/register.

Write tests (Vitest) covering:
1. Submitting with "No website" selected succeeds without a URL.
2. Submitting with "Add link" but no URL provided is rejected server-side.
3. A newly registered employer has status=PENDING and autoPublishTrusted=false by default.
4. An employer with status=PENDING is blocked from the placeholder post-vacancy route, redirected to the status page.
5. An employer who already has an EmployerProfile cannot submit the registration form again.

Definition of done: registration works with correct website-field validation, new employers start PENDING and untrusted, pending/rejected employers are correctly blocked from vacancy posting, and all 5 tests pass.
```

## Definition of Done
- [ ] EmployerProfile model migrated
- [ ] Registration form enforces website field rule client + server side
- [ ] New employers default to PENDING, autoPublishTrusted=false
- [ ] Pending/rejected employers blocked from vacancy posting
- [ ] Already-registered employers can't re-register
- [ ] All 5 tests pass in CI
