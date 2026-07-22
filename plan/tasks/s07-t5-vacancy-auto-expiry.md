# Build Inngest job for vacancy auto-expiry on deadline

**ID:** `s07-t5`  
**Sprint:** Sprint 7 - Employer Registration & Vacancy Posting  
**Epic:** Employer Registration & Vacancy Posting  
**Track:** Backend  
**Priority:** Should Have  
**Story Points:** 2  
**Depends on:** s07-t3  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Inngest account created, event/signing keys added to Vercel env vars

## Task Breakdown

```
Read AGENTS.md first. Build the scheduled job that auto-closes job postings past their deadline.

Requirements:
- Set up the Inngest client and a Next.js API route handler for Inngest functions.
- Build an Inngest scheduled function (cron, e.g. daily) that finds all JobPosting rows where status=APPROVED, deletedAt is null, and applicationDeadline is in the past, and updates them to status=CLOSED.
- This is a SYSTEM action, not an admin action — do NOT call logAdminAction; write a distinct system-level log entry (e.g. actorUserId="system"). Document this choice.
- The function must be idempotent.

Write tests (Vitest) covering:
1. A posting with applicationDeadline in the past and status=APPROVED is transitioned to CLOSED.
2. A posting with applicationDeadline in the future is NOT transitioned.
3. Running the function twice in succession does not error and does not create duplicate log entries.
4. A soft-deleted posting is excluded from processing even if its deadline has passed.

Definition of done: the scheduled job correctly and idempotently closes expired postings, and all 4 tests pass.
```

## Definition of Done
- [ ] Inngest client + API route configured
- [ ] Scheduled function correctly closes expired APPROVED postings
- [ ] Idempotent — safe to run multiple times
- [ ] Soft-deleted postings excluded
- [ ] System-actor audit logging documented and implemented
- [ ] All 4 tests pass in CI
