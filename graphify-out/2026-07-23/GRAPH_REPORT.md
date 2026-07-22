# Graph Report - gtec-thoudpuzha  (2026-07-23)

## Corpus Check
- 69 files · ~10,684 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 330 nodes · 413 edges · 32 communities (25 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8980c4d`
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
- enquiries/page.tsx
- taste.md
- tailwind
- Header.tsx
- (public)/page.tsx
- clerk.d.ts
- audit.test.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 19 edges
2. `compilerOptions` - 16 edges
3. `requireRole()` - 11 edges
4. `logAdminAction()` - 8 edges
5. `GTEC Thodupuzha` - 8 edges
6. `scripts` - 7 edges
7. `Role` - 7 edges
8. `include` - 7 edges
9. `EnquiryForm()` - 6 edges
10. `sendEnquiryNotification()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AuditLogPage()` --calls--> `requireRole()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/audit-log/page.tsx → src/lib/auth.ts
- `Input()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/input.tsx → src/lib/utils.ts
- `Label()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/label.tsx → src/lib/utils.ts
- `SelectGroup()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts
- `SelectValue()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (32 total, 7 thin omitted)

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
Cohesion: 0.14
Nodes (12): AdminLayout(), PortalLayout(), PublicLayout(), Header(), navItems, buildLocalePath(), LanguageSwitcher(), siteConfig (+4 more)

### Community 8 - "aliases"
Cohesion: 0.10
Nodes (18): AccountSetupIncompletePage(), ForbiddenPage(), metadata, geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale (+10 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.29
Nodes (6): mockAggregate, mockAuditCreate, mockAuth, mockCreate, mockRedirect, mockRevalidatePath

### Community 10 - "enquiries/page.test.tsx"
Cohesion: 0.50
Nodes (3): mockAuth, mockEnquiryFindMany, mockRedirect

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 22 - "Header.tsx"
Cohesion: 0.27
Nodes (6): FlashNewsBar(), Locale, mockFindMany, mockGetLocale, getActiveFlashNews(), PublicFlashNewsItem

### Community 24 - "(public)/page.tsx"
Cohesion: 0.16
Nodes (17): HomePage(), HeroSection(), TODO: Super-Admin-editable content — replace with CMS-managed fields once, Button(), buttonVariants, Input(), Label(), SelectContent() (+9 more)

### Community 33 - "audit.test.ts"
Cohesion: 0.17
Nodes (22): AuditLogPage(), AuditLogPageProps, createFlashNews(), deleteFlashNews(), localeFromFormData(), moveFlashNews(), toggleFlashNewsActive(), updateFlashNews() (+14 more)

## Knowledge Gaps
- **153 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+148 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `smoke.test.tsx` to `(public)/page.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _153 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._