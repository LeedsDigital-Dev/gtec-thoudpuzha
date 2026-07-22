# Autonomous Build Guide — Permanent Agent VPS

Turn a rented VPS into a standing piece of infrastructure: install the orchestration tooling
once, then for every project after that — starting with GTEC Thodupuzha — spec it in Notion,
point this system at the repo, and let it build, test, and commit its way through the plan
while you're offline.

This version runs on **one agent CLI only: Command Code (`cmd`)**. Earlier drafts of this guide
juggled Claude Code and opencode side by side; that's gone now, on purpose — one tool, one auth,
one consistent `-m <model-id>` flag across every provider it carries (Claude, GPT, Kimi,
DeepSeek, GLM, Qwen, MiniMax, and 20+ more), which is what actually makes "switch providers
easily" true rather than aspirational. Project memory also changed: **graphify**, not Graphiti —
a local, no-database knowledge graph over your actual codebase (tree-sitter AST, free, no API
key needed for code), not a Neo4j server to run and maintain.

**Read §0 and §5 (Cost Optimizations) before starting** — everything else builds on those two.

---

## 0. Two directories, two lifecycles

```
~/agent-system/           permanent, installed once, shared by every project
  bin/
    spawn-engineer.sh       model-routing wrapper — runs one task via cmd, blocking, verified
    notion-export.py        pulls a project's Notion dashboard into plan/ files
    new-project.sh           bootstraps a new project end to end
  config/
    models.json              cheap/premium tier -> Command Code model id (edit here, not per
                              project, to re-route every project's cheap tier at once)
  templates/
    notion-schema-guide.md    the Notion database shape the exporter expects
    HOW-TO-SPEC-A-NEW-PROJECT.md
  tmux-orchestrator/         (cloned once)
  .env                       COMMAND_CODE_API_KEY, NOTION_API_TOKEN — never in a project repo

~/projects/<name>/         one per project, each its own git repo
  plan/
    AGENTS.md                project-specific conventions
    PRD.md
    task-graph.json          this project's dependency graph + model tiers + status
    tasks/*.md
    logs/<task-id>.log        full transcript of every attempt at that task
    blockers.md               created on first use
  graphify-out/               graph.json, GRAPH_REPORT.md — committed to the repo
  (the actual application code)
```

Nothing project-specific lives in `~/agent-system/`. Nothing shared lives inside a project repo.
If you're ever unsure where a change belongs, this is the test: does it apply to GTEC only, or
to every project you'll ever run here?

---

## Part A — One-time VPS setup

### A.1 Provision and harden the VPS

Any Ubuntu 22.04/24.04 VPS with root SSH works — provider-agnostic. Sizing:

| | Minimum | Comfortable |
|---|---|---|
| vCPU | 2 | 4 |
| RAM | 4 GB | 8 GB |
| Disk | 40 GB SSD | 80 GB SSD |

Nothing here needs a database server anymore (graphify has no Neo4j/Docker dependency), so even
the minimum column is comfortable for a single active project. Go up a size if you'll run
several projects' worth of `cmd` + test-runner + dev-server processes concurrently.

```bash
# As root, on first login
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd

sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

SSH in as `deploy` from here on. This matters more than usual: this box will run `cmd --yolo`,
executing shell commands unsupervised, across every project you ever point it at — a non-root,
firewalled user with nothing else sensitive on the box is the standing insurance policy, paid
once.

### A.2 Base tooling

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22 && nvm use 22

sudo apt update
sudo apt install -y git tmux build-essential python3 python3-pip

# uv — needed for graphify (§A.5), also just a good Python tool manager to have
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc

git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### A.3 Install and authenticate Command Code

```bash
npm install -g command-code
```

Authenticate non-interactively — Studio → API Keys → Generate, on a plan that includes CLI
usage (Go or Pro/Max):

```bash
echo 'export COMMAND_CODE_API_KEY="your-key-here"' >> ~/.bashrc
source ~/.bashrc
cmd status --json   # confirms auth without launching an interactive session
cmd --list-models   # live, current model ids — config/models.json's ids were verified against
                     # this list on 2026-07-21; re-check if it's been a while
```

That's the only credential this whole system needs for coding: `spawn-engineer.sh` and the
Orchestrator both authenticate through the same `COMMAND_CODE_API_KEY`, and switching what model
runs — new provider, temporary escalation, A/B test — is a one-line edit to
`config/models.json`, never a new install or a second auth flow.

### A.4 Set up the permanent tmux-orchestrator

```bash
mkdir -p ~/agent-system && cd ~/agent-system
git clone https://github.com/Jedward23/Tmux-Orchestrator.git tmux-orchestrator
cd tmux-orchestrator && chmod +x *.sh
```

The source repo's helper scripts (`send-claude-message.sh`, `schedule_with_note.sh`) were
written assuming the `claude` binary. In practice, `spawn-engineer.sh` (§A.6) replaces the
per-task piece of that pattern entirely — you won't call `send-claude-message.sh` directly. The
one part still worth keeping from the original repo is `schedule_with_note.sh` for the
Orchestrator's own 20-minute check-in loop (Part C's kickoff prompt uses it). If you want it
calling `cmd` instead of `claude` for anything else you use it for, ask the Orchestrator to fix
that once, the same way the original guide had you fix hardcoded paths: "read
schedule_with_note.sh and replace any `claude` invocation with `cmd --yolo`, confirm the
scheduling still works."

### A.5 Set up graphify (project memory, no server to run)

[graphify](https://github.com/Graphify-Labs/graphify) maps a codebase into a local knowledge
graph — `graphify-out/graph.json` — that an agent queries instead of re-reading files. Code is
parsed locally via tree-sitter AST: **no LLM call, no API key, nothing leaves the machine** for
the part that matters most here (the actual application code Command Code is generating).
There's no database to stand up — it's a JSON file, committed to the repo, kept current
automatically by a git hook.

```bash
uv tool install "graphifyy[mcp]"
graphify --version
```
> Package name is `graphifyy` (double-y) — that's not a typo, it's how the PyPI project is
> named. The command it installs is `graphify` (single-y).

Per project, right after bootstrap (§B.2 folds this in), from inside the project's repo root:

```bash
graphify . --no-viz              # build the initial graph (near-empty at Sprint 0, grows from there)
graphify hook install            # auto-rebuild (AST-only, free) after every git commit
cmd mcp add graphify --scope local -- python -m graphify.serve graphify-out/graph.json
```

That `cmd mcp add` line registers graphify as an MCP server for Command Code specifically — every
`cmd` session (the Orchestrator's interactive one, and every headless run `spawn-engineer.sh`
kicks off) gets `query_graph`, `get_node`, `get_neighbors`, and `shortest_path` tools over the
current codebase, current as of the last commit, no manual "remember to update the memory" step
required — the post-commit hook is what keeps it current, not agent discipline.

`graphify-out/` is meant to be committed (per graphify's own recommended team setup) except
`graphify-out/cost.json`:
```bash
echo 'graphify-out/cost.json' >> .gitignore
```

**Optional, not required:** graphify can also do a semantic pass over docs/PDFs/images (your
`plan/*.md` files, say), which needs an LLM call — but since every task already reads
`plan/AGENTS.md` and its own task file directly and explicitly (§Part C's kickoff prompt), that
indexing isn't necessary for this system to work, and skipping it means graphify costs nothing at
all. If you want it anyway, Command Code's Provider API plan ($15/mo, separate from the base
CLI-usage plan) exposes an OpenAI-compatible endpoint graphify can call with the exact same
credential: `OPENAI_BASE_URL=https://api.commandcode.ai/provider/v1 OPENAI_API_KEY=$COMMAND_CODE_API_KEY
OPENAI_MODEL=moonshotai/Kimi-K2.7-Code graphify extract ./plan --backend openai` — worth knowing
the option exists, not worth setting up by default.

### A.6 Drop in the agent-system kit

Everything in `agent-system/bin/`, `agent-system/config/`, and `agent-system/templates/`
(delivered alongside this guide) goes here, plus a `.env` you create yourself:

```bash
cp -r /path/to/downloaded/agent-system/* ~/agent-system/
chmod +x ~/agent-system/bin/*.sh

cat > ~/agent-system/.env <<'EOF'
export COMMAND_CODE_API_KEY="your-key-here"
export NOTION_API_TOKEN="secret_your-integration-token"
EOF
echo 'source ~/agent-system/.env' >> ~/.bashrc
```

Get the Notion token by creating an internal integration once at notion.so/my-integrations —
this is the reusable, permanent credential every future project's dashboard gets shared with.

Sanity check before moving on:
```bash
cat ~/agent-system/config/models.json          # confirm the cheap/premium mapping looks right
```

---

## Part B — Per-project workflow

### B.1 GTEC Thodupuzha specifically (already exported)

GTEC's `plan/` folder was already generated by hand — this is what made the schema in
`notion-schema-guide.md` possible to write accurately. Skip the Notion export for this one
project; drop the provided `plan/` folder straight into a fresh clone of its repo, then do the
graphify setup from §A.5:

```bash
git clone github-gtec:YOUR_USERNAME/gtec-thodupuzha.git ~/projects/gtec-thodupuzha
cp -r /path/to/downloaded/plan ~/projects/gtec-thodupuzha/
cd ~/projects/gtec-thodupuzha
git add plan/ && git commit -m "chore: import build plan (55 tasks, dependency graph, model routing)" && git push

graphify . --no-viz && graphify hook install
cmd mcp add graphify --scope local -- python -m graphify.serve graphify-out/graph.json
```
(Deploy key setup for the repo is the same as any project — see B.2.)

### B.2 Every project after that

1. **Spec it in Notion** — duplicate the GTEC dashboard template, fill in `plan/AGENTS.md` and
   `plan/PRD.md` content as sub-pages, and a Tasks database with `Depends On` (relation) and
   `Model` (select: Cheap/Premium) properties per `notion-schema-guide.md`. Full walkthrough in
   `HOW-TO-SPEC-A-NEW-PROJECT.md`.
2. **Share the page** with your integration (••• → Connections).
3. **Create an empty private GitHub repo**, add a deploy key on the VPS scoped to just that repo
   (`ssh-keygen`, add the public half under Settings → Deploy keys, an `~/.ssh/config` `Host`
   alias). Don't have an agent create the repo.
4. **Bootstrap**:
   ```bash
   ~/agent-system/bin/new-project.sh <project-name> <notion-page-url> <repo-ssh-url>
   ```
   This exports the plan, commits it as the first commit, and prints next steps — including the
   graphify setup from §A.5, which the printed steps remind you to run before starting the
   Orchestrator.
5. **Sanity-check the export** — open `plan/task-graph.json`, confirm `depends_on` is populated
   (the exporter warns if it looks suspiciously empty) and `model` tiers look right.

---

## 5. Cost Optimizations — how they're actually wired in

### 5.1 Model routing (the biggest lever)

`spawn-engineer.sh <project-dir> <task-id>` — never invoke `cmd` directly for a task. It reads
the task's `"model"` tier from `plan/task-graph.json`, resolves that tier to a named **profile**
in `~/agent-system/config/models.json` (e.g. `cheap -> kimi-code -> moonshotai/Kimi-K2.7-Code`),
and runs that task **headlessly and synchronously** via `cmd -p ... -m <model-id> --yolo`,
blocking until the agent finishes or retries are exhausted, then verifying the result rather than
trusting a clean exit code alone:

```bash
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s02-t1
# escalate one task to a stronger model without editing any config:
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s02-t1 --profile claude-opus
```

Three things happen inside it that are worth knowing:
- **Dependency check** — refuses to start if any `depends_on` entry isn't `"done"` yet (this is
  also §5.3).
- **Retry cap** — up to 3 attempts (matching `AGENTS.md` rule 9), each attempt's full output
  appended to `plan/logs/<task-id>.log`.
- **Verification, not blind trust** — a `0` exit code from `cmd` means the CLI call completed
  without erroring, not that the task actually got finished. The script also checks that the
  task's status in `task-graph.json` actually flipped to `"done"` *and* that a new git commit
  landed. If either is missing despite a clean exit, that's logged to `plan/blockers.md` as
  needing a human look rather than retried blindly — an agent reporting success without
  finishing is a different failure mode than an agent erroring out, and conflating them wastes
  retries on the wrong problem.

Because every profile is just a model id passed to the same `cmd -m` flag, switching what runs —
new provider, new model, temporary escalation for one stubborn task — is a one-line edit to
`models.json`, not a rewrite of any invocation logic. Twelve of GTEC's 55 tasks are tagged
`"premium"` — auth, the foundational schema, moderation bypass logic, the two access-control-
sensitive tasks, the permission-engine rewrite, the security review, and the production launch
gate. The other 43 are `"cheap"`. That ratio (roughly a fifth premium) is the rule to reuse on
future projects — see `HOW-TO-SPEC-A-NEW-PROJECT.md`.

### 5.2 Prompt caching

No script enforces this one — it's a discipline documented in every project's `AGENTS.md`
("Prompt Caching" section): keep `AGENTS.md` and the current task file as a stable, verbatim
prefix rather than paraphrasing them into a session. The underlying provider APIs Command Code
routes through cache repeated prefixes automatically at roughly a 10x discount on the cached
portion — but only if the prefix is byte-identical to one seen recently. `spawn-engineer.sh`'s
brief message is worded to reinforce this every time it runs a task.

### 5.3 Concurrency discipline

`spawn-engineer.sh` hard-refuses to start a task whose `depends_on` entries aren't all `"done"` —
not a suggestion the Orchestrator can talk itself past, an exit code. Because the script blocks
until a task finishes, the default behavior is naturally sequential: call it, wait, call it
again — which is correct for most of this plan. For the genuinely parallel case (Sprint 11:
`s11-t1` through `s11-t4`, four independent QA passes with no dependency edges between them), run
multiple calls concurrently rather than one at a time — either as background shell jobs:

```bash
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s11-t1 &
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s11-t2 &
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s11-t3 &
~/agent-system/bin/spawn-engineer.sh ~/projects/gtec-thodupuzha s11-t4 &
wait
```

or one per tmux window if you want to watch each live. Either way, each call still independently
enforces its own dependency check, retry cap, and verification — running several at once doesn't
bypass any of that. Pre-running tasks in parallel "to look busy" the way the source video's fixed
frontend/backend teams did has nothing safe to do on a sequential plan and is pure waste.

### 5.4 The retry circuit-breaker (your actual biggest control)

`AGENTS.md` rule 9, present in every project: three real attempts at the same failure, then stop
and log to `plan/blockers.md` rather than continuing. Retry loops against a badly-scoped task —
not base per-token pricing — are what actually blow budgets in unsupervised agentic builds.
`spawn-engineer.sh`'s own `MAX_RETRIES=3` enforces the same cap one level up, so it's not only
the agent's own discipline holding this line.

### 5.5 Spend guardrails

- Set a hard spend limit on your Command Code plan/billing before starting a long unsupervised
  run — check current limits under Studio → Billing.
- Check in within the first hour of any new project's first run to confirm the Orchestrator is
  actually calling `spawn-engineer.sh` and getting `0` exits back, not silently stuck.
- `tail -f ~/projects/<name>/plan/logs/<task-id>.log` any time you want to see exactly what a
  running task is doing.

---

## Part C — Kick off a build

```bash
cd ~/projects/<project-name>
tmux new-session -s <project-name>
cmd --yolo
```

The Orchestrator itself is a long-running *interactive* session (it reasons, calls
`spawn-engineer.sh` as a tool, and needs to persist across days) — a different role from the
headless runs `spawn-engineer.sh` executes, so it isn't itself routed through `models.json`.
`cmd --yolo` is fine here; pick whichever model you'd want doing multi-day coordination
(`cmd --yolo --model claude-sonnet-5` if you want to be explicit rather than take the CLI's
current default).

Paste (swap in the project name — everything else is generic across every project on this VPS):

```
You are the Orchestrator for building <project-name> end to end, autonomously, over the
coming days.

- Read plan/AGENTS.md now, in full, including its Model Routing, Prompt Caching, Concurrency
  Discipline sections and its General Working Rules (especially rules 7-9: commit + update
  task-graph.json status after every task, check depends_on before starting anything, and the
  3-strikes circuit breaker to plan/blockers.md).
- Read plan/PRD.md for product context if you need the "why" behind a task.
- plan/task-graph.json is your scheduling source of truth. Never call `cmd` directly for a
  task — always use:
    ~/agent-system/bin/spawn-engineer.sh <this-project-dir> <task-id>
  This BLOCKS until that one task finishes (or its retries are exhausted) and exits 0 only if
  it verified the task actually completed — dependency checking, model-tier routing, retries,
  and verification are all handled inside it, so you don't track any of that by hand. Treat a
  nonzero exit as "check plan/blockers.md and plan/logs/<task-id>.log, don't just try again."
- If a `graphify` MCP tool is connected (registered via `cmd mcp add graphify`), prefer its
  query_graph/get_node/get_neighbors/shortest_path tools over re-reading source files for
  "what already exists" questions — it's kept current automatically by a post-commit hook, so
  you don't need to update it yourself.

Your job, repeated for each sprint in order:
1. Check task-graph.json for this sprint's tasks and their depends_on status.
2. For each currently-eligible task, call spawn-engineer.sh and wait for it to return.
   Tasks with no dependency edge between them within the same sprint can run concurrently
   (background the calls with `&` and `wait`, or one per tmux window — GUIDE.md §5.3 has the
   exact pattern). Everything else, call sequentially; that's correct, not a missed optimization.
3. On a 0 exit, the task is already verified done (status flipped, commit landed) — no
   additional check needed from you. On nonzero, read plan/blockers.md for what happened before
   deciding whether to retry with a different --profile (e.g. escalate to claude-opus) or move
   on to a different unblocked task and come back to it.
4. Do not start a task from a later sprint until every task in the current sprint is "done".
5. Schedule yourself a check-in every 20 minutes via schedule_with_note.sh, reporting completed/
   in-progress/blocked tasks and what's next.

Start now with the first sprint. Confirm you've read AGENTS.md and can see all its tasks in
task-graph.json before calling spawn-engineer.sh for the first time.
```

---

## Part D — Monitoring and intervening

```bash
tmux attach -t <project-name>          # watch the Orchestrator itself; Ctrl+b then d to detach
tail -f ~/projects/<project-name>/plan/logs/<task-id>.log   # watch the CURRENT task run live
git -C ~/projects/<project-name> log --oneline -20
python3 -c "
import json
g = json.load(open('$HOME/projects/<project-name>/plan/task-graph.json'))
for t in g['tasks']:
    print(f\"{t['id']:10} {t['model']:8} {t['status']}\")
"
cat ~/projects/<project-name>/plan/blockers.md 2>/dev/null
graphify query "what does the auth flow look like?" --graph ~/projects/<project-name>/graphify-out/graph.json
```

This works identically for every project on the box — the status sweep, not tmux scrollback, is
the fast way to see progress at a glance, and it's the same command regardless of which project
you're checking on. `plan/logs/<task-id>.log` holds every attempt's full transcript, including
ones that got retried or blocked, which is usually more informative than the Orchestrator's own
summary when something needs a closer look. The `graphify query` line is the same tool the
Orchestrator itself uses — handy for a quick "does X already exist" check without reading code.

---

## Part E — What "done" looks like

The project's final task — production go-live, in GTEC's case `s12-t4` — is the actual finish
line. Its Definition of Done in `plan/tasks/` is the closest thing to a single completion
checklist. Everything upstream of it exists to make that task's smoke test pass against a live
domain.
