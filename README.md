# Nalin Wien

Premium Döner/Kebab restaurant website — Vienna. Monorepo: Next.js 14 (client) + Express (server) + MongoDB.

## Stack

- **Root:** Docker Compose, npm workspaces-style scripts
- **`/server`:** Node.js, Express, TypeScript, Mongoose, Nodemailer (Brevo), Helmet, CORS, rate-limit, sanitize-html. Port **4000**
- **`/client`:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React, hCaptcha. Port **3001**

## Quick start

### Local (no Docker)

1. **Env:** Copy `.env.example` to `.env` in project root (and set `BREVO_*`, `HCAPTCHA_*`, etc. as needed).
2. **Mongo:** Run MongoDB locally (e.g. port 27017).
3. **Install & run:**
   ```bash
   npm run install:all
   npm run dev:server   # in one terminal
   npm run dev:client   # in another (or use root: npm run dev with concurrently)
   ```
4. **Client:** [http://localhost:3001](http://localhost:3001)  
   **API:** [http://localhost:4000](http://localhost:4000)

### Docker

```bash
# Set env vars (e.g. BREVO_SMTP_USER, BREVO_SMTP_PASS, HCAPTCHA_SECRET, NEXT_PUBLIC_HCAPTCHA_SITEKEY)
docker-compose up --build
```

- Client: **3001**, API: **4000**, Mongo: **27017**

## Design

- **Style:** Sharp, dark, edge-to-edge. Minimal border-radius, deep black (`#0a0a0a`–`#121212`), accent **#ea580c** (burnt orange).
- **Navbar:** Fixed top, full-width, glassmorphism.
- **Hero:** Full-viewport background image (`/public/hero-bg.jpg`). Add your own high-quality image for production.
- **Sections:** Menu (from `client/data/menu.ts`), Standorte, Kontakt (form + hCaptcha), Footer with address, hours, Impressum link.

## Contact form

1. Frontend sends name, email, subject, message + hCaptcha token to `POST /api/contact`.
2. Server verifies token with hCaptcha, then sends email via Nodemailer (Brevo SMTP).
3. Set `BREVO_SMTP_USER`, `BREVO_SMTP_PASS`, `HCAPTCHA_SECRET`, and `NEXT_PUBLIC_HCAPTCHA_SITEKEY` for full flow.

## Add hero image

Place a high-quality image at **`client/public/hero-bg.jpg`** (e.g. kebab/dark food texture). If missing, the hero uses a dark background with the overlay.
