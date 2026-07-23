# Blockers

## s12-t1 waiting on content

The following prerequisites in `plan/tasks/s12-t1-seed-content.md` are unchecked in both the task definition and `plan/manual-content.md`, with no "APPROVED placeholder" annotation:

1. **Final client-approved course catalog** — the seed script (`prisma/seed.ts` + `prisma/seed-data.ts`) contains a realistic G-TEC Education-standard curriculum (15 courses across 6 categories), but the actual client-confirmed catalog must replace it before the seed is run against production.
2. **Final certification partner logo set** — 10 partners listed with placeholder `logoUrl` (`cert-partners/<slug>.png`). Real logo files need to be uploaded to R2 and the URLs updated.
3. **Enrolled-student list for CSV bulk import** — no CSV file has been provided. The `/admin/students` bulk-import UI works, and the seed infra is ready, but the actual data is needed.
4. **Final centre photos, About copy, At a Glance figures** — plausible Thodupuzha-specific values are seeded (20+ years, 15000+ students, 120+ centres, 50+ affiliations, 23 countries), About copy is drafted for Thodupuzha, but client confirmation is still pending.

**Status:** The seed tooling (script, shared data module, idempotent upsert logic, verification tests) is complete and ready. Content population cannot proceed until the unchecked items above are confirmed.
