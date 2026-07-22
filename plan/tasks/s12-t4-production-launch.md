# Production go-live: domain cutover, environment variable audit, final smoke test

**ID:** `s12-t4`  
**Sprint:** Sprint 12 - UAT & Launch  
**Epic:** UAT & Launch  
**Track:** Infra/DevOps  
**Priority:** Must Have  
**Story Points:** 2  
**Depends on:** s12-t1, s12-t2, s12-t3  
**Model tier:** premium — Final production gate — env var and DNS mistakes here are expensive to discover after the fact.  

## Manual Prerequisites
- [ ] Domain DNS records ready to point from Hostinger to the production hosting target
- [ ] All production environment variables collected and verified
- [ ] Final go/no-go confirmation from the client to launch

## Task Breakdown

```
Read AGENTS.md first. Execute the production launch — the final task in the delivery plan; every previous sprint's Definition of Done is a prerequisite for this one.

Requirements:
- Full environment variable audit: confirm every variable in AGENTS.md's list is set correctly in Vercel's Production environment with real production values — verify none are accidentally still pointing at test/sandbox values.
- Domain cutover: point Hostinger's DNS to the production hosting target, verify SSL/TLS, confirm the site is reachable at the real production domain.
- Final full smoke test against the LIVE production domain: homepage loads, Enquiry submits, sign-up works for all three entry paths, admin can log in, a sampled course/gallery/news page renders.
- Confirm Sentry is receiving events from production specifically (trigger and verify a test error, then remove the trigger).
- Produce docs/launch-record.md: go-live date/time, DNS cutover confirmation, env var audit sign-off, smoke test results, known post-launch follow-up items.

Write tests (Vitest + Playwright, run against the live production URL as a post-deploy verification step) covering:
1. The production homepage returns a 200 and renders the expected hero content.
2. A full Enquiry submission against production succeeds and the record is confirmed (via admin dashboard or DB).
3. Sentry receives a deliberately-triggered test error from production (then the trigger is cleaned up).

Definition of done: the domain is live with correct DNS/SSL, all environment variables are verified production values, the full smoke test passes against the live domain, Sentry is confirmed working in production, the launch record is committed, and all 3 post-deploy tests pass.
```

## Definition of Done
- [ ] All environment variables verified as production values, no test/sandbox leakage
- [ ] Domain cutover complete, SSL provisioned, site reachable at production domain
- [ ] Full smoke test passes against the live production URL
- [ ] Sentry confirmed receiving events from production
- [ ] docs/launch-record.md committed with sign-off and follow-up items
- [ ] All 3 post-deploy tests pass
