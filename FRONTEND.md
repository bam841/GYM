# Gym Landing Page & Admin Panel - Frontend Plan

## Tech Stack
*   **Framework:** Next.js (React)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Form Handling:** React Hook Form (recommended for robust form state)

## Page Structure (Landing Page)

### 1. Home Page (`/`)
*   **Hero Section:** High-impact background image of the gym.
*   **Content:** The main motto/tagline of the gym.
*   **Call to Action:** "Explore Gym" or "Book a Session" linking to respective sections.

### 2. Discover Page (`/discover`)
*   **Equipment Highlights:** Grid layout showcasing top gym equipment with images and brief descriptions.
*   **Booking Section:** Located below the equipment highlights.
*   **Booking Form:**
    *   **Fields:**
        *   Full Name (Text Input)
        *   Phone Number (Text Input)
        *   Session Type (Dropdown/Select: Daily, Weekly, Monthly)
    *   **Cost Display:** Dynamic text that updates based on the selected "Session Type".
        *   *Example:* "Cost: $10.00" (Updates automatically).
    *   **Submit Button:** "Book a Session with Us". Submits data to the backend API.

### 3. Contact Us Page (`/contact`)
*   **Owner Profile:** A short bio/description of the gym owner.
*   **Contact Information:** Phone number, email, and social links.
*   **Location:** Gym address, optionally integrated with a simple map embed.

## Admin Panel (`/admin`)
*   **Dashboard View:** A clean interface to view incoming data.
*   **Bookings Table:** Displays all submissions from the Discover page form.
*   **Memberships Table:** Displays members who have been confirmed/paid offline. Contains action buttons to promote a "Booking" to a "Member".