# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 267 files · ~84,839 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1227 nodes · 2061 edges · 135 communities (102 shown, 33 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3c73ea87`
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
- (admin)/layout.tsx
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
- jobs/page.tsx
- resources/page.tsx
- timetable-progress/actions.test.ts
- students/actions.test.ts
- employers/page.test.tsx
- courses.test.ts
- route.test.tsx
- Role
- courses.test.ts
- assignments/page.tsx
- student-dashboard.test.tsx
- post-vacancy/actions.test.ts
- page.test.ts
- courses.ts
- status/page.tsx
- dashboard.test.ts
- student/actions.test.ts
- portal-role-gating.test.tsx
- enquiries/page.tsx
- job-postings/page.test.tsx
- EmployerModerationNotification.tsx
- portal-role-gating.test.tsx
- staff.test.ts
- employer/page.tsx
- courses.test.ts
- search-form.tsx
- [id]/actions.ts
- candidates/actions.ts
- candidates/actions.test.ts
- email.ts
- [id]/page.tsx
- inviteToApply
- portal-role-gating.test.tsx
- progress/page.tsx
- employer/page.tsx
- smoke.spec.ts
- resource-list.tsx
- register/actions.test.ts
- auth.ts
- employers/actions.test.ts
- job-postings/actions.test.ts
- admin/page.test.tsx
- [locale]/layout.tsx
- Header.tsx
- FlashNewsBar.tsx
- scripts
- i18n.test.tsx
- portal/student/page.tsx
- flash-news/page.test.tsx
- middleware.ts
- AtAGlanceSection.tsx
- NewsTeaserSection.tsx
- admin/page.tsx
- Footer.tsx
- LanguageSwitcher.tsx
- mobile-viewport-Mobile-vie-2ea25-ble-and-opens-nav-on-mobile-chromium/error-context.md
- mobile-viewport-Mobile-vie-367c0--without-overflow-on-mobile-chromium/error-context.md
- mobile-viewport-Mobile-vie-90baf-essible-from-hamburger-menu-chromium/error-context.md
- mobile-viewport-Mobile-vie-eef14--visible-overflow-on-mobile-chromium/error-context.md
- pdf-download-PDF-download--ed942-ns-401-when-unauthenticated-chromium/error-context.md
- pdf-download-PDF-download--fb469-load-for-authenticated-user-chromium/error-context.md
- smoke-Multi-engine-smoke-t-44774-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-54994-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-779f6--a-gallery-image-is-clicked-chromium/error-context.md
- smoke-Multi-engine-smoke-t-86a42-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-b5492-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-c3b26-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-ce860--brand-name-and-CTA-buttons-chromium/error-context.md
- smoke-Multi-engine-smoke-t-e02d1-00-and-has-expected-content-chromium/error-context.md
- smoke-Multi-engine-smoke-t-ee73a-00-and-has-expected-content-chromium/error-context.md
- package.json
- EmployerModerationNotification.tsx
- dotenv
- eslint-config-next
- jsdom
- @playwright/test
- tailwindcss
- @tailwindcss/postcss
- @testing-library/dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- @types/react
- @types/react-dom
- typescript
- vitest

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 90 edges
2. `logAdminAction()` - 66 edges
3. `Role` - 58 edges
4. `Button()` - 20 edges
5. `cn()` - 19 edges
6. `requirePermission()` - 16 edges
7. `compilerOptions` - 16 edges
8. `isProfileComplete()` - 12 edges
9. `getMediaUrl()` - 11 edges
10. `PublicCourse` - 10 edges

## Surprising Connections (you probably didn't know these)
- `AcademicResourcesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `StudentsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/students/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (135 total, 33 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, devDependencies, eslint, prettier, @testing-library/jest-dom, vite-tsconfig-paths, @vitejs/plugin-react, prettier (+3 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (43): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, inngest, lucide-react, next (+35 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, **/*.mts, .next/dev/dev/types/**/*.ts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+21 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.23
Nodes (8): CertificationPartnersPage(), CertificationPartnerStrip(), PlacementData, PlacementSupportSection(), getCertificationPartners(), PublicCertificationPartner, getMediaUrl(), getMediaUrls()

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.24
Nodes (10): approveJobPosting(), editAndApproveJobPosting(), localeFromFormData(), rejectJobPosting(), JobPostingsPage(), JobPostingsPageProps, STATUS_COLORS, STATUS_LABELS (+2 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.14
Nodes (11): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+3 more)

### Community 8 - "aliases"
Cohesion: 0.14
Nodes (12): AccountSetupIncompletePage(), ForbiddenPage(), metadata, mockAuth, mockClerkMiddleware, mockCreateRouteMatcher, mockEmployerProfileCount, mockEnquiryFindMany (+4 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.27
Nodes (7): PublicLayout(), HomePage(), HomePageProps, getHomepageTeaser(), PublicNewsEvent, getSiteSettings(), renderHomePage()

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.12
Nodes (20): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate, mockAuth (+12 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.29
Nodes (9): AboutSection(), AboutSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getLocalizedAbout(), getLocalizedWhyCards(), Locale (+1 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.15
Nodes (12): EnquiryNotificationEmailProps, EmployerModerationNotificationInput, EnquiryNotificationInput, getCentreStaffEmails(), getFromEmail(), JobPostingModerationNotificationInput, resend, sendEnquiryNotification() (+4 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.14
Nodes (7): CandidateDetailPage(), PageProps, CandidateSearchPage(), PageProps, Props, getSearchableCandidates(), globalForPrisma

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.17
Nodes (12): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, Props (+4 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.23
Nodes (5): PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, requirePortalRole(), Role

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
Cohesion: 0.06
Nodes (76): createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory(), slugify(), updateCategory() (+68 more)

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.16
Nodes (11): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus(), Applicant, ApplicantRow(), ApplicantsList() (+3 more)

### Community 43 - "academic-resources/actions.test.ts"
Cohesion: 0.17
Nodes (10): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockFindManyCourses, mockFindUnique, mockRedirect (+2 more)

### Community 44 - "courses.ts"
Cohesion: 0.17
Nodes (10): mockAcCreate, mockAcFindMany, mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockProfileFindUnique, mockRedirect (+2 more)

### Community 45 - "jobs/page.tsx"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirst, mockFindMany, mockFindUnique, mockGetSkillsByIds, mockNotFound, mockRedirect

### Community 47 - "timetable-progress/actions.test.ts"
Cohesion: 0.12
Nodes (15): mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockPECreate, mockPEDelete, mockPEFindMany, mockProfileFindMany (+7 more)

### Community 48 - "students/actions.test.ts"
Cohesion: 0.15
Nodes (16): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, localeFromFormData(), parseCsvLine(), mockAuditCreate, mockAuth (+8 more)

### Community 49 - "employers/page.test.tsx"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindMany, mockRedirect, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 50 - "courses.test.ts"
Cohesion: 0.17
Nodes (7): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, EmployerDashboardPageProps, RequirePermissionResult, RequireRoleResult

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 52 - "Role"
Cohesion: 0.33
Nodes (5): mockAuth, mockCreate, mockFindMany, mockRedirect, mockUserFindUnique

### Community 53 - "courses.test.ts"
Cohesion: 0.17
Nodes (11): JobDetailPage(), PageProps, PlacementPage(), PlacementPageProps, ActiveJobPosting, getActiveJobPostings(), getJobDetail(), JobDetail (+3 more)

### Community 54 - "assignments/page.tsx"
Cohesion: 0.05
Nodes (60): ActionResult, submitVacancy(), PostVacancyPage(), PostVacancyForm(), PostVacancyFormProps, EMPLOYEE_RANGES, SECTORS, JobsFilter() (+52 more)

### Community 56 - "post-vacancy/actions.test.ts"
Cohesion: 0.33
Nodes (4): mockAuth, mockCreateJobPosting, mockFindUnique, mockRedirect

### Community 57 - "page.test.ts"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindUnique, mockRedirect

### Community 58 - "courses.ts"
Cohesion: 0.20
Nodes (8): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile, mockUserFindUnique

### Community 60 - "dashboard.test.ts"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyPostings, mockFindUniqueProfile, mockRedirect

### Community 61 - "student/actions.test.ts"
Cohesion: 0.18
Nodes (10): { GET, POST, PUT }, inngest, closeExpiredJobPostings, LogAdminActionInput, logSystemAction(), LogSystemActionInput, closeExpiredPostings(), mockAuditLogCreate (+2 more)

### Community 62 - "portal-role-gating.test.tsx"
Cohesion: 0.13
Nodes (14): Admin Routes (`(admin)`), Bilingual QA Log — Sprint 10 Task 3, Issue 1: News listing uses hardcoded `titleEn`/`bodyEn`, Issue 2: News detail page uses hardcoded `titleEn`/`bodyEn`, Issue 3: NewsTeaserSection (homepage) uses hardcoded `titleEn`, Issue 4: GalleryGrid uses hardcoded `nameEn`/`captionEn`, Issue 5: ContactSection hardcoded English strings, Issues Found & Resolved (+6 more)

### Community 63 - "enquiries/page.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindMany, mockRedirect, mockSkillsFindMany

### Community 64 - "job-postings/page.test.tsx"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindMany, mockRedirect, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 65 - "EmployerModerationNotification.tsx"
Cohesion: 0.23
Nodes (9): NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), pickLocalizedText(), mockFindFirst (+1 more)

### Community 66 - "portal-role-gating.test.tsx"
Cohesion: 0.25
Nodes (6): mockAuth, mockFindFirstPosting, mockFindMany, mockFindUniqueProfile, mockRedirect, mockUpdateMany

### Community 67 - "staff.test.ts"
Cohesion: 0.17
Nodes (11): mockAuditCreate, mockAuth, mockClerkClient, mockCreateInvitation, mockFindManyUser, mockFindUniqueUser, mockRedirect, mockRevalidatePath (+3 more)

### Community 68 - "employer/page.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 70 - "courses.test.ts"
Cohesion: 0.16
Nodes (18): GalleryPage(), GalleryPageProps, GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl(), getYouTubeEmbedUrl(), getYouTubeVideoId() (+10 more)

### Community 71 - "search-form.tsx"
Cohesion: 0.27
Nodes (8): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, applyFilters(), CandidateCardProps, CandidateSearchForm(), CandidateSearchFormProps, FilterField

### Community 72 - "[id]/actions.ts"
Cohesion: 0.27
Nodes (7): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps

### Community 73 - "candidates/actions.ts"
Cohesion: 0.27
Nodes (8): inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), BiodataActionResult, BiodataFormData, CandidateProfileWithCompletion, isProfileComplete()

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 75 - "email.ts"
Cohesion: 0.11
Nodes (18): Admin (`(admin)`), API routes, Auth/utility, Component-Level Findings, Conclusion, Cross-Browser & Mobile QA Log — Sprint 11, Task 1, CSV Bulk Import (admin/students), Forms (Enquiry, Post-Vacancy, Employer Registration, Biodata) (+10 more)

### Community 76 - "[id]/page.tsx"
Cohesion: 0.18
Nodes (12): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+4 more)

### Community 78 - "portal-role-gating.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockClerkMiddleware, mockCreateRouteMatcher

### Community 80 - "employer/page.tsx"
Cohesion: 0.42
Nodes (10): approveAndTrustEmployer(), approveEmployer(), localeFromFormData(), rejectEmployer(), toggleAutoPublishTrusted(), EmployersPage(), EmployersPageProps, STATUS_LABELS (+2 more)

### Community 82 - "resource-list.tsx"
Cohesion: 0.21
Nodes (5): Props, Props, Props, ResourceList(), ResourceListProps

### Community 84 - "register/actions.test.ts"
Cohesion: 0.17
Nodes (8): RegistrationResult, submitEmployerRegistration(), mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, RegistrationForm()

### Community 88 - "employers/actions.test.ts"
Cohesion: 0.18
Nodes (10): mockAuditCreate, mockAuth, mockFindMany, mockFindUnique, mockRedirect, mockRevalidatePath, mockSendModerationNotification, mockStaffPermissionFindUnique (+2 more)

### Community 89 - "job-postings/actions.test.ts"
Cohesion: 0.20
Nodes (9): mockAuditCreate, mockAuth, mockFindMany, mockRedirect, mockRevalidatePath, mockSendModerationNotification, mockStaffPermissionFindUnique, mockUpdate (+1 more)

### Community 90 - "admin/page.test.tsx"
Cohesion: 0.20
Nodes (8): mockAuth, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockRedirect, mockSkillCount, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 91 - "[locale]/layout.tsx"
Cohesion: 0.24
Nodes (6): geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale, routing

### Community 92 - "Header.tsx"
Cohesion: 0.33
Nodes (5): AdminLayout(), PortalLayout(), Header(), navItems, siteConfig

### Community 93 - "FlashNewsBar.tsx"
Cohesion: 0.27
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 94 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed, db:studio, dev, lint, start, test (+1 more)

### Community 95 - "i18n.test.tsx"
Cohesion: 0.25
Nodes (6): getTsxFiles(), isTestFile(), mockAuth, mockAuthResult, mockClerkMiddleware, mockCreateRouteMatcher

### Community 97 - "flash-news/page.test.tsx"
Cohesion: 0.25
Nodes (7): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath, mockUserFindUnique

### Community 98 - "middleware.ts"
Cohesion: 0.39
Nodes (7): config, getRequestLocale(), handleRouteProtection(), intlMiddleware, isAdminRoute, isPortalRoute, isSignUpRoute

### Community 99 - "AtAGlanceSection.tsx"
Cohesion: 0.47
Nodes (3): AtAGlanceSection(), AtAGlanceSectionProps, getAtAGlanceStats()

### Community 100 - "NewsTeaserSection.tsx"
Cohesion: 0.47
Nodes (5): formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, pickLocalizedText(), TeaserItem

### Community 101 - "admin/page.tsx"
Cohesion: 0.40
Nodes (3): AdminDashboardPage(), AdminDashboardPageProps, StaffPermissionKeys

### Community 102 - "Footer.tsx"
Cohesion: 0.50
Nodes (3): Footer(), portalLinks, quickLinks

### Community 104 - "mobile-viewport-Mobile-vie-2ea25-ble-and-opens-nav-on-mobile-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 105 - "mobile-viewport-Mobile-vie-367c0--without-overflow-on-mobile-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 106 - "mobile-viewport-Mobile-vie-90baf-essible-from-hamburger-menu-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 107 - "mobile-viewport-Mobile-vie-eef14--visible-overflow-on-mobile-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 108 - "pdf-download-PDF-download--ed942-ns-401-when-unauthenticated-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 109 - "pdf-download-PDF-download--fb469-load-for-authenticated-user-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 110 - "smoke-Multi-engine-smoke-t-44774-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 111 - "smoke-Multi-engine-smoke-t-54994-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 112 - "smoke-Multi-engine-smoke-t-779f6--a-gallery-image-is-clicked-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 113 - "smoke-Multi-engine-smoke-t-86a42-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 114 - "smoke-Multi-engine-smoke-t-b5492-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 115 - "smoke-Multi-engine-smoke-t-c3b26-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 116 - "smoke-Multi-engine-smoke-t-ce860--brand-name-and-CTA-buttons-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 117 - "smoke-Multi-engine-smoke-t-e02d1-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 118 - "smoke-Multi-engine-smoke-t-ee73a-00-and-has-expected-content-chromium/error-context.md"
Cohesion: 0.40
Nodes (4): Error details, Instructions, Test info, Test source

### Community 119 - "package.json"
Cohesion: 0.50
Nodes (3): name, private, version

## Knowledge Gaps
- **597 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+592 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `EnquiryForm.tsx`, `(admin)/layout.tsx`, `actions.test.ts`, `gallery/actions.ts`, `courses.test.ts`, `news-events.test.ts`, `flash-news/page.test.tsx`, `FlashNewsBar.tsx`, `students/actions.test.ts`, `courses.test.ts`, `Role`, `courses.test.ts`, `assignments/page.tsx`, `student-dashboard.test.tsx`, `courses.ts`, `student/actions.test.ts`, `[id]/actions.ts`, `candidates/actions.ts`, `portal-role-gating.test.tsx`, `employer/page.tsx`, `register/actions.test.ts`, `auth.ts`, `portal/student/page.tsx`, `admin/page.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `flash-news/page.test.tsx` to `courses.test.ts`, `FlashNewsBar.tsx`, `package.json`, `EnquiryForm.tsx`, `admin/page.tsx`, `(admin)/layout.tsx`, `employer/page.tsx`, `actions.test.ts`, `courses.test.ts`, `students/actions.test.ts`, `courses.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `LanguageSwitcher.tsx` to `Header.tsx`, `i18n.test.tsx`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _597 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._