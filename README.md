# FrameHide

Leather half cases and small camera accessories. One-person cross-border brand site.
Inquiry-based: no cart, no checkout. Orders are quoted over email / WhatsApp and paid
by Stripe link or bank transfer.

## Stack

- Next.js 15 (App Router, `src/`)
- Tailwind CSS v4
- next-intl (English default + 中文)
- Motion (scroll reveals, respects reduced motion)
- Deploy: Vercel

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
npm run build
npm run start
```

## Things you will want to change

### 1. Contact details (email + WhatsApp)
Edit [`src/lib/site.ts`](src/lib/site.ts):

- `email` — your real inbox.
- `whatsappDigits` — country code + number, digits only, no `+` or spaces
  (e.g. an Australian number `61412345678`). Leave empty to hide.
- `whatsappDisplay` — the formatted number shown on the page.

Until `whatsappDigits` is set, the WhatsApp button opens the generic wa.me page
and the display reads "WhatsApp (number coming soon)".

### 2. Site copy (both languages)
- UI strings: [`messages/en.json`](messages/en.json) and [`messages/zh.json`](messages/zh.json)
- Product copy (titles, features, specs): in the product JSON, see below.

### 3. Add a new product
1. Add the product photos to `public/assets/products/<slug>/` (compress first, keep each
   image well under 1 MB; existing ones are JPEG quality ~82, max 1800px).
2. Create `content/products/<slug>.json` (copy `x100vi-half-case.json` as a template).
   Give it a higher `order` number to control list position.
3. Register it in [`src/lib/products.ts`](src/lib/products.ts): import the JSON and add it
   to the `products` array.
4. Pages and the products list pick it up automatically.

## Assets

- `public/assets/products/` — product photos (compressed copies).
- `public/assets/lifestyle/` — Unsplash atmosphere photos, scattered one per section.
  Photographer credit is in the footer. The originals in `ref photo from open source/`
  are the source.
- `image/`, `ref photo from open source/`, `style referece/` are the original working
  folders. `style referece/` is a private mood board and must never ship.

## Design notes

- Warm cream canvas, editorial serif headings (Newsreader), grotesk body (Hanken Grotesk).
- One accent: coffee/ink for all calls to action. Olive only appears in product-colour
  context. The small red dot is the camera's shutter button, used sparingly as a motif.
- Very light film grain overlay (`.grain` in `globals.css`).
- No "Buy now" buttons anywhere. Single intent: "Request a quote" -> /contact.
