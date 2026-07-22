# Add Malayalam fields to all admin-managed content models (Courses, Gallery, News, Certification Partners)

**ID:** `s10-t1`  
**Sprint:** Sprint 10 - Bilingual (EN/ML) Rollout  
**Epic:** Bilingual (EN/ML) Rollout  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s02-t1, s03-t1, s03-t3, s03-t4, s01-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Malayalam translations for existing seeded content from the client or a professional translator

## Task Breakdown

```
Read AGENTS.md first. This is primarily a CONTENT and admin-UI task, not a schema task — *Ml fields should already exist as nullable fields on every model per AGENTS.md's bilingual convention. Verify that's actually true, backfill anything missed, then make the admin UI usable for entering Malayalam content and get real translations in.

Requirements:
- Audit every admin-editable content model (Course, CourseCategory, GalleryItem/GalleryCategory captions, CertificationPartner, NewsEvent, SiteSettings' About/Why-Choose-Us fields) and confirm each has its *Ml counterpart field. Add via migration if missing.
- Update every admin form to show BOTH English and Malayalam inputs side by side (or clearly labeled tabs) for every bilingual field.
- Enter real Malayalam translations for existing seeded content, and replace Sprint 0's "[ML]"-prefixed placeholders in ml.json with real translated core UI strings.
- Verify every public page correctly renders *Ml under /ml, falling back to *En only where a Malayalam value is genuinely missing.

Write tests (Vitest) covering:
1. A Course with both titleEn and titleMl set renders titleMl when visited under /ml.
2. A Course with titleMl left null still renders titleEn under /ml (graceful fallback).
3. Every admin form for the audited models renders both language inputs.
4. ml.json no longer contains any "[ML]" placeholder-prefixed strings for the core nav/common UI keys seeded in Sprint 0.

Definition of done: every admin-managed content model has verified bilingual fields, admin forms support entering both languages, real translations are in for seeded content and core UI strings, and all 4 tests pass.
```

## Definition of Done
- [ ] All admin-managed models confirmed/backfilled with *Ml fields
- [ ] Admin forms show both language inputs for every bilingual field
- [ ] Real Malayalam translations entered for seeded content + core UI strings
- [ ] Public pages fall back gracefully when Ml value missing
- [ ] All 4 tests pass in CI
