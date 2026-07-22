# Graph Report - gtec-thoudpuzha  (2026-07-22)

## Corpus Check
- 46 files · ~4,945 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 237 nodes · 225 edges · 35 communities (25 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22fed080`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- components.json
- package.json
- include
- GTEC Thodupuzha
- smoke.test.tsx
- aliases
- app/layout.tsx
- button.tsx
- AGENTS.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- taste.md
- tailwind
- auth.ts
- (public)/page.tsx
- db.ts
- clerk.d.ts
- audit.test.ts
- audit-log/page.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `GTEC Thodupuzha` - 8 edges
3. `scripts` - 7 edges
4. `include` - 7 edges
5. `tailwind` - 6 edges
6. `aliases` - 6 edges
7. `handleRouteProtection()` - 5 edges
8. `LanguageSwitcher()` - 4 edges
9. `routing` - 4 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (35 total, 10 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.06
Nodes (33): dotenv, eslint, eslint-config-next, jsdom, devDependencies, dotenv, eslint, eslint-config-next (+25 more)

### Community 1 - "dependencies"
Cohesion: 0.06
Nodes (33): @base-ui/react, class-variance-authority, @clerk/nextjs, clsx, lucide-react, next, next-intl, dependencies (+25 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "package.json"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, db:studio, dev, lint, start (+2 more)

### Community 5 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "GTEC Thodupuzha"
Cohesion: 0.22
Nodes (8): Deployment, Environment Variables, Getting Started, GTEC Thodupuzha, License, Prerequisites, Project Structure, Scripts

### Community 7 - "smoke.test.tsx"
Cohesion: 0.21
Nodes (6): buildLocalePath(), LanguageSwitcher(), mockAuth, mockAuthResult, mockClerkMiddleware, mockCreateRouteMatcher

### Community 8 - "aliases"
Cohesion: 0.16
Nodes (12): AccountSetupIncompletePage(), ForbiddenPage(), metadata, config, getRequestLocale(), handleRouteProtection(), intlMiddleware, isAdminRoute (+4 more)

### Community 9 - "app/layout.tsx"
Cohesion: 0.24
Nodes (6): geistMono, geistSans, metadata, { Link, redirect, usePathname, useRouter }, Locale, routing

### Community 10 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 21 - "tailwind"
Cohesion: 0.50
Nodes (3): CI Strategy, Setup, Test Database Configuration

### Community 33 - "audit.test.ts"
Cohesion: 0.29
Nodes (6): logAdminAction(), LogAdminActionInput, mockAuth, mockCreate, mockFindMany, mockRedirect

## Knowledge Gaps
- **125 isolated node(s):** `mockCreate`, `mockFindMany`, `mockRedirect`, `mockAuth`, `AuditLogPageProps` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `mockCreate`, `mockFindMany`, `mockRedirect` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._