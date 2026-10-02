# PitBullTax — Offer 1 landing page

Landing page for **offer.pitbulltax.com** (IRS transcript delivery & monitoring),
built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.

Package: `pitbulltax-offer-1` · Repo: https://github.com/amirfaysal0471/PitBullTax-Offer
Sister project: `../Offer-2` (offer2.pitbulltax.com, tax resolution platform) is a separate repo.

**Live:** https://pitbulltax-offer.vercel.app

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000 (Offer 2 uses 3001)
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`,
and `npm run check` (typecheck + lint).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | Production | CRM / lead-routing webhook that receives walkthrough form submissions. Without it, production returns an error to the visitor; development only logs the lead. |
| `LEAD_WEBHOOK_SECRET` | No | Sent as `Authorization: Bearer <secret>` to the webhook. |

## Project structure

```
app/
  layout.tsx                 # fonts, metadata
  page.tsx                   # section order of the landing page
  globals.css                # design tokens & shared utility classes
  api/walkthrough/route.ts   # validates form submissions, forwards to the CRM
components/
  layout/                    # header, footer
  sections/                  # one component per page section, in page order
  forms/walkthrough-form.tsx # booking form (compact in the hero, full in #walkthrough)
  ui/                        # small shared pieces: logo, video, eyebrow
lib/content.ts               # all page copy, links and image paths
public/
  brand/                     # logo
  screens/                   # sanitized product screenshots
  steps/                     # "How it works" step images
```

Page copy lives in `lib/content.ts`; edit text there rather than in the components.

## Lead payload

`POST /api/walkthrough` forwards JSON like:

```json
{
  "source": "walkthrough",
  "firstName": "…",
  "lastName": "…",
  "email": "…",
  "phone": "…",
  "state": "…",
  "professionalType": "…",
  "comments": "…",
  "page": "offer",
  "submittedAt": "2026-10-01T12:00:00.000Z"
}
```

`source` is `hero` (short form: name, email, phone) or `walkthrough` (full form).
`page` is always `offer`, so the CRM can tell these leads apart from Offer 2 (`offer2`).

## Before launch

- Set `LEAD_WEBHOOK_URL` in the hosting environment.
- Tax subject-matter review of the transcript example codes and the CSED calculator.
- Confirm all screenshots contain demo data only.
- Replace the "Transcript request queue" screenshot when a real one is available.
