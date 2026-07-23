# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 97 files · ~21,312 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 451 nodes · 722 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28751ca0`
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
- audit.test.ts
- flash-news/page.test.tsx

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 39 edges
2. `logAdminAction()` - 27 edges
3. `cn()` - 19 edges
4. `compilerOptions` - 16 edges
5. `Role` - 15 edges
6. `localeFromFormData()` - 9 edges
7. `localeFromFormData()` - 8 edges
8. `updateSiteSettings()` - 8 edges
9. `Button()` - 8 edges
10. `PublicCourse` - 8 edges

## Surprising Connections (you probably didn't know these)
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `CoursesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/courses/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `GalleryPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/gallery/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (35 total, 6 thin omitted)

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
Cohesion: 0.08
Nodes (28): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+20 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.10
Nodes (18): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale (+10 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.12
Nodes (14): AdminLayout(), PortalLayout(), Footer(), portalLinks, quickLinks, Header(), navItems, buildLocalePath() (+6 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.15
Nodes (18): PublicLayout(), HomePage(), HomePageProps, AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, iconMap (+10 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.27
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 24 - "(public)/page.tsx"
Cohesion: 0.21
Nodes (15): HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants, Label(), SelectContent(), SelectGroup(), SelectItem() (+7 more)

### Community 28 - "courses.test.ts"
Cohesion: 0.22
Nodes (7): MockCourse, mockCourseCreate, mockCourseFindMany, mockCourseUpdate, mockLogAdminAction, mockStore, mockUploadFile

### Community 33 - "audit.test.ts"
Cohesion: 0.10
Nodes (48): AuditLogPage(), AuditLogPageProps, createCategory(), createCourse(), deleteCategory(), deleteCourse(), localeFromFormData(), moveCategory() (+40 more)

### Community 34 - "flash-news/page.test.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

## Knowledge Gaps
- **194 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `app/layout.tsx` to `(public)/page.tsx`, `EnquiryForm.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `cn()` connect `(public)/page.tsx` to `EnquiryForm.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._