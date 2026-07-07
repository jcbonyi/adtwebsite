# ADT Africa Insurance Brokers — Premium Insurance Platform

Kenya's claims-first insurance brokerage website. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

**Brand promise:** *Claims Before Sales* — We don't just sell insurance. We help you recover when the unexpected happens.

## Features

### Marketing & Conversion
- Premium homepage with hero video, glassmorphism stats, and dynamic trust indicators
- 17 insurance product cards with dedicated SEO landing pages
- Claims-first section with process timeline
- Progressive 4-step quote form with completion progress
- Sticky "Get a Quote in 30 minutes" widget
- WhatsApp floating button with instant quote, claims, and callback actions
- Client testimonials (written, corporate, video-ready)

### Tools & Intelligence
- **Insurance Calculators:** Motor premium, medical, retirement planning, education savings
- **Quote Comparison Engine:** Side-by-side premiums, benefits, excess, exclusions
- **Claims Tracker:** Real-time status by claim number + phone
- **AI Insurance Advisor:** OpenAI/Gemini-powered with local knowledge fallback
- **ADT Knowledge Hub:** Searchable blog with categories, related articles, FAQ schema

### Customer Portal (Supabase)
- JWT authentication with magic link support
- View policies, track claims, download documents
- Policy renewals and change requests (schema ready)

### SEO & Performance
- Dynamic meta titles/descriptions per page
- JSON-LD: InsuranceAgency, LocalBusiness, FAQ, Article schemas
- Dynamic XML sitemap and robots.txt
- Server Components, optimized static generation
- Target: Lighthouse 95+ (mobile-first, fast loading)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animation | Framer Motion |
| Auth & DB | Supabase (PostgreSQL, JWT) |
| AI | OpenAI GPT / Google Gemini |
| CDN | Cloudflare (production) |

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   copy .env.example .env
   ```

3. Configure `.env` (minimum for local dev):
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
   - Optional: `OPENAI_API_KEY` or `GEMINI_API_KEY` for AI advisor
   - Optional: Supabase keys for customer portal

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup (Customer Portal)

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Add keys to `.env`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## Lead Delivery

`/api/leads/quote` and `/api/leads/claim` submit to:
- Local backup: `data/leads.ndjson`
- Resend email (if `RESEND_API_KEY` configured)
- CRM webhook (if `CRM_WEBHOOK_URL` configured)
- Google Sheets webhook (if configured)

## Blog / Knowledge Hub

- Source markdown: `content/insights/`
- Build JSON feed: `npm run build:blog`
- Served at `/knowledge-hub`

## Legacy Site

The original static HTML site files remain in the repo root for reference. The Next.js app is now the primary site. To run the legacy Express server: `npm run legacy:server`

## Production Deployment

Deploy to Vercel, Cloudflare Pages, or any Node.js host:

```bash
npm run build
npm start
```

Configure environment variables in your hosting dashboard. Point `adtinsurance.co.ke` DNS to your deployment with Cloudflare CDN for edge caching.

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Premium homepage |
| `/insurance/[slug]` | SEO product landing pages |
| `/knowledge-hub` | Insurance learning centre |
| `/calculators` | Premium & planning calculators |
| `/compare-quotes` | Quote comparison engine |
| `/claims-tracker` | Claim status lookup |
| `/portal` | Customer self-service portal |
| `/api/ai/advisor` | AI insurance assistant |
