# Graph Report - gtec-thoudpuzha  (2026-07-24)

## Corpus Check
- 293 files · ~97,829 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1376 nodes · 2093 edges · 154 communities (117 shown, 37 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6726fae5`
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
- gallery.ts
- admin/page.test.tsx
- middleware.ts
- NewsTeaserSection.tsx
- FlashNewsBar.tsx
- scripts
- AtAGlanceSection.tsx
- portal/student/page.tsx
- middleware.ts
- AtAGlanceSection.tsx
- vite-tsconfig-paths
- @vitejs/plugin-react
- [id]/actions.ts
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
- candidates/actions.ts
- dotenv
- candidates/actions.test.ts
- jsdom
- @playwright/test
- tailwindcss
- enquiries/page.tsx
- @testing-library/dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- (public)/layout.tsx
- @types/react-dom
- typescript
- vitest
- applications/page.tsx
- flash-news/page.tsx
- applicants/actions.test.ts
- no-raw-img.test.ts
- sign-up/student/page.tsx
- BiodataForm.test.tsx
- courses/page.tsx
- admin/page.tsx
- video-lecture-list.tsx
- Findings
- admin/gallery/page.tsx
- [id]/page.tsx
- InviteToApplyEmail.tsx
- courses/page.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 84 edges
2. `logAdminAction()` - 66 edges
3. `Role` - 51 edges
4. `cn()` - 19 edges
5. `Button()` - 16 edges
6. `compilerOptions` - 16 edges
7. `requirePermission()` - 14 edges
8. `UAT Script — GTEC Thodupuzha Admin Panel` - 12 edges
9. `getMediaUrl()` - 10 edges
10. `scripts` - 9 edges

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

## Communities (154 total, 37 thin omitted)

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
Cohesion: 0.18
Nodes (8): BiodataForm(), BiodataFormProps, JOB_TYPE_OPTIONS, QUALIFICATION_OPTIONS, SkillMultiSelect(), SkillMultiSelectProps, mockCourses, mockSkills

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.06
Nodes (49): approveAndTrustEmployer(), approveEmployer(), localeFromFormData(), rejectEmployer(), mockAuditCreate, mockAuth, mockFindMany, mockFindUnique (+41 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.14
Nodes (11): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+3 more)

### Community 8 - "aliases"
Cohesion: 0.08
Nodes (25): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale (+17 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.26
Nodes (7): AdminLayout(), PortalLayout(), Header(), navItems, buildLocalePath(), LanguageSwitcher(), siteConfig

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.29
Nodes (9): AboutSection(), AboutSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getLocalizedAbout(), getLocalizedWhyCards(), Locale (+1 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.11
Nodes (8): CandidateDetailPage(), PageProps, CandidateSearchPage(), PageProps, Props, Props, getSearchableCandidates(), globalForPrisma

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.22
Nodes (11): NewsPage(), NewsPageProps, generateStaticParams(), NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), PublicNewsEvent (+3 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.20
Nodes (17): ActionResult, submitVacancy(), PostVacancyForm(), PostVacancyFormProps, JobsFilterProps, Input(), SelectContent(), SelectGroup() (+9 more)

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.16
Nodes (13): EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone(), MOCK_COURSES, EnquiryPayload, submitEnquiry() (+5 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.12
Nodes (14): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, RequirePermissionResult (+6 more)

### Community 36 - "news-events.test.ts"
Cohesion: 0.21
Nodes (7): JOB_TYPE_LABELS, QUALIFICATION_LABELS, BiodataPdfData, BiodataPdfDocument(), styles, completeData, incompleteData

### Community 38 - "getMediaUrl"
Cohesion: 0.22
Nodes (7): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, mockUpdateUser, mockUpsert

### Community 40 - "seed.ts"
Cohesion: 0.18
Nodes (16): ALL_COURSE_TITLES, ALL_PARTNER_NAMES, CATEGORIES, CATEGORY_NAMES, CERTIFICATION_PARTNERS, COURSES, CourseSeed, GALLERY_CATEGORIES (+8 more)

### Community 41 - "flash-news/page.test.tsx"
Cohesion: 0.07
Nodes (73): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), PageProps, createCategory(), createCourse() (+65 more)

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.25
Nodes (5): Applicant, ApplicantsList(), NEXT_TRANSITIONS, STATUS_BADGE, PageProps

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
Cohesion: 0.17
Nodes (11): 1. GalleryGrid lightbox missing focus trap, 2. FlashNewsBar duplicated content for assistive technology, 3. SkillMultiSelect combobox missing accessible label, 4. Placement page heading hierarchy skip, 5. `text-gray-400` fails minimum contrast, Accessibility Audit Log — GTEC Thodupuzha, Clean Scans (no issues), Conclusion (+3 more)

### Community 49 - "employers/page.test.tsx"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindMany, mockRedirect, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 50 - "courses.test.ts"
Cohesion: 0.05
Nodes (41): 1.1 Dashboard as Super Admin, 1.2 Dashboard as Centre Staff, 1.3 Audit Log Page, 2.1 Course Categories, 2.2 Create Course, 2.3 Edit Course, 2.4 Upload Cover Image, 2.5 Delete Course (+33 more)

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 52 - "Role"
Cohesion: 0.33
Nodes (5): mockAuth, mockCreate, mockFindMany, mockRedirect, mockUserFindUnique

### Community 53 - "courses.test.ts"
Cohesion: 0.21
Nodes (7): PlacementPage(), PlacementPageProps, ActiveJobPosting, getActiveJobPostings(), JobDetail, mockFindMany, mockSkillsFindMany

### Community 54 - "assignments/page.tsx"
Cohesion: 0.09
Nodes (21): ContactSection(), ContactSectionProps, ModalOverlay(), socialIcons, baseSettings, mockCourses, useCloseOnEscape(), CourseSelect() (+13 more)

### Community 56 - "post-vacancy/actions.test.ts"
Cohesion: 0.33
Nodes (4): mockAuth, mockCreateJobPosting, mockFindUnique, mockRedirect

### Community 57 - "page.test.ts"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindUnique, mockRedirect

### Community 58 - "courses.ts"
Cohesion: 0.12
Nodes (12): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockRedirect, mockRevalidatePath (+4 more)

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
Cohesion: 0.22
Nodes (11): HomePage(), HomePageProps, PlacementData, PlacementSupportSection(), getPublishedCourses(), getGalleryCategoryBySlug(), getPlacementGalleryData(), PlacementGalleryData (+3 more)

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
Cohesion: 0.20
Nodes (14): GalleryPage(), GalleryPageProps, GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl(), getYouTubeEmbedUrl(), getYouTubeVideoId() (+6 more)

### Community 71 - "search-form.tsx"
Cohesion: 0.22
Nodes (12): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), applyFilters() (+4 more)

### Community 72 - "[id]/actions.ts"
Cohesion: 0.15
Nodes (16): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, localeFromFormData(), parseCsvLine(), mockAuditCreate, mockAuth (+8 more)

### Community 73 - "candidates/actions.ts"
Cohesion: 0.38
Nodes (3): EMPLOYEE_RANGES, RegistrationForm(), SECTORS

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.24
Nodes (8): AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, HeroSection(), HeroSectionProps, Button(), buttonVariants

### Community 75 - "email.ts"
Cohesion: 0.11
Nodes (18): Admin (`(admin)`), API routes, Auth/utility, Component-Level Findings, Conclusion, Cross-Browser & Mobile QA Log — Sprint 11, Task 1, CSV Bulk Import (admin/students), Forms (Enquiry, Post-Vacancy, Employer Registration, Biodata) (+10 more)

### Community 76 - "[id]/page.tsx"
Cohesion: 0.28
Nodes (9): RegistrationResult, submitEmployerRegistration(), lookupStudentRecord(), checkRateLimit(), getClientIp(), RateLimitConfig, RateLimitResult, resetRateLimiter() (+1 more)

### Community 77 - "inviteToApply"
Cohesion: 0.27
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 78 - "portal-role-gating.test.tsx"
Cohesion: 0.25
Nodes (6): getTsxFiles(), isTestFile(), mockAuth, mockAuthResult, mockClerkMiddleware, mockCreateRouteMatcher

### Community 79 - "progress/page.tsx"
Cohesion: 0.12
Nodes (15): 1. Rate-Limiting Implementation, 2. Input Validation & Sanitization Audit, 3. Prisma Schema Review — Soft-Delete Compliance, 4. Regression: Sprint 0 + Sprint 4 Auth Tests, 5. Environment Variables / Secrets, 6. Recommended Follow-Ups (post-v1), Audit method, Backend (+7 more)

### Community 80 - "employer/page.tsx"
Cohesion: 0.17
Nodes (11): mockAuth, mockCandidateCreate, mockCheckRateLimit, mockClerkClient, mockFindFirst, mockFindUnique, mockGetClientIp, mockRecordUpdate (+3 more)

### Community 82 - "resource-list.tsx"
Cohesion: 0.21
Nodes (5): Props, Props, Props, ResourceList(), ResourceListProps

### Community 89 - "gallery.ts"
Cohesion: 0.29
Nodes (6): PostVacancyPage(), JobsFilter(), JobsPage(), JobsPageProps, createPENDINGSkill(), getApprovedSkills()

### Community 90 - "admin/page.test.tsx"
Cohesion: 0.20
Nodes (8): mockAuth, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockRedirect, mockSkillCount, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 91 - "middleware.ts"
Cohesion: 0.36
Nodes (6): CertificationPartnersPage(), CertificationPartnerStrip(), getCertificationPartners(), PublicCertificationPartner, getMediaUrl(), getMediaUrls()

### Community 92 - "NewsTeaserSection.tsx"
Cohesion: 0.47
Nodes (5): formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, pickLocalizedText(), TeaserItem

### Community 93 - "FlashNewsBar.tsx"
Cohesion: 0.20
Nodes (9): Gallery Page Note, Image Optimization Audit, Key Improvements, LCP Measurement, Lighthouse / LCP Status, Performance Audit Log — Sprint 11, Task 4, Recommended Future Work (beyond sprint scope), Remaining Bottlenecks (+1 more)

### Community 94 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed, db:studio, dev, lint, start, test (+1 more)

### Community 95 - "AtAGlanceSection.tsx"
Cohesion: 0.47
Nodes (3): AtAGlanceSection(), AtAGlanceSectionProps, getAtAGlanceStats()

### Community 103 - "[id]/actions.ts"
Cohesion: 0.15
Nodes (11): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps, BiodataActionResult (+3 more)

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

### Community 120 - "candidates/actions.ts"
Cohesion: 0.22
Nodes (8): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockRedirect, mockRevalidatePath, mockUpdate, mockUserFindUnique

### Community 121 - "dotenv"
Cohesion: 0.18
Nodes (11): @axe-core/playwright, dotenv, eslint-config-next, devDependencies, @axe-core/playwright, dotenv, eslint-config-next, @tailwindcss/postcss (+3 more)

### Community 122 - "candidates/actions.test.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 126 - "enquiries/page.tsx"
Cohesion: 0.22
Nodes (7): mockAuth, mockCheckRateLimit, mockClerkClient, mockCreate, mockFindUnique, mockGetClientIp, mockRedirect

### Community 131 - "(public)/layout.tsx"
Cohesion: 0.31
Nodes (6): PublicLayout(), Footer(), legalLinks, portalLinks, quickLinks, getSiteSettings()

### Community 136 - "flash-news/page.tsx"
Cohesion: 0.25
Nodes (7): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath, mockUserFindUnique

### Community 137 - "applicants/actions.test.ts"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus()

### Community 139 - "sign-up/student/page.tsx"
Cohesion: 0.38
Nodes (4): finalizeStudentVerification(), Step, StudentSignUpPage(), Label()

### Community 142 - "BiodataForm.test.tsx"
Cohesion: 0.33
Nodes (3): mockApprovedSkills, mockCourses, mockPendingSkill

### Community 145 - "video-lecture-list.tsx"
Cohesion: 0.24
Nodes (8): deleteResource(), localeFromFormData(), uploadResource(), Props, VideoLectureList(), _ALLOWED_HOSTS, deriveEmbedUrl(), validateVideoUrl()

### Community 146 - "Findings"
Cohesion: 0.33
Nodes (5): Findings, How to use this log, UAT-001: Job Posting rejection reason silently discarded, UAT-002: Nested `<form>` in courses page edit/delete action, UAT Feedback Log — GTEC Thodupuzha

### Community 150 - "courses/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyCategories, mockFindManyCourses, mockRedirect

## Knowledge Gaps
- **684 isolated node(s):** `mockAuthResult`, `mockAuth`, `mockCreateRouteMatcher`, `mockClerkMiddleware`, `mockAuth` (+679 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `EnquiryForm.tsx`, `applications/page.tsx`, `applicants/actions.test.ts`, `(public)/page.tsx`, `video-lecture-list.tsx`, `actions.test.ts`, `gallery/actions.ts`, `news-events.test.ts`, `flash-news/page.test.tsx`, `FlashNewsBar.tsx`, `Role`, `assignments/page.tsx`, `student-dashboard.test.tsx`, `student/actions.test.ts`, `[id]/actions.ts`, `candidates/actions.ts`, `candidates/actions.test.ts`, `[id]/page.tsx`, `gallery.ts`, `portal/student/page.tsx`, `[id]/actions.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `flash-news/page.test.tsx` to `FlashNewsBar.tsx`, `EnquiryForm.tsx`, `[id]/actions.ts`, `candidates/actions.test.ts`, `video-lecture-list.tsx`, `actions.test.ts`, `assignments/page.tsx`, `middleware.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `logAdminAction()` connect `flash-news/page.test.tsx` to `EnquiryForm.tsx`, `[id]/actions.ts`, `video-lecture-list.tsx`, `actions.test.ts`, `Role`, `student/actions.test.ts`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `mockAuthResult`, `mockAuth`, `mockCreateRouteMatcher` to the rest of the system?**
  _684 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._