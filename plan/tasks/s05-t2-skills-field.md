# Build Skills multi-select field sourced from Skills Taxonomy + free-text add

**ID:** `s05-t2`  
**Sprint:** Sprint 5 - Student Biodata / Candidate Profile  
**Epic:** Student Biodata / Candidate Profile  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 3  
**Depends on:** s05-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] None

## Task Breakdown

```
Read AGENTS.md first. Add the Skills field to the Biodata form, and stand up the Skills Taxonomy that Sprint 8's employer-side tooling will later curate.

Requirements:
- Add a Skill model: id, label (unique), status (enum PENDING|APPROVED, default PENDING), createdAt. Migrate.
- Add a skillIds field to CandidateProfile.
- Build a SkillMultiSelect component: shows existing APPROVED skills as selectable, searchable options, and allows free-text "add new skill" — a new skill creates a PENDING Skill row and immediately associates it with this candidate. APPROVED only gates whether it shows as a suggestion to OTHER users.
- Add this field to BiodataForm for BOTH student and job_seeker roles.

Write tests (Vitest + React Testing Library) covering:
1. Typing an existing APPROVED skill's name shows it as a selectable suggestion.
2. Typing a new skill creates a new PENDING Skill row and associates it with the candidate.
3. A PENDING skill does NOT show as a suggestion for a DIFFERENT candidate, but appears as already-selected for the candidate who added it.
4. Selecting multiple skills persists all of them on save.

Definition of done: the Skills field works for both roles, free-text additions correctly seed the taxonomy as PENDING without blocking the candidate's own use of it, and all 4 tests pass.
```

## Definition of Done
- [ ] Skill model + CandidateProfile skillIds migrated
- [ ] SkillMultiSelect shows approved suggestions + allows free-text add
- [ ] New skills created as PENDING, immediately usable by their creator
- [ ] Pending skills don't leak as suggestions to other users
- [ ] All 4 tests pass in CI
