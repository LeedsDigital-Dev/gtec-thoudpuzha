# Graph Report - gtec-thoudpuzha  (2026-07-29)

## Corpus Check
- 353 files · ~124,874 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1694 nodes · 2907 edges · 173 communities (142 shown, 31 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7d16d26`
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
- AtAGlanceSection.tsx
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
- student-dashboard.test.tsx
- courses.test.ts
- assignments/page.tsx
- seed-verification.test.ts
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
- @types/react
- ContactSection.tsx
- email.ts
- [id]/page.tsx
- EnquiryForm.tsx
- portal-role-gating.test.tsx
- progress/page.tsx
- skills.ts
- smoke.spec.ts
- resource-list.tsx
- register/actions.test.ts
- gallery.ts
- admin/page.test.tsx
- content/actions.ts
- FlashNewsBar.tsx
- scripts
- (public)/page.tsx
- course-content.schema.ts
- academic-resources/page.tsx
- news/page.tsx
- skills-taxonomy/page.tsx
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
- navigation.ts
- logAdminAction
- dotenv
- requireRole
- jsdom
- @playwright/test
- (public)/courses/page.tsx
- studentVerification
- enquiry.test.ts
- site/page.test.tsx
- [id]/page.tsx
- course-content-actions.test.ts
- studentDashboard
- db.ts
- EmployerModerationNotification.tsx
- flash-news/page.test.tsx
- no-raw-img.test.ts
- Footer.tsx
- AtAGlanceSection.tsx
- NewsTeaserSection.tsx
- student-dashboard.test.tsx
- portal/student/page.tsx
- Findings
- CertificationPartnerStrip.tsx
- [id]/page.tsx
- @base-ui/react
- courses/page.test.tsx
- @clerk/nextjs
- clsx
- inngest
- next
- prisma
- @prisma/adapter-neon
- @prisma/client
- react-dom
- @react-email/components
- timetable-progress/page.tsx
- @react-pdf/renderer
- resend
- @sentry/nextjs
- shadcn
- tailwind-merge
- gallery/actions.ts
- roleGate
- staff/actions.ts
- job-seeker/page.test.tsx
- AtAGlanceSection.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 111 edges
2. `logAdminAction()` - 72 edges
3. `Role` - 69 edges
4. `cn()` - 64 edges
5. `getEffectiveRole()` - 51 edges
6. `Button()` - 24 edges
7. `requirePermission()` - 17 edges
8. `compilerOptions` - 16 edges
9. `isProfileComplete()` - 12 edges
10. `PublicCourse` - 12 edges

## Surprising Connections (you probably didn't know these)
- `renderWithProvider()` --references--> `react`  [EXTRACTED]
  src/components/admin/__tests__/admin-sidebar.test.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `SidebarProvider()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useIsMobile()` --references--> `react`  [EXTRACTED]
  src/hooks/use-mobile.ts → package.json

## Import Cycles
- None detected.

## Communities (173 total, 31 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.12
Nodes (23): CertificationPartnersPage(), GalleryPage(), GalleryPageProps, GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl(), getYouTubeEmbedUrl() (+15 more)

### Community 1 - "dependencies"
Cohesion: 0.18
Nodes (11): @aws-sdk/client-s3, class-variance-authority, lucide-react, next-intl, dependencies, @aws-sdk/client-s3, class-variance-authority, lucide-react (+3 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, **/*.mts, .next/dev/dev/types/**/*.ts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts (+21 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.18
Nodes (13): RegistrationResult, submitEmployerRegistration(), finalizeStudentVerification(), lookupStudentRecord(), isValidPassword(), Step, StudentSignUpPage(), checkRateLimit() (+5 more)

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
Cohesion: 0.17
Nodes (7): CourseContentEditorProps, Tab, BenefitsBlock, BenefitsItem, CourseContentBlock, CourseListBlock, CourseListItem

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.21
Nodes (9): JobSeekerPortalLayout(), JobsPortalLayout(), StudentPortalLayout(), JobSeekerShell(), JobSeekerShellProps, StudentShell(), StudentShellProps, isRouteActive() (+1 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.16
Nodes (11): AccountSetupIncompletePage(), ForbiddenPage(), metadata, mockAuth, mockClerkMiddleware, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount (+3 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.17
Nodes (11): Accessibility & Inclusion, Brand Commitments, Capabilities and Constraints, Evidence on Hand, Operating Context, Platform, Positioning, Product (+3 more)

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
Cohesion: 0.17
Nodes (10): ActionResult, submitVacancy(), PostVacancyPage(), PostVacancyForm(), BiodataActionResult, saveBiodata(), submitBiodataForm(), BiodataPage() (+2 more)

### Community 23 - "portal/page.tsx"
Cohesion: 0.16
Nodes (13): react, react, EmployerPortalLayout(), renderWithProvider(), EmployerShell(), EmployerShellProps, Sidebar(), SidebarMenuSkeleton() (+5 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.21
Nodes (13): AboutPage(), AboutPageProps, ContactPage(), AboutSection(), AboutSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps (+5 more)

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.11
Nodes (27): Separator(), Sheet(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+19 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.31
Nodes (7): CourseDetailPage(), CourseDetailProps, generateMetadata(), CoursePageContent(), CoursePageContentProps, CourseContent, getCourseBySlug()

### Community 36 - "news-events.test.ts"
Cohesion: 0.21
Nodes (8): GET(), JOB_TYPE_LABELS, QUALIFICATION_LABELS, BiodataPdfData, BiodataPdfDocument(), styles, completeData, incompleteData

### Community 38 - "getMediaUrl"
Cohesion: 0.17
Nodes (10): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockGetUser, mockRedirect, mockStaffPermissionCreate, mockStaffPermissionFindUnique (+2 more)

### Community 39 - "AtAGlanceSection.tsx"
Cohesion: 0.36
Nodes (4): Props, VideoLectureList(), _ALLOWED_HOSTS, deriveEmbedUrl()

### Community 40 - "seed.ts"
Cohesion: 0.09
Nodes (22): ALL_COURSE_TITLES, ALL_PARTNER_NAMES, CATEGORIES, CATEGORY_NAMES, CERTIFICATION_PARTNERS, COURSES, CourseSeed, FLASH_NEWS (+14 more)

### Community 41 - "flash-news/page.test.tsx"
Cohesion: 0.16
Nodes (20): PostVacancyFormProps, EMPLOYEE_RANGES, RegistrationFormProps, SECTORS, BiodataFormData, BiodataFormProps, JOB_TYPE_OPTIONS, QUALIFICATION_OPTIONS (+12 more)

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.16
Nodes (12): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus(), Applicant, ApplicantRow(), ApplicantsList() (+4 more)

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

### Community 52 - "student-dashboard.test.tsx"
Cohesion: 0.60
Nodes (4): findOrCreateCategoryId(), main(), prisma, slugFromName()

### Community 53 - "courses.test.ts"
Cohesion: 0.22
Nodes (8): { GET, POST, PUT }, inngest, closeExpiredJobPostings, logSystemAction(), closeExpiredPostings(), mockAuditLogCreate, mockFindMany, mockUpdateMany

### Community 54 - "assignments/page.tsx"
Cohesion: 0.10
Nodes (18): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, CourseEnrollmentPage(), Props, PortalRoleGate(), PortalRoleGateProps (+10 more)

### Community 56 - "post-vacancy/actions.test.ts"
Cohesion: 0.33
Nodes (4): mockAuth, mockCreateJobPosting, mockFindUnique, mockRedirect

### Community 57 - "page.test.ts"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindUnique, mockRedirect

### Community 58 - "courses.ts"
Cohesion: 0.12
Nodes (20): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate, mockAuth (+12 more)

### Community 60 - "dashboard.test.ts"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyPostings, mockFindUniqueProfile, mockRedirect

### Community 61 - "student/actions.test.ts"
Cohesion: 0.06
Nodes (33): enrollStudentInCourses(), localeFromFormData(), baseProps, mockRouterPush, stubCourses, students, mockAuditCreate, mockAuth (+25 more)

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
Cohesion: 0.20
Nodes (9): DNS Cutover Confirmation, Environment Variable Audit, Go-live Date/Time, Known Post-Launch Follow-Up Items, Launch Record — GTEC Thodupuzha, Post-Deploy Tests, Sentry Confirmation, Sign-Off (+1 more)

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
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 71 - "search-form.tsx"
Cohesion: 0.23
Nodes (11): AdminDashboardPage(), AdminDashboardPageProps, AdminShellProps, AdminSidebar(), AdminSidebarProps, isRouteActive(), mockUsePathname, ADMIN_ROUTES (+3 more)

### Community 72 - "[id]/actions.ts"
Cohesion: 0.14
Nodes (19): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), ConfirmDeleteForm(), ConfirmDeleteFormProps (+11 more)

### Community 73 - "@types/react"
Cohesion: 0.18
Nodes (13): ContactSection(), ContactSectionProps, ModalOverlay(), socialIcons, baseSettings, mockCourses, useCloseOnEscape(), CourseSelect() (+5 more)

### Community 74 - "ContactSection.tsx"
Cohesion: 0.22
Nodes (7): BenefitsBlockSchema, BenefitsItemSchema, CourseListBlockSchema, CourseListItemSchema, optionalString, validContent, ValidatedCourseContent

### Community 75 - "email.ts"
Cohesion: 0.11
Nodes (18): Admin (`(admin)`), API routes, Auth/utility, Component-Level Findings, Conclusion, Cross-Browser & Mobile QA Log — Sprint 11, Task 1, CSV Bulk Import (admin/students), Forms (Enquiry, Post-Vacancy, Employer Registration, Biodata) (+10 more)

### Community 76 - "[id]/page.tsx"
Cohesion: 0.46
Nodes (6): approveSkill(), deleteSkill(), localeFromFormData(), mergeSkill(), SkillsTaxonomyPage(), SkillsTaxonomyPageProps

### Community 77 - "EnquiryForm.tsx"
Cohesion: 0.16
Nodes (13): EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone(), MOCK_COURSES, EnquiryPayload, submitEnquiry() (+5 more)

### Community 78 - "portal-role-gating.test.tsx"
Cohesion: 0.20
Nodes (8): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile, mockUserFindUnique

### Community 79 - "progress/page.tsx"
Cohesion: 0.12
Nodes (15): 1. Rate-Limiting Implementation, 2. Input Validation & Sanitization Audit, 3. Prisma Schema Review — Soft-Delete Compliance, 4. Regression: Sprint 0 + Sprint 4 Auth Tests, 5. Environment Variables / Secrets, 6. Recommended Follow-Ups (post-v1), Audit method, Backend (+7 more)

### Community 80 - "skills.ts"
Cohesion: 0.14
Nodes (10): JobsFilterProps, mockApprovedSkills, mockCourses, mockPendingSkill, SkillMultiSelect(), SkillMultiSelectProps, mockCourses, mockSkills (+2 more)

### Community 82 - "resource-list.tsx"
Cohesion: 0.21
Nodes (5): Props, Props, Props, ResourceList(), ResourceListProps

### Community 84 - "register/actions.test.ts"
Cohesion: 0.33
Nodes (5): mockAuth, mockClerkMiddleware, mockGetUser, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 89 - "gallery.ts"
Cohesion: 0.18
Nodes (10): mockAuth, mockCandidateProfileCreate, mockCandidateProfileFindUnique, mockClerkClient, mockGetUser, mockRedirect, mockStaffPermissionCreate, mockStaffPermissionFindUnique (+2 more)

### Community 90 - "admin/page.test.tsx"
Cohesion: 0.20
Nodes (8): mockAuth, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockRedirect, mockSkillCount, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 92 - "content/actions.ts"
Cohesion: 0.36
Nodes (7): getCourseContent(), localeFromFormData(), saveCourseContent(), CourseContentEditor(), ContentPageProps, CourseContentPage(), CourseContentSchema

### Community 93 - "FlashNewsBar.tsx"
Cohesion: 0.20
Nodes (9): Gallery Page Note, Image Optimization Audit, Key Improvements, LCP Measurement, Lighthouse / LCP Status, Performance Audit Log — Sprint 11, Task 4, Recommended Future Work (beyond sprint scope), Remaining Bottlenecks (+1 more)

### Community 94 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed, db:studio, dev, lint, postinstall, start (+2 more)

### Community 96 - "(public)/page.tsx"
Cohesion: 0.26
Nodes (11): PublicLayout(), HomePage(), HomePageProps, PreloaderCleanup(), getCachedActiveFlashNews, getCachedCertificationPartners, getCachedHomepageTeaser, getCachedPlacementGalleryData (+3 more)

### Community 97 - "course-content.schema.ts"
Cohesion: 0.08
Nodes (20): AdminLayout(), PortalLayout(), AdminShell(), CourseDropdownItem, CoursesDropdown(), CoursesDropdownProps, mockCourses, CourseDropdownItem (+12 more)

### Community 98 - "academic-resources/page.tsx"
Cohesion: 0.17
Nodes (11): mockAuth, mockCandidateCreate, mockCheckRateLimit, mockClerkClient, mockFindFirst, mockFindUnique, mockGetClientIp, mockRecordUpdate (+3 more)

### Community 99 - "news/page.tsx"
Cohesion: 0.21
Nodes (7): NewsPage(), NewsPageProps, getPublishedNews(), PublicNewsEvent, pickLocalizedText(), mockFindFirst, mockRequireRole

### Community 101 - "skills-taxonomy/page.tsx"
Cohesion: 0.22
Nodes (7): LogAdminActionInput, LogSystemActionInput, mockAuth, mockCreate, mockFindMany, mockRedirect, mockUserFindUnique

### Community 102 - "@vitejs/plugin-react"
Cohesion: 0.11
Nodes (18): EmployerDashboardPage(), EmployerDashboardPageProps, EmployerProfilePage(), ProfilePageProps, updateEmployerProfile(), EmployerRegisterPage(), RegistrationForm(), JobSeekerDashboardPage() (+10 more)

### Community 103 - "[id]/actions.ts"
Cohesion: 0.16
Nodes (15): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), applyFilters() (+7 more)

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

### Community 119 - "navigation.ts"
Cohesion: 0.24
Nodes (6): inter, jetbrainsMono, metadata, { Link, redirect, usePathname, useRouter }, Locale, routing

### Community 120 - "logAdminAction"
Cohesion: 0.37
Nodes (11): createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews(), FlashNewsPage(), FlashNewsPageProps (+3 more)

### Community 121 - "dotenv"
Cohesion: 0.05
Nodes (43): @axe-core/playwright, dotenv, eslint, eslint-config-next, jsdom, @netlify/plugin-nextjs, devDependencies, @axe-core/playwright (+35 more)

### Community 122 - "requireRole"
Cohesion: 0.35
Nodes (13): createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory(), slugify(), updateCategory() (+5 more)

### Community 123 - "jsdom"
Cohesion: 0.40
Nodes (4): mockAuth, mockRedirect, mockUpsert, validData

### Community 124 - "@playwright/test"
Cohesion: 0.29
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 125 - "(public)/courses/page.tsx"
Cohesion: 0.32
Nodes (5): CoursesPage(), CoursesPageProps, CourseCard(), CourseCardProps, getPublishedCourses()

### Community 129 - "enquiry.test.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockCheckRateLimit, mockClerkClient, mockCreate, mockFindUnique, mockGetClientIp, mockRedirect

### Community 130 - "site/page.test.tsx"
Cohesion: 0.31
Nodes (5): ContactPageProps, HeroSection(), HeroSectionProps, buttonVariants, siteConfig

### Community 131 - "[id]/page.tsx"
Cohesion: 0.19
Nodes (11): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps, JobDetailPage() (+3 more)

### Community 133 - "course-content-actions.test.ts"
Cohesion: 0.40
Nodes (3): mockCourseFindUnique, mockCourseUpdate, mockLogAdminAction

### Community 134 - "studentDashboard"
Cohesion: 0.17
Nodes (17): EmployerSidebar(), isRouteActive(), isRouteActive(), JobSeekerSidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarGroupLabel() (+9 more)

### Community 135 - "db.ts"
Cohesion: 0.13
Nodes (8): CandidateDetailPage(), PageProps, CandidateSearchPage(), PageProps, Props, Props, getSearchableCandidates(), globalForPrisma

### Community 136 - "EmployerModerationNotification.tsx"
Cohesion: 0.31
Nodes (8): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, validateVideoUrl()

### Community 137 - "flash-news/page.test.tsx"
Cohesion: 0.25
Nodes (7): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath, mockUserFindUnique

### Community 139 - "Footer.tsx"
Cohesion: 0.38
Nodes (4): Footer(), legalLinks, portalLinks, quickLinks

### Community 142 - "AtAGlanceSection.tsx"
Cohesion: 0.38
Nodes (4): AtAGlanceSection(), AtAGlanceSectionProps, statIcons, getAtAGlanceStats()

### Community 143 - "NewsTeaserSection.tsx"
Cohesion: 0.47
Nodes (5): formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, pickLocalizedText(), TeaserItem

### Community 146 - "Findings"
Cohesion: 0.33
Nodes (5): Findings, How to use this log, UAT-001: Job Posting rejection reason silently discarded, UAT-002: Nested `<form>` in courses page edit/delete action, UAT Feedback Log — GTEC Thodupuzha

### Community 147 - "CertificationPartnerStrip.tsx"
Cohesion: 0.70
Nodes (3): CertificationPartnerStrip(), getCertificationPartners(), PublicCertificationPartner

### Community 148 - "[id]/page.tsx"
Cohesion: 0.18
Nodes (10): JobsFilter(), JobsPage(), JobsPageProps, PlacementPage(), PlacementPageProps, ActiveJobPosting, getActiveJobPostings(), JobDetail (+2 more)

### Community 150 - "courses/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyCategories, mockFindManyCourses, mockRedirect

### Community 161 - "timetable-progress/page.tsx"
Cohesion: 0.44
Nodes (7): addProgressEntry(), addTimetableEntry(), deleteProgressEntry(), deleteTimetableEntry(), localeFromFormData(), Props, TimetableProgressPage()

### Community 170 - "gallery/actions.ts"
Cohesion: 0.26
Nodes (15): addVideoItem(), createCategory(), deleteCategory(), deleteGalleryItem(), localeFromFormData(), moveCategory(), revalidateGallery(), updateCategory() (+7 more)

### Community 176 - "roleGate"
Cohesion: 0.50
Nodes (3): name, private, version

### Community 177 - "staff/actions.ts"
Cohesion: 0.29
Nodes (10): deactivateStaff(), inviteStaff(), localeFromFormData(), reactivateStaff(), setStaffPermission(), StaffPage(), StaffPageProps, PERMISSION_KEYS (+2 more)

### Community 178 - "job-seeker/page.test.tsx"
Cohesion: 0.29
Nodes (4): mockApplicationCount, mockApplicationFindMany, mockAuth, mockFindUnique

### Community 218 - "AtAGlanceSection.tsx"
Cohesion: 0.15
Nodes (19): bulkImportStudents(), bulkImportStudentsAction(), createStudentRecord(), CsvRowResult, isValidEmail(), localeFromFormData(), parseCsvLine(), mockAuditCreate (+11 more)

## Knowledge Gaps
- **816 isolated node(s):** `workflow`, `name`, `version`, `private`, `dev` (+811 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@react-email/components`, `@react-pdf/renderer`, `resend`, `@sentry/nextjs`, `shadcn`, `tailwind-merge`, `roleGate`, `portal/page.tsx`, `@base-ui/react`, `@clerk/nextjs`, `clsx`, `inngest`, `next`, `prisma`, `@prisma/adapter-neon`, `@prisma/client`, `react-dom`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `react` connect `portal/page.tsx` to `dependencies`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `SidebarProvider()` connect `portal/page.tsx` to `BiodataForm.test.tsx`, `courses.test.ts`, `search-form.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `workflow`, `name`, `version` to the rest of the system?**
  _816 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.12043010752688173 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._