# Translate and wire static UI strings (buttons, labels, validation messages) into next-intl dictionaries

**ID:** `s10-t2`  
**Sprint:** Sprint 10 - Bilingual (EN/ML) Rollout  
**Epic:** Bilingual (EN/ML) Rollout  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s10-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Malayalam translations for the full static UI string set from the client or translator

## Task Breakdown

```
Read AGENTS.md first. Building on the previous task's core-nav translations, complete translation coverage for every remaining hardcoded English string across the app.

Requirements:
- Systematically audit every component built across Sprints 0-9 for hardcoded UI strings that are NOT admin-managed content (button labels, validation messages, empty states, status labels) and move every one into lib/i18n/en.json and lib/i18n/ml.json.
- Includes EnquiryForm, BiodataForm, status badges (Application/JobPosting/EmployerProfile status), and validation error messages. English-only for /admin/* is a reasonable interpretation of "public/portal-facing" bilingual scope — flag this to the client for explicit confirmation rather than silently deciding it.
- Enter real Malayalam translations for this full string set.
- Final sweep for quoted English strings inside JSX across (public) and (portal) specifically.

Write tests (Vitest) covering:
1. A sample of key user-facing strings render correctly from the dictionary under both /en and /ml.
2. No dictionary key resolves to an empty string or the literal key name, for either locale.
3. The (public) and (portal) route groups contain no remaining obviously-hardcoded English UI strings in the components audited.

Definition of done: static UI strings across (public) and (portal) are fully translated and wired, admin-only scope is explicitly flagged to the client, and all 3 tests pass.
```

## Definition of Done
- [ ] Static UI strings across (public)/(portal) moved into i18n dictionaries
- [ ] Real Malayalam translations entered
- [ ] Admin-only bilingual scope decision flagged to client, not silently assumed
- [ ] Final sweep for missed hardcoded strings
- [ ] All 3 tests pass in CI
