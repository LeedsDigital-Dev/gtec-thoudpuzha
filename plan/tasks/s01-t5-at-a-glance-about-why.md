# Build At a Glance, About, and Why Choose Us sections (Super-Admin-editable stats)

**ID:** `s01-t5`  
**Sprint:** Sprint 1 - Public Marketing Site Core  
**Epic:** Public Marketing Site Core  
**Track:** Frontend  
**Priority:** Should Have  
**Story Points:** 5  
**Depends on:** s00-t3, s00-t5  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Centre/campus photo for the About section
- [ ] Final About copy from the client (English required, Malayalam if available)
- [ ] Confirm the five At a Glance figures — default to the parent brand's published figures unless Thodupuzha-specific numbers are given

## Task Breakdown

```
Read AGENTS.md first. Build three homepage sections — At a Glance, About, and Why Choose Us — with Super-Admin-only editable content, since these are brand-wide/centre-identity statements rather than frequently-changing content.

Requirements:
- Add a SiteSettings model (a single settings row): the five At a Glance stats as strings, About section's bodyEn/bodyMl and a photo URL, and three Why Choose Us cards each with an icon enum, titleEn/titleMl, descriptionEn/descriptionMl. Migrate.
- Seed the migration with the parent GTEC brand's default figures (25+ years, 3.2M+ students trained, 800+ centres worldwide, 100+ affiliations, 23 countries), commented as placeholders pending Thodupuzha-specific confirmation.
- Build the three public sections on the homepage, rendering from SiteSettings.
- Build /admin/settings/site: a single settings form covering all fields, gated by requireRole([SUPER_ADMIN]) ONLY — Centre Staff must NOT have access.
- Mutations call logAdminAction.

Write tests (Vitest) covering:
1. The public At a Glance section renders the five stats from SiteSettings.
2. /admin/settings/site is denied to a centre_staff-role user (403) and accessible to super_admin.
3. Updating a Why Choose Us card's title via the settings form persists and reflects on the public homepage.
4. Saving the settings form writes an audit log entry.

Definition of done: all three sections render live data, only Super Admin can edit them, and all 4 tests pass.
```

## Definition of Done
- [ ] SiteSettings model migrated with sensible seeded defaults
- [ ] At a Glance / About / Why Choose Us render from DB
- [ ] /admin/settings/site restricted to Super Admin only (not Centre Staff)
- [ ] Audit log entries written on save
- [ ] All 4 tests pass in CI
