# Build Student ID + phone OTP verification sub-flow, linking Clerk account to StudentRecord

**ID:** `s04-t3`  
**Sprint:** Sprint 4 - Auth & Account System  
**Epic:** Auth & Account System  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 8  
**Depends on:** s04-t1, s04-t2  
**Model tier:** premium — Highest-stakes flow in the app: enumeration-resistant identity verification (explicitly flagged in its own task prompt).  

## Manual Prerequisites
- [ ] Re-confirm Clerk's phone OTP is enabled and India-deliverable

## Task Breakdown

```
Read AGENTS.md first. Build the highest-stakes auth sub-flow in the app: verifying a real student's claim to a pre-provisioned StudentRecord and linking it to their Clerk account. This completes the /portal/sign-up/student placeholder route.

Requirements:
- Build /portal/sign-up/student: a form asking for Student ID + phone number.
- On submit, look up a StudentRecord matching BOTH studentId AND phone exactly. If no match, show a generic "We couldn't verify these details — please contact the centre" message (do NOT reveal which field was wrong, to avoid enumeration), with WhatsApp/Call CTAs surfaced inline.
- On match, trigger a Clerk phone OTP challenge to the phone number ON FILE — never a phone the user types elsewhere.
- On correct OTP entry: create or link the Clerk account, set publicMetadata.role = STUDENT, create a CandidateProfile with isVerifiedStudent: true and studentRecordId set, and set StudentRecord.linkedUserId to the new Clerk user id.
- A StudentRecord that already has a linkedUserId cannot be claimed again — show "This Student ID has already been registered — if this is you, please sign in instead."
- On success, redirect to /portal/student/biodata (placeholder until Sprint 5).

Write tests (Vitest, mocking Clerk OTP) covering:
1. A correct Student ID + phone pair triggers an OTP challenge.
2. An incorrect Student ID or phone shows the generic non-revealing error message.
3. Successful OTP entry sets role=STUDENT, isVerifiedStudent=true, and correctly links StudentRecord.linkedUserId.
4. Attempting to claim an already-linked StudentRecord is rejected with the "already registered" message, even with correct details.
5. The OTP is sent to the StudentRecord's phone on file, not an arbitrary phone number.

Prioritize tests 2, 4, and 5 — they are the core of this flow's security model. Run the full test suite before finishing.
```

## Definition of Done
- [ ] Correct Student ID + phone triggers OTP to the phone on file
- [ ] Mismatched details show a generic, non-enumerable error
- [ ] Successful verification sets role, isVerifiedStudent, and links both records
- [ ] Already-claimed StudentRecord cannot be re-claimed
- [ ] All 5 tests pass in CI, especially the 3 security-critical ones
