# Build shared Biodata form component (Student full fields / Job Seeker minus 2 fields)

**ID:** `s05-t1`  
**Sprint:** Sprint 5 - Student Biodata / Candidate Profile  
**Epic:** Student Biodata / Candidate Profile  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 5  
**Depends on:** s00-t3, s02-t3, s04-t4  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Extend the skeletal CandidateProfile model from Sprint 0 into the full Biodata data model, and build the shared form.

Requirements:
- Extend CandidateProfile (ALTER, don't redefine) with: fullName, dateOfBirth, phone, email, courseCompletedIds (student-only), certificationIds (student-only), educationalQualification (enum), yearOfPassing (Int), address, languagesKnown (String[]), preferredJobLocation, preferredJobType (enum), careerObjective, photoUrl (nullable). Migrate.
- Build the BiodataForm at /portal/student/biodata: renders all fields except courseCompletedIds/certificationIds are only shown when isVerifiedStudent is true. Use CourseSelect (Sprint 2) in multi-select mode for Course Completed.
- The form must be draft-saveable: "Save Biodata" persists whatever is filled, even incomplete. Track completeness via a computed isComplete check.
- Accessible to both student and job_seeker roles per Sprint 4's requirePortalRole setup.

Write tests (Vitest + React Testing Library) covering:
1. A job_seeker-role user does NOT see Course Completed or Certification Earned fields.
2. A student-role user DOES see both fields.
3. Saving a partially-filled form succeeds without validation blocking the save.
4. The computed isComplete check correctly returns false for a partial profile and true once all required fields are filled.

Definition of done: the shared form correctly branches by role for the two student-only fields, draft-saving works, and all 4 tests pass.
```

## Definition of Done
- [ ] CandidateProfile extended with full Biodata field set
- [ ] Form hides Course Completed / Certification Earned for job seekers
- [ ] Draft save works without requiring full completion
- [ ] isComplete computed check works correctly
- [ ] All 4 tests pass in CI
