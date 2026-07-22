# Build /admin/news-events CRUD (News/Event types, bilingual body) + public /news listing and detail pages

**ID:** `s03-t4`  
**Sprint:** Sprint 3 - Content Modules  
**Epic:** Content Modules  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t3, s00-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Initial news/event content from the client (placeholders fine to start)

## Task Breakdown

```
Read AGENTS.md first. Build the News & Events data model, admin CRUD, and public pages.

Requirements:
- Add a NewsEvent model: id, type (enum NEWS|EVENT), titleEn/titleMl, bodyEn/bodyMl, coverImageUrl (nullable), eventDate (DateTime, nullable), publishedAt (DateTime, nullable), slug (unique), createdAt, updatedAt. Migrate.
- Build /admin/news-events: create/edit/delete, type selector, bilingual body, optional event date, publish/unpublish control. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]). Mutations call logAdminAction.
- Build public /news: listing of published items (publishedAt not null), newest first, paginated, distinguishing "Latest news" vs "Upcoming events".
- Build public /news/[slug]: full detail page. Unpublished/non-existent slugs 404.
- Add a homepage "News & Upcoming Events" teaser: recent NEWS items + next upcoming EVENT, linking to /news/[slug], "View all news" link to /news.

Write tests (Vitest) covering:
1. /news only lists items where publishedAt is not null.
2. /news/[slug] for an unpublished item returns 404.
3. The homepage teaser correctly distinguishes NEWS items from the next upcoming EVENT.
4. Publishing a draft item makes it immediately visible on /news.
5. /admin/news-events is denied to a student-role user (403).

Definition of done: admin CRUD and publish workflow work correctly, public pages only show published content with correct 404 handling, and all 5 tests pass.
```

## Definition of Done
- [ ] NewsEvent model migrated
- [ ] Admin CRUD + publish/unpublish control
- [ ] /news lists only published items, paginated
- [ ] /news/[slug] 404s correctly for unpublished/nonexistent
- [ ] Homepage teaser distinguishes News vs upcoming Events
- [ ] All 5 tests pass in CI
