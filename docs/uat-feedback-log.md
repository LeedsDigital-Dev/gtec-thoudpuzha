# UAT Feedback Log — GTEC Thodupuzha

> **Session**: Sprint 12 UAT  
> **Date**: TBD  
> **Tester(s)**: Centre Staff + Super Admin  
> **Tags**: `Bug`, `UX Improvement`, `Out-of-Scope Request`

---

## How to use this log

Each finding gets its own entry with a unique ID. Tag each as:
- **Bug** — must fix before launch
- **UX Improvement** — polish or friction-reduction; small fixes done now, larger ones documented for post-launch
- **Out-of-Scope Request** — logged for future phases, not built now

---

## Findings

### UAT-001: Job Posting rejection reason silently discarded

- **Tag**: `Bug`
- **Status**: Fixed
- **Severity**: Medium
- **File(s)**: `src/app/[locale]/(admin)/admin/job-postings/actions.ts`, `prisma/schema.prisma`
- **Description**: When rejecting a job posting, the `rejectJobPosting` action validates that a rejection reason is provided (returns error if missing) and includes it in the audit log metadata — **but never persists it to the database**. The `JobPosting` Prisma model has no `rejectionReason` field. The reason is lost on page reload.
- **Fix**: Added `rejectionReason` field to `JobPosting` schema, updated the `rejectJobPosting` action to store it, and added a Prisma migration.
- **Regression test**: `job-postings/actions.test.ts` — verifies rejection reason is persisted and returned on re-fetch.

### UAT-002: Nested `<form>` in courses page edit/delete action

- **Tag**: `Bug`
- **Status**: Fixed
- **Severity**: Medium
- **File(s)**: `src/app/[locale]/(admin)/admin/courses/page.tsx`
- **Description**: The "Edit" `<details>` panel wraps all fields in a `<form action={updateCourse}>`, but the "Delete" button inside it is another `<form action={deleteCourse}>` — a `<form>` nested inside another `<form>`. This is invalid HTML. Browsers handle this inconsistently, typically by closing the outer form when they encounter the inner one, which means the Save button and some fields end up unassociated with any form.
- **Fix**: Moved the delete button out of the edit form into a separate standalone `<form>` placed after the edit `<details>` close, preserving the intended layout and behavior.
- **Regression test**: Courses page render test — verifies two independent `<form>` elements per course row (one for edit action, one for delete action).
