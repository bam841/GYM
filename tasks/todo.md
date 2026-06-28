# TODO List: Gym Management System

- [x] **Phase 1: Native Database Client & SQL Migration**
  - [x] Install `pg` and `@types/pg` packages.
  - [x] Implement [src/lib/db.ts](file:///home/bamz/Documents/vs_code/gym/src/lib/db.ts) (Postgres Pool).
  - [x] Refactor [src/lib/supabaseREST.ts](file:///home/bamz/Documents/vs_code/gym/src/lib/supabaseREST.ts) to run native SQL queries directly.
  - [x] Clean up and remove Docker configurations (`docker-compose.yml` and `scripts/setup-local-db.sh`).
  - [x] Create native database setup script [scripts/setup-native-db.sh](file:///home/bamz/Documents/vs_code/gym/scripts/setup-native-db.sh).
  - [x] Update [.env](file:///home/bamz/Documents/vs_code/gym/.env) to connect to native PostgreSQL (`localhost:5432/gym_db`).

- [x] **Phase 2: Booking Confirmation & Membership Activation**
  - [x] Add `supabaseProcessBooking` transaction function to `supabaseREST.ts`.
  - [x] Implement [src/app/api/bookings/process/route.ts](file:///home/bamz/Documents/vs_code/gym/src/app/api/bookings/process/route.ts) endpoint.
  - [x] Update [src/app/admin/page.tsx](file:///home/bamz/Documents/vs_code/gym/src/app/admin/page.tsx) dashboard stats and Status column with badge rendering.
  - [x] Implement `handleProcessBooking` API client fetch in `page.tsx` with action confirmation prompts.
