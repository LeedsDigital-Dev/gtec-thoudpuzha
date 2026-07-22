# Test Database Configuration

## Setup

The DB integration tests in `src/__tests__/db.test.ts` use Node environment and connect directly to a local PostgreSQL instance (not the Vercel-hosted Neon database). This avoids test-pollution of the dev/production Neon branches and keeps test runs fast without network round-trips.

The test database connection string is hardcoded in the test file:

```
postgresql://gtec_dev:gtec_dev_pass@localhost:5432/gtec_thodupuzha_test
```

## CI Strategy

CI uses a local PostgreSQL container (Docker) with the same credentials and database name. The container is started before the test run and torn down afterward. This is documented in `.github/workflows/ci.yml`.

To run DB tests locally, ensure PostgreSQL is running with a `gtec_thodupuzha_test` database accessible with the credentials above, and the Prisma schema has been migrated to it.
