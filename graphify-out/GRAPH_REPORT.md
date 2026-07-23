# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 80 files · ~13,507 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 377 nodes · 522 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6321a18b`
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
- smoke.test.tsx
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
- site/page.test.tsx
- (public)/page.tsx
- clerk.d.ts
- audit.test.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 19 edges
2. `requireRole()` - 17 edges
3. `compilerOptions` - 16 edges
4. `logAdminAction()` - 10 edges
5. `Role` - 10 edges
6. `updateSiteSettings()` - 8 edges
7. `GTEC Thodupuzha` - 8 edges
8. `scripts` - 7 edges
9. `SiteSettingsWithCards` - 7 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `EnquiriesPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/enquiries/page.tsx → src/lib/auth.ts
- `SiteSettingsPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/settings/site/page.tsx → src/lib/auth.ts
- `AtAGlanceSectionProps` --references--> `SiteSettingsWithCards`  [EXTRACTED]
  src/components/shared/AtAGlanceSection.tsx → src/lib/site-settings.ts
- `SelectGroup()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (33 total, 6 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (35): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+27 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (37): @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, lucide-react, next, next-intl, dependencies (+29 more)

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
Cohesion: 0.11
Nodes (19): COURSES, EnquiryForm(), EnquiryFormProps, FormErrors, indianMobileRegex(), TODO: Swap hardcoded course list for live Courses data in Sprint 2., sanitizePhone(), COURSES (+11 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "smoke.test.tsx"
Cohesion: 0.15
Nodes (12): AdminLayout(), PortalLayout(), PublicLayout(), FlashNewsBar(), Locale, mockFindMany, mockGetLocale, Header() (+4 more)

### Community 8 - "aliases"
Cohesion: 0.07
Nodes (24): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, buildLocalePath(), LanguageSwitcher() (+16 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 16 - "(public)/page.tsx"
Cohesion: 0.17
Nodes (16): HomePage(), HomePageProps, AboutSection(), AboutSectionProps, AtAGlanceSection(), AtAGlanceSectionProps, iconMap, WhyChooseUsSection() (+8 more)

### Community 17 - "actions.test.ts"
Cohesion: 0.20
Nodes (7): mockFindFirst, mockLogAdminAction, mockRedirect, mockRequireRole, mockRevalidatePath, mockSiteSettingsUpdate, mockWhyCardUpdate

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "site/page.test.tsx"
Cohesion: 0.40
Nodes (3): mockFindFirst, mockRedirect, mockRequireRole

### Community 24 - "(public)/page.tsx"
Cohesion: 0.19
Nodes (16): HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants, Input(), Label(), SelectContent(), SelectGroup() (+8 more)

### Community 33 - "audit.test.ts"
Cohesion: 0.12
Nodes (31): AuditLogPage(), AuditLogPageProps, EnquiriesPage(), EnquiriesPageProps, createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews() (+23 more)

## Knowledge Gaps
- **167 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `smoke.test.tsx` to `(public)/page.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _167 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._