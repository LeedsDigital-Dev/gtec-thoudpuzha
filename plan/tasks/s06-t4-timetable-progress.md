# Build Timetable + My Progress tiles with staff-entered data

**ID:** `s06-t4`  
**Sprint:** Sprint 6 - Student Portal: Academic Resources  
**Epic:** Student Portal - Academic Resources  
**Track:** Backend  
**Priority:** Should Have  
**Story Points:** 5  
**Depends on:** s06-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Build the remaining two resource tiles: Timetable and My Progress.

Requirements:
- Add a StudentProgressEntry model: id, studentProfileId (FK), courseId (FK), noteEn (staff-entered free text), recordedAt, createdAt.
- Add a TimetableEntry model: id, courseId (FK), contentText (text-based weekly schedule block), createdAt. Timetable is course-wide, unlike Progress which is per-student.
- Build an admin entry flow for Centre Staff to add StudentProgressEntry rows against a specific student (searchable by name/Student ID) and TimetableEntry rows against a course. Gate with requireRole([CENTRE_STAFF, SUPER_ADMIN]). Mutations call logAdminAction.
- Build /portal/student/resources/progress: lists the logged-in student's own entries only, newest first.
- Build /portal/student/resources/timetable: shows the TimetableEntry for the student's enrolled course(s).

Write tests (Vitest) covering:
1. A student sees only their own progress entries, never another student's, even within the same course.
2. A student sees their enrolled course's timetable, correctly scoped.
3. Admin entry of a progress note against a specific student persists correctly and is immediately visible to that student.
4. The admin entry flow is denied to a job_seeker-role user (403).

Definition of done: progress entries are correctly isolated per-student, timetable is correctly scoped per-course, and all 4 tests pass.
```

## Definition of Done
- [ ] StudentProgressEntry + TimetableEntry models migrated
- [ ] Admin entry flow works for both, gated correctly
- [ ] Progress isolated strictly per-student
- [ ] Timetable scoped per-course
- [ ] All 4 tests pass in CI
