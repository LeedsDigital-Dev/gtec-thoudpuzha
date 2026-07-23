# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 236 files · ~66,926 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1027 nodes · 1817 edges · 78 communities (65 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `503370bc`
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
- jobs/page.tsx
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
- portal/student/page.tsx
- dashboard.test.ts
- student/actions.test.ts
- portal-role-gating.test.tsx
- enquiries/page.tsx
- job-postings/page.test.tsx
- EmployerModerationNotification.tsx
- portal-role-gating.test.tsx
- employer/page.tsx
- register/actions.test.ts
- search-form.tsx
- [id]/actions.ts
- candidates/actions.ts
- candidates/actions.test.ts
- resource-list.tsx
- [id]/page.tsx
- InviteToApplyEmail.tsx
- site/page.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 90 edges
2. `logAdminAction()` - 61 edges
3. `Role` - 57 edges
4. `Button()` - 19 edges
5. `cn()` - 19 edges
6. `compilerOptions` - 16 edges
7. `isProfileComplete()` - 12 edges
8. `getMediaUrl()` - 11 edges
9. `PublicCourse` - 10 edges
10. `localeFromFormData()` - 9 edges

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

## Communities (78 total, 13 thin omitted)

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
Cohesion: 0.14
Nodes (17): approveJobPosting(), editAndApproveJobPosting(), localeFromFormData(), rejectJobPosting(), mockAuditCreate, mockAuth, mockFindMany, mockRedirect (+9 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.05
Nodes (33): AccountSetupIncompletePage(), AdminLayout(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, PortalLayout() (+25 more)

### Community 9 - "BiodataForm.test.tsx"
Cohesion: 0.18
Nodes (16): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), mockAuditCreate, mockAuth (+8 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.07
Nodes (35): PublicLayout(), NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, HomePage(), HomePageProps, AboutSection() (+27 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.13
Nodes (14): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+6 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.05
Nodes (81): createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), mockAggregate, mockAuditCreate, mockAuth (+73 more)

### Community 24 - "gallery/actions.ts"
Cohesion: 0.29
Nodes (4): CandidateDetailPage(), JOB_TYPE_LABELS, PageProps, QUALIFICATION_LABELS

### Community 33 - "courses.test.ts"
Cohesion: 0.14
Nodes (13): mockAuditCreate, mockAuth, mockCountCandidateProfile, mockCountJobPosting, mockDeleteSkill, mockFindManyCandidateProfile, mockFindManyJobPosting, mockFindUniqueSkill (+5 more)

### Community 34 - "courses.test.ts"
Cohesion: 0.18
Nodes (11): deleteResource(), localeFromFormData(), uploadResource(), AcademicResourcesPage(), Props, RESOURCE_TYPES, TYPE_LABELS, VideoLectureList() (+3 more)

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.16
Nodes (10): ActionResult, PortalRoleGate(), PortalRoleGateProps, ROLE_LABELS, requirePortalRole(), RequireRoleResult, Role, mockAuth (+2 more)

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
Cohesion: 0.18
Nodes (12): finalizeStudentVerification(), lookupStudentRecord(), mockAuth, mockCandidateCreate, mockClerkClient, mockFindFirst, mockFindUnique, mockRecordUpdate (+4 more)

### Community 42 - "FlashNewsBar.tsx"
Cohesion: 0.17
Nodes (10): mockAuth, mockFindUnique, mockRevalidatePath, mockUpdate, updateApplicationStatus(), Applicant, ApplicantRow(), ApplicantsList() (+2 more)

### Community 43 - "academic-resources/actions.test.ts"
Cohesion: 0.18
Nodes (9): mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockFindManyCourses, mockFindUnique, mockRedirect (+1 more)

### Community 44 - "courses.ts"
Cohesion: 0.18
Nodes (9): mockAcCreate, mockAcFindMany, mockAuditCreate, mockAuth, mockCourseFindMany, mockEnrollFindMany, mockProfileFindUnique, mockRedirect (+1 more)

### Community 45 - "jobs/page.tsx"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirst, mockFindMany, mockFindUnique, mockGetSkillsByIds, mockNotFound, mockRedirect

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
Nodes (29): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+21 more)

### Community 51 - "route.test.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 52 - "Role"
Cohesion: 0.25
Nodes (6): LogAdminActionInput, LogSystemActionInput, mockAuth, mockCreate, mockFindMany, mockRedirect

### Community 53 - "courses.test.ts"
Cohesion: 0.24
Nodes (7): PlacementPage(), PlacementPageProps, ActiveJobPosting, getActiveJobPostings(), JobDetail, mockFindMany, mockSkillsFindMany

### Community 54 - "assignments/page.tsx"
Cohesion: 0.07
Nodes (46): submitVacancy(), PostVacancyPage(), JOB_TYPES, PostVacancyForm(), PostVacancyFormProps, EMPLOYEE_RANGES, SECTORS, JOB_TYPE_OPTIONS (+38 more)

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
Cohesion: 0.22
Nodes (8): { GET, POST, PUT }, inngest, closeExpiredJobPostings, logSystemAction(), closeExpiredPostings(), mockAuditLogCreate, mockFindMany, mockUpdateMany

### Community 62 - "portal-role-gating.test.tsx"
Cohesion: 0.09
Nodes (7): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, STATUS_BADGE, STATUS_STYLES, globalForPrisma

### Community 63 - "enquiries/page.tsx"
Cohesion: 0.40
Nodes (4): mockAuth, mockFindMany, mockRedirect, mockSkillsFindMany

### Community 64 - "job-postings/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockFindMany, mockRedirect

### Community 65 - "EmployerModerationNotification.tsx"
Cohesion: 0.15
Nodes (18): approveAndTrustEmployer(), approveEmployer(), localeFromFormData(), rejectEmployer(), mockAuditCreate, mockAuth, mockFindMany, mockFindUnique (+10 more)

### Community 66 - "portal-role-gating.test.tsx"
Cohesion: 0.25
Nodes (6): mockAuth, mockFindFirstPosting, mockFindMany, mockFindUniqueProfile, mockRedirect, mockUpdateMany

### Community 68 - "employer/page.tsx"
Cohesion: 0.40
Nodes (3): mockAuth, mockFindMany, mockFindUnique

### Community 70 - "register/actions.test.ts"
Cohesion: 0.17
Nodes (8): RegistrationResult, submitEmployerRegistration(), mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, RegistrationForm()

### Community 71 - "search-form.tsx"
Cohesion: 0.31
Nodes (7): CandidateSearchResult, EmployerJobPosting, applyFilters(), CandidateCardProps, CandidateSearchForm(), CandidateSearchFormProps, FilterField

### Community 72 - "[id]/actions.ts"
Cohesion: 0.27
Nodes (7): applyToJob(), mockAuth, mockCreate, mockFindUnique, mockRevalidatePath, ApplyButton(), ApplyButtonProps

### Community 73 - "candidates/actions.ts"
Cohesion: 0.32
Nodes (9): CandidateSearchFilters, inviteToApply(), InviteToApplyResult, mapResult(), searchCandidates(), CandidateSearchPage(), CandidateProfileWithCompletion, isProfileComplete() (+1 more)

### Community 74 - "candidates/actions.test.ts"
Cohesion: 0.22
Nodes (7): mockAuth, mockFindFirstJobPosting, mockFindUniqueCandidate, mockFindUniqueProfile, mockGetSearchableCandidates, mockRedirect, mockResendSend

### Community 76 - "[id]/page.tsx"
Cohesion: 0.32
Nodes (7): EMPLOYEE_COUNT_LABELS, INDUSTRY_LABELS, JOB_TYPE_LABELS, JobDetailPage(), PageProps, getJobDetail(), getSkillsByIds()

### Community 80 - "site/page.test.tsx"
Cohesion: 0.40
Nodes (3): mockFindFirst, mockRedirect, mockRequireRole

## Knowledge Gaps
- **451 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+446 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Role` connect `FlashNewsBar.tsx` to `EnquiryForm.tsx`, `BiodataForm.test.tsx`, `actions.test.ts`, `FlashNewsBar.tsx`, `gallery/actions.ts`, `courses.test.ts`, `news-events.test.ts`, `FlashNewsBar.tsx`, `students/actions.test.ts`, `Role`, `assignments/page.tsx`, `student-dashboard.test.tsx`, `portal/student/page.tsx`, `portal-role-gating.test.tsx`, `EmployerModerationNotification.tsx`, `register/actions.test.ts`, `[id]/actions.ts`, `candidates/actions.ts`, `[id]/page.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `requireRole()` connect `FlashNewsBar.tsx` to `EmployerModerationNotification.tsx`, `courses.test.ts`, `FlashNewsBar.tsx`, `package.json`, `EnquiryForm.tsx`, `BiodataForm.test.tsx`, `students/actions.test.ts`, `actions.test.ts`, `portal-role-gating.test.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `Button()` connect `assignments/page.tsx` to `courses.test.ts`, `BiodataForm.test.tsx`, `students/actions.test.ts`, `actions.test.ts`, `courses.test.ts`, `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _451 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._