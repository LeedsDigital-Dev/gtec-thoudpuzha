# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 155 files · ~38,080 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 682 nodes · 1099 edges · 51 communities (41 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4232406b`
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
- cn
- courses.test.ts
- FlashNewsBar.tsx
- news-events.test.ts
- news.test.tsx
- getMediaUrl
- sign-up/page.tsx
- seed.ts
- FlashNewsBar.tsx
- biodata/page.tsx
- students/actions.test.ts
- site/page.test.tsx
- students/actions.test.ts
- flash-news/page.test.tsx
- route.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 45 edges
2. `logAdminAction()` - 28 edges
3. `Role` - 25 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `getMediaUrl()` - 11 edges
7. `Button()` - 10 edges
8. `localeFromFormData()` - 9 edges
9. `scripts` - 8 edges
10. `localeFromFormData()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `CoursesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/courses/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `CertificationPartnersPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/certification-partners/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `GalleryPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/gallery/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (51 total, 10 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (48): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+40 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (41): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, lucide-react, next, next-intl (+33 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.10
Nodes (25): CertificationPartnersPage(), GalleryPage(), GalleryPageProps, CertificationPartnerStrip(), GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl() (+17 more)

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.08
Nodes (27): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+19 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.07
Nodes (25): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+17 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.18
Nodes (11): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+3 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.09
Nodes (27): NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, HomePage(), HomePageProps, AboutSection(), AboutSectionProps (+19 more)

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
Cohesion: 0.11
Nodes (18): BiodataActionResult, BiodataFormData, saveBiodata(), BiodataPage(), BiodataForm(), BiodataFormProps, JOB_TYPE_OPTIONS, QUALIFICATION_OPTIONS (+10 more)

### Community 33 - "cn"
Cohesion: 0.19
Nodes (16): HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants, Input(), Label(), SelectContent(), SelectGroup() (+8 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.15
Nodes (19): createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory(), slugify(), updateCategory() (+11 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.06
Nodes (58): AuditLogPage(), AuditLogPageProps, createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), PageProps (+50 more)

### Community 36 - "news-events.test.ts"
Cohesion: 0.21
Nodes (7): JOB_TYPE_LABELS, QUALIFICATION_LABELS, BiodataPdfData, BiodataPdfDocument(), styles, completeData, incompleteData

### Community 38 - "getMediaUrl"
Cohesion: 0.22
Nodes (7): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, mockUpdateUser, mockUpsert

### Community 40 - "seed.ts"
Cohesion: 0.67
Nodes (3): main(), prisma, slugFromName()

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.11
Nodes (16): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+8 more)

### Community 43 - "biodata/page.tsx"
Cohesion: 0.18
Nodes (16): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), mockAuditCreate, mockAuth (+8 more)

### Community 47 - "site/page.test.tsx"
Cohesion: 0.40
Nodes (3): mockFindFirst, mockRedirect, mockRequireRole

### Community 48 - "students/actions.test.ts"
Cohesion: 0.16
Nodes (14): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, localeFromFormData(), parseCsvLine(), mockAuditCreate, mockAuth (+6 more)

### Community 50 - "flash-news/page.test.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

## Knowledge Gaps
- **280 isolated node(s):** `CsvRowResult`, `StudentsPageProps`, `BiodataActionResult`, `mockCourses`, `mockApprovedSkills` (+275 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `(public)/page.tsx`, `courses.test.ts`, `biodata/page.tsx`, `news-events.test.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `FlashNewsBar.tsx` to `courses.test.ts`, `biodata/page.tsx`, `package.json`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CsvRowResult`, `StudentsPageProps`, `BiodataActionResult` to the rest of the system?**
  _280 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._