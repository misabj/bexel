# BEXEL Growth Platform — BIM ROI Calculator & Lead Automation

A production-grade MVP web application that turns anonymous website visitors into
qualified, scored sales leads. A prospect fills an interactive **BIM ROI
calculator**, instantly receives a personalized savings estimate and a
print-ready report, and the BEXEL sales team receives a fully scored lead inside
a secure admin dashboard — with automatic hot-lead email alerts.

Built as a demo to present to BEXEL management. Every feature is fully
implemented — no stubs, no fake API calls, no TODOs.

---

## Table of contents

1. [Key features](#key-features)
2. [Tech stack](#tech-stack)
3. [How it works](#how-it-works)
4. [Project structure](#project-structure)
5. [Getting started](#getting-started)
6. [Environment variables](#environment-variables)
7. [Database setup](#database-setup)
8. [Running the app](#running-the-app)
9. [Testing & quality gates](#testing--quality-gates)
10. [ROI calculation model](#roi-calculation-model)
11. [Lead scoring model](#lead-scoring-model)
12. [Admin access](#admin-access)
13. [Deployment notes](#deployment-notes)

---

## Key features

**Public (prospect-facing)**
- Marketing landing page (hero, benefits, how-it-works, audience selector, CTA).
- 4-step interactive ROI calculator with per-step validation.
- Instant results: KPIs, charts, savings breakdown and a plain-language conclusion.
- Multi-currency support (EUR, USD, GBP, AED, SAR) — all math normalized to EUR.
- Print-friendly / "Save as PDF" report page with dedicated print CSS.
- Spam protection: honeypot field + in-memory rate limiting.

**Sales team (admin)**
- Secure, JWT-cookie authenticated admin area (edge-middleware protected).
- Dashboard with KPIs and 6 charts (leads over time, temperature/status
  distribution, savings by segment, etc.).
- Lead list with filtering, debounced search, sortable columns, pagination and
  CSV export.
- Lead detail with a transparent score breakdown, full activity timeline, status
  workflow, quick actions (mark contacted, schedule demo, send follow-up) and notes.
- Editable calculator settings — tune every ROI assumption without redeploying.
- Automatic email to the prospect on every submission and to sales on **HOT** leads.

---

## Tech stack

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| Framework      | Next.js 15 (App Router, RSC, Route Handlers)          |
| Language       | TypeScript (strict, `noUncheckedIndexedAccess`)       |
| Styling        | Tailwind CSS v3 (custom brand + accent palettes)      |
| Database / ORM | MySQL + Prisma 6                                       |
| Validation     | Zod                                                   |
| Forms          | React Hook Form + `@hookform/resolvers`               |
| Auth           | `jose` (JWT) + `bcryptjs`, HTTP-only session cookie   |
| Charts         | Recharts                                              |
| Email          | Resend (falls back to console logging in dev)         |
| Icons          | lucide-react                                          |
| Testing        | Vitest                                                |

---

## How it works

```
Prospect → ROI Calculator (4 steps)
        → POST /api/assessment
             → Zod validation + honeypot + rate limit
             → calculateRoi()   (server-side, values never trusted from client)
             → scoreLead()       (0–100 score → COLD / WARM / HOT)
             → persist Lead + Assessment + RoiResult + Activity
             → email prospect (always) + email sales (if HOT)
        → Results view + link to print-ready report
Sales team → /admin (JWT cookie, middleware-guarded)
          → dashboard, lead list, lead detail, settings
```

The ROI math and lead scoring live in dedicated, unit-tested services
(`src/lib/calculations`, `src/lib/lead-scoring`). React components never do
business math, and the API always **re-computes** results server-side so
client-supplied numbers can never be trusted.

---

## Project structure

```
prisma/
  schema.prisma            # MySQL models + enums
  seed.ts                  # 16 realistic demo leads (uses real calc + scoring)
scripts/
  hash-password.ts         # bcrypt password hasher CLI
src/
  app/
    page.tsx               # landing page
    calculator/            # ROI calculator
    report/[id]/           # print-friendly report
    admin/                 # login, dashboard, leads, lead detail, settings
    api/                   # assessment, auth, leads, dashboard, settings routes
    sitemap.ts robots.ts icon.svg not-found.tsx
  components/
    marketing/ calculator/ admin/ charts/ ui/ report/
  config/                  # assumptions, currencies, options, site copy
  lib/
    calculations/          # ROI engine
    lead-scoring/          # lead scoring engine
    validation/            # Zod schemas
    leads/                 # assessment service, queries, mutations
    auth/ db/ email/       # auth, prisma client, email service
    currency.ts utils.ts rate-limit.ts
  types/                   # shared TypeScript types
  middleware.ts            # edge auth guard for /admin
tests/                     # vitest unit + integration tests
```

---

## Getting started

### Prerequisites
- Node.js 18.18+ (Node 20+ recommended)
- A MySQL 8 server (local or hosted)

### Install

```powershell
npm install
```

`postinstall` automatically runs `prisma generate`.

---

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable              | Required | Description                                                        |
| --------------------- | -------- | ------------------------------------------------------------------ |
| `DATABASE_URL`        | ✅       | MySQL connection string, e.g. `mysql://root:<pwd>@localhost:3306/bexel_growth` |
| `APP_URL`             | ✅       | Public base URL, e.g. `http://localhost:3000`                      |
| `ADMIN_EMAIL`         | ✅       | Admin login email                                                  |
| `ADMIN_PASSWORD_HASH` | ✅       | bcrypt hash of the admin password (see below)                      |
| `AUTH_SECRET`         | ✅       | Long random string used to sign the session JWT                    |
| `EMAIL_FROM`          | ⬜       | From-address for outbound email                                    |
| `SALES_EMAIL`         | ⬜       | Where hot-lead alerts are sent                                     |
| `RESEND_API_KEY`      | ⬜       | Resend API key. **If empty, emails are logged to the console.**    |

Generate a new admin password hash any time:

```powershell
npm run hash -- "YourStrongPassword"
```

Paste the printed hash into `ADMIN_PASSWORD_HASH`.

> **You must set these yourself before running against a real database:**
> `DATABASE_URL` (with your actual MySQL password), `AUTH_SECRET`, and — if you
> want real emails — `RESEND_API_KEY`, `EMAIL_FROM`, `SALES_EMAIL`.

---

## Database setup

### 1. Create the database and a dedicated app user

So the app never needs your MySQL **root** password at runtime, create a
dedicated `bexel` user once. Run this as root (you will be prompted for your
root password — it stays hidden):

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p -e "CREATE DATABASE IF NOT EXISTS bexel_growth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; CREATE USER IF NOT EXISTS 'bexel'@'localhost' IDENTIFIED BY 'bexel_dev_pw_2026'; GRANT ALL PRIVILEGES ON bexel_growth.* TO 'bexel'@'localhost'; FLUSH PRIVILEGES;"
```

(The same statements live in [`scripts/db-setup.sql`](scripts/db-setup.sql).)

The matching connection string is already in `.env`:

```
DATABASE_URL="mysql://bexel:bexel_dev_pw_2026@localhost:3306/bexel_growth"
```

### 2. Apply the schema and seed demo data

```powershell
npm run db:push        # prisma db push — syncs the schema (no shadow DB needed)
npm run prisma:seed    # loads 16 realistic demo leads
```

> **Why `db push` and not `migrate dev`?** `prisma migrate dev` needs privileges
> to create a temporary *shadow database*, which the least-privilege `bexel` user
> intentionally doesn't have. `db push` is the right tool for local/MVP work. To
> use full migrations, grant the app user rights to create databases (or run
> migrations as root).

> If you change `.env` while `npm run dev` is running, **restart the dev server** —
> Next.js only reads environment variables at startup.

> The calculator still works even if the database is unreachable — calculator
> settings fall back to sane defaults — but submissions cannot be saved and the
> admin area requires the database.

---

## Running the app

```powershell
npm run dev      # http://localhost:3000
```

Production build:

```powershell
npm run build
npm run start
```

Available scripts:

| Script                | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `npm run dev`         | Start the dev server                       |
| `npm run build`       | `prisma generate` + production build       |
| `npm run start`       | Serve the production build                 |
| `npm run lint`        | ESLint                                     |
| `npm run typecheck`   | `tsc --noEmit`                             |
| `npm run test`        | Vitest suite                               |
| `npm run prisma:migrate` | Create/apply a dev migration            |
| `npm run prisma:deploy`  | Apply migrations in production           |
| `npm run prisma:seed`    | Seed demo data                           |
| `npm run db:push`     | Push schema without migrations             |
| `npm run hash`        | Generate a bcrypt admin password hash      |

---

## Testing & quality gates

```powershell
npm run typecheck   # ✓ passes
npm run lint        # ✓ passes
npm run test        # ✓ 29 tests
npm run build       # ✓ 23 routes
```

Tests cover the ROI engine (including negative-input protection and the
no-savings payback sentinel), lead scoring (boundary temperatures, business-email
bonus), currency normalization/round-tripping, Zod validation (honeypot, invalid
enums, negative values) and a full `validate → calculate → score` integration
test that runs without a database.

---

## ROI calculation model

All monetary inputs are normalized to **EUR** first. Savings come from four levers:

1. **Reporting** = `monthlyReportingHours × 12 × reportingReductionRate × hourlyCost`
2. **Information search** = `monthlySearchHours × 12 × searchReductionRate × hourlyCost`
3. **Avoided delays** = `weeklyDelayCost × expectedDelayWeeks × delayReductionRate`
4. **Rework** = `changeRequests × avgCost × changeReductionRate` **+**
   `annualLaborCost × duplicatedWork% × duplicatedWorkReductionRate`
   where `annualLaborCost = teamSize × 1600 h/yr × hourlyCost`

```
totalSavings = sum of the four levers (each clamped ≥ 0)
estimatedInvestment = clamp(teamSize × costPerUser × sizeMultiplier, €6,000 … €30,000)
netBenefit = totalSavings − estimatedInvestment
roiPercentage = netBenefit / estimatedInvestment × 100
paybackMonths = estimatedInvestment / totalSavings × 12   (999 sentinel if no savings)
```

Every reduction rate and the hourly cost are editable from **Admin → Settings**.

---

## Lead scoring model

A 0–100 score is built from transparent, additive rules:

| Signal                                   | Points     |
| ---------------------------------------- | ---------- |
| Project value ≥ €50M                     | +25        |
| Company size 201–500 / 500+              | +15        |
| Active projects (× 1.5, capped)          | 0–15       |
| Project duration > 18 months             | +10        |
| BIM maturity ≥ Coordinated               | +10        |
| ≥ 4 selected challenges                  | +10        |
| Business (non free-mail) email           | +10        |
| Phone number provided                    | +5         |

Temperature: **≥ 70 → HOT**, **≥ 40 → WARM**, otherwise **COLD**. HOT leads
trigger an immediate sales-notification email. The breakdown is shown to the
sales rep on the lead detail page.

---

## Admin access

Demo credentials (change before any real deployment):

- **URL:** `/admin/login`
- **Email:** `admin@bexel-demo.com`
- **Password:** `BexelDemo2026!`

The password is stored only as a bcrypt hash in `ADMIN_PASSWORD_HASH`. Rotate it
with `npm run hash -- "NewPassword"`.

---

## Deployment notes

- Set all required environment variables in your host (Vercel, Docker, etc.).
- Run `npm run prisma:deploy` during release to apply migrations.
- Provide a `RESEND_API_KEY` to send real email; otherwise messages are logged.
- Set `APP_URL` to the public origin so report links, sitemap and robots are correct.
- Rotate `AUTH_SECRET` and the admin password away from the demo values.
- Exchange rates are **static demonstration values** — wire a live FX source
  before using ROI figures commercially.
```

_This is an indicative estimate for demonstration purposes, not a financial guarantee._
