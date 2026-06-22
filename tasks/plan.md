# IMPLEMENTATION PLAN: GYM KO TO FITNESS GYM Visual Upgrade

This plan breaks down the rebranding and redesign of the website into logical, vertical phases, focusing on the custom black and yellow aesthetic and name changes.

## Phase 1: Core Design Tokens & Navigation
Update global style variables and the layout navbar to establish the branding foundation.
- **Tasks**:
  1. Refactor `src/app/globals.css` to define black-and-yellow color tokens and update custom transitions and focus styles.
  2. Modify `src/app/layout.tsx` to update the page metadata title and description.
  3. Redesign `src/components/Navbar.tsx` to change the gym title to "GYM KO TO FITNESS GYM", switch accent hover colors to yellow, and improve alignment.
- **Verification**:
  - Run dev server, check that page title is updated.
  - Inspect navigation bar in browser to verify layout alignment and yellow color accents.

## Phase 2: Home Page (Hero Section) Redesign
Redesign the main landing view with high-impact typography and clean sports-oriented layout.
- **Tasks**:
  1. Redesign `src/app/page.tsx` to update the headline and text.
  2. Implement a high-impact athletic styling: replace orange highlights with bright yellow, adjust overlays to be deep pure black (`#000000` / `bg-black/90` or `bg-gradient-to-b from-black/30 via-black/80 to-black`), and style the primary CTA button.
- **Verification**:
  - Check the hero view on mobile (`320px`) and desktop (`1200px`).
  - Verify that the button hover state works cleanly with micro-interactions.

## Phase 3: Discover Page & Booking Form Upgrade
Update the gym's main interactive page: the equipment showcase and membership/pass bookings.
- **Tasks**:
  1. Update `src/app/discover/page.tsx` equipment grid: replace orange highlights, use sleek borders, and use a geometric design.
  2. Redesign `src/components/BookingForm.tsx` inputs, dropdown selectors, price preview card (black-yellow border and text), and booking submit button.
- **Verification**:
  - Submit a test booking to verify connection with the API endpoint `/api/bookings`.
  - Check validation error states for phone number and name.

## Phase 4: Contact Us Page Redesign
Upgrade the Coach profile and location/contact lists.
- **Tasks**:
  1. Redesign `src/app/contact/page.tsx` coach card to use a modern layout.
  2. Style contact info blocks with yellow icon containers, subtle borders, and clear typography.
- **Verification**:
  - Test responsiveness of the coach profile card.
  - Hover over social/contact icons to verify visual transitions.

## Phase 5: Admin Panel Visual Integration
Re-style the admin dashboard to align with the new theme.
- **Tasks**:
  1. Redesign `src/app/admin/page.tsx` stats card grid, table headers, and state badges.
  2. Change table styling to use deep slate/black borders and bright yellow badges/action items.
- **Verification**:
  - Log in to the Admin Dashboard (or go to `/admin`) to verify bookings display.
  - Confirm booking processes work and match design rules.

## Phase 6: Final Verification & Quality Gates
- **Tasks**:
  1. Run `npm run lint` and `npm run build` to verify no TypeScript or Next.js compilation errors occur.
  2. Check color contrast ratios and keyboard focus rings.
- **Verification**:
  - Successful build output.
  - Interactive accessibility check.
