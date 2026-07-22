# Build profile-visibility toggle (searchable by employers on/off) + consent copy

**ID:** `s05-t4`  
**Sprint:** Sprint 5 - Student Biodata / Candidate Profile  
**Epic:** Student Biodata / Candidate Profile  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 2  
**Depends on:** s05-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Consent/privacy copy for the visibility toggle reviewed by the client (draft copy fine to start)

## Task Breakdown

```
Read AGENTS.md first. Give candidates control over whether their profile is searchable by employers, with clear consent copy — this directly gates Sprint 8's employer candidate search feature.

Requirements:
- Add a profileVisible (Boolean, default true) field to CandidateProfile.
- Add a visibility toggle to BiodataForm with adjacent copy explaining what enabling it means. Show prominently, not buried in a tooltip.
- The FIRST time a candidate saves their Biodata, surface this consent copy inline before or during that first save.
- Build a getSearchableCandidates() query helper (used by Sprint 8) that filters on profileVisible=true AND isComplete — document that Sprint 8 must use this helper rather than querying CandidateProfile directly.

Write tests (Vitest + React Testing Library) covering:
1. Toggling profileVisible to false persists correctly.
2. getSearchableCandidates() excludes profiles where profileVisible is false.
3. getSearchableCandidates() excludes incomplete profiles even if profileVisible is true.
4. The consent copy is shown on a candidate's first Biodata save.

Definition of done: the toggle works, the query helper correctly enforces both visibility and completeness, consent copy is surfaced appropriately, and all 4 tests pass.
```

## Definition of Done
- [ ] profileVisible field added, defaults to true
- [ ] Toggle + consent copy shown clearly, not buried
- [ ] First-save consent notice implemented
- [ ] getSearchableCandidates() enforces visibility AND completeness
- [ ] All 4 tests pass in CI
