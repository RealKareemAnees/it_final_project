# Car Website Project - Developer Task Breakdown

This backlog is derived from the current User Requirements, System Requirements, and User Stories documents. It is structured as parent tasks (epics) with child tasks that can be assigned directly to developers.

## Team Distribution

| Developer | Primary Focus                             | Assigned Epics            |
| --------- | ----------------------------------------- | ------------------------- |
| DEV-1     | Frontend Core and UI Foundations          | EPIC-02, EPIC-03, EPIC-04 |
| DEV-2     | Frontend Feature Pages                    | EPIC-06, EPIC-07, EPIC-08 |
| DEV-3     | Backend, API, Database, Security          | EPIC-01, EPIC-05, EPIC-09 |
| DEV-4     | Admin Panel, QA, Cross-Cutting Compliance | EPIC-10, EPIC-11, EPIC-12 |

## Delivery Milestones

- Milestone 1: Foundation and Architecture (EPIC-01, EPIC-02)
- Milestone 2: Public Pages and Core UX (EPIC-03, EPIC-04, EPIC-06)
- Milestone 3: Auth, Car Details, Wishlist (EPIC-05, EPIC-07, EPIC-08)
- Milestone 4: Admin, Quality, Release (EPIC-09, EPIC-10, EPIC-11, EPIC-12)

## Epic and Task Tree

### EPIC-01 Project Setup and Architecture

Owner: DEV-3
Support: DEV-1, DEV-4
Traceability: NFR-1, NFR-2, NFR-4

- T1.1 (DEV-3) Create repository folder standards for frontend, backend, docs, and assets.
- T1.2 (DEV-3) Define environment configuration strategy for development and production.
- T1.3 (DEV-3) Create shared API contract document (auth, cars, admin, wishlist).
- T1.4 (DEV-1) Define reusable frontend structure (layouts, components, pages, styles).
- T1.5 (DEV-4) Create quality checklist for semantic HTML, CSS, JS behavior, and accessibility.
- T1.6 (DEV-4) Set up project board columns and task workflow (todo, in-progress, review, done).

### EPIC-02 Global Layout, Header, Footer, and Theme System

Owner: DEV-1
Support: DEV-2, DEV-4
Traceability: SR-2, SR-3, SR-7, US-005, US-006, US-007, US-015, US-016

- T2.1 (DEV-1) Implement reusable semantic page shell (header, nav, main, footer).
- T2.2 (DEV-1) Build global navigation links for all required pages.
- T2.3 (DEV-1) Implement active-link highlighting in navbar.
- T2.4 (DEV-1) Implement responsive mobile navigation with hamburger toggle under 768px.
- T2.5 (DEV-1) Build reusable footer with quick links and project info.
- T2.6 (DEV-1) Create light and dark theme token sets (colors, spacing, typography rules).
- T2.7 (DEV-1) Implement theme switch control available on all main pages.
- T2.8 (DEV-2) Ensure theme switch updates UI without full reload.
- T2.9 (DEV-2) Persist and restore theme preference using localStorage or sessionStorage.
- T2.10 (DEV-4) Validate that no flash of wrong theme appears during first paint.

### EPIC-03 Landing Page (Home)

Owner: DEV-1
Support: DEV-2, DEV-4
Traceability: SR-1, US-001, US-002, US-003, US-004

- T3.1 (DEV-1) Build hero section with car images, captions, and clickable links.
- T3.2 (DEV-1) Add introductory platform content describing website purpose and value.
- T3.3 (DEV-1) Build featured cars gallery with at least 4 cards linking to car details.
- T3.4 (DEV-1) Add multimedia block (video or audio) with accessible controls and no autoplay audio.
- T3.5 (DEV-1) Add styled icon usage in hero and feature blocks.
- T3.6 (DEV-1) Add optional image map navigation area where appropriate.
- T3.7 (DEV-2) Implement home search bar forwarding query to search page.
- T3.8 (DEV-2) Implement empty-search custom validation message.
- T3.9 (DEV-4) Performance-check landing page loading target (<2s for hero render target).

### EPIC-04 About and Contact Pages

Owner: DEV-1
Support: DEV-3, DEV-4
Traceability: SR-4, SR-5, US-008, US-009, US-010

- T4.1 (DEV-1) Build About page with project goals and capability sections.
- T4.2 (DEV-1) Build team/project information section with semantic structure.
- T4.3 (DEV-1) Build Contact page layout with contact information block.
- T4.4 (DEV-1) Implement contact/feedback form fields (name, email, message).
- T4.5 (DEV-1) Implement custom JS validation for required fields and format checks.
- T4.6 (DEV-1) Show clear field-level custom error messages.
- T4.7 (DEV-3) Connect contact form to backend endpoint or message handler.
- T4.8 (DEV-4) Validate browser-native-only validation is not relied on.

### EPIC-05 Authentication and Access Control

Owner: DEV-3
Support: DEV-1, DEV-2, DEV-4
Traceability: SR-6, FR-1, US-011, US-012, US-013, US-014

- T5.1 (DEV-1) Build signup UI with username, email, and password inputs.
- T5.2 (DEV-1) Build login UI with email and password inputs.
- T5.3 (DEV-1) Implement custom JS validation and error states for auth forms.
- T5.4 (DEV-3) Implement POST auth/register endpoint with duplicate email handling.
- T5.5 (DEV-3) Implement POST auth/login endpoint with credential verification.
- T5.6 (DEV-3) Hash and store passwords securely.
- T5.7 (DEV-3) Implement session creation, verification middleware, and logout endpoint.
- T5.8 (DEV-2) Add frontend redirect logic for restricted routes to login.
- T5.9 (DEV-2) Implement return-to-intended-page flow after successful login.
- T5.10 (DEV-4) Verify restricted pages are inaccessible after logout.

### EPIC-06 Search and Results Experience

Owner: DEV-2
Support: DEV-3, DEV-4
Traceability: SR-8, FR-2, FR-6, US-017, US-018, US-019, US-020

- T6.1 (DEV-2) Build search page layout with keyword input and filters panel.
- T6.2 (DEV-2) Implement keyword search submission and result rendering.
- T6.3 (DEV-2) Implement at least 3 filter dimensions (brand, fuel type, price range).
- T6.4 (DEV-2) Implement active-filter indicator chips.
- T6.5 (DEV-2) Add list view mode for results.
- T6.6 (DEV-2) Add grid view mode for results.
- T6.7 (DEV-2) Add detailed view mode for results.
- T6.8 (DEV-2) Persist selected view mode during session.
- T6.9 (DEV-3) Implement paginated car search API responses with metadata.
- T6.10 (DEV-2) Build pagination controls with visible current page.
- T6.11 (DEV-2) Implement helpful empty-state UI when no results are found.

### EPIC-07 Car Details and 3D Preview

Owner: DEV-2
Support: DEV-3, DEV-4
Traceability: SR-9, FR-3, FR-5, US-021, US-022, US-023

- T7.1 (DEV-2) Build car details page template with semantic sections.
- T7.2 (DEV-2) Render car specifications table (engine, fuel, year, mileage, etc.).
- T7.3 (DEV-2) Build image gallery with at least 3 images and navigation.
- T7.4 (DEV-2) Display car price clearly and consistently.
- T7.5 (DEV-2) Embed 3D viewer (iframe or model-viewer).
- T7.6 (DEV-2) Implement fallback message/UI when 3D is not supported.
- T7.7 (DEV-3) Provide car detail API with full data for details, gallery, and pricing.
- T7.8 (DEV-3) Provide comparison data endpoint (similar models and key metrics).
- T7.9 (DEV-2) Render comparison section on car details page.

### EPIC-08 Wishlist Feature

Owner: DEV-2
Support: DEV-3, DEV-4
Traceability: SR-12, FR-8, US-039, US-040, US-041, US-042

- T8.1 (DEV-2) Add Add to Wishlist action on car details page for logged-in users only.
- T8.2 (DEV-2) Hide or disable wishlist actions for non-authenticated users.
- T8.3 (DEV-3) Implement POST wishlist endpoint scoped to authenticated user.
- T8.4 (DEV-3) Implement GET wishlist endpoint scoped to authenticated user.
- T8.5 (DEV-3) Implement DELETE wishlist endpoint scoped to authenticated user.
- T8.6 (DEV-3) Prevent duplicate wishlist entries and return clear error messages.
- T8.7 (DEV-2) Build dedicated Wishlist page showing image, name, price, and details link.
- T8.8 (DEV-2) Implement remove-from-wishlist with dynamic UI update and empty-state prompt.

### EPIC-09 Backend API and Database Core

Owner: DEV-3
Support: DEV-4
Traceability: SR-10, FR-1, FR-2, FR-4, FR-6, FR-7, FR-8

- T9.1 (DEV-3) Design database schema for users, cars, categories, and wishlists.
- T9.2 (DEV-3) Add seed data strategy for initial cars and categories.
- T9.3 (DEV-3) Implement API route group for auth operations.
- T9.4 (DEV-3) Implement API route group for public car listing and details.
- T9.5 (DEV-3) Implement API route group for filtered search and pagination.
- T9.6 (DEV-3) Implement API route group for wishlist operations.
- T9.7 (DEV-3) Implement RBAC middleware (public, user, admin).
- T9.8 (DEV-3) Enforce 401 for unauthenticated protected requests.
- T9.9 (DEV-3) Enforce 403 for unauthorized admin-route requests.
- T9.10 (DEV-4) Add API error contract consistency checks.
- T9.11 (DEV-4) Add API smoke-test collection for core endpoints.

### EPIC-10 Admin Panel and Car CRUD

Owner: DEV-4
Support: DEV-2, DEV-3
Traceability: SR-11, FR-4, FR-7, US-027, US-028, US-029, US-030, US-031

- T10.1 (DEV-2) Build admin dashboard shell and navigation.
- T10.2 (DEV-2) Build car table UI with sorting and inline filtering.
- T10.3 (DEV-2) Implement CSS-styled advanced table layout with alternating rows.
- T10.4 (DEV-2) Build create-car form with required fields.
- T10.5 (DEV-2) Build edit-car form with pre-filled values.
- T10.6 (DEV-2) Add decimal-compatible price input and validation.
- T10.7 (DEV-2) Add delete action with confirmation prompt.
- T10.8 (DEV-2) Add category assignment and update controls.
- T10.9 (DEV-3) Implement admin CRUD endpoints for cars and categories.
- T10.10 (DEV-4) Validate that admin updates immediately reflect on public pages.

### EPIC-11 Cross-Cutting NFR Compliance

Owner: DEV-4
Support: DEV-1, DEV-2, DEV-3
Traceability: NFR-1 to NFR-15, US-032 to US-038

- T11.1 (DEV-1) Ensure external CSS is used as primary styling method.
- T11.2 (DEV-1) Remove/avoid inline layout styles across pages.
- T11.3 (DEV-1) Apply semantic HTML landmarks and logical heading hierarchy on all pages.
- T11.4 (DEV-1) Add alt text and accessible labels where needed.
- T11.5 (DEV-2) Implement JS/jQuery dynamic interactions without unnecessary full reloads.
- T11.6 (DEV-2) Add CSS transitions/transforms where interaction requires motion feedback.
- T11.7 (DEV-2) Ensure image links, captions, icons, and media are consistently used.
- T11.8 (DEV-2) Ensure at least one iframe-based feature is present where applicable.
- T11.9 (DEV-4) Validate at least 8 navigable pages exist.
- T11.10 (DEV-4) Validate at least 8 distinct layouts are implemented.
- T11.11 (DEV-4) Run performance checks (target under 3s per key page).
- T11.12 (DEV-4) Validate advanced components coverage (tables, image map, multimedia, iframe).

### EPIC-12 QA, UAT, and Release Readiness

Owner: DEV-4
Support: DEV-1, DEV-2, DEV-3
Traceability: All SR and US items

- T12.1 (DEV-4) Build traceability checklist mapping completed tasks to SR and US IDs.
- T12.2 (DEV-4) Create frontend test checklist for all public, user, and admin flows.
- T12.3 (DEV-4) Create backend test checklist for all API endpoints and roles.
- T12.4 (DEV-1) Fix UI defects from QA pass 1.
- T12.5 (DEV-2) Fix feature-flow defects from QA pass 1.
- T12.6 (DEV-3) Fix backend/security defects from QA pass 1.
- T12.7 (DEV-4) Execute regression pass after fixes.
- T12.8 (DEV-4) Run cross-browser and mobile responsiveness checks.
- T12.9 (DEV-4) Prepare final demo scenarios for Public User, Registered User, and Admin.
- T12.10 (DEV-4) Final sign-off: all High-priority user stories pass acceptance criteria.

## Minimum Page and Layout Checklist

Use this list to validate NFR-1 and NFR-4 before final sign-off.

- Home page
- Search results page
- Car details page
- About page
- Contact page
- Login/Signup page or popup flow page
- Wishlist page
- Admin dashboard page

## Completion Rule

A task is done only when:

- Development is complete.
- Acceptance behavior from related user stories is verified.
- Peer review is passed.
- No blocker defects remain open for that task.
