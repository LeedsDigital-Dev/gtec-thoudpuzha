# Build /admin/courses CRUD (categories, courses, bilingual fields, syllabus, certifications)

**ID:** `s02-t1`  
**Sprint:** Sprint 2 - Courses Module  
**Epic:** Courses Module  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 8  
**Depends on:** s00-t3, s00-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Final list of course categories and individual courses to seed, from the client (placeholder set fine to start)
- [ ] Certification badge list confirmed
- [ ] Cloudflare R2 bucket created, credentials added to Vercel env vars

## Task Breakdown

```
Read AGENTS.md first. Extend the skeletal Course model from Sprint 0 into the full Courses data model, and build its admin CRUD.

Requirements:
- Add a CourseCategory model: id, nameEn, nameMl (nullable), sortOrder, createdAt, updatedAt.
- Extend the Course model from Sprint 0's skeleton (ALTER, do not redefine) with: categoryId (FK), descriptionEn/descriptionMl, durationText, syllabus (structured Json), certifications (String[] or join table), careerOutcomesEn/careerOutcomesMl, coverImageUrl (nullable), featured (Boolean, default false), status (enum DRAFT | PUBLISHED | ARCHIVED, default DRAFT). Migrate.
- Build lib/storage.ts if it doesn't exist yet: an uploadFile(file, folder) helper against Cloudflare R2.
- Build /admin/courses: category management (create/edit/delete/reorder) and course management (create/edit/archive, all fields above, cover image upload). Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]).
- Build a getPublishedCourses() query helper that ONLY ever returns status=PUBLISHED courses — every future task needing public course data must reuse this helper.
- Mutations call logAdminAction.

Write tests (Vitest) covering:
1. A DRAFT course is not returned by getPublishedCourses().
2. A PUBLISHED course is returned by getPublishedCourses().
3. Creating a course via /admin/courses with a category assigned persists correctly and is retrievable with its category joined.
4. /admin/courses is denied to a student-role user (403).
5. Uploading a course cover image via the admin form successfully stores it in R2 and persists the URL.

Definition of done: category and course CRUD work end to end including image upload, only published courses are queryable publicly, and all 5 tests pass.
```

## Definition of Done
- [ ] CourseCategory model + extended Course model migrated
- [ ] Admin CRUD for categories and courses, including image upload to R2
- [ ] getPublishedCourses() helper enforces status=PUBLISHED filter
- [ ] /admin/courses gated correctly
- [ ] All 5 tests pass in CI
