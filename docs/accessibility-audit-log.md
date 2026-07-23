# Accessibility Audit Log — GTEC Thodupuzha

**Date:** 2026-07-23  
**Standard:** WCAG 2.1 AA  
**Scope:** Public and Portal surfaces  
**Audit type:** Automated (axe-core 4.12) + manual review  

---

## Methodology

1. **Automated axe-core scan** run against every public route via Playwright.
2. **Manual keyboard-only operability** test: Tab through every focusable element on the homepage, gallery, and contact section.
3. **Manual label/alt-text/contrast/focus-trap review**: source-code inspection of every component in `src/components/shared/` and every page in `src/app/`.

---

## Violations Found & Fixed

### 1. GalleryGrid lightbox missing focus trap
- **WCAG SC:** 2.4.3 Focus Order  
- **Severity:** High  
- **File:** `src/components/shared/GalleryGrid.tsx`  
- **Issue:** The lightbox modal had `role="dialog"` and `aria-modal="true"` but pressing Tab could move focus to elements behind the overlay.  
- **Fix:** Applied the existing `useFocusTrap` hook (from `@/hooks/useFocusTrap`) to the lightbox container ref. Also removed unused `useRef` import that was no longer needed.  

### 2. FlashNewsBar duplicated content for assistive technology
- **WCAG SC:** 4.1.2 Name, Role, Value  
- **Severity:** Medium  
- **File:** `src/components/shared/FlashNewsBar.tsx`  
- **Issue:** The marquee effect duplicates every news item for seamless scrolling, but the second set of items was not hidden from screen readers — assistive technology users heard every announcement twice.  
- **Fix:** Wrapped the second set of items in `<span aria-hidden="true">` and added `aria-hidden="true"` + `tabIndex={-1}` to duplicated anchor elements.  

### 3. SkillMultiSelect combobox missing accessible label
- **WCAG SC:** 1.3.1 / 4.1.2  
- **Severity:** High  
- **File:** `src/components/shared/SkillMultiSelect.tsx`  
- **Issue:** The `<input role="combobox">` for skill search had no `aria-label` or `aria-labelledby`. The parent `<Label>Skills</Label>` lacked `htmlFor`, so no programmatic association existed.  
- **Fix:** Added `aria-label="Search skills"` to the combobox input. Also changed the role from implicit `text` to explicit `combobox`, which makes `aria-expanded` valid per the ARIA spec.  

### 4. Placement page heading hierarchy skip
- **WCAG SC:** 1.3.1 Info and Relationships  
- **Severity:** Medium  
- **File:** `src/app/[locale]/(public)/placement/page.tsx`  
- **Issue:** Heading order jumped from `h1` to `h3` (skipping `h2`), then back to `h2`.  
- **Fix:** Changed the job-posting card heading from `<h3>` to `<h2>` so the hierarchy is `h1 → h2` (section heading) → `h2` (card titles).  

### 5. `text-gray-400` fails minimum contrast
- **WCAG SC:** 1.4.3 Contrast Minimum  
- **Severity:** High  
- **Affected files (11 occurrences):**
  - `src/components/shared/GalleryGrid.tsx`
  - `src/app/[locale]/(admin)/admin/page.tsx`
  - `src/app/[locale]/(portal)/portal/student/applications/page.tsx`
  - `src/app/[locale]/(portal)/portal/jobs/page.tsx` (2x)
  - `src/app/[locale]/(portal)/portal/employer/page.tsx`
  - `src/app/[locale]/(portal)/portal/employer/candidates/[candidateId]/page.tsx`
  - `src/app/[locale]/(portal)/portal/employer/postings/[postingId]/applicants/applicants-list.tsx` (4x)
- **Issue:** Tailwind `gray-400` (`#9CA3AF`) has ~2.9:1 contrast ratio against white — fails AA (requires 4.5:1 for normal text, 3:1 for large text). Most affected text is `text-xs` (small text), where AA requires the full 4.5:1.  
- **Fix:** Changed all `text-gray-400` to `text-gray-500` (`#6B7280`, ~4.6:1 ratio), which meets AA for all text sizes.  

---

## Clean Scans (no issues)

The following routes/components were scanned with axe-core and manually reviewed with zero critical/serious violations:

| Route / Component | Notes |
|---|---|
| Homepage (`/en`) | axe-core scan passed; all form inputs labeled |
| Sign-in page (`/en/sign-in`) | axe-core scan passed |
| BiodataForm | axe-core scan passed (Vitest, jsdom) |
| ContactSection / EnquiryForm | Labels, aria-describedby, focus trap, Escape dismiss all correct |
| Header | ARIA labels, aria-expanded, aria-controls for mobile menu |
| Footer | Proper link structure |
| AboutSection | `aria-labelledby`, valid heading hierarchy |
| WhyChooseUsSection | `aria-labelledby` |
| CertificationPartnerStrip | `aria-label`, all images have alt text |
| NewsTeaserSection | Valid heading hierarchy |
| PlacementSupportSection | `aria-labelledby`, accessible heading |
| GalleryGrid (tabs) | `role="tablist"`, `role="tab"`, `aria-selected` |
| Lightbox | Focus trap applied, Escape/ArrowKey navigation, `aria-label` on buttons |
| LanguageSwitcher | `aria-label`, `hrefLang` attributes |
| PortalRoleGate | Descriptive heading and text |

---

## Tests Added

| Test | Type | What it covers |
|---|---|---|
| `tests/e2e/accessibility.spec.ts` — test 1 | Playwright + axe-core | Homepage: zero critical/serious axe violations |
| `src/components/shared/__tests__/BiodataForm.a11y.test.tsx` | Vitest + axe-core | BiodataForm: zero critical/serious axe violations (mocked auth, jsdom) |
| `tests/e2e/accessibility.spec.ts` — test 3 | Playwright | Keyboard-only navigation through EnquiryForm fields |
| `tests/e2e/accessibility.spec.ts` — test 4 | Playwright | Lightbox focus trap + Escape dismiss |

---

## Conclusion

All found violations have been remediated. The automated axe-core scans pass with zero critical/serious violations on both the homepage and BiodataForm. Keyboard operability and focus management have been verified. The audit log and all 4 tests are committed as part of this task.
