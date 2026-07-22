# Security review: rate-limiting on Enquiry/Apply/Registration endpoints, input validation/sanitization audit

**ID:** `s11-t2`  
**Sprint:** Sprint 11 - Hardening, Cross-Browser/Mobile QA & Security Review  
**Epic:** Hardening & QA  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** (none within this task graph — first task, or independent within its sprint)  
**Model tier:** premium — Security review by definition — rate-limiting, XSS, injection audit.  

## Manual Prerequisites
- [ ] Decide on a rate-limiting backend — recommend Upstash Redis unless the client has a preference; create the account if chosen

## Task Breakdown

```
Read AGENTS.md first. Do a systematic security hardening pass on every public-facing mutation endpoint built across the previous 10 sprints.

Requirements:
- Add rate-limiting to Enquiry submission, sign-up attempts (INCLUDING the Student ID verification lookup — an enumeration-risk endpoint), and Employer registration. Document the chosen limits (e.g. 5/minute/IP).
- Audit every server action/route handler for: server-side validation parity with client-side; input sanitization on any field rendered back to other users (XSS risk); SQL injection risk via any raw prisma.$queryRaw usage.
- Re-verify the negative-permission test suites from Sprint 0 and Sprint 4 still pass as a full-system regression check.
- Produce docs/security-review-log.md.

Write tests (Vitest) covering:
1. The Enquiry endpoint rejects a 6th request within a minute from the same IP with a 429.
2. The Student ID verification lookup endpoint is rate-limited.
3. A Gallery caption or News body field containing a script-tag-like string is stored and rendered without executing as script.
4. The full negative-permission regression suite (Sprint 0 + Sprint 4) still passes.

Definition of done: rate-limiting is in place on all specified endpoints, the sanitization audit is documented with fixes applied, the full auth regression suite passes, and all 4 tests pass.
```

## Definition of Done
- [ ] Rate-limiting added to Enquiry, Sign-up/Student-ID-verify, Employer registration endpoints
- [ ] Server-side validation audit completed, gaps fixed
- [ ] XSS/sanitization audit completed, gaps fixed
- [ ] docs/security-review-log.md committed
- [ ] Full Sprint 0 + Sprint 4 auth regression suite still passes
- [ ] All 4 tests pass in CI
