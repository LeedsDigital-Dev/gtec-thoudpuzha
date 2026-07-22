# Build public /courses listing + /courses/[slug] detail page

**ID:** `s02-t2`  
**Sprint:** Sprint 2 - Courses Module  
**Epic:** Courses Module  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s02-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None beyond the previous task's setup

## Task Breakdown

```
Read AGENTS.md first. Build the public-facing Courses pages, consuming the admin CRUD from the previous task.

Requirements:
- Build /courses: a grid of course category cards using getPublishedCourses(). Statically generate where possible (ISR, e.g. 60s revalidate).
- Build /courses/[slug]: full course detail — title, description, duration, certification badges, syllabus, career outcomes, cover image, and an "Enquire" CTA opening the EnquiryForm pre-filled with this course and source="course_page".
- A request for a DRAFT/ARCHIVED course or a non-existent slug returns a proper 404 — never leak unpublished content.
- Add a course category grid "Courses" teaser section on the homepage linking to /courses.

Write tests (Vitest) covering:
1. /courses renders only PUBLISHED courses, grouped correctly by category.
2. /courses/[slug] for a published course renders full detail including syllabus and certifications.
3. /courses/[slug] for a DRAFT course's slug returns 404.
4. /courses/[slug] for a non-existent slug returns 404.
5. The "Enquire" CTA opens the EnquiryForm with the correct course pre-selected and source="course_page".

Definition of done: public course pages correctly show only published content, unpublished/nonexistent slugs 404 properly, and all 5 tests pass.
```

## Definition of Done
- [ ] /courses lists published courses grouped by category (ISR)
- [ ] /courses/[slug] shows full detail, 404s for draft/archived/nonexistent
- [ ] Enquire CTA pre-fills course + correct source
- [ ] Homepage Courses teaser section added
- [ ] All 5 tests pass in CI
