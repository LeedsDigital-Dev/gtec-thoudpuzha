# workflow
- For long-running shell commands (npm install, test suites, builds): start in background and poll with a short command instead of waiting directly and hitting the tool-call timeout. Confidence: 0.75
- Treat tool-call timeouts on long commands as expected behavior to route around with background+poll, not as bugs to be solved. Confidence: 0.70
- When resolving divergence on main/master branch: always sync local to match remote exactly and discard all local changes (`git reset --hard origin/main && git clean -fd`). Favors remote over local. Confidence: 0.70
- Before building new functionality, search for an existing implementation first. If one exists but isn't wired up, just connect it rather than rebuilding. Only build from scratch when nothing reusable exists. Confidence: 0.85
- When extending a feature (e.g., adding a new role to a signup flow), follow the existing patterns already established for similar cases in the codebase — don't invent a new approach. Confidence: 0.75
- When adding or changing i18n translation keys, update ALL locale files in parallel (en.json, ml.json) — never leave translations out of sync. Confidence: 0.80
- Before using a third-party component or API named in a spec, verify it actually exists in the installed version by checking node_modules type definitions — don't trust specs at face value about API surface. Confidence: 0.85
- When new library imports break existing tests, add a global mock in the test setup file (setup.ts) rather than wrapping individual test files with providers. Confidence: 0.80
- When an audit uncovers out-of-scope issues, flag them explicitly in the completion report rather than silently fixing them or staying quiet. Confidence: 0.75
