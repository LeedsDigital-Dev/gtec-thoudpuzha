# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 154 files · ~37,941 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 680 nodes · 1178 edges · 52 communities (43 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4dd7cd20`
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
- button.tsx
- FlashNewsBar.tsx
- students/actions.test.ts
- flash-news/page.test.tsx
- route.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 59 edges
2. `logAdminAction()` - 40 edges
3. `Role` - 31 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `Button()` - 13 edges
7. `getMediaUrl()` - 11 edges
8. `PublicCourse` - 10 edges
9. `localeFromFormData()` - 9 edges
10. `uploadFile()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `LogAdminActionInput` --references--> `Role`  [EXTRACTED]
  src/lib/audit.ts → src/lib/auth.ts
- `createPartner()` --calls--> `logAdminAction()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/certification-partners/actions.ts → src/lib/audit.ts

## Import Cycles
- None detected.

## Communities (52 total, 9 thin omitted)

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
Cohesion: 0.10
Nodes (19): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale (+11 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.16
Nodes (13): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+5 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.09
Nodes (29): PublicLayout(), NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, HomePage(), HomePageProps, AboutSection() (+21 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.13
Nodes (19): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate, mockAuth (+11 more)

### Community 24 - "(public)/page.tsx"
Cohesion: 0.15
Nodes (15): BiodataActionResult, BiodataFormData, CandidateProfileWithCompletion, isProfileComplete(), saveBiodata(), BiodataForm(), BiodataFormProps, JOB_TYPE_OPTIONS (+7 more)

### Community 33 - "cn"
Cohesion: 0.24
Nodes (12): Input(), Label(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton() (+4 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.22
Nodes (7): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.08
Nodes (61): createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory(), slugify(), updateCategory() (+53 more)

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
Cohesion: 0.12
Nodes (14): AdminLayout(), PortalLayout(), Footer(), portalLinks, quickLinks, Header(), navItems, buildLocalePath() (+6 more)

### Community 43 - "biodata/page.tsx"
Cohesion: 0.48
Nodes (4): BiodataPage(), getPublishedCourses(), createPENDINGSkill(), getApprovedSkills()

### Community 44 - "students/actions.test.ts"
Cohesion: 0.10
Nodes (17): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, requirePortalRole() (+9 more)

### Community 47 - "button.tsx"
Cohesion: 0.53
Nodes (4): HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants

### Community 48 - "FlashNewsBar.tsx"
Cohesion: 0.27
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 49 - "students/actions.test.ts"
Cohesion: 0.25
Nodes (7): mockAuditCreate, mockAuth, mockCreate, mockFindMany, mockFindUnique, mockRedirect, mockRevalidatePath

### Community 50 - "flash-news/page.test.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

## Knowledge Gaps
- **279 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireRole()` connect `FlashNewsBar.tsx` to `courses.test.ts`, `package.json`, `students/actions.test.ts`, `actions.test.ts`, `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Role` connect `students/actions.test.ts` to `courses.test.ts`, `FlashNewsBar.tsx`, `news-events.test.ts`, `biodata/page.tsx`, `actions.test.ts`, `FlashNewsBar.tsx`, `(public)/page.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._