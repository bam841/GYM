# TODO List: GYM KO TO FITNESS GYM Visual Upgrade

- [x] **Phase 1: Core Design Tokens & Navigation**
  - [x] Modify `src/app/globals.css` with yellow accents, black background base, and custom transitions.
  - [x] Update metadata title in `src/app/layout.tsx` to "GYM KO TO FITNESS GYM".
  - [x] Redesign `src/components/Navbar.tsx` brand name, logo, active links, and buttons.
  - [x] Verify core phase visual integrity in browser.

- [x] **Phase 2: Home Page Redesign**
  - [x] Redesign text contents in `src/app/page.tsx`.
  - [x] Re-theme hero background overlay and main yellow CTA button.
  - [x] Update hero image using local `/gymkotolanding_page.jpg` asset.

- [x] **Phase 3: Discover Page & Booking Form Upgrade**
  - [x] Update layout and styles in `src/app/discover/page.tsx` and load local `/gymequipment.jpg` and `/gympics.jpg`.
  - [x] Style form components and price display card in `src/components/BookingForm.tsx`.
  - [x] Verify successful submission of booking API request.

- [x] **Phase 4: Contact Us Page Redesign**
  - [x] Redesign Coach profile photo frame and card layout in `src/app/contact/page.tsx`.
  - [x] Update address and communication info containers.
  - [x] Verify accessibility and hover behaviors.

- [x] **Phase 5: Admin Panel Visual Integration**
  - [x] Update stat card components and icons color scheme in `src/app/admin/page.tsx`.
  - [x] Style the bookings table with dark row borders and yellow action items.

- [x] **Phase 6: Quality Gates**
  - [x] Run `npm run lint` and resolve all style and JSX quote warnings.
  - [ ] Run `npm run build` (to be finalized by the developer who is configuring the database types).
