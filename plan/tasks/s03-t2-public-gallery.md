# Build public /gallery page with tabbed categories + lightbox

**ID:** `s03-t2`  
**Sprint:** Sprint 3 - Content Modules  
**Epic:** Content Modules  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s03-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the public Gallery page.

Requirements:
- Build /gallery: tabs for each GalleryCategory (sortOrder), each showing a grid of its GalleryItems (sortOrder). Clicking an IMAGE opens a lightbox with next/prev navigation within the category. Clicking a VIDEO plays inline (if embeddable) or opens externally.
- Categories/items changes in /admin/gallery must reflect without a full redeploy — ISR with a short revalidate, or on-demand revalidation.
- An empty category renders a friendly "No photos yet" state, not a broken grid.

Write tests (Vitest + React Testing Library) covering:
1. /gallery renders a tab per GalleryCategory in sortOrder.
2. Clicking an image thumbnail opens the lightbox showing that image.
3. Lightbox next/prev navigation moves correctly between items within the same category.
4. A category with zero items shows the "No photos yet" empty state.

Definition of done: the gallery page is fully browsable with working lightbox navigation, empty states handled gracefully, and all 4 tests pass.
```

## Definition of Done
- [ ] /gallery renders tabbed categories from live data
- [ ] Lightbox works with next/prev navigation
- [ ] Video items play/link correctly
- [ ] Empty category shows friendly empty state
- [ ] Content updates reflect without full redeploy
- [ ] All 4 tests pass in CI
