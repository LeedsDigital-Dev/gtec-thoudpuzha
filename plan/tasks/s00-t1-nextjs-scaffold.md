# Set up Next.js + TypeScript scaffold with CI deploy to Vercel/Cloudflare Pages

**ID:** `s00-t1`  
**Sprint:** Sprint 0 - Foundation & Environment  
**Epic:** Foundation & Infra  
**Track:** Infra/DevOps  
**Priority:** Must Have  
**Story Points:** 3  
**Depends on:** (none within this task graph — first task, or independent within its sprint)  
**Model tier:** cheap  

## Manual Prerequisites
- [ ] GitHub repo created (private), e.g. gtec-thodupuzha
- [ ] Vercel account created and linked to the repo (default target per AGENTS.md; revisit if Cloudflare Pages is chosen instead)
- [ ] Domain purchased on Hostinger (can be pointed to Vercel later, not required to start)

## Task Breakdown

```
Read AGENTS.md first. Scaffold the Next.js application that every later task builds on top of.

Requirements:
- Initialize a Next.js 14+ project with App Router and TypeScript (create-next-app with TS, App Router, Tailwind CSS enabled).
- Install and configure Tailwind CSS + shadcn/ui (shadcn-ui init), matching AGENTS.md's stack.
- Set up the base folder structure exactly as described in AGENTS.md's "Route Groups & Folder Structure": create the (public), (portal), (admin) route groups as empty placeholder pages (each rendering a simple "Coming soon" string) so the routing skeleton is visible and deployable.
- Set up ESLint + Prettier with a shared config; add an npm run lint script.
- Connect the repo to Vercel; configure automatic deployments on push to main, and preview deployments on PRs.
- Add a root README.md documenting how to run the project locally (npm install, npm run dev) and how environment variables are configured, referencing AGENTS.md's env var list. Do not commit real values.
- Add a .env.example file listing every environment variable name from AGENTS.md, empty values.

Write tests (Vitest) covering:
1. A basic smoke test that the homepage route renders without throwing.
2. A basic smoke test that each of the three route groups' placeholder pages renders without throwing.

Definition of done: the project deploys successfully to Vercel from a clean clone, npm run dev works locally, npm run lint passes with zero errors, and both smoke tests pass in CI.
```

## Definition of Done
- [ ] Repo deploys to Vercel automatically on push to main
- [ ] Preview deployments work on PRs
- [ ] npm run dev runs locally with no errors
- [ ] (public)/(portal)/(admin) route groups exist with placeholder pages
- [ ] .env.example lists all env vars from AGENTS.md
- [ ] Both smoke tests pass in CI
