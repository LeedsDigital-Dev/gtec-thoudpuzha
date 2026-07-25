# Graph Report - gtec-thoudpuzha  (2026-07-25)

## Corpus Check
- 318 files · ~110,328 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1527 nodes · 2250 edges · 180 communities (132 shown, 48 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `76395719`
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
- postVacancy
- enquiries/page.tsx
- studentVerification
- terms
- privacy
- privacy
- [slug]/page.tsx
- flash-news/page.tsx
- applicants/actions.test.ts
- no-raw-img.test.ts
- courses/page.tsx
- video-lecture-list.tsx
- Findings
- admin/gallery/page.tsx
- [id]/page.tsx
- InviteToApplyEmail.tsx
- courses/page.test.tsx
- staff/page.tsx
- students/actions.test.ts
- newsTeaser
- roleGate
- site/actions.ts
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
1. `requireRole()` - 79 edges
2. `logAdminAction()` - 63 edges
3. `Role` - 48 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `Button()` - 14 edges
7. `requirePermission()` - 14 edges
8. `UAT Script — GTEC Thodupuzha Admin Panel` - 12 edges
9. `getMediaUrl()` - 10 edges
10. `scripts` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AcademicResourcesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/academic-resources/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `SkillsTaxonomyPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/skills-taxonomy/page.tsx → src/lib/auth.ts
- `StaffPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/staff/page.tsx → src/lib/auth.ts
- `ContactSectionProps` --references--> `PublicCourse`  [EXTRACTED]
  src/components/shared/ContactSection.tsx → src/lib/courses.ts

## Import Cycles
- None detected.

## Communities (180 total, 48 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.18
Nodes (12): CourseSelect(), CourseSelectProps, publishedCourses, EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone() (+4 more)

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
Cohesion: 0.07
Nodes (24): PortalLayout(), EMPLOYEE_RANGES, RegistrationForm(), SECTORS, BiodataForm(), BiodataFormProps, JOB_TYPE_OPTIONS, QUALIFICATION_OPTIONS (+16 more)

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
Cohesion: 0.22
Nodes (11): NewsPage(), NewsPageProps, generateStaticParams(), NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), PublicNewsEvent (+3 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.23
Nodes (19): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), PageProps, createCategory(), createCourse() (+11 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.31
Nodes (8): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, validateVideoUrl()

### Community 17 - "actions.test.ts"
Cohesion: 0.20
Nodes (7): mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath, mockSiteSettingsUpdate, mockWhyCardUpdate

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.19
Nodes (12): AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getAtAGlanceStats() (+4 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.18
Nodes (17): ActionResult, submitVacancy(), PostVacancyForm(), PostVacancyFormProps, Input(), Label(), SelectContent(), SelectGroup() (+9 more)

### Community 27 - "setup.ts"
Cohesion: 0.24
Nodes (9): CertificationPartnersPage(), CertificationPartnerStrip(), PlacementData, PlacementSupportSection(), getCertificationPartners(), PublicCertificationPartner, PublicGalleryCategory, getMediaUrl() (+1 more)

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.10
Nodes (7): Separator(), SidebarContext, SidebarContextProps, Skeleton(), Tooltip(), TooltipContent(), TooltipTrigger()

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.08
Nodes (15): PageProps, STATUS_STYLES, PageProps, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, RequirePermissionResult, requirePortalRole() (+7 more)

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
Cohesion: 0.38
Nodes (11): addVideoItem(), createCategory(), deleteCategory(), deleteGalleryItem(), localeFromFormData(), moveCategory(), revalidateGallery(), updateCategory() (+3 more)

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
Cohesion: 0.22
Nodes (8): { GET, POST, PUT }, inngest, closeExpiredJobPostings, logSystemAction(), closeExpiredPostings(), mockAuditLogCreate, mockFindMany, mockUpdateMany

### Community 53 - "courses.test.ts"
Cohesion: 0.22
Nodes (8): PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem, getSiteSettings()

### Community 54 - "assignments/page.tsx"
Cohesion: 0.23
Nodes (10): HomePage(), HomePageProps, formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, pickLocalizedText(), TeaserItem, getPublishedCourses() (+2 more)

### Community 55 - "student-dashboard.test.tsx"
Cohesion: 0.29
Nodes (7): PostVacancyPage(), JobsFilter(), JobsFilterProps, JobsPage(), JobsPageProps, getApprovedSkills(), SkillDto

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

### Community 65 - "EmployerModerationNotification.tsx"
Cohesion: 0.21
Nodes (7): PlacementPage(), PlacementPageProps, ActiveJobPosting, getActiveJobPostings(), JobDetail, mockFindMany, mockSkillsFindMany

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
Cohesion: 0.36
Nodes (9): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), formatDate(), NewsEventsPage() (+1 more)

### Community 73 - "candidates/actions.ts"
Cohesion: 0.25
Nodes (8): ContactSection(), ContactSectionProps, ModalOverlay(), socialIcons, baseSettings, mockCourses, useCloseOnEscape(), useFocusTrap()

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.18
Nodes (5): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle()

### Community 75 - "email.ts"
Cohesion: 0.11
Nodes (18): Admin (`(admin)`), API routes, Auth/utility, Component-Level Findings, Conclusion, Cross-Browser & Mobile QA Log — Sprint 11, Task 1, CSV Bulk Import (admin/students), Forms (Enquiry, Post-Vacancy, Employer Registration, Biodata) (+10 more)

### Community 76 - "[id]/page.tsx"
Cohesion: 0.10
Nodes (21): RegistrationResult, submitEmployerRegistration(), mockAuth, mockCheckRateLimit, mockClerkClient, mockCreate, mockFindUnique, mockGetClientIp (+13 more)

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
Cohesion: 0.16
Nodes (9): approveSkill(), deleteSkill(), localeFromFormData(), mergeSkill(), SkillsTaxonomyPage(), SkillsTaxonomyPageProps, Props, Props (+1 more)

### Community 93 - "FlashNewsBar.tsx"
Cohesion: 0.20
Nodes (9): Gallery Page Note, Image Optimization Audit, Key Improvements, LCP Measurement, Lighthouse / LCP Status, Performance Audit Log — Sprint 11, Task 4, Recommended Future Work (beyond sprint scope), Remaining Bottlenecks (+1 more)

### Community 94 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed, db:studio, dev, lint, start, test (+1 more)

### Community 95 - "AtAGlanceSection.tsx"
Cohesion: 0.20
Nodes (8): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile, mockUserFindUnique

### Community 96 - "portal/student/page.tsx"
Cohesion: 0.33
Nodes (7): getNullableString(), getString(), localeFromFormData(), updateSiteSettings(), iconOptions, SiteSettingsPage(), SiteSettingsPageProps

### Community 98 - "middleware.ts"
Cohesion: 0.36
Nodes (6): GalleryPage(), GalleryPageProps, getGalleryCategoryBySlug(), getGalleryData(), getPlacementGalleryData(), PlacementGalleryData

### Community 99 - "AtAGlanceSection.tsx"
Cohesion: 0.29
Nodes (4): mockApplicationCount, mockApplicationFindMany, mockAuth, mockFindUnique

### Community 101 - "vite-tsconfig-paths"
Cohesion: 0.48
Nodes (4): HeroSection(), HeroSectionProps, Button(), buttonVariants

### Community 102 - "@vitejs/plugin-react"
Cohesion: 0.40
Nodes (4): BiodataActionResult, BiodataFormData, saveBiodata(), submitBiodataForm()

### Community 103 - "[id]/actions.ts"
Cohesion: 0.06
Nodes (33): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), mockAuth (+25 more)

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

### Community 136 - "flash-news/page.tsx"
Cohesion: 0.35
Nodes (10): createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews(), FlashNewsPage(), FlashNewsPageProps (+2 more)

### Community 137 - "applicants/actions.test.ts"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus()

### Community 145 - "video-lecture-list.tsx"
Cohesion: 0.36
Nodes (4): Props, VideoLectureList(), _ALLOWED_HOSTS, deriveEmbedUrl()

### Community 146 - "Findings"
Cohesion: 0.33
Nodes (5): Findings, How to use this log, UAT-001: Job Posting rejection reason silently discarded, UAT-002: Nested `<form>` in courses page edit/delete action, UAT Feedback Log — GTEC Thodupuzha

### Community 150 - "courses/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyCategories, mockFindManyCourses, mockRedirect

### Community 156 - "staff/page.tsx"
Cohesion: 0.29
Nodes (10): deactivateStaff(), inviteStaff(), localeFromFormData(), reactivateStaff(), setStaffPermission(), StaffPage(), StaffPageProps, PERMISSION_KEYS (+2 more)

### Community 161 - "students/actions.test.ts"
Cohesion: 0.17
Nodes (17): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, isValidEmail(), localeFromFormData(), parseCsvLine(), mockAuditCreate (+9 more)

### Community 176 - "roleGate"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 187 - "site/actions.ts"
Cohesion: 0.40
Nodes (3): mockFindFirst, mockRedirect, mockRequireRole

### Community 188 - "timetable-progress/page.tsx"
Cohesion: 0.26
Nodes (12): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, addProgressEntry(), addTimetableEntry(), deleteProgressEntry(), deleteTimetableEntry() (+4 more)

### Community 199 - "sign-up/student/page.tsx"
Cohesion: 0.18
Nodes (7): next-intl, next-intl, react, react, finalizeStudentVerification(), lookupStudentRecord(), Step

### Community 204 - "site-settings.ts"
Cohesion: 0.22
Nodes (7): LogAdminActionInput, LogSystemActionInput, mockAuth, mockCreate, mockFindMany, mockRedirect, mockUserFindUnique

## Knowledge Gaps
- **741 isolated node(s):** `mockAuth`, `mockCreateRouteMatcher`, `mockEmployerProfileCount`, `mockJobPostingCount`, `mockSkillCount` (+736 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `package.json`, `EnquiryForm.tsx`, `flash-news/page.tsx`, `applicants/actions.test.ts`, `(admin)/layout.tsx`, `(public)/page.tsx`, `gallery/actions.ts`, `staff/page.tsx`, `news-events.test.ts`, `flash-news/page.test.tsx`, `FlashNewsBar.tsx`, `student-dashboard.test.tsx`, `timetable-progress/page.tsx`, `[id]/actions.ts`, `[id]/page.tsx`, `site-settings.ts`, `NewsTeaserSection.tsx`, `AtAGlanceSection.tsx`, `portal/student/page.tsx`, `[id]/actions.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `package.json` to `candidates/actions.ts`, `vite-tsconfig-paths`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `timetable-progress/page.tsx` to `portal/student/page.tsx`, `FlashNewsBar.tsx`, `EnquiryForm.tsx`, `flash-news/page.tsx`, `flash-news/page.test.tsx`, `[id]/actions.ts`, `(admin)/layout.tsx`, `(public)/page.tsx`, `staff/page.tsx`, `setup.ts`, `NewsTeaserSection.tsx`, `AtAGlanceSection.tsx`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `mockAuth`, `mockCreateRouteMatcher`, `mockEmployerProfileCount` to the rest of the system?**
  _741 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._