# Build Video Lectures tile with embedded external video (YouTube/Vimeo) player

**ID:** `s06-t3`  
**Sprint:** Sprint 6 - Student Portal: Academic Resources  
**Epic:** Student Portal - Academic Resources  
**Track:** Frontend  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s06-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] YouTube channel or Vimeo account set up (default: YouTube, unlisted)
- [ ] Initial lecture video links from Centre Staff, if available

## Task Breakdown

```
Read AGENTS.md first. Build the Video Lectures resource type, reusing the AcademicResource model from the previous task.

Requirements:
- Extend the admin upload flow to support type=LECTURE: an embedUrl field instead of a file upload. Validate the URL is from an allowed host (youtube.com, youtu.be, vimeo.com) before saving.
- Build /portal/student/resources/lectures: lists LECTURE-type AcademicResource rows for the student's enrolled course(s), each rendering an embedded player.
- Apply the same course-scoping isolation as the previous task.

Write tests (Vitest + React Testing Library) covering:
1. Adding a LECTURE resource with a valid YouTube URL succeeds.
2. Adding a LECTURE resource with a non-allowed host URL is rejected with a clear validation error.
3. A student sees only their enrolled course's lecture videos, correctly embedded.
4. The embed URL derivation correctly converts a standard YouTube watch URL into its embeddable iframe form.

Definition of done: lecture URL validation and embedding work correctly, course-scoping is enforced, and all 4 tests pass.
```

## Definition of Done
- [ ] LECTURE resource type supports embedUrl with host validation
- [ ] /portal/student/resources/lectures renders embedded players
- [ ] Course-scoping isolation enforced
- [ ] Embed URL derivation works correctly for YouTube
- [ ] All 4 tests pass in CI
