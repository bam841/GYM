# Gym Landing Page - System Architecture

## Overview
The system utilizes a **Unified Full-Stack Architecture** using Next.js. This allows a single codebase to serve the optimized, SEO-friendly landing pages while securely handling backend API logic and database interactions.

## Architectural Components

### 1. Client Layer (Frontend)
*   Built with Next.js App Router (`app/` directory).
*   **Server Components:** Used for static content like the Home and Contact pages to maximize performance.
*   **Client Components:** Used for interactive elements, specifically the Booking Form where state (Session Type selection & dynamic Cost) is required.

### 2. API Layer (Backend)
*   Next.js Route Handlers (`app/api/...`) act as the backend server.
*   **Endpoints:**
    *   `POST /api/bookings`: Receives data from the booking form.
    *   `GET /api/admin/bookings`: Fetches booking list for the admin panel.
    *   `POST /api/admin/members`: Moves a booking to the memberships table.

### 3. Data Layer (Database)
*   **Database:** SQLite. Ideal for a localhost deployment, requiring zero setup and storing data in a local file (e.g., `dev.db`).
*   **ORM (Object-Relational Mapping):** Prisma. Provides type-safe database queries and easy schema management, ensuring strict typing between the database and TypeScript frontend.

## Deployment Strategy
*   **Environment:** Designed to run on localhost.
*   **Startup:** A single `npm run dev` command starts both the React frontend and the backend API, simplifying the experience for the admin.