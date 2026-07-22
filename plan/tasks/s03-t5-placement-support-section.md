# Wire Placement & Support homepage section to reuse Gallery items tagged 'Placement'

**ID:** `s03-t5`  
**Sprint:** Sprint 3 - Content Modules  
**Epic:** Content Modules  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 2  
**Depends on:** s03-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the homepage Placement & Support section by reusing the Gallery system rather than a separate content model.

Requirements:
- Ensure a GalleryCategory for "Placement & Support" exists — if not already created via manual admin setup, seed it in a migration/seed script as a default category so this task is self-contained and testable.
- Build the public Placement & Support homepage section: a media grid pulling GalleryItems from that specific category by a STABLE identifier (prefer a slug or well-known seeded ID over matching on display name), showing a limited number (e.g. 6) with a "View full gallery" link to /gallery filtered to that category.
- Add a CTA banner: "View current vacancies" (-> /portal/jobs, placeholder until Sprint 8) and "Are you hiring? Post a vacancy" (-> /portal/employer/register, placeholder until Sprint 7).

Write tests (Vitest) covering:
1. The section renders GalleryItems from the correct category only, not items from other categories.
2. The section correctly limits to the configured item count even if the category has more items.
3. The "View full gallery" link correctly deep-links to /gallery pre-filtered to the Placement category.
4. Both CTA banner links point to the correct (even if not-yet-built) portal routes.

Definition of done: the Placement & Support section correctly reuses Gallery data via a stable category reference, and all 4 tests pass.
```

## Definition of Done
- [ ] Placement & Support category seeded with a stable identifier
- [ ] Homepage section pulls only from that category, limited count
- [ ] "View full gallery" deep-links correctly
- [ ] CTA banner links to job portal routes
- [ ] All 4 tests pass in CI
