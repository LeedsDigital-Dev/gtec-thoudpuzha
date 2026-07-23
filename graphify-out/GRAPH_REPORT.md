# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 109 files · ~24,800 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 505 nodes · 845 edges · 35 communities (28 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e9ec4b3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- components.json
- package.json
- EnquiryForm.tsx
- GTEC Thodupuzha
- gallery.test.ts
- aliases
- app/layout.tsx
- enquiries/page.test.tsx
- AGENTS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- (public)/page.tsx
- actions.test.ts
- taste.md
- tailwind
- FlashNewsBar.tsx
- (public)/page.tsx
- courses.test.ts
- clerk.d.ts
- audit.test.ts
- flash-news/page.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 46 edges
2. `logAdminAction()` - 32 edges
3. `cn()` - 19 edges
4. `Role` - 17 edges
5. `compilerOptions` - 16 edges
6. `localeFromFormData()` - 9 edges
7. `Button()` - 9 edges
8. `getMediaUrl()` - 9 edges
9. `uploadFile()` - 9 edges
10. `localeFromFormData()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `CertificationPartnersPage()` --calls--> `getMediaUrl()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/certification-partners/page.tsx → src/lib/media.ts
- `CoursesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/courses/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `createFlashNews()` --calls--> `logAdminAction()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/flash-news/actions.ts → src/lib/audit.ts

## Import Cycles
- None detected.

## Communities (35 total, 7 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (45): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+37 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (39): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, lucide-react, next, next-intl (+31 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.14
Nodes (19): GalleryPage(), GalleryPageProps, CertificationPartnerStrip(), GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl(), getYouTubeEmbedUrl() (+11 more)

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.08
Nodes (33): EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone(), MOCK_COURSES, HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once (+25 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.10
Nodes (18): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale (+10 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.08
Nodes (22): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+14 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.07
Nodes (33): HomePage(), HomePageProps, AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, ContactSection(), ContactSectionProps (+25 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.20
Nodes (7): mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath, mockSiteSettingsUpdate, mockWhyCardUpdate

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.13
Nodes (11): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockRedirect, mockRevalidatePath (+3 more)

### Community 24 - "(public)/page.tsx"
Cohesion: 0.40
Nodes (3): mockFindFirst, mockRedirect, mockRequireRole

### Community 33 - "audit.test.ts"
Cohesion: 0.09
Nodes (53): AuditLogPage(), AuditLogPageProps, createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), CertificationPartnersPage() (+45 more)

### Community 34 - "flash-news/page.test.tsx"
Cohesion: 0.18
Nodes (16): createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews(), FlashNewsPage(), FlashNewsPageProps (+8 more)

## Knowledge Gaps
- **211 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+206 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireRole()` connect `audit.test.ts` to `(public)/page.tsx`, `flash-news/page.test.tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _211 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.14461538461538462 - nodes in this community are weakly interconnected._