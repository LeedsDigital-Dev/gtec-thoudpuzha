# Seed production content: courses, certification partners, initial student ID records

**ID:** `s12-t1`  
**Sprint:** Sprint 12 - UAT & Launch  
**Epic:** UAT & Launch  
**Track:** Content/Data  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** s02-t1, s03-t3, s01-t5, s04-t2  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Final client-approved course catalog ready for entry
- [ ] Final certification partner logo set confirmed
- [ ] Enrolled-student list ready for CSV bulk import via /admin/students
- [ ] Final centre photos, About copy, At a Glance figures confirmed for production

## Task Breakdown

```
Read AGENTS.md first. This is a content-population task, not a feature task — but needs a small amount of tooling work to execute safely and repeatably against production.

Requirements:
- Populate production via a seed/import script or the existing /admin CRUD UIs (document which approach was used): real course catalog, real certification partner list, real centre photos and About/At-a-Glance content, real enrolled-student list via CSV bulk import.
- Remove or clearly mark all placeholder/test content created during development.
- Verify SiteSettings' At a Glance figures reflect Thodupuzha-confirmed numbers, not parent-brand placeholders, unless explicitly confirmed reused.
- Spot-check every seeded course, every certification partner logo, and a sample StudentRecord verification end-to-end.

Write tests (Vitest, run as a scripted verification against a staging/seed-check environment) covering:
1. The course catalog record count matches the client-approved list count.
2. No StudentRecord in the imported set has a duplicate studentId.
3. Zero GalleryItem, Course, or NewsEvent rows remain with an obviously-placeholder title/caption.
4. A sample StudentRecord can be verified end-to-end via the real Sprint 4 flow in staging.

Definition of done: all real content is seeded and verified, all development fixtures are removed, and all 4 checks pass.
```

## Definition of Done
- [ ] Real course catalog seeded and verified
- [ ] Real certification partners seeded and verified
- [ ] Real centre content/At-a-Glance figures confirmed and seeded
- [ ] Real student records bulk-imported via CSV
- [ ] All development/placeholder content removed
- [ ] All 4 checks pass
