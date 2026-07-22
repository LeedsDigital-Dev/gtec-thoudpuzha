# Build /portal/student dashboard with six resource tiles

**ID:** `s06-t1`  
**Sprint:** Sprint 6 - Student Portal: Academic Resources  
**Epic:** Student Portal - Academic Resources  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s04-t4  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the Student Portal landing dashboard.

Requirements:
- Build /portal/student: six tiles — Study Notes, Video Lectures, Assignments, My Progress, Timetable, Past Papers — each linking to its own sub-route. Restricted to role=STUDENT only.
- If the logged-in student has no linked course(s) yet, show a friendly empty state directing them to contact the centre, rather than six tiles leading to empty pages.
- Each tile is a placeholder route for now, returning "Coming soon" — the next tasks in this sprint build out the real content.

Write tests (Vitest + React Testing Library) covering:
1. A student with a linked course sees all six tiles.
2. A student with NO linked course sees the empty state instead of six tiles.
3. A job_seeker-role user is denied /portal/student entirely (regression check).
4. Each tile links to the correct sub-route.

Definition of done: the dashboard correctly branches on course-linkage and role, and all 4 tests pass.
```

## Definition of Done
- [ ] /portal/student shows 6 tiles for course-linked students
- [ ] Empty state shown for students without a linked course
- [ ] job_seeker role denied (regression check)
- [ ] Tiles link to correct sub-routes
- [ ] All 4 tests pass in CI
