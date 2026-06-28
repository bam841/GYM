# IMPLEMENTATION PLAN: Gym Management System Code-First Database Architecture

This plan establishes the phases for containerizing local development, building version-controlled database schemas, creating a dynamic connection layer, and deploying to Supabase.

## Phase 1: Local Containerization (Docker + Postgres)
Set up a containerized database locally that mirrors the production environment to ensure local-to-production parity.
- **Tasks**:
  1. Create `docker-compose.yml` to define a PostgreSQL service.
  2. Create `schema.sql` containing tables for `bookings`, `memberships`, and `users`.
  3. Create `seed.sql` containing dummy booking records and a default admin user.
  4. Write a setup script `scripts/setup-local-db.sh` to spin up the container, execute the schema, and seed the data.
- **Verification**:
  - Run the setup script and query the local Postgres database manually to verify tables and data exist.

## Phase 2: Dynamic Database Client
Create a flexible database client that swaps connection mechanisms based on the active environment.
- **Tasks**:
  1. Install `pg` and `@types/pg` packages.
  2. Implement `src/lib/dbClient.ts` containing `insertBooking()`, `getBookings()`, and `authenticateUser()` methods.
  3. Detect `DB_PROVIDER` environment variable:
     - If `"postgres"`, use direct SQL queries against local PostgreSQL.
     - If `"supabase"`, use REST fetch calls against Supabase endpoints.
- **Verification**:
  - Verify that the app starts locally and connects to local Postgres.

## Phase 3: API & Auth Refactoring
Update the application logic to utilize the unified database client.
- **Tasks**:
  1. Refactor [src/app/api/bookings/route.ts](file:///home/bamz/Documents/vs_code/gym/src/app/api/bookings/route.ts) to read and write bookings using `dbClient.ts`.
  2. Refactor [src/app/admin/page.tsx](file:///home/bamz/Documents/vs_code/gym/src/app/admin/page.tsx) to authenticate using the `dbClient.ts` auth method.
- **Verification**:
  - Verify that booking submissions work locally (data writes to Docker container).
  - Verify that logging in to the Admin Dashboard works locally using seed user credentials.

## Phase 4: Production Handoff & Launch
Sync the version-controlled structure to the cloud and perform handoff checks.
- **Tasks**:
  1. Execute `schema.sql` inside the Supabase SQL editor.
  2. Update production environment variables to point to the Supabase instance.
  3. Verify production builds compile cleanly.
- **Verification**:
  - Compilation completes successfully (`npm run build`).
