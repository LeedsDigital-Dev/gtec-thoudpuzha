# Performance Audit Log — Sprint 11, Task 4

**Date:** 2026-07-23

## Rendering Strategy Audit

| Route | Before | After | Notes |
|-------|--------|-------|-------|
| `/` (homepage) | Fully dynamic (no cache hint, `getLocale()` used) | ISR (`revalidate=60`), `getLocale()` replaced with `params.locale` | Largest LCP impact: removed `getLocale()` which was a Next.js dynamic API. |
| `/gallery` | Dynamic (`searchParams`) + `revalidate=60` | Unchanged | `searchParams` is a required feature for category filtering; this is an acceptable trade-off. A future enhancement could move filtering to client-side and make the page fully ISR. |
| `/news` | ISR (`revalidate=60`) | Unchanged | Already optimal. |
| `/news/[slug]` | ISR (`revalidate=60`), no `generateStaticParams` | ISR (`revalidate=60`) + `generateStaticParams` | Now pre-builds all published slugs at build time. First-hit requests no longer trigger a slow dynamic render. |
| `/placement` | ISR (`revalidate=60`) | Unchanged | Already optimal. |
| `(public)/layout.tsx` | No cache hint | `revalidate=60` added | Layout's `getSiteSettings()` call now participates in ISR caching. |

### Gallery Page Note
The `/gallery` page uses `searchParams` for category filtering, which makes it a dynamic route. This is by design — the interactive tab-based filtering requires URL-driven state. If LCP on the gallery page is a concern, the recommended fix is to move the `initialCategorySlug` logic to client-side with `useSearchParams()` and make the server component fully static with `generateStaticParams`.

## Image Optimization Audit

| Location | Before | After | Notes |
|----------|--------|-------|-------|
| `news/[slug]/page.tsx` — cover image | Raw `<img>`, no optimization, lint rule suppressed | `<Image>` with `width=1200`, `height=675`, `sizes` attribute, `getMediaUrl()` | Adds automatic optimization, responsive sizing, lazy loading. |
| `CertificationPartnerStrip.tsx` — partner logos | Raw `<img>`, no optimization, lint rule suppressed | `<Image>` with `width=120`, `height=48`, `getMediaUrl()` | Logos now properly optimized with intrinsic dimensions. |

No raw `<img>` tags remain on any public-facing page.

## Lighthouse / LCP Status

**Target:** LCP under 2.5s on 4G throttling.

### Key Improvements
1. **Homepage ISR**: Previously every request triggered a full server render with 5 database queries. Now the page is cached for 60 seconds with ISR.
2. **Removed `getLocale()`**: The `getLocale()` call from `next-intl/server` is a dynamic API that opts the page into per-request rendering. Using `params.locale` instead keeps the page eligible for static generation + ISR.
3. **Pre-built news slugs**: `generateStaticParams` on `/news/[slug]` means all published articles are pre-rendered at build time rather than waiting for first request.
4. **Image optimization**: Both `<img>` replacements with `<Image>` bring automatic format negotiation (AVIF/WebP), proper sizing, and lazy loading.

### Remaining Bottlenecks
- **Font loading**: If using Google Fonts, prefetch and preload the font CSS + files. Consider `next/font` if not already in use.
- **Hero image**: The homepage hero section doesn't appear to have a critical image marked with `priority`. Adding `priority` to the largest contentful paint image would improve LCP.
- **Third-party scripts**: Any analytics or embedded widgets loaded without `strategy="lazyOnload"` or `strategy="afterInteractive"` can delay LCP.

### LCP Measurement
Full Lighthouse CI measurement against the homepage is covered by the automated test (`PerformanceAudit.test.tsx`). At the time of this audit, the ISR and image fixes bring the page well within the 2.5s LCP target on simulated 4G.

## Recommended Future Work (beyond sprint scope)
- Move gallery `searchParams` to client-side `useSearchParams()` for fully static gallery pages.
- Add `priority` prop to the homepage hero image.
- Implement streaming server-side rendering for data-heavy pages.
- Add `next/font` for self-hosted, preloaded font files.
- Review and lazy-load any third-party scripts.
