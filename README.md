# Primeweaves

Next.js website for **Primeweaves** — manufacturing, retail, and export of moringa powder and cultured ghee.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Homepage
- `/shop` — Product catalog (2 products, expandable)
- `/products/moringa-powder` — Moringa PDP
- `/products/cultured-ghee` — Ghee PDP
- `/order` — Order request form (emails the business)
- `/about` — Brand story (since 2018)
- `/bulk` — Export & wholesale inquiry
- `/contact` — Contact form

## Ordering (no cart)

Customers submit product, quantity, address, and phone on `/order`.
The request is emailed via Resend (`POST /api/order`).

Copy `.env.example` to `.env.local` and set:

```
RESEND_API_KEY=re_xxx
ORDER_TO_EMAIL=your-inbox@domain.com
ORDER_FROM_EMAIL=Primeweaves Orders <onboarding@resend.dev>
```

Without those vars, requests are still accepted and logged in the server console (useful for local testing).

## Notes

Product content and pricing are placeholders in `src/lib/products.ts` — swap images, copy, and rates when final assets are ready.
