# E2E Flow Tests

End-to-end tests that verify complete user workflows in sequence.

## Prerequisites

1. **PostgreSQL database** running locally (configured via `DATABASE_URL` in `.env`)
2. **Clerk API keys** in `.env` (`CLERK_SECRET_KEY` + `CLERK_PUBLISHABLE_KEY`)
3. **Dev server** running: `npm run dev`

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Seed the database with test data (creates Clerk users + DB records)
npm run db:seed:e2e

# 3. Start the dev server (in a separate terminal)
npm run dev

# 4. Run all flow tests
npm run test:e2e:flows

# Or run individual flows
npm run test:e2e:visitor      # Public site only
npm run test:e2e:student      # Student portal
npm run test:e2e:job-seeker   # Job seeker portal
npm run test:e2e:employer     # Employer portal
npm run test:e2e:admin        # Admin dashboard
```

## Test Credentials

After running `db:seed:e2e`, these test accounts are available:

| Role          | Email                      | Password           |
|---------------|----------------------------|--------------------|
| Student       | student-e2e@test.com       | TestE2E@2024!Secure |
| Job Seeker    | jobseeker-e2e@test.com     | TestE2E@2024!Secure |
| Employer      | employer-e2e@test.com      | TestE2E@2024!Secure |
| Super Admin   | superadmin-e2e@test.com    | TestE2E@2024!Secure |
| Centre Staff  | staff-e2e@test.com         | TestE2E@2024!Secure |

## Test Data

The seed creates:

- 5 Clerk users (one per role)
- Student record (TEST001) with email
- Published course ("E2E Test Course") with content blocks + course table
- Approved employer profile
- Approved job posting with 30-day deadline
- Candidate profiles for student and job seeker (pre-filled biodata)
- Course enrollment linking student to test course
- Academic resource (study notes)
- Staff permissions (all enabled for centre staff)
- Flash news item
- Site settings with at-a-glance stats

## Structure

```
tests/e2e/flows/
├── global.setup.ts        # Clerk testing token setup
├── seed-e2e.ts           # Test data seed script
├── visitor.spec.ts       # Public visitor flow (13 tests)
├── student.spec.ts       # Student portal flow (10 tests)
├── job-seeker.spec.ts    # Job seeker portal flow (7 tests)
├── employer.spec.ts      # Employer portal flow (8 tests)
└── admin.spec.ts         # Admin dashboard flow (14 tests)
```

Each `.spec.ts` file runs in serial mode — tests execute in order, each step building on the previous one. If a step fails, you'll know exactly where the flow breaks.
