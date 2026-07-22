# Performance tuning: ISR/static generation audit, image optimization, LCP targets

**ID:** `s11-t4`  
**Sprint:** Sprint 11 - Hardening, Cross-Browser/Mobile QA & Security Review  
**Epic:** Hardening & QA  
**Track:** Infra/DevOps  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** (none within this task graph — first task, or independent within its sprint)  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Do a systematic performance pass targeting LCP under 2.5s on 4G for public marketing pages.

Requirements:
- Audit every (public) route for rendering strategy: static/ISR wherever content doesn't need per-request personalization. Fix any accidentally left fully dynamic.
- Audit every image for next/image usage with correct sizing/priority hints; fix any raw <img> tags.
- Run Lighthouse against the homepage, a course detail page, and the gallery page; fix the top 2-3 bottlenecks if targets aren't met.
- Produce docs/performance-audit-log.md.

Write tests (Vitest + Playwright/Lighthouse CI) covering:
1. An automated Lighthouse CI run against the homepage reports LCP under 2.5s.
2. A static analysis/runtime check confirms /courses/[slug] uses ISR, not fully dynamic rendering.
3. No raw <img> tags found in a targeted audit of course covers, gallery items, and certification partner logos.

Definition of done: the performance audit log is complete, LCP targets are met on the homepage (or the shortfall and remediation plan is documented), and all 3 tests pass.
```

## Definition of Done
- [ ] Rendering strategy audited and corrected across all (public) routes
- [ ] Image optimization audit completed, raw <img> tags replaced
- [ ] Lighthouse/LCP targets met or shortfall documented with a plan
- [ ] docs/performance-audit-log.md committed
- [ ] All 3 tests pass in CI
