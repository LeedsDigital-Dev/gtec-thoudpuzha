# Cross-browser/mobile QA sweep across public site, portals, and admin

**ID:** `s11-t1`  
**Sprint:** Sprint 11 - Hardening, Cross-Browser/Mobile QA & Security Review  
**Epic:** Hardening & QA  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** (none within this task graph — first task, or independent within its sprint)  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Access to real or emulated devices/browsers for testing (BrowserStack or similar) — optional, local emulation is a fallback

## Task Breakdown

```
Read AGENTS.md first. Do a systematic cross-browser and mobile QA sweep of the entire application, now that all functional sprints are complete.

Requirements:
- Test the full sitemap across latest Chrome, Safari, Edge, Firefox on desktop, Android Chrome + iOS Safari on mobile.
- Verify layout at common breakpoints, header/hamburger menu, touch-usable forms, WhatsApp/Call CTAs on mobile.
- Pay particular attention to the lightbox, PDF download (iOS Safari risk), and CSV bulk-import UI.
- Fix any issues found. Produce docs/cross-browser-qa-log.md.

Write tests (Vitest + Playwright across Chromium/Firefox/WebKit) covering:
1. A smoke-test suite passes against all three Playwright browser engines.
2. The PDF download flow completes successfully in the WebKit engine specifically.
3. Mobile viewport (375px) smoke test: hamburger menu opens and a key CTA is tappable without overflow.

Definition of done: the QA log is complete, all found issues are fixed, and all 3 cross-engine/viewport tests pass in CI.
```

## Definition of Done
- [ ] Full sitemap checked across target browsers and mobile
- [ ] Found issues fixed, not just logged
- [ ] docs/cross-browser-qa-log.md committed
- [ ] Playwright multi-engine smoke tests pass in CI
- [ ] PDF download + mobile viewport regression tests pass
