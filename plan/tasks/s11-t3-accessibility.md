# Accessibility (WCAG 2.1 AA) pass: contrast, labels, keyboard nav, alt text

**ID:** `s11-t3`  
**Sprint:** Sprint 11 - Hardening, Cross-Browser/Mobile QA & Security Review  
**Epic:** Hardening & QA  
**Track:** Design  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** (none within this task graph — first task, or independent within its sprint)  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None (automated tooling + manual review, no external accounts needed)

## Task Breakdown

```
Read AGENTS.md first. Do a systematic accessibility audit against WCAG 2.1 AA across the public and portal surfaces.

Requirements:
- Run an automated axe-core scan (via Playwright) across every route, and manually triage every violation.
- Manual checks: keyboard-only operability with visible focus indicators; correctly-linked labels on every form input; descriptive alt text on meaningful images, empty alt="" on decorative ones; AA contrast on content and status badges; focus-trapping and Escape-dismissal on the lightbox and EnquiryForm modal.
- Fix every issue found. Produce docs/accessibility-audit-log.md.

Write tests (Vitest + Playwright with axe-core) covering:
1. An automated axe-core scan of the homepage reports zero critical/serious violations.
2. An automated axe-core scan of the BiodataForm page reports zero critical/serious violations.
3. Keyboard-only navigation can complete the EnquiryForm submission flow without a mouse.
4. The lightbox modal traps focus and closes on Escape.

Definition of done: the audit log is complete, all found issues are remediated, and all 4 tests pass.
```

## Definition of Done
- [ ] Automated axe-core scan run across full sitemap, violations triaged
- [ ] Manual keyboard/label/alt-text/contrast/focus-trap review completed
- [ ] All found issues fixed, not just logged
- [ ] docs/accessibility-audit-log.md committed
- [ ] All 4 tests pass in CI
