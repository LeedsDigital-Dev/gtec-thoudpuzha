# Finalize and publish Privacy Policy / Terms pages

**ID:** `s12-t3`  
**Sprint:** Sprint 12 - UAT & Launch  
**Epic:** UAT & Launch  
**Track:** Content/Data  
**Priority:** Must Have  
**Story Points:** 1  
**Depends on:** s01-t6, s05-t4, s07-t1  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] Final Privacy Policy and Terms of Service copy, legally reviewed and approved by the client — a placeholder/template is fine for staging, production content must come from the client (or their counsel)
- [ ] Confirm the data retention/deletion policy stance with the client

## Task Breakdown

```
Read AGENTS.md first. Build and wire the legal pages required before real candidate/employer PII is collected at scale.

Requirements:
- Build /privacy-policy and /terms as simple static (public) pages rendering client-approved copy — no CMS/admin editing needed given how infrequently legal text changes.
- Verify linked from every place the PRD specifies: Footer, Biodata form, Employer registration — near their submit action, with a brief acceptance note in client-approved wording.
- Reconcile Sprint 5's consent copy (profile-visibility toggle, first-Biodata-save notice) with the final Privacy Policy language.
- Render under both /en and /ml if approved Malayalam legal copy exists; otherwise /ml falls back to English per Sprint 10's pattern — flag this explicitly to the client rather than blocking launch.

Write tests (Vitest) covering:
1. /privacy-policy and /terms render successfully and are publicly accessible without authentication.
2. The Footer's Privacy Policy link resolves to the real page, not a 404 placeholder.
3. The Biodata form and Employer registration form each contain a visible link/reference to the Privacy Policy near their submit action.

Definition of done: both legal pages are live with client-approved copy, correctly linked from every required location, consistent with Sprint 5's consent copy, and all 3 tests pass.
```

## Definition of Done
- [ ] /privacy-policy and /terms live with client-approved copy
- [ ] Linked from Footer, Biodata form, Employer registration form
- [ ] Consistent with Sprint 5's consent copy (wording reconciled)
- [ ] Malayalam gap explicitly flagged to client if untranslated at launch
- [ ] All 3 tests pass in CI
