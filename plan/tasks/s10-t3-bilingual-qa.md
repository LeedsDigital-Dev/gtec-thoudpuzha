# QA pass on bilingual rendering across all public/portal/admin pages

**ID:** `s10-t3`  
**Sprint:** Sprint 10 - Bilingual (EN/ML) Rollout  
**Epic:** Bilingual (EN/ML) Rollout  
**Track:** Design  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s10-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] A Malayalam-fluent reviewer available to sanity-check translation quality and layout

## Task Breakdown

```
Read AGENTS.md first. Do a systematic QA sweep of every page in the app under both locales.

Requirements:
- Walk every route under both /en and /ml, checking layout breakage from longer/shorter Malayalam text, any remaining untranslated string, and correct Malayalam font rendering.
- Fix any layout issues found — this task includes visual polish fixes, not just a bug list.
- Produce docs/bilingual-qa-log.md: every route checked, pass/fail status, issues found and resolution.
- Verify LanguageSwitcher correctly preserves current page/query state when toggling locale on every route type.

Write tests (Vitest + Playwright) covering:
1. An e2e test visiting a representative sample of routes under both locales, asserting no console errors and no obviously untranslated placeholder strings.
2. An e2e test that LanguageSwitcher preserves a dynamic route's slug/id when toggling locale.
3. A visual/layout regression check on at least the Header and homepage Hero under both locales.

Definition of done: the QA log is complete and committed, all found issues are fixed, and all 3 tests pass.
```

## Definition of Done
- [ ] Full route sweep completed under both locales
- [ ] Layout issues found are fixed, not just logged
- [ ] docs/bilingual-qa-log.md committed
- [ ] LanguageSwitcher preserves dynamic route state
- [ ] All 3 tests (incl. Playwright e2e) pass in CI
