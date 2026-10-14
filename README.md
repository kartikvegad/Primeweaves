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
Contact, bulk, and newsletter forms use the same delivery.
Each submission is emailed through Google Workspace SMTP to
admin@primeweaves.com, sales@primeweaves.com, and info@primeweaves.com.

Copy `.env.example` to `.env.local` and set:

```
GOOGLE_SMTP_USER=info@primeweaves.com
GOOGLE_SMTP_APP_PASSWORD=your-google-app-password
```

Create the app password in the info@ Google account:
Security → 2-Step Verification → App passwords.
The mailbox must be allowed to send via Gmail SMTP.

Without those vars, the forms return an error instead of pretending the message was sent.

## Notes

Product content and pricing are placeholders in `src/lib/products.ts` — swap images, copy, and rates when final assets are ready.
