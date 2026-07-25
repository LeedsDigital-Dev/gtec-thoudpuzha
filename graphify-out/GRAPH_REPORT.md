# Graph Report - gtec-thoudpuzha  (2026-07-25)

## Corpus Check
- 321 files · ~110,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1535 nodes · 2248 edges · 174 communities (124 shown, 50 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `172852da`
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
- portal/page.tsx
- gallery/actions.ts
- setup.ts
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
- AtAGlanceSection.tsx
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
- postVacancy
- enquiries/page.tsx
- studentVerification
- terms
- privacy
- privacy
- [slug]/page.tsx
- applicants/actions.test.ts
- no-raw-img.test.ts
- courses/page.tsx
- video-lecture-list.tsx
- Findings
- admin/gallery/page.tsx
- [id]/page.tsx
- InviteToApplyEmail.tsx
- courses/page.test.tsx
- students/actions.test.ts
- newsTeaser
- roleGate
- timetable-progress/page.tsx
- lucide-react
- @clerk/nextjs
- contact
- sign-up/student/page.tsx
- vitest
- site-settings.ts
- employeeCountLabel
- @react-pdf/renderer
- @playwright/test
- @testing-library/dom
- AtAGlanceSection.tsx
- @testing-library/react
- eslint
- jsdom
- @types/react
- prettier
- tailwindcss
- @types/react-dom
- @testing-library/jest-dom
- @testing-library/user-event
- @types/node
- @vitejs/plugin-react

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 77 edges
2. `logAdminAction()` - 63 edges
3. `Role` - 47 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `requirePermission()` - 14 edges
7. `Button()` - 13 edges
8. `UAT Script — GTEC Thodupuzha Admin Panel` - 12 edges
9. `getMediaUrl()` - 10 edges
10. `scripts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `LogAdminActionInput` --references--> `Role`  [EXTRACTED]
  src/lib/audit.ts → src/lib/auth.ts
- `AdminDashboardPage()` --calls--> `isRouteVisible()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/page.tsx → src/lib/admin-routes.ts

## Import Cycles
- None detected.

## Communities (174 total, 50 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.22
Nodes (9): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps, CandidateProfileWithCompletion (+1 more)

### Community 1 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, inngest, dependencies, @aws-sdk/client-s3, @base-ui/react, class-variance-authority (+11 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, **/*.mts, .next/dev/dev/types/**/*.ts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+21 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.05
Nodes (32): PortalLayout(), EMPLOYEE_RANGES, RegistrationForm(), SECTORS, PublicLayout(), BiodataForm(), BiodataFormProps, JOB_TYPE_OPTIONS (+24 more)

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
Cohesion: 0.16
Nodes (13): geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale, routing, config, getRequestLocale() (+5 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.10
Nodes (21): RegistrationResult, submitEmployerRegistration(), mockAuth, mockCheckRateLimit, mockClerkClient, mockCreate, mockFindUnique, mockGetClientIp (+13 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.22
Nodes (11): NewsPage(), NewsPageProps, generateStaticParams(), NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), PublicNewsEvent (+3 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.24
Nodes (9): CertificationPartnersPage(), CertificationPartnerStrip(), PlacementData, PlacementSupportSection(), getCertificationPartners(), PublicCertificationPartner, PublicGalleryCategory, getMediaUrl() (+1 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 20 - "taste.md"
Cohesion: 0.40
Nodes (3): Taste (Continuously Learned by [CommandCode][cmd]), workflow, workflow

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.19
Nodes (12): AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getAtAGlanceStats() (+4 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.08
Nodes (35): ActionResult, submitVacancy(), PostVacancyPage(), PostVacancyForm(), PostVacancyFormProps, JobsFilter(), JobsFilterProps, JobsPage() (+27 more)

### Community 27 - "setup.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.10
Nodes (7): Separator(), SidebarContext, SidebarContextProps, Skeleton(), Tooltip(), TooltipContent(), TooltipTrigger()

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.13
Nodes (12): AuditLogPage(), AuditLogPageProps, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, RequirePermissionResult, requirePortalRole(), RequireRoleResult (+4 more)

### Community 36 - "news-events.test.ts"
Cohesion: 0.21
Nodes (7): JOB_TYPE_LABELS, QUALIFICATION_LABELS, BiodataPdfData, BiodataPdfDocument(), styles, completeData, incompleteData

### Community 38 - "getMediaUrl"
Cohesion: 0.17
Nodes (10): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockGetUser, mockRedirect, mockStaffPermissionCreate, mockStaffPermissionFindUnique (+2 more)

### Community 40 - "seed.ts"
Cohesion: 0.18
Nodes (16): ALL_COURSE_TITLES, ALL_PARTNER_NAMES, CATEGORIES, CATEGORY_NAMES, CERTIFICATION_PARTNERS, COURSES, CourseSeed, GALLERY_CATEGORIES (+8 more)

### Community 41 - "flash-news/page.test.tsx"
Cohesion: 0.23
Nodes (10): HomePage(), HomePageProps, formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, pickLocalizedText(), TeaserItem, getPublishedCourses() (+2 more)

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
Cohesion: 0.36
Nodes (6): GalleryPage(), GalleryPageProps, getGalleryCategoryBySlug(), getGalleryData(), getPlacementGalleryData(), PlacementGalleryData

### Community 53 - "courses.test.ts"
Cohesion: 0.60
Nodes (3): { GET, POST, PUT }, inngest, closeExpiredJobPostings

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
Cohesion: 0.05
Nodes (34): enrollStudentInCourses(), localeFromFormData(), baseProps, mockRouterPush, stubCourses, students, mockAuditCreate, mockAuth (+26 more)

### Community 62 - "portal-role-gating.test.tsx"
Cohesion: 0.13
Nodes (14): Admin Routes (`(admin)`), Bilingual QA Log — Sprint 10 Task 3, Issue 1: News listing uses hardcoded `titleEn`/`bodyEn`, Issue 2: News detail page uses hardcoded `titleEn`/`bodyEn`, Issue 3: NewsTeaserSection (homepage) uses hardcoded `titleEn`, Issue 4: GalleryGrid uses hardcoded `nameEn`/`captionEn`, Issue 5: ContactSection hardcoded English strings, Issues Found & Resolved (+6 more)

### Community 63 - "enquiries/page.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindMany, mockRedirect, mockSkillsFindMany

### Community 64 - "job-postings/page.test.tsx"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindMany, mockRedirect, mockStaffPermissionFindUnique, mockUserFindUnique

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
Cohesion: 0.27
Nodes (11): GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl(), getYouTubeEmbedUrl(), getYouTubeVideoId(), Lightbox(), pickLocalizedText() (+3 more)

### Community 71 - "search-form.tsx"
Cohesion: 0.17
Nodes (13): AdminDashboardPage(), AdminDashboardPageProps, AdminSidebar(), isRouteActive(), SidebarContent(), SidebarGroup(), SidebarGroupLabel(), SidebarHeader() (+5 more)

### Community 72 - "[id]/actions.ts"
Cohesion: 0.38
Nodes (5): ConfirmDeleteForm(), ConfirmDeleteFormProps, formatDate(), NewsEventsPage(), NewsEventsPageProps

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.18
Nodes (5): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle()

### Community 75 - "email.ts"
Cohesion: 0.11
Nodes (18): Admin (`(admin)`), API routes, Auth/utility, Component-Level Findings, Conclusion, Cross-Browser & Mobile QA Log — Sprint 11, Task 1, CSV Bulk Import (admin/students), Forms (Enquiry, Post-Vacancy, Employer Registration, Biodata) (+10 more)

### Community 76 - "[id]/page.tsx"
Cohesion: 0.12
Nodes (20): ContactSection(), ContactSectionProps, ModalOverlay(), socialIcons, baseSettings, mockCourses, useCloseOnEscape(), CourseSelect() (+12 more)

### Community 77 - "inviteToApply"
Cohesion: 0.24
Nodes (7): AdminLayout(), AdminShell(), AdminShellProps, AdminSidebarProps, SidebarProvider(), useIsMobile(), PermissionKey

### Community 78 - "portal-role-gating.test.tsx"
Cohesion: 0.25
Nodes (6): getTsxFiles(), isTestFile(), mockAuth, mockAuthResult, mockClerkMiddleware, mockCreateRouteMatcher

### Community 79 - "progress/page.tsx"
Cohesion: 0.12
Nodes (15): 1. Rate-Limiting Implementation, 2. Input Validation & Sanitization Audit, 3. Prisma Schema Review — Soft-Delete Compliance, 4. Regression: Sprint 0 + Sprint 4 Auth Tests, 5. Environment Variables / Secrets, 6. Recommended Follow-Ups (post-v1), Audit method, Backend (+7 more)

### Community 80 - "employer/page.tsx"
Cohesion: 0.18
Nodes (9): mockAuth, mockClerkMiddleware, mockCreateRouteMatcher, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockSkillCount, mockStaffPermissionFindUnique (+1 more)

### Community 82 - "resource-list.tsx"
Cohesion: 0.21
Nodes (5): Props, Props, Props, ResourceList(), ResourceListProps

### Community 89 - "gallery.ts"
Cohesion: 0.18
Nodes (10): mockAuth, mockCandidateProfileCreate, mockCandidateProfileFindUnique, mockClerkClient, mockGetUser, mockRedirect, mockStaffPermissionCreate, mockStaffPermissionFindUnique (+2 more)

### Community 90 - "admin/page.test.tsx"
Cohesion: 0.20
Nodes (8): mockAuth, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockRedirect, mockSkillCount, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 91 - "middleware.ts"
Cohesion: 0.14
Nodes (13): vitest, mockAuth, mockCandidateCreate, mockCheckRateLimit, mockClerkClient, mockFindFirst, mockFindUnique, mockGetClientIp (+5 more)

### Community 92 - "NewsTeaserSection.tsx"
Cohesion: 0.13
Nodes (8): CandidateDetailPage(), PageProps, CandidateSearchPage(), PageProps, Props, Props, getSearchableCandidates(), globalForPrisma

### Community 93 - "FlashNewsBar.tsx"
Cohesion: 0.20
Nodes (9): Gallery Page Note, Image Optimization Audit, Key Improvements, LCP Measurement, Lighthouse / LCP Status, Performance Audit Log — Sprint 11, Task 4, Recommended Future Work (beyond sprint scope), Remaining Bottlenecks (+1 more)

### Community 94 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed, db:studio, dev, lint, start, test (+1 more)

### Community 95 - "AtAGlanceSection.tsx"
Cohesion: 0.20
Nodes (8): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile, mockUserFindUnique

### Community 99 - "AtAGlanceSection.tsx"
Cohesion: 0.29
Nodes (4): mockApplicationCount, mockApplicationFindMany, mockAuth, mockFindUnique

### Community 102 - "@vitejs/plugin-react"
Cohesion: 0.40
Nodes (4): BiodataActionResult, BiodataFormData, saveBiodata(), submitBiodataForm()

### Community 103 - "[id]/actions.ts"
Cohesion: 0.22
Nodes (12): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), applyFilters() (+4 more)

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
Cohesion: 0.25
Nodes (7): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath, mockUserFindUnique

### Community 120 - "candidates/actions.ts"
Cohesion: 0.22
Nodes (8): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockRedirect, mockRevalidatePath, mockUpdate, mockUserFindUnique

### Community 121 - "dotenv"
Cohesion: 0.18
Nodes (11): @axe-core/playwright, eslint-config-next, devDependencies, @axe-core/playwright, eslint-config-next, @tailwindcss/postcss, typescript, vite-tsconfig-paths (+3 more)

### Community 122 - "candidates/actions.test.ts"
Cohesion: 0.33
Nodes (6): Sidebar(), SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 123 - "jsdom"
Cohesion: 0.40
Nodes (4): mockAuth, mockRedirect, mockUpsert, validData

### Community 137 - "applicants/actions.test.ts"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus()

### Community 145 - "video-lecture-list.tsx"
Cohesion: 0.36
Nodes (4): Props, VideoLectureList(), _ALLOWED_HOSTS, deriveEmbedUrl()

### Community 146 - "Findings"
Cohesion: 0.33
Nodes (5): Findings, How to use this log, UAT-001: Job Posting rejection reason silently discarded, UAT-002: Nested `<form>` in courses page edit/delete action, UAT Feedback Log — GTEC Thodupuzha

### Community 147 - "admin/gallery/page.tsx"
Cohesion: 0.40
Nodes (3): ConfirmDeleteForm(), ConfirmDeleteFormProps, GalleryPageProps

### Community 150 - "courses/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyCategories, mockFindManyCourses, mockRedirect

### Community 161 - "students/actions.test.ts"
Cohesion: 0.17
Nodes (17): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, isValidEmail(), localeFromFormData(), parseCsvLine(), mockAuditCreate (+9 more)

### Community 176 - "roleGate"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 188 - "timetable-progress/page.tsx"
Cohesion: 0.06
Nodes (85): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, createPartner() (+77 more)

### Community 199 - "sign-up/student/page.tsx"
Cohesion: 0.18
Nodes (7): next-intl, next-intl, react, react, finalizeStudentVerification(), lookupStudentRecord(), Step

### Community 204 - "site-settings.ts"
Cohesion: 0.33
Nodes (5): mockAuth, mockCreate, mockFindMany, mockRedirect, mockUserFindUnique

## Knowledge Gaps
- **744 isolated node(s):** `ConfirmDeleteFormProps`, `GalleryPageProps`, `ConfirmDeleteFormProps`, `NewsEventsPageProps`, `Taste (Continuously Learned by [CommandCode][cmd])` (+739 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `devDependencies`, `EmployerModerationNotification.tsx`, `news-events.test.ts`, `EnquiryForm.tsx`, `candidates/actions.ts`, `applicants/actions.test.ts`, `FlashNewsBar.tsx`, `BiodataForm.test.tsx`, `site-settings.ts`, `NewsTeaserSection.tsx`, `actions.test.ts`, `assignments/page.tsx`, `student-dashboard.test.tsx`, `gallery/actions.ts`, `timetable-progress/page.tsx`, `AtAGlanceSection.tsx`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `package.json` to `gallery/actions.ts`, `[id]/page.tsx`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `timetable-progress/page.tsx` to `FlashNewsBar.tsx`, `EnquiryForm.tsx`, `candidates/actions.ts`, `(public)/page.tsx`, `actions.test.ts`, `AtAGlanceSection.tsx`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `ConfirmDeleteFormProps`, `GalleryPageProps`, `ConfirmDeleteFormProps` to the rest of the system?**
  _744 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._