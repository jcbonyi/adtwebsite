# ADT Insurance Website

Modern claims-first marketing website with:

- Conversion-focused multi-step lead forms
- Backend lead routing (email + CRM + Google Sheets webhooks)
- GA4 and Meta Pixel tracking hooks
- SEO landing pages and insights/blog scaffolding
- Claims guide, resources hub, and case-study pages
- CMS scaffold via Decap (`admin/`)

## Setup

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `.env.example` to `.env`
3. Run site and API:
   - `npm run dev`
4. Open:
   - `http://localhost:3000`

## Lead Delivery Flow

`/api/leads/quote`, `/api/leads/claim`, and `/api/leads/status-check` submit to:

- Local backup file: `data/leads.ndjson`
- Resend email (if configured)
- CRM webhook (if configured)
- Google Sheets webhook (if configured)

## Production Hardening

- Honeypot bot trap fields are enforced server-side
- Minimum human fill-time check (`form-loaded-at`)
- In-memory per-IP rate limiting on lead endpoints
- Server-side input sanitization and field validation
- Optional Cloudflare Turnstile verification
- Optional origin allowlist for lead endpoints
- Security headers on all responses
- Tunable limits via `.env`:
  - `RATE_LIMIT_WINDOW_MS`
  - `RATE_LIMIT_MAX_REQUESTS`
  - `MAX_FIELD_LENGTH`
  - `ALLOWED_ORIGINS`
  - `TURNSTILE_SECRET_KEY`

## Blog/CMS Flow

- Source markdown posts in `content/insights/`
- Build JSON feed with `npm run build:blog`
- Blog pages:
  - `blog.html`
  - `blog-post.html?slug=...`
- CMS scaffold:
  - `admin/index.html`
  - `admin/config.yml`

## Analytics

Update placeholders in `analytics-config.js`:

- `window.ADT_ANALYTICS.ga4MeasurementId`
- `window.ADT_ANALYTICS.metaPixelId`
- `window.ADT_SECURITY.turnstileSiteKey`

Tracked events include CTA clicks, template picks, quote submissions, claim submissions, status update requests, and errors.

Standard events now include:

- `form_start`
- `cta_click`
- `whatsapp_click`
- `file_download`
- `generate_lead`
