# Provision Neon + Prisma schema for User/Role/Course/CandidateProfile base models

**ID:** `s00-t3`  
**Sprint:** Sprint 0 - Foundation & Environment  
**Epic:** Foundation & Infra  
**Track:** Backend  
**Priority:** Must Have  
**Story Points:** 8  
**Depends on:** s00-t1  
**Model tier:** premium — Foundational schema — mistakes here cascade through every later sprint's ALTERs.  

## Manual Prerequisites
- [ ] Neon account created, with production and dev branches
- [ ] DATABASE_URL for the dev branch added to .env.local and Vercel (Development)
- [ ] DATABASE_URL for the production branch added to Vercel (Production) — not used until later sprints

## Task Breakdown

```
Read AGENTS.md first. Set up the database layer and a deliberately minimal base schema that later sprints extend — do not build the full data model in this task.

Requirements:
- Install Prisma, initialize prisma/schema.prisma pointed at the Neon DATABASE_URL.
- Define the Role enum exactly as specified in AGENTS.md.
- Define a User model mirroring the Clerk user: id (Clerk user id, string, primary key), role (Role), languagePreference (String, default 'en'), createdAt.
- Define a skeletal Course model with only: id, slug (unique), titleEn, titleMl (nullable), createdAt, updatedAt. Sprint 2 extends this — do not add those fields now.
- Define a skeletal CandidateProfile model with only: id, userId (FK to User, unique), isVerifiedStudent (Boolean, default false), studentRecordId (String, nullable), createdAt, updatedAt. Sprint 5 extends this — do not add those fields now.
- Set up lib/db.ts as a Prisma client singleton following the standard Next.js serverless-safe pattern.
- Write and run an initial migration (prisma migrate dev) against the Neon dev branch.
- Add an npm run db:studio script for local Prisma Studio access.

Write tests (Vitest) covering:
1. The Prisma client singleton can connect and run a trivial query (e.g. SELECT 1) against the dev database.
2. A User record can be created with each of the five Role enum values without a validation error.
3. A CandidateProfile can be created linked to a User, with isVerifiedStudent defaulting to false.

Definition of done: the migration applies cleanly to a fresh Neon dev branch, Prisma Studio shows all three models, and all 3 tests pass in CI. Document in a tests/README.md whether CI uses a dedicated Neon test branch or a local Postgres container.
```

## Definition of Done
- [ ] Prisma schema defines Role enum, User, Course (skeleton), CandidateProfile (skeleton)
- [ ] Migration applies cleanly to a fresh Neon branch
- [ ] lib/db.ts singleton pattern in place
- [ ] Prisma Studio accessible via npm run db:studio
- [ ] All 3 tests pass in CI
