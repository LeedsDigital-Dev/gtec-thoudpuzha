# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 175 files · ~42,989 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 750 nodes · 1284 edges · 55 communities (45 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a7c4251`
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
- BiodataForm.test.tsx
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
- gallery/actions.ts
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
- courses.ts
- students/actions.test.ts
- resources.ts
- courses.test.ts
- route.test.tsx
- button.tsx
- assignments/page.tsx
- lectures/page.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 64 edges
2. `logAdminAction()` - 43 edges
3. `Role` - 35 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `Button()` - 14 edges
7. `getMediaUrl()` - 11 edges
8. `PublicCourse` - 10 edges
9. `localeFromFormData()` - 9 edges
10. `uploadFile()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AcademicResourcesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `StudentsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/students/page.tsx → src/lib/auth.ts
- `uploadResource()` --calls--> `logAdminAction()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/actions.ts → src/lib/audit.ts
- `uploadResource()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/actions.ts → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (55 total, 10 thin omitted)

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
Cohesion: 0.18
Nodes (10): EnquiryNotificationEmailProps, EnquiryNotificationInput, getCentreStaffEmails(), getFromEmail(), resend, sendEnquiryNotification(), submitEnquiry(), mockCourseFindUnique (+2 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.07
Nodes (25): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+17 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.07
Nodes (42): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+34 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.09
Nodes (27): NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, HomePage(), HomePageProps, AboutSection(), AboutSectionProps (+19 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.18
Nodes (16): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), mockAuditCreate, mockAuth (+8 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.05
Nodes (35): AuditLogPageProps, EnquiriesPageProps, createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews() (+27 more)

### Community 33 - "cn"
Cohesion: 0.18
Nodes (9): mockAcCreate, mockAcFindMany, mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockProfileFindUnique, mockRedirect (+1 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.18
Nodes (9): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockFindManyCourses, mockFindUnique, mockRedirect (+1 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.10
Nodes (47): AuditLogPage(), createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate (+39 more)

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
Cohesion: 0.29
Nodes (7): EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone(), MOCK_COURSES, EnquiryPayload

### Community 44 - "courses.ts"
Cohesion: 0.20
Nodes (10): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+2 more)

### Community 48 - "students/actions.test.ts"
Cohesion: 0.16
Nodes (15): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, localeFromFormData(), parseCsvLine(), mockAuditCreate, mockAuth (+7 more)

### Community 49 - "resources.ts"
Cohesion: 0.16
Nodes (8): BiodataActionResult, BiodataFormData, saveBiodata(), BiodataPage(), getPublishedCourses(), globalForPrisma, createPENDINGSkill(), getApprovedSkills()

### Community 50 - "courses.test.ts"
Cohesion: 0.22
Nodes (7): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 52 - "button.tsx"
Cohesion: 0.11
Nodes (16): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+8 more)

### Community 55 - "lectures/page.tsx"
Cohesion: 0.18
Nodes (11): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, VideoLectureList() (+3 more)

## Knowledge Gaps
- **305 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+300 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `gallery/actions.ts` to `FlashNewsBar.tsx`, `news-events.test.ts`, `students/actions.test.ts`, `actions.test.ts`, `resources.ts`, `courses.test.ts`, `FlashNewsBar.tsx`, `lectures/page.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `FlashNewsBar.tsx` to `package.json`, `students/actions.test.ts`, `actions.test.ts`, `courses.test.ts`, `FlashNewsBar.tsx`, `lectures/page.tsx`, `gallery/actions.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `button.tsx`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _305 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._