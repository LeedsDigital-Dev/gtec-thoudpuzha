# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 244 files · ~75,927 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1105 nodes · 1946 edges · 84 communities (69 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `194413d0`
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
- resource-list.tsx
- register/actions.test.ts
- auth.ts
- admin/page.test.tsx
- Header.tsx
- portal/student/page.tsx

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
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `StudentsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/students/page.tsx → src/lib/auth.ts
- `AtAGlanceSectionProps` --references--> `SiteSettingsWithCards`  [EXTRACTED]
  src/components/shared/AtAGlanceSection.tsx → src/lib/site-settings.ts

## Import Cycles
- None detected.

## Communities (84 total, 15 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (48): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+40 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (43): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, inngest, lucide-react, next (+35 more)

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
Cohesion: 0.07
Nodes (43): approveAndTrustEmployer(), approveEmployer(), localeFromFormData(), rejectEmployer(), mockAuditCreate, mockAuth, mockFindMany, mockFindUnique (+35 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.14
Nodes (11): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+3 more)

### Community 8 - "aliases"
Cohesion: 0.06
Nodes (33): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+25 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.17
Nodes (11): HomePage(), HomePageProps, AtAGlanceSection(), AtAGlanceSectionProps, formatDate(), NewsTeaserSection(), NewsTeaserSectionProps, TeaserItem (+3 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockEnquiryFindMany, mockRedirect, mockUserFindUnique

### Community 15 - "(admin)/layout.tsx"
Cohesion: 0.12
Nodes (12): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockRedirect, mockRevalidatePath (+4 more)

### Community 16 - "(public)/page.tsx"
Cohesion: 0.22
Nodes (12): AboutSection(), AboutSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getLocalizedAbout(), getLocalizedWhyCards(), Locale (+4 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.17
Nodes (17): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), mockAuditCreate, mockAuth (+9 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.28
Nodes (5): CandidateDetailPage(), PageProps, CandidateSearchPage(), PageProps, getSearchableCandidates()

### Community 33 - "courses.test.ts"
Cohesion: 0.13
Nodes (14): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+6 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.24
Nodes (8): deleteResource(), localeFromFormData(), uploadResource(), Props, VideoLectureList(), ALLOWED_HOSTS, deriveEmbedUrl(), validateVideoUrl()

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.15
Nodes (11): ActionResult, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, RequirePermissionResult, requirePortalRole(), RequireRoleResult, Role (+3 more)

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
Nodes (77): AcademicResourcesPage(), createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), PageProps, createCategory() (+69 more)

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
Cohesion: 0.10
Nodes (8): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, EmployerDashboardPageProps, Props, Props, globalForPrisma

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
Cohesion: 0.07
Nodes (50): Props, RESOURCE_TYPES, TYPE_LABELS, submitVacancy(), PostVacancyPage(), PostVacancyForm(), PostVacancyFormProps, EMPLOYEE_RANGES (+42 more)

### Community 56 - "post-vacancy/actions.test.ts"
Cohesion: 0.33
Nodes (4): mockAuth, mockCreateJobPosting, mockFindUnique, mockRedirect

### Community 57 - "page.test.ts"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindUnique, mockRedirect

### Community 58 - "courses.ts"
Cohesion: 0.20
Nodes (10): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+2 more)

### Community 60 - "dashboard.test.ts"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindManyPostings, mockFindUniqueProfile, mockRedirect

### Community 61 - "student/actions.test.ts"
Cohesion: 0.22
Nodes (8): { GET, POST, PUT }, inngest, closeExpiredJobPostings, logSystemAction(), closeExpiredPostings(), mockAuditLogCreate, mockFindMany, mockUpdateMany

### Community 62 - "portal-role-gating.test.tsx"
Cohesion: 0.19
Nodes (11): EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), sanitizePhone(), MOCK_COURSES, EnquiryPayload, submitEnquiry() (+3 more)

### Community 63 - "enquiries/page.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindMany, mockRedirect, mockSkillsFindMany

### Community 64 - "job-postings/page.test.tsx"
Cohesion: 0.33
Nodes (5): mockAuth, mockFindMany, mockRedirect, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 65 - "EmployerModerationNotification.tsx"
Cohesion: 0.29
Nodes (7): NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), PublicNewsEvent

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
Nodes (8): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile, mockUserFindUnique

### Community 71 - "search-form.tsx"
Cohesion: 0.23
Nodes (11): CandidateSearchFilters, CandidateSearchResult, EmployerJobPosting, InviteToApplyResult, mapResult(), searchCandidates(), applyFilters(), CandidateCardProps (+3 more)

### Community 72 - "[id]/actions.ts"
Cohesion: 0.27
Nodes (7): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps

### Community 73 - "candidates/actions.ts"
Cohesion: 0.27
Nodes (6): BiodataForm(), mockApprovedSkills, mockCourses, mockPendingSkill, CandidateProfileWithCompletion, isProfileComplete()

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 75 - "email.ts"
Cohesion: 0.22
Nodes (8): EnquiryNotificationEmailProps, EmployerModerationNotificationInput, EnquiryNotificationInput, getCentreStaffEmails(), getFromEmail(), JobPostingModerationNotificationInput, resend, sendEnquiryNotification()

### Community 76 - "[id]/page.tsx"
Cohesion: 0.36
Nodes (5): BiodataActionResult, BiodataFormData, saveBiodata(), BiodataPage(), getPublishedCourses()

### Community 82 - "resource-list.tsx"
Cohesion: 0.21
Nodes (5): Props, Props, Props, ResourceList(), ResourceListProps

### Community 84 - "register/actions.test.ts"
Cohesion: 0.17
Nodes (8): RegistrationResult, submitEmployerRegistration(), mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, RegistrationForm()

### Community 90 - "admin/page.test.tsx"
Cohesion: 0.20
Nodes (8): mockAuth, mockEmployerProfileCount, mockEnquiryFindMany, mockJobPostingCount, mockRedirect, mockSkillCount, mockStaffPermissionFindUnique, mockUserFindUnique

### Community 92 - "Header.tsx"
Cohesion: 0.11
Nodes (16): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+8 more)

## Knowledge Gaps
- **507 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+502 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `EnquiryForm.tsx`, `actions.test.ts`, `FlashNewsBar.tsx`, `gallery/actions.ts`, `courses.test.ts`, `news-events.test.ts`, `flash-news/page.test.tsx`, `FlashNewsBar.tsx`, `students/actions.test.ts`, `courses.test.ts`, `Role`, `courses.test.ts`, `assignments/page.tsx`, `student-dashboard.test.tsx`, `courses.test.ts`, `search-form.tsx`, `[id]/actions.ts`, `[id]/page.tsx`, `register/actions.test.ts`, `auth.ts`, `portal/student/page.tsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `flash-news/page.test.tsx` to `courses.test.ts`, `FlashNewsBar.tsx`, `package.json`, `EnquiryForm.tsx`, `courses.test.ts`, `students/actions.test.ts`, `actions.test.ts`, `courses.test.ts`, `assignments/page.tsx`, `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `Header.tsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _507 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._