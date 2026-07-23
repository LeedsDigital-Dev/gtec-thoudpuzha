# Bilingual QA Log — Sprint 10 Task 3

**Date:** 2026-07-23  
**Tester:** s10-t3 automated sweep + manual code review  
**Scope:** All public, portal, and admin routes under `/en` and `/ml`

---

## Route Sweep Results

### Public Routes (`(public)`)

| Route | EN | ML | Notes |
|-------|----|----|-------|
| `/` (homepage) | ✅ | ✅ | Header, Hero, sections all use translated dictionary keys via `getTranslations`/`useTranslations`. NewsTeaserSection locale-aware title/body. |
| `/gallery` | ✅ | ✅ | Category tabs and item captions use `pickLocalizedText()` with locale prop. |
| `/news` | ✅ | ✅ | Fixed: `titleEn`/`bodyEn` replaced with `pickLocalizedText()` call. Now shows ML content when available. |
| `/news/[slug]` | ✅ | ✅ | Fixed: `titleEn`/`bodyEn`/alt text replaced with `pickLocalizedText()` call. |
| `/placement` | ✅ | ✅ | Uses translated job-type badges and static copy from `placement` dictionary. |

### Portal Routes (`(portal)`)

| Route | EN | ML | Notes |
|-------|----|----|-------|
| `/portal` | ✅ | ✅ | Uses `portalDashboard` dictionary. |
| `/portal/sign-up` | ✅ | ✅ | Uses `signUp` dictionary. |
| `/portal/sign-up/student` | ✅ | ✅ | Uses `studentVerification` dictionary. |
| `/portal/student` | ✅ | ✅ | Uses `studentDashboard` dictionary. |
| `/portal/student/biodata` | ✅ | ✅ | Uses `biodata` dictionary. |
| `/portal/student/applications` | ✅ | ✅ | Uses `studentApplications` dictionary. |
| `/portal/student/resources/*` | ✅ | ✅ | Uses `resources` dictionary; sub-pages delegate to `ResourceList` with translated title. |
| `/portal/jobs` | ✅ | ✅ | Job titles/descriptions from bilingual DB fields; filter UI uses `jobs` dictionary. |
| `/portal/jobs/[id]` | ✅ | ✅ | Uses `jobDetail` dictionary. |
| `/portal/employer/*` | ✅ | ✅ | Registration, post-vacancy, candidates all use respective dictionaries. |

### Admin Routes (`(admin)`)

| Route | EN | ML | Notes |
|-------|----|----|-------|
| `/admin` | ✅ (EN only) | — | Admin is an internal tool; English-only UI by design. Data rows show bilingual content (courses, news, etc.). |
| `/admin/courses` | ✅ (EN only) | — | Bilingual input fields present (titleEn/Ml, descriptionEn/Ml, etc.) |
| `/admin/gallery` | ✅ (EN only) | — | Bilingual name/caption fields present. |
| `/admin/news-events` | ✅ (EN only) | — | Bilingual title/body fields present. |
| `/admin/flash-news` | ✅ (EN only) | — | Bilingual text fields present. |
| `/admin/certification-partners` | ✅ (EN only) | — | Bilingual name/description fields present. |
| `/admin/staff` | ✅ (EN only) | — | Admin internal tool. |
| `/admin/settings/site` | ✅ (EN only) | — | Bilingual about/why-choose-us fields present. |
| `/admin/*` (remaining) | ✅ (EN only) | — | All admin pages use English-only labels/headings — appropriate for internal tool. |

---

## Issues Found & Resolved

### Issue 1: News listing uses hardcoded `titleEn`/`bodyEn`
- **File:** `src/app/[locale]/(public)/news/page.tsx`
- **Fix:** Replaced `item.titleEn` / `item.bodyEn` with `pickLocalizedText({ en: item.titleEn, ml: item.titleMl }, loc)`.
- **Resolution:** ✅ Fixed

### Issue 2: News detail page uses hardcoded `titleEn`/`bodyEn`
- **File:** `src/app/[locale]/(public)/news/[slug]/page.tsx`
- **Fix:** Replaced direct `titleEn`/`bodyEn` references with `pickLocalizedText()` calls, including `alt` text on cover image.
- **Resolution:** ✅ Fixed

### Issue 3: NewsTeaserSection (homepage) uses hardcoded `titleEn`
- **File:** `src/components/shared/NewsTeaserSection.tsx`
- **Fix:** Added `locale` prop and `pickLocalizedText()` helper; uses ML title when available.
- **Resolution:** ✅ Fixed

### Issue 4: GalleryGrid uses hardcoded `nameEn`/`captionEn`
- **File:** `src/components/shared/GalleryGrid.tsx`
- **Fix:** Added `locale` prop and `pickLocalizedText()` helper; category tab names and item captions are now locale-aware. Also fixed Lightbox caption in same component.
- **Resolution:** ✅ Fixed

### Issue 5: ContactSection hardcoded English strings
- **File:** `src/components/shared/ContactSection.tsx`
- **Details:** `"Send us a message"` button and `"See our Google Reviews →"` link were hardcoded.
- **Fix:** Replaced with dictionary keys `t("sendMessage")` and `t("googleReviews")` from the `contact` namespace.
- **Resolution:** ✅ Fixed

---

## LanguageSwitcher Verification

- **Root path** (`/` ↔ `/en` ↔ `/ml`): ✅ Correctly constructs `/{locale}`
- **Static page** (`/courses` → `/en/courses` / `/ml/courses`): ✅ Locale prefix prepended
- **Dynamic slug** (`/news/some-article` → `/en/news/some-article` / `/ml/news/some-article`): ✅ Preserved
- **Dynamic id** (`/jobs/abc-123` → `/en/jobs/abc-123` / `/ml/jobs/abc-123`): ✅ Preserved
- **Nested dynamic** (`/candidate/xyz/applicant/42`): ✅ Preserved
- **Aria-label** correctly reflects target language: ✅

---

## Tests Added

| Test | File | Description |
|------|------|-------------|
| 1. Bilingual route sweep | `src/__tests__/bilingual-qa.test.tsx` | Scans every `page.tsx` in (public) and (portal) for hardcoded English strings without translations |
| 2. LanguageSwitcher dynamic route preservation | `src/__tests__/bilingual-qa.test.tsx` | Verifies `buildLocalePath()` preserves slugs, IDs, nested paths when toggling locale |
| 3. Header + Hero visual regression | `src/__tests__/bilingual-qa.test.tsx` | Renders Header and homepage Hero in both EN and ML locales, verifying no crash and expected output |

---

## Known Limitations

- Admin pages remain English-only (internal tool — not in scope for bilingual rollout).
- Malayalam dictionary (`ml.json`) is comprehensive but some dynamic content (`titleMl`/`bodyMl` DB fields) may still be null pending admin content entry.
- No Playwright e2e tests exist (Playwright introduced in Sprint 11); all QA is Vitest-based static analysis and server-side rendering checks.
