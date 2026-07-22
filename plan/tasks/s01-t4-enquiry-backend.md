# Wire Enquiry submissions to DB + email notification to Centre Staff

**ID:** `s01-t4`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s01-t3  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Resend account created, API key added to Vercel env vars (RESEND_API_KEY)
- [ ] A sending domain/address configured in Resend (or use Resend's test domain)
- [ ] Centre Staff notification email address(es) confirmed by the client

## Task Breakdown

```
Read AGENTS.md first. Wire the EnquiryForm built in the previous task to a real backend, and give Centre Staff a place to see submitted leads.

Requirements:
- Add an Enquiry model: id, name, phone, courseId (FK to Course, nullable), message (nullable), source (String), createdAt. Migrate.
- Build a server action (or route handler) that validates the incoming payload server-side (never trust client validation alone), creates an Enquiry row, and sends a notification email via Resend + a React Email template to the Centre Staff address(es), including name/phone/course/message/source.
- Replace the stubbed onSubmit in EnquiryForm with a call to this real server action; keep the existing success/error UI states, now driven by the real response.
- Build a simple /admin/enquiries page: table of all Enquiry rows, newest first, showing name/phone/course/source/createdAt, gated by requireRole([CENTRE_STAFF, SUPER_ADMIN]).

Write tests (Vitest) covering:
1. Submitting valid data through the server action creates an Enquiry row with the correct source value.
2. Submitting invalid data (e.g. missing phone) is rejected server-side even if client validation were somehow bypassed.
3. A successful submission triggers exactly one email send call (mock the Resend client).
4. /admin/enquiries is denied to an employer-role user (403) and accessible to centre_staff.

Definition of done: real enquiries land in the database and trigger an email, Centre Staff can view them at /admin/enquiries, and all 4 tests pass.
```

## Definition of Done
- [ ] Enquiry model migrated
- [ ] Server action validates server-side and persists the row
- [ ] Successful submission sends a notification email via Resend
- [ ] EnquiryForm wired to the real action, UI states unchanged
- [ ] /admin/enquiries lists submissions, gated by role
- [ ] All 4 tests pass in CI
