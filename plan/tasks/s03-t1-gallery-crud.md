# Build /admin/gallery CRUD with categories, bulk upload, and object storage integration

**ID:** `s03-t1`  
**Sprint:** Sprint 3 - Content Modules  
**Epic:** Content Modules  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t3, s02-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Initial batch of job-fair/event/programme photos from the client (placeholders fine to start)

## Task Breakdown

```
Read AGENTS.md first. Build the Gallery data model and its admin CRUD, including bulk upload.

Requirements:
- Add GalleryCategory (id, nameEn, nameMl, sortOrder) and GalleryItem (id, categoryId FK, mediaType enum IMAGE|VIDEO, url, captionEn, captionMl nullable, sortOrder, createdAt). Migrate.
- Build /admin/gallery: category CRUD (create/rename/delete/reorder — deleting a category with items should cascade-delete with a confirmation warning or block until emptied; document your choice), media management within a category supporting BULK upload (multi-file select, uploads to R2, one GalleryItem per file). VIDEO-type items use a URL field instead of upload (hosted externally per AGENTS.md). Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]).
- Mutations call logAdminAction — for bulk upload, log ONE entry summarizing the batch, not one per file.

Write tests (Vitest) covering:
1. Bulk-uploading 3 images to a category creates 3 GalleryItem rows correctly associated with that category.
2. A bulk upload writes exactly one audit log entry summarizing the batch, not one per file.
3. Adding a VIDEO-type item stores the external URL without attempting an R2 upload.
4. /admin/gallery is denied to an employer-role user (403).

Definition of done: category and item CRUD work including bulk image upload and video URL entry, audit logging is batched correctly, and all 4 tests pass.
```

## Definition of Done
- [ ] GalleryCategory + GalleryItem models migrated
- [ ] Bulk image upload to R2 works
- [ ] Video items store external URL, no R2 upload attempted
- [ ] Audit log batched per bulk-upload action
- [ ] /admin/gallery gated correctly
- [ ] All 4 tests pass in CI
