# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 94 files · ~19,664 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 437 nodes · 635 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6e2f868`
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
- (public)/page.tsx
- courses/actions.ts
- clerk.d.ts
- audit.test.ts
- flash-news/page.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 29 edges
2. `logAdminAction()` - 19 edges
3. `cn()` - 19 edges
4. `compilerOptions` - 16 edges
5. `Role` - 13 edges
6. `localeFromFormData()` - 9 edges
7. `updateSiteSettings()` - 8 edges
8. `GTEC Thodupuzha` - 8 edges
9. `EnquiryForm()` - 7 edges
10. `scripts` - 7 edges

## Surprising Connections (you probably didn't know these)
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `CoursesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/courses/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `updateSiteSettings()` --calls--> `logAdminAction()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/actions.ts → src/lib/audit.ts

## Import Cycles
- None detected.

## Communities (33 total, 6 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (35): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+27 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (39): @aws-sdk/client-s3, @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, lucide-react, next, next-intl (+31 more)

### Community 2 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, db:studio, dev, lint, start (+2 more)

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.18
Nodes (10): EnquiryNotificationEmailProps, EnquiryNotificationInput, getCentreStaffEmails(), getFromEmail(), resend, sendEnquiryNotification(), submitEnquiry(), mockCourseFindFirst (+2 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 8 - "aliases"
Cohesion: 0.07
Nodes (24): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+16 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.09
Nodes (20): AdminLayout(), PortalLayout(), PublicLayout(), ContactSection(), ContactSectionProps, socialIcons, baseSettings, FlashNewsBar() (+12 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.19
Nodes (13): AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, iconMap, WhyChooseUsSection(), WhyChooseUsSectionProps, getAtAGlanceStats() (+5 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 24 - "(public)/page.tsx"
Cohesion: 0.19
Nodes (16): HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants, Input(), Label(), SelectContent(), SelectGroup() (+8 more)

### Community 28 - "courses/actions.ts"
Cohesion: 0.06
Nodes (32): CoursesPage(), groupByCategory(), Grouped, MockCourse, mockGetPublishedCourseBySlug, mockGetPublishedCourses, mockNotFound, CourseDetailPage() (+24 more)

### Community 33 - "audit.test.ts"
Cohesion: 0.11
Nodes (38): AuditLogPage(), AuditLogPageProps, createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory() (+30 more)

### Community 34 - "flash-news/page.test.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

## Knowledge Gaps
- **189 isolated node(s):** `CourseDetailPageProps`, `mockGetPublishedCourses`, `mockGetPublishedCourseBySlug`, `mockNotFound`, `MockCourse` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `app/layout.tsx` to `(public)/page.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `app/layout.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `CourseDetailPageProps`, `mockGetPublishedCourses`, `mockGetPublishedCourseBySlug` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._