# SPECIFICATION: GYM KO TO FITNESS GYM Rebranding & Visual Upgrade

## 1. Objective
Redesign the existing gym application to elevate its visual identity, alignment, and responsiveness. The design must feel athletic, raw, premium, and professional (avoiding soft "generative AI defaults" like generic purple gradients or bubble-rounded cards).

### Key Branding and Styling Rules:
- **Branding**: Change all instances of the gym name to **"GYM KO TO FITNESS GYM"**.
- **Color Palette**: 
  - **Dominant**: Deep pure black (`#000000`) and slate/zinc dark surfaces (`#09090b` / `#121214`).
  - **Accents (Touches of Yellow)**: Athletic high-contrast yellow (`#FACC15` / `yellow-400` or `#EAB308` / `yellow-500`). Use yellow strictly for call-to-actions, focus indicators, highlight words, and active state indicators to maintain a clean, high-impact aesthetic.
- **Avoid the "AI Aesthetic"**:
  - NO fuzzy purple/blue gradients or generic card grids with giant dropshadows.
  - Use geometric, sharp-edged, or precisely rounded corners (`rounded-sm` or `rounded-md` instead of `rounded-2xl` or `rounded-3xl` for high-performance athletic feel).
  - Use realistic, compelling copy for coach profiles and equipment.
  - Implement subtle micro-interactions (e.g., thin yellow borders lighting up on hover, slick border transitions, active state scaling).
  - Clean typographic hierarchy using bold, high-density display fonts for headers.

---

## 2. Project Structure
The structure of key files in the project remains centered on Next.js App Router:
- `src/app/globals.css`: Definitions of color tokens, root variables, custom transitions, scrollbars.
- `src/app/layout.tsx`: Root layout metadata, font configurations, and Navbar rendering.
- `src/app/page.tsx`: Home (Hero section) with updated naming, typography, background image styling, and yellow CTA buttons.
- `src/app/discover/page.tsx`: Equipment grid and booking section, incorporating yellow accent borders, premium card hover animations, and updated naming.
- `src/app/contact/page.tsx`: Owner contact page with premium profile grid, glowing border effect on hover, and contact details.
- `src/app/admin/page.tsx`: Admin dashboard with custom dark table headers, bright yellow indicators, and clean layout grids.
- `src/components/Navbar.tsx`: Navbar containing the brand name **"GYM KO TO FITNESS GYM"** with dumbbell logo, updated active state colors, and CTA buttons.
- `src/components/BookingForm.tsx`: Booking form inputs, price calculations, error messages, and submit buttons styled with the new color palette.

---

## 3. Tech Stack & Commands
- **Framework**: Next.js 16.2.9 (App Router)
- **Styling**: Tailwind CSS v4, `@import "tailwindcss"` syntax
- **Database**: Prisma Client with SQLite
- **Validation**: react-hook-form + zod

### Standard Commands:
- Start development server: `npm run dev`
- Build production build: `npm run build`
- Run linting: `npm run lint`

---

## 4. Code Style & Standards
- **TypeScript**: Strictly typed components, props interfaces, and event handlers.
- **Tailwind CSS v4 Conventions**:
  - Respect `@theme` configurations in `globals.css`.
  - Use Tailwind's utility classes consistently, avoiding inline styles or hardcoded hex colors.
  - Maintain a strict mobile-first design using standard Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- **Accessibility (WCAG 2.1 AA)**:
  - Form fields must have corresponding labels or ARIA labels.
  - Colors must maintain contrast ratios (e.g., yellow text on black background is highly readable, but verify contrast on medium/light surfaces).
  - Ensure all interactive elements have visible `:focus-visible` outlines or borders in yellow.

---

## 5. Testing & Verification Strategy
For every modified page/component, verify:
1. **Name Matching**: Ensure the brand name is consistently rendered as "GYM KO TO FITNESS GYM".
2. **Contrast & Aesthetics**: Confirm the black-and-yellow scheme is dominant, clean, and avoids generic AI gradients.
3. **Responsive Flow**: Test at `320px`, `768px`, and `1200px` widths.
4. **Keyboard Navigation**: Tab through the menu, inputs, and buttons, ensuring visible focus states.
5. **Console Check**: No runtime errors or Hydration warnings in the browser console.

---

## 6. Project Boundaries
- **Always do**: Update metadata title/description, respect theme boundaries, keep custom scrollbar colors, and ensure forms are fully validated.
- **Ask first about**: Changing database structures, adding new pages outside the existing spec, or introducing heavy animations libraries.
- **Never do**: Do not add purple/blue default styles, do not use `lorem ipsum` placeholder text, and do not remove existing backend connectivity.
