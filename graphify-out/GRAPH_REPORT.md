# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 128 files · ~29,668 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 578 nodes · 969 edges · 44 communities (35 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79d83b10`
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
- FlashNewsBar.tsx
- news-events.test.ts
- news.test.tsx
- getMediaUrl
- sign-up/page.tsx
- seed.ts

## God Nodes (most connected - your core abstractions)
1. `requireRole()` - 53 edges
2. `logAdminAction()` - 37 edges
3. `Role` - 19 edges
4. `cn()` - 19 edges
5. `compilerOptions` - 16 edges
6. `getMediaUrl()` - 11 edges
7. `Button()` - 10 edges
8. `localeFromFormData()` - 9 edges
9. `uploadFile()` - 9 edges
10. `scripts` - 8 edges

## Surprising Connections (you probably didn't know these)
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `CertificationPartnersPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/certification-partners/page.tsx → src/lib/auth.ts
- `CoursesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/courses/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (44 total, 9 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.04
Nodes (46): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+38 more)

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
Cohesion: 0.10
Nodes (25): CertificationPartnersPage(), GalleryPage(), GalleryPageProps, CertificationPartnerStrip(), GalleryGrid(), getEmbedUrl(), getVideoThumbnail(), getVimeoEmbedUrl() (+17 more)

### Community 5 - "EnquiryForm.tsx"
Cohesion: 0.06
Nodes (40): ContactSection(), ContactSectionProps, socialIcons, baseSettings, mockCourses, CourseSelect(), CourseSelectProps, publishedCourses (+32 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "gallery.test.ts"
Cohesion: 0.15
Nodes (10): mockAuditCreate, mockAuth, mockCatAggregate, mockItemAggregate, mockItemCreate, mockItemDelete, mockItemFindMany, mockRedirect (+2 more)

### Community 8 - "aliases"
Cohesion: 0.07
Nodes (25): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+17 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): EnquiryNotificationEmailProps, EnquiryNotificationInput, getCentreStaffEmails(), getFromEmail(), resend, sendEnquiryNotification(), submitEnquiry(), mockCourseFindUnique (+2 more)

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.13
Nodes (21): HomePage(), HomePageProps, AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, formatDate(), NewsTeaserSection() (+13 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.10
Nodes (17): getNullableString(), getString(), localeFromFormData(), mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath (+9 more)

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "FlashNewsBar.tsx"
Cohesion: 0.13
Nodes (11): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockDelete, mockFindMany, mockRedirect, mockRevalidatePath (+3 more)

### Community 24 - "(public)/page.tsx"
Cohesion: 0.29
Nodes (7): NewsPage(), NewsPageProps, NewsDetailPage(), NewsDetailPageProps, getNewsEventBySlug(), getPublishedNews(), PublicNewsEvent

### Community 33 - "audit.test.ts"
Cohesion: 0.09
Nodes (56): AuditLogPage(), AuditLogPageProps, createPartner(), deletePartner(), localeFromFormData(), movePartner(), updatePartner(), PageProps (+48 more)

### Community 34 - "flash-news/page.test.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

### Community 35 - "FlashNewsBar.tsx"
Cohesion: 0.11
Nodes (16): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Footer() (+8 more)

### Community 36 - "news-events.test.ts"
Cohesion: 0.18
Nodes (16): createNewsEvent(), deleteNewsEvent(), localeFromFormData(), slugify(), togglePublishNewsEvent(), updateNewsEvent(), mockAuditCreate, mockAuth (+8 more)

### Community 38 - "getMediaUrl"
Cohesion: 0.22
Nodes (7): mockAuth, mockClerkClient, mockCreate, mockFindUnique, mockRedirect, mockUpdateUser, mockUpsert

### Community 40 - "seed.ts"
Cohesion: 0.67
Nodes (3): main(), prisma, slugFromName()

## Knowledge Gaps
- **238 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+233 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `requireRole()` connect `audit.test.ts` to `actions.test.ts`, `package.json`, `EnquiryForm.tsx`, `news-events.test.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `LanguageSwitcher()` connect `aliases` to `FlashNewsBar.tsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `FlashNewsBar.tsx` to `EnquiryForm.tsx`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _238 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._