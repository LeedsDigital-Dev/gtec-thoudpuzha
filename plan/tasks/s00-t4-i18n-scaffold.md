# Scaffold next-intl routing structure (EN/ML) and base dictionary files

**ID:** `s00-t4`  
**Sprint:** Sprint 0 - Foundation & Environment  
**Epic:** Foundation & Infra  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s00-t1, s00-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Confirm with the client whether URL-based locale routing (/en/..., /ml/...) is acceptable vs. a cookie/header-based approach — default here is URL-based (best for SEO)

## Task Breakdown

```
Read AGENTS.md first. Scaffold the internationalization infrastructure — routing and empty dictionaries only. Actual translated content is Sprint 10's job; do not translate real copy here.

Requirements:
- Install and configure next-intl for the App Router using locale-prefixed routing (/en/..., /ml/...), with "en" as the default/fallback locale so unprefixed routes resolve to English.
- Create lib/i18n/en.json and lib/i18n/ml.json dictionary files, seeded with a handful of real placeholder keys (nav.home, nav.courses, common.loading, common.submit). ml.json can duplicate the English strings for now with a "[ML]" prefix as an obvious placeholder marker.
- Build a LanguageSwitcher component in components/shared/ that toggles between /en/... and /ml/... for the current path, and place it in the header placeholder from the scaffold task.
- Update middleware.ts to handle locale detection/redirection alongside the existing Clerk route protection from the previous task — the two must not conflict; the Clerk auth check must run regardless of locale prefix.
- Confirm the (public)/(portal)/(admin) route groups all correctly resolve under both locale prefixes.

Write tests (Vitest) covering:
1. Visiting / redirects to /en (or resolves as English) as the default locale.
2. Visiting /ml renders using the Malayalam dictionary (verify a known placeholder string appears).
3. The LanguageSwitcher correctly builds the target URL when toggling locale on a nested path (e.g. /en/courses -> /ml/courses).
4. Middleware still correctly redirects unauthenticated /portal and /admin requests to sign-in regardless of locale prefix (regression check).

Definition of done: both locales are routable, the switcher works on nested paths, and all 4 tests pass, including the auth regression check.
```

## Definition of Done
- [ ] /en and /ml both routable, / defaults to English
- [ ] LanguageSwitcher toggles locale correctly on any path
- [ ] Auth middleware still functions correctly under both locale prefixes
- [ ] All 4 tests pass in CI
