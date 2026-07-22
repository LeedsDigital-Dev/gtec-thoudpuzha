# Wire Course dropdown (Enquiry form + Biodata Course Completed field) to live Courses data

**ID:** `s02-t3`  
**Sprint:** Sprint 2 - Courses Module  
**Epic:** Courses Module  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 2  
**Depends on:** s02-t1, s01-t4  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Replace every remaining hardcoded/placeholder course list in the app with live data from getPublishedCourses(), and prepare a reusable selector for Sprint 5's Biodata form.

Requirements:
- Update EnquiryForm so its "Course interested in" select is populated from getPublishedCourses() instead of the placeholder list, fetched server-side.
- Build a reusable CourseSelect component in components/shared/ wrapping the live-course-fetching pattern, supporting both single-select (Enquiry) and multi-select (future Biodata Course Completed) modes via a prop, so Sprint 5 can drop it in directly.
- Migrate EnquiryForm internally to use CourseSelect.
- Verify every existing EnquiryForm instance (Hero, Course detail page, Contact page) now shows live course data and submission still correctly records the selected courseId.

Write tests (Vitest + React Testing Library) covering:
1. CourseSelect in single-select mode renders options matching getPublishedCourses() output.
2. CourseSelect in multi-select mode allows selecting more than one course.
3. Selecting a course in the Hero EnquiryForm and submitting persists the correct courseId on the created Enquiry row.
4. A DRAFT course never appears as a selectable option in either mode.

Definition of done: all course dropdowns across the app pull from live, published-only data via the shared CourseSelect component, and all 4 tests pass.
```

## Definition of Done
- [ ] CourseSelect reusable component built (single + multi mode)
- [ ] All EnquiryForm instances use live course data via CourseSelect
- [ ] Enquiry submission still correctly persists courseId
- [ ] DRAFT courses never selectable
- [ ] All 4 tests pass in CI
