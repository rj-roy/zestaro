# Product Requirements Document: Zestaro — Restaurant Website Platform

**Version:** 1.1
**Author:** Jibon
**Status:** Draft
**Last Updated:** July 2026

---

## 1. Overview

### 1.1 Product Name
**Zestaro** — working name for the platform and customer-facing brand. Suggested domain pattern: `zestaro.com` (or local TLD); confirm availability before Phase 1 kickoff. Logo, color palette, and typography should be locked early since they cascade into the menu UI, email templates, and admin panel theming (see §10 Branding).

### 1.2 Purpose
Zestaro is a full-stack restaurant website that lets customers browse the menu, place orders (delivery/pickup), and reserve tables, while giving restaurant staff a secure admin panel to manage menu items, orders, and reservations in real time. The focus is pure functionality and security — no unnecessary bloat, no third-party CMS dependency.

### 1.3 Goals
- Give customers a fast, frictionless way to view the menu, order food, and book tables.
- Give restaurant owners/staff a reliable backend to manage operations without technical help.
- Be secure by default — protect customer data, payment flows, and admin access from common attack vectors.
- Be maintainable as a solo/small-team project (clear module boundaries, no unnecessary complexity).

### 1.4 Non-Goals
- No multi-restaurant/marketplace support (single restaurant only, v1).
- No native mobile app (responsive web only).
- No loyalty points / gamification in v1.
- No AI chatbot or recommendation engine in v1.

### 1.5 Success Metrics (v1)
- **Checkout completion rate** ≥ 70% (cart created → payment success).
- **Reservation completion rate** ≥ 80% (form started → confirmed).
- **Admin order-to-acknowledged time** < 2 minutes median (order placed → staff marks "preparing").
- **Zero P0/P1 security findings** open at launch (internal or third-party review before go-live).
- **Page load (LCP)** < 2.5s on 4G for home and menu pages.

---

## 2. Target Users

| Role | Description |
|---|---|
| **Guest/Customer** | Browses menu, places orders, books tables, optionally creates an account |
| **Registered Customer** | Has order history, saved addresses, saved payment methods |
| **Staff (Kitchen/Front-of-house)** | Views and updates order status, manages reservations |
| **Admin/Owner** | Full control — menu, pricing, staff accounts, analytics, site content |

---

## 3. Tech Stack (proposed, aligned with your existing stack)

- **Frontend:** Next.js (App Router), Tailwind CSS
- **Backend:** Express.js (separate service, ESM), Node.js
- **Database:** MongoDB (Mongoose)
- **Auth:** better-auth (session-based)
- **Payments:** Stripe (Checkout + webhooks, idempotent handling, invoice)
- **File storage:** Cloudinary or S3 for menu images
- **Hosting:** Vercel (frontend) + Railway (backend)
- **Email:** Resend or Nodemailer + transactional templates (order confirmation, reservation confirmation)

---

## 4. Functional Requirements

### 4.1 Public Website

| Feature | Description | Priority |
|---|---|---|
| Home page | Hero, featured items, hours, location, CTA to order/reserve | P0 |
| Menu page | Categorized menu (starters, mains, drinks, desserts), item detail (image, description, price, allergens, dietary tags) | P0 |
| Search & filter | Filter by category, dietary tag (veg/vegan/gluten-free), price | P1 |
| Cart | Add/remove items, adjust quantity, special instructions per item | P0 |
| Checkout | Guest checkout + logged-in checkout, delivery/pickup toggle, address input, order summary | P0 |
| Payment | Stripe Checkout integration, card + optionally cash-on-pickup | P0 |
| Order confirmation | On-screen + email confirmation with order ID and ETA | P0 |
| Order tracking | Status page (received → preparing → ready/out for delivery → completed) | P1 |
| Table reservation | Date/time/party size picker, table availability check, confirmation email | P0 |
| Contact page | Address, map embed, phone, contact form | P1 |
| About / location / hours | Static content, editable from admin | P1 |

### 4.2 Customer Account

| Feature | Description | Priority |
|---|---|---|
| Sign up / login | Email+password via better-auth, optional Google OAuth | P0 |
| Order history | Past orders with reorder button | P1 |
| Saved addresses | Multiple delivery addresses | P1 |
| Profile management | Update name, email, password, phone | P0 |
| Reservation history | View/cancel upcoming reservations | P1 |

### 4.3 Admin Panel

| Feature | Description | Priority |
|---|---|---|
| Admin login | Separate role-gated login, MFA recommended | P0 |
| Menu management | CRUD for categories and items, image upload, availability toggle (86'd items) | P0 |
| Order management | Live order queue, status updates, order details, refund trigger | P0 |
| Reservation management | View/approve/cancel reservations, table capacity settings | P0 |
| Staff accounts | Add/remove staff, role assignment (kitchen/front-desk/admin) | P1 |
| Site content | Edit hours, contact info, homepage banner/promo | P1 |
| Analytics dashboard | Daily orders, revenue, popular items (basic charts) | P2 |
| Audit log | Track admin actions (who changed what, when) | P1 (security-relevant) |

---

## 5. Non-Functional Requirements

### 5.1 Security (priority focus)

- **Authentication:** Session-based auth via better-auth; hashed + salted passwords (bcrypt/argon2 handled by better-auth); no plaintext storage anywhere.
- **Authorization:** Strict role-based access control (RBAC) — customer / staff / admin. Every API route validates the session AND the role server-side, never trust client-side role claims.
- **Session security:** HttpOnly, Secure, SameSite=Strict cookies. Session expiry + refresh handling. Ability to revoke sessions (e.g., on password change).
- **Input validation:** Server-side validation on every endpoint (e.g., Zod schemas) — never trust client input, including cart totals (recalculate prices server-side, never trust client-submitted amounts).
- **Payment security:** Stripe handles card data (PCI compliance offloaded) — never touch raw card numbers. Verify Stripe webhook signatures. Idempotency keys on order creation to prevent duplicate charges (you've already solved this pattern in Hireloop — reuse it).
- **CSRF protection:** CSRF tokens on state-changing requests if using cookie-based sessions.
- **Rate limiting:** On login, signup, checkout, and reservation endpoints to prevent brute force / abuse (e.g., express-rate-limit).
- **XSS prevention:** Sanitize any user-generated content (contact form, special instructions) before rendering; rely on React's default escaping, avoid `dangerouslySetInnerHTML`.
- **SQL/NoSQL injection prevention:** Use Mongoose query builders, never raw string interpolation into queries.
- **HTTPS everywhere:** Enforce TLS, HSTS headers.
- **Security headers:** CSP, X-Frame-Options, X-Content-Type-Options via middleware (e.g., helmet).
- **Secrets management:** All API keys/secrets in environment variables, never committed to git.
- **File upload security:** Validate file type/size for menu image uploads, scan or restrict to image MIME types only, store via signed URLs (Cloudinary/S3), never accept arbitrary file execution paths.
- **Admin route protection:** Admin panel on a separate protected route tree with its own middleware guard; consider IP allowlisting or MFA for admin/staff accounts.
- **Logging & monitoring:** Centralized error logging (e.g., Sentry), audit trail for admin actions, alerting on repeated failed logins.
- **Dependency hygiene:** Regular `npm audit` / Dependabot, pin versions, avoid unmaintained packages.

### 5.2 Performance
- Server-side rendering or static generation for menu/home pages (fast first load, good SEO).
- Image optimization (Next.js Image component, responsive sizes).
- Database indexing on frequently queried fields (order status, reservation date, menu category).
- Target: <2s initial load on 4G, <200ms API response for cart/menu reads.

### 5.3 Reliability
- Idempotent payment/order writes (no duplicate orders on refresh — same pattern as your Stripe fix in Hireloop).
- Centralized error handling middleware (`ApiError` pattern, as used in Hireloop) for consistent API error responses.
- Graceful handling of Stripe webhook retries.

### 5.4 Accessibility
- Semantic HTML, keyboard navigability, sufficient color contrast, alt text on all menu images, ARIA labels on interactive cart/checkout components.

### 5.5 SEO
- Server-rendered meta tags per page (menu items, location schema markup for local SEO), sitemap.xml, robots.txt.

---

## 6. Data Model (high-level)

- **User:** id, name, email, passwordHash (managed by better-auth), role (customer/staff/admin), addresses[], createdAt
- **MenuCategory:** id, name, order
- **MenuItem:** id, categoryId, name, description, price, imageUrl, dietaryTags[], available (boolean)
- **Order:** id, userId (nullable for guest), items[], subtotal, deliveryFee, total, status, type (delivery/pickup), stripeSessionId (unique, for idempotency), address, createdAt
- **Reservation:** id, userId (nullable for guest), date, time, partySize, tableId, status, contactInfo, createdAt
- **Table:** id, capacity, label
- **AuditLog:** id, actorId, action, targetType, targetId, timestamp

---

## 7. API Structure (Express backend, mirroring your Hireloop conventions)

```
/config        - env, db connection
/middlewares   - auth guard, role guard, error handler, rate limiter
/utils         - ApiError, response helpers
/routes        - /menu, /orders, /reservations, /auth, /admin
/controllers   - business logic per route
```

- All mutating routes require session validation via middleware.
- Admin routes require role check (`verifyAdmin` / `verifyStaff` middleware, similar to your `verifyStartupOwner` pattern).
- Order and reservation creation keyed by idempotency identifiers to prevent duplicate writes on retry/refresh.

---

## 8. Milestones (suggested phasing)

| Phase | Scope |
|---|---|
| **Phase 1 — Core** | Menu display, cart, Stripe checkout, order confirmation, basic admin (menu CRUD, order queue) |
| **Phase 2 — Accounts** | Customer auth, order history, saved addresses, reservation system |
| **Phase 3 — Admin depth** | Staff roles, audit log, analytics dashboard, reservation table management |
| **Phase 4 — Polish** | SEO, accessibility pass, performance tuning, security audit/pen-test |

---

## 9. Assumptions & Risks

| # | Item | Type | Mitigation |
|---|---|---|---|
| 1 | Single restaurant, single location at launch | Assumption | Data model (§6) avoids hard-coding multi-tenant assumptions, so a location field can be added later without a rewrite |
| 2 | Stripe is the sole payment processor | Assumption | Abstract payment logic behind a `PaymentProvider` interface so a second processor (e.g., local BD gateways like bKash/Nagad) can be added later without touching order logic |
| 3 | Solo/small team maintains this long-term | Risk | Keep the Hireloop-style modular structure (§7) so onboarding a second developer is low-friction |
| 4 | Peak-hour order volume could spike (e.g., weekend dinner rush) | Risk | Rate limiting tuned to allow legitimate bursts; load-test checkout and reservation endpoints before launch |
| 5 | Menu image uploads could be abused for storage/cost abuse | Risk | Enforce file size caps and admin-only upload access (see §5.1 File upload security) |
| 6 | No native app in v1 may push customers to third-party delivery apps instead | Risk | Keep the responsive web checkout as fast as a native app flow (few taps, saved addresses, Apple/Google Pay via Stripe if feasible) |

---

## 10. Branding (Zestaro)

- **Name usage:** "Zestaro" in the header/logo, page titles (`Zestaro | Menu`, `Zestaro | Reserve a Table`), and all transactional email subject lines.
- **Domain & email:** confirm `zestaro.com` (or best available TLD) and set up a matching sender domain (e.g., `orders@zestaro.com`) for transactional email deliverability (SPF/DKIM/DMARC configured — also an anti-spoofing measure).
- **Visual identity:** define primary/secondary colors, font pairing, and logo mark before Phase 1 UI work starts, so the menu and checkout aren't re-themed later.
- **Tone of voice:** menu descriptions, confirmation emails, and error messages should read as warm and human, not generic e-commerce boilerplate — a low-cost differentiator for a small restaurant brand.
- **Favicon / social preview:** OpenGraph image and favicon using the Zestaro mark, so shared links (e.g., a reservation link) look intentional.

---

## 11. Open Questions

- Single location or will multi-location support be needed later? (affects table/reservation schema)
- Delivery: in-house drivers or third-party integration (e.g., delivery zones by radius)?
- Do you want cash-on-pickup as a payment option alongside Stripe, or card-only? Given a Bangladesh-based launch, is a local gateway (bKash/Nagad) worth adding alongside Stripe?
- Is "Zestaro" the final name, or a placeholder — worth a quick domain/trademark availability check before it's locked into code (package name, DB name, email domain)?
