# AGENTS.md — GTEC Thodupuzha Shared Build Context

This file is the shared context every task prompt in `plan/tasks/` assumes you've read. It exists so 55 independent task prompts don't have to re-explain the stack, folder structure, and conventions — and so they stay consistent with each other.

**Read this file before starting any task.** If a `graphify` MCP tool is connected, query it for anything already built before assuming this file alone is a complete picture of the current codebase — it indexes the actual code via AST and rebuilds itself automatically after every commit, so it's usually more current than your own memory of earlier tasks in this session.

## Project Overview

GTEC Thodupuzha is a branch website for a G-TEC Education centre: a public marketing site (courses, gallery, news, enquiry capture) plus two authenticated systems — a **Student Portal** (academic resources, biodata) and a **Job Portal** (employer-posted vacancies, candidate search) — sitting behind a role-based **Admin Panel** with a moderation queue. Full detail: see `plan/PRD.md`.

Customers of the *portal* (students, job seekers, employers) DO log in — this is different from a typical internal-only admin tool. There are five roles total, not three.

## Tech Stack (locked-in working defaults)

Where `plan/PRD.md`'s Tech Stack Decisions section marks something "Open Decision," the defaults below are the working assumption for all task prompts until the client confirms otherwise. If a decision changes, update this file and any task not yet started.

- **Framework**: Next.js 14+, App Router, TypeScript, React Server Components by default (Client Components only where interactivity requires it)
- **Auth**: Clerk (`@clerk/nextjs`) — role stored in `publicMetadata.role`
- **Database**: Neon Postgres + Prisma ORM
- **Styling/UI**: Tailwind CSS + shadcn/ui
- **Media storage**: Cloudflare R2 (S3-compatible SDK)
- **Transactional email**: Resend + React Email templates
- **Background jobs**: Inngest
- **i18n**: next-intl, locales `en` and `ml`
- **PDF generation**: `@react-pdf/renderer`
- **Testing**: Vitest + React Testing Library for unit/integration (co-located `*.test.ts(x)`); Playwright for critical e2e flows, introduced in Sprint 11
- **Hosting**: Vercel · **Domain/DNS**: Hostinger
- **Coding agent**: Command Code (`cmd`) — the only agent CLI used on this VPS. Model per task comes from `~/agent-system/config/models.json`, resolved automatically by `spawn-engineer.sh`; you don't choose it yourself.
- **Project memory**: graphify (MCP) — see `GUIDE.md` A.5 for setup. Query it (`graphify query "..."` or its MCP tools) before re-reading files to answer "does X already exist" questions.

## Role Model (single source of truth)

```
enum Role {
  STUDENT
  JOB_SEEKER
  EMPLOYER
  CENTRE_STAFF
  SUPER_ADMIN
}
```

- Students and Job Seekers share ONE `CandidateProfile` model, distinguished by `isVerifiedStudent: Boolean` and an optional `studentRecordId` FK — never build them as two separate profile systems.
- `requireRole(allowedRoles: Role[])` in `lib/auth.ts` is the ONLY sanctioned way to gate server-side data access. A client-side role check alone is never sufficient for anything that gates real data.
- Centre Staff and Super Admin accounts are never self-registered — they're invited via Clerk from `/admin/staff` (built in Sprint 9). Until Sprint 9 ships, the single v1 Super Admin is seeded manually via the Clerk dashboard (`publicMetadata.role = SUPER_ADMIN`).

## Route Groups & Folder Structure

```
app/
  (public)/                     # marketing site, statically generated where possible
    page.tsx                     # homepage
    about/ courses/[slug]/ placement/ gallery/ news/[slug]/ contact/
  (portal)/portal/               # authenticated, any logged-in role
    sign-up/ sign-in/
    student/ biodata/ resources/{notes,lectures,assignments,progress,timetable,past-papers}/
    jobs/[id]/
    employer/{register,post-vacancy,candidates}/
  (admin)/admin/                 # CENTRE_STAFF or SUPER_ADMIN only
    flash-news/ courses/ gallery/ certification-partners/ news-events/
    students/ employers/ job-postings/ skills-taxonomy/ staff/ settings/
  api/                            # route handlers: webhooks, Inngest functions
lib/
  auth.ts        # requireRole() helper
  db.ts          # Prisma client singleton
  email.ts       # Resend client + send helpers
  storage.ts     # R2 client + upload helpers
  audit.ts       # audit-log write helper (built Sprint 0, used from Sprint 1 on)
  i18n/          # next-intl config + dictionaries (en.json, ml.json)
prisma/schema.prisma
components/ui/       # shadcn primitives
components/shared/   # EnquiryForm, LanguageSwitcher, StatusBadge, etc. — reused across route groups
emails/              # React Email templates
middleware.ts
```

## Data Model Conventions

- Prisma models: PascalCase singular (`CandidateProfile`, `JobPosting`), fields camelCase.
- Every model that goes through moderation carries `status` (`PENDING | APPROVED | REJECTED`, or a model-specific subset) and `autoPublished: Boolean @default(false)`.
- Every admin-editable content model carries **paired bilingual fields**, never a single field with runtime translation: e.g. `titleEn`, `titleMl`, `descriptionEn`, `descriptionMl`. English fields are required; Malayalam fields are nullable until Sprint 10's bilingual rollout backfills them.
- Soft-delete (`deletedAt: DateTime?`) on records with downstream references or audit value (Applications, JobPostings, EmployerProfile). Hard delete is fine for pure content (Gallery items, Flash News).
- Every model has `createdAt`, `updatedAt`.
- Schema grows incrementally sprint over sprint — Sprint 0 creates a deliberately minimal base (User mirror, Role, a skeletal Course and CandidateProfile so early FKs resolve); later tasks ALTER/extend rather than redefine. A task that extends a model must say so explicitly and must not silently drop fields another task depends on.

## Testing Conventions

- Vitest for unit/integration tests, co-located next to source as `*.test.ts(x)`.
- Mock Clerk auth by mocking `auth()` / `currentUser()` from `@clerk/nextjs/server` — do not hit real Clerk in tests.
- Every task's own test suite must pass via `npm run test` before the task is considered done; run the FULL suite, not just the new tests, to catch regressions.
- Negative-permission and empty/edge-state tests are always higher priority than additional happy-path coverage.

## Environment Variables

`DATABASE_URL`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `RESEND_API_KEY`, `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY`, `SENTRY_DSN`, `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`. Store separate values per Vercel environment (Production/Preview/Development); never commit them.

## Model Routing (cost control, part 1)

Every task in `task-graph.json` carries a `"model"` field: `"cheap"` or `"premium"`. Twelve
tasks are premium — auth (`s00-t2`, `s04-t1`, `s04-t3`, `s04-t4`), the foundational schema
(`s00-t3`), the two moderation-bypass gates (`s07-t2`, `s07-t4`), the PII-export access control
(`s05-t3`), the application data-isolation task (`s08-t3`), the permission-engine rewrite
(`s09-t2`), the security review (`s11-t2`), and the production launch gate (`s12-t4`) — see each
task's `model_reason` for why. Everything else is cheap. You (the agent reading this) don't
choose your own model tier — `spawn-engineer.sh` already resolved it via
`~/agent-system/config/models.json` and started you on the right one before you ever saw this
file. This section exists so you understand why you might be running as a different model than
the task next to yours, not so you act differently based on it.

## Prompt Caching (cost control, part 2)

Keep `AGENTS.md` and the current task file as a stable, identically-worded prefix of your
context — don't paraphrase or reformat them when briefing a sub-task or summarizing for
yourself. Both Anthropic and Moonshot's APIs cache repeated prefixes automatically at a steep
discount (cache-hit input is roughly 10x cheaper than a cache miss); that discount only applies
if the prefix is byte-identical to a recently-seen one. This is also why editing this file
mid-build (e.g. appending the Super Admin seeding note per rule 7) should be an append, not a
reformat of existing content — a changed prefix is a cache miss for everyone after you.

## Concurrency Discipline (cost control, part 3)

Most of this plan is sequential by design — Sprint 2 needs Sprint 0's schema, Sprint 9
rewrites something Sprint 7 built, and so on. Do not spawn a parallel Engineer session for a
task just because a tmux window is free. A task is only eligible to start when every id in its
`depends_on` list has `status: "done"` in `task-graph.json` — `spawn-engineer.sh` enforces this
and will refuse to start an ineligible task, so trust it rather than working around it. The one
sprint with real, intentional parallelism is Sprint 11 (`s11-t1` through `s11-t4` — cross-browser
QA, security review, accessibility, performance — four independent passes with no dependency
edges between them). Everywhere else, one Engineer window active at a time is correct, not a
missed optimization.

## General Working Rules for Agents

1. Read this file before starting any task in `plan/tasks/`.
2. Each task is scoped to ship and be tested independently — do not reach ahead into a future sprint's feature even if it seems convenient right now.
3. Never build customer-facing payment flows (out of scope — PRD Section 3.2).
4. Respect the `(public)` / `(portal)` / `(admin)` route-group split — don't put gated UI in `(public)`.
5. Any admin-mutating action must call the audit-log helper (`lib/audit.ts`, built in Sprint 0) once it exists.
6. Run the full test suite before declaring a task finished, and report which tests were added and which passed.
7. Commit after each completed task, referencing the task ID in the commit message (e.g. `git commit -m "s02-t1: admin courses CRUD"`), and update that task's `status` field in `plan/task-graph.json` to `"done"` in the same commit.
8. Check `plan/task-graph.json` for a task's `depends_on` list before starting it. If a dependency's status isn't `"done"`, stop and flag it rather than proceeding — the plan was written assuming strict ordering, and skipping ahead produces code that references things that don't exist yet.
9. If you get stuck on the same failure after 3 real attempts, STOP. Write what you tried and why it failed to `plan/blockers.md`, mark the task `"blocked"` in the graph, and move to a different unblocked task if one exists. Do not silently work around a blocker by weakening a test or skipping a requirement. **This is cost control, not just quality control** — an unbounded retry loop against a badly-scoped task burns far more budget than base per-token pricing ever will; three genuine attempts is the actual ceiling, not a soft suggestion.

## Super Admin Seeding (v1)

The single v1 Super Admin account is seeded manually via the Clerk dashboard (`publicMetadata.role = SUPER_ADMIN`). There is no in-app Super Admin creation flow until Sprint 9.

## Manual Prerequisite Check (rule 10)

Before starting work on any task, check its Manual Prerequisites section against two sources:

1. **Credentials**: for each required env var, run `echo $VAR_NAME` — if it's empty OR literally
   equals `REPLACE_ME`, the credential hasn't been provided yet. Do not attempt work that
   depends on it, do not fabricate a fake value to keep going. Stop, write to
   `plan/blockers.md` under a `## <task-id> waiting on credential` heading naming exactly which
   env var is missing, mark the task `blocked` in `task-graph.json`, and move to a different
   eligible task if one exists.
2. **Content**: check `plan/manual-content.md` for any unchecked item this task's own Manual
   Prerequisites list references. If unchecked, same as above — stop, log to blockers.md under
   `## <task-id> waiting on content`, naming the specific unchecked item, don't invent
   placeholder content to substitute for it.

This is a different situation from a real failure (wrong code, failing test) — label it clearly
as "waiting on you," not "blocked," in the blockers.md entry, so it's obvious at a glance which
blockers need your input vs. which need debugging.

### Rule 10 addendum — approved placeholders
`plan/manual-content.md` may contain items explicitly marked "APPROVED to proceed with a
placeholder" — these are not blockers. Use the stated placeholder approach and continue. Only
genuinely unchecked, non-placeholder-approved items trigger the stop-and-block behavior in
rule 10.

## Rule 11 — lazy-initialize external clients
Never construct an external service client (Resend, R2/S3, Inngest, etc.) at module scope by
calling `new Client(process.env.X)` directly in a file's top-level code. This crashes on import
in any test that doesn't set that env var, even if the test never uses the client. Initialize
lazily instead — inside the function that needs it, or via a getter — so importing the module
never has a side effect requiring env vars to be present.

## Rule 13 — run a full build before considering a task done
`npm run test` passing is not sufficient confirmation a task is finished. Run `npm run build`
as well before committing — Next.js's build step catches real errors (like a sync function in
a "use server" file) that Vitest never touches, since tests don't exercise the production
compilation path at all.

## Rule 14 — Server Actions files may only export async functions
A file with `"use server"` gets every export turned into a callable server endpoint by
Next.js. Never put synchronous helper logic (validation, formatting, pure computation) in an
actions.ts file — put it in a plain lib file with no `"use server"` directive, and import it
from wherever it's needed, including from actions.ts itself if a server action needs it.

## Rule 15 — form action props must return void
A function passed to a React `<form action={fn}>` prop must return `void | Promise<void>`.
If the underlying function returns data (e.g. per-row results from a bulk import), do not pass
it directly as the form action — wrap it in a thin async function that calls it and discards
or otherwise handles the return value. If the UI needs to display the results, use
`useActionState`/`useFormState` properly rather than relying on a direct return value.

## Rule 16 — verify fast-moving external library APIs against what's actually installed
Libraries like Clerk change their hook/API shapes across versions. Before writing code against
an external library's API from memory, check the actual installed version's type definitions
(e.g. `node_modules/<package>/dist/**/*.d.ts`, or run a quick type-check) rather than assuming
the shape is what you recall from training. This is especially true for auth libraries (Clerk)
and framework APIs (Next.js) which iterate quickly.

## Rule 17 — confirm your branch before every commit
Before running `git commit`, run `git branch --show-current` and confirm you're on the expected
`task-<id>` branch — never assume. Committing to the wrong branch (main when you meant a task
branch, or vice versa) has caused real lost-time recovery work on this project; the check costs
one command.
