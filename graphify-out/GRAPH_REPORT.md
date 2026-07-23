# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 202 files · ~54,707 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 873 nodes · 1547 edges · 67 communities (53 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d98fe12d`
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
- courses.test.ts
- courses.test.ts
- FlashNewsBar.tsx
- news-events.test.ts
- news.test.tsx
- getMediaUrl
- sign-up/page.tsx
- seed.ts
- flash-news/page.test.tsx
- FlashNewsBar.tsx
- academic-resources/actions.test.ts
- courses.ts
- timetable-progress/actions.test.ts
- students/actions.test.ts
- employers/page.test.tsx
- courses.test.ts
- route.test.tsx
- resource-list.tsx
- cert-partners.test.ts
- assignments/page.tsx
- Role
- post-vacancy/actions.test.ts
- page.test.ts
- student-dashboard.test.tsx
- dashboard.test.ts
- student/actions.test.ts
- timetable-progress/page.tsx
- courses.test.ts
- job-postings/page.test.tsx
- EmployerModerationNotification.tsx
- EnquiryNotification.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 84 edges
2. `logAdminAction()` - 57 edges
3. `Role` - 46 edges
4. `cn()` - 19 edges
5. `Button()` - 17 edges
6. `compilerOptions` - 16 edges
7. `getMediaUrl()` - 11 edges
8. `PublicCourse` - 10 edges
9. `localeFromFormData()` - 9 edges
10. `uploadFile()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AcademicResourcesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EmployersPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/employers/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `JobPostingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/job-postings/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (67 total, 14 thin omitted)

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
Cohesion: 0.09
Nodes (25): approveJobPosting(), editAndApproveJobPosting(), localeFromFormData(), rejectJobPosting(), mockAuditCreate, mockAuth, mockFindMany, mockRedirect (+17 more)

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
Cohesion: 0.18
Nodes (11): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, VideoLectureList() (+3 more)

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
Cohesion: 0.08
Nodes (54): CoursesPage(), createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews(), FlashNewsPage() (+46 more)

### Community 33 - "courses.test.ts"
Cohesion: 0.11
Nodes (21): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+13 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.29
Nodes (5): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.23
Nodes (4): PortalRoleGate(), ROLE_LABELS, requirePortalRole(), RequireRoleResult

### Community 36 - "news-events.test.ts"
Cohesion: 0.21
Nodes (7): JOB_TYPE_LABELS, QUALIFICATION_LABELS, BiodataPdfData, BiodataPdfDocument(), styles, completeData, incompleteData

### Community 38 - "getMediaUrl"
Cohesion: 0.22
Nodes (7): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, mockUpdateUser, mockUpsert

### Community 40 - "seed.ts"
Cohesion: 0.67
Nodes (3): main(), prisma, slugFromName()

### Community 41 - "flash-news/page.test.tsx"
Cohesion: 0.33
Nodes (11): createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory(), slugify(), updateCategory() (+3 more)

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.11
Nodes (16): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+8 more)

### Community 43 - "academic-resources/actions.test.ts"
Cohesion: 0.18
Nodes (9): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockFindManyCourses, mockFindUnique, mockRedirect (+1 more)

### Community 44 - "courses.ts"
Cohesion: 0.18
Nodes (9): mockAcCreate, mockAcFindMany, mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockProfileFindUnique, mockRedirect (+1 more)

### Community 47 - "timetable-progress/actions.test.ts"
Cohesion: 0.12
Nodes (14): mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockPECreate, mockPEDelete, mockPEFindMany, mockProfileFindMany (+6 more)

### Community 48 - "students/actions.test.ts"
Cohesion: 0.16
Nodes (15): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, localeFromFormData(), parseCsvLine(), mockAuditCreate, mockAuth (+7 more)

### Community 49 - "employers/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindMany, mockRedirect

### Community 50 - "courses.test.ts"
Cohesion: 0.08
Nodes (20): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate, mockAuth (+12 more)

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 53 - "cert-partners.test.ts"
Cohesion: 0.40
Nodes (3): mockAuth, mockClerkMiddleware, mockCreateRouteMatcher

### Community 54 - "assignments/page.tsx"
Cohesion: 0.07
Nodes (46): submitVacancy(), PostVacancyPage(), JOB_TYPES, PostVacancyForm(), PostVacancyFormProps, submitEmployerRegistration(), EMPLOYEE_RANGES, RegistrationForm() (+38 more)

### Community 55 - "Role"
Cohesion: 0.12
Nodes (11): AuditLogPage(), AuditLogPageProps, ActionResult, RegistrationResult, PortalRoleGateProps, LogAdminActionInput, Role, mockAuth (+3 more)

### Community 56 - "post-vacancy/actions.test.ts"
Cohesion: 0.33
Nodes (4): mockAuth, mockCreateJobPosting, mockFindUnique, mockRedirect

### Community 57 - "page.test.ts"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindUnique, mockRedirect

### Community 60 - "dashboard.test.ts"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyPostings, mockFindUniqueProfile, mockRedirect

### Community 61 - "student/actions.test.ts"
Cohesion: 0.18
Nodes (12): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+4 more)

### Community 63 - "courses.test.ts"
Cohesion: 0.22
Nodes (7): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile

### Community 64 - "job-postings/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindMany, mockRedirect

### Community 65 - "EmployerModerationNotification.tsx"
Cohesion: 0.15
Nodes (18): approveAndTrustEmployer(), approveEmployer(), localeFromFormData(), rejectEmployer(), mockAuditCreate, mockAuth, mockFindMany, mockFindUnique (+10 more)

## Knowledge Gaps
- **373 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+368 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireRole()` connect `FlashNewsBar.tsx` to `EmployerModerationNotification.tsx`, `FlashNewsBar.tsx`, `package.json`, `EnquiryForm.tsx`, `BiodataForm.test.tsx`, `flash-news/page.test.tsx`, `students/actions.test.ts`, `actions.test.ts`, `courses.test.ts`, `Role`, `timetable-progress/page.tsx`, `courses.test.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `Role` connect `Role` to `EmployerModerationNotification.tsx`, `EnquiryNotification.tsx`, `FlashNewsBar.tsx`, `news-events.test.ts`, `EnquiryForm.tsx`, `BiodataForm.test.tsx`, `flash-news/page.test.tsx`, `students/actions.test.ts`, `actions.test.ts`, `courses.test.ts`, `cert-partners.test.ts`, `FlashNewsBar.tsx`, `assignments/page.tsx`, `gallery/actions.ts`, `student-dashboard.test.tsx`, `timetable-progress/page.tsx`, `courses.test.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _373 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._