# Build course-scoped Academic Resource data model + admin upload flow (Notes/Assignments/Past Papers)

**ID:** `s06-t2`  
**Sprint:** Sprint 6 - Student Portal: Academic Resources  
**Epic:** Student Portal - Academic Resources  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s02-t1, s05-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Initial batch of study notes/assignments/past papers from Centre Staff, if available

## Task Breakdown

```
Read AGENTS.md first. Build the data model and admin tooling for course-scoped academic resources, and student-facing consumption for Notes, Assignments, and Past Papers.

Requirements:
- Add a StudentCourseEnrollment join table (studentProfileId, courseId, enrolledAt).
- Add an AcademicResource model: id, courseId (FK), type (enum NOTE|ASSIGNMENT|PAST_PAPER|LECTURE|TIMETABLE|PROGRESS), title, fileUrl (nullable), uploadedAt, createdAt. Migrate.
- Build an admin upload flow for Centre Staff to upload NOTE/ASSIGNMENT/PAST_PAPER files against a specific course. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]). Mutations call logAdminAction.
- Build /portal/student/resources/notes, /assignments, /past-papers: each lists AcademicResource rows of the matching type for the student's enrolled course(s) only. A student enrolled in Course A must NEVER see Course B's resources.

Write tests (Vitest) covering:
1. Uploading a NOTE resource against a course persists correctly with the right type and courseId.
2. A student enrolled in Course A sees Course A's notes but NOT Course B's notes.
3. A student with zero course enrollments sees an empty state, not an error.
4. The admin upload flow is denied to a student-role user (403).

Definition of done: course-scoped resource upload and retrieval work correctly with proper isolation between courses, and all 4 tests pass.
```

## Definition of Done
- [ ] StudentCourseEnrollment join table + AcademicResource model migrated
- [ ] Admin upload flow works for Notes/Assignments/Past Papers
- [ ] Student pages correctly scope to enrolled course(s) only
- [ ] Empty state for students with no enrollment
- [ ] All 4 tests pass in CI
