# plan/ — GTEC Thodupuzha Build Plan (exported from Notion)

This folder is the entire build plan as local files, so the autonomous agent(s) never need
Notion access, an API token, or a live web fetch to know what to build. Everything here is
plain text on purpose — cheap to read, cheap to grep, safe to version alongside the code it
describes.

| File | Purpose |
|---|---|
| `AGENTS.md` | Read this first, always. Stack defaults, folder structure, role model, data conventions, testing conventions, env vars, and the working rules every task assumes. |
| `PRD.md` | The full product requirements doc. Reference for *why*, not *what to do right now* — the task files are the actionable unit. |
| `task-graph.json` | Machine-readable index of all 55 tasks: id, title, sprint, epic, track, priority, points, `depends_on`, and a `status` field the agent updates as it works. This is what the orchestrator reads to decide what's next and what's safely parallel — far cheaper than re-reading 55 markdown files to infer order. |
| `tasks/*.md` | One file per task, each self-contained: Manual Prerequisites (human-only setup), Task Breakdown (the actual prompt to hand an agent), Definition of Done. An engineer agent should only ever need `AGENTS.md` + the one current task file open at a time. |
| `blockers.md` | Created on first use. Any task an agent gets stuck on gets logged here per AGENTS.md rule 9, instead of being silently worked around. |

## How task-graph.json is meant to be used

Each entry looks like:

```json
{
  "id": "s02-t1",
  "file": "tasks/s02-t1-admin-courses-crud.md",
  "title": "Build /admin/courses CRUD ...",
  "sprint": "s02",
  "epic": "Courses Module",
  "track": "Backend",
  "priority": "Must Have",
  "points": 8,
  "status": "not_started",
  "depends_on": ["s00-t3", "s00-t5"]
}
```

A task is **eligible to start** when every id in its `depends_on` list has `"status": "done"`.
Two eligible tasks with no dependency edge between them can safely run in parallel (different
engineer agents, different git worktrees/branches). The orchestrator prompt in `GUIDE.md`
walks through exactly how to use this in practice — including the sprints where real
parallelism exists (Sprint 11 is the big one: four independent QA passes) versus the sprints
that are hard-sequential by design (most of them — this plan was written assuming one thing
gets built on top of the previous one, not two independent surfaces reconciled later).

## Keeping this in sync with Notion

This is a one-time export as of the date it was generated. If the Notion Tasks database is
edited after this point (status changes from actually working the plan don't count — update
`task-graph.json`'s `status` field directly, that's expected and normal), re-export rather
than hand-editing both places.
