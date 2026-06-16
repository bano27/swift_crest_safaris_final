# 🦁 Swift Crest Safaris

> **"Where comfort meets unforgettable experience."**

Kenya's premier luxury safari web application — fully production-ready with React + Vite + TypeScript frontend and Node.js + Express + MySQL backend.

---

## 📁 Project Structure

```
swift-crest-safaris/
├── frontend/               ← React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/          ← Home, Events, Bookings, About, Contact, Admin, NotFound
│   │   ├── components/     ← Navbar, Footer, CampCard, SeasonBadge, Skeleton
│   │   ├── data/           ← All destinations, camps & pricing data
│   │   ├── types/          ← TypeScript interfaces
│   │   ├── context/        ← Toast notifications
│   │   ├── utils/          ← API service layer
│   │   └── styles/         ← Global CSS (luxury dark safari theme)
│   ├── public/             ← Logo, favicon
│   ├── .env.example        ← Environment template
│   └── package.json
│
├── backend/                ← Node.js + Express API
│   ├── src/
│   │   ├── index.js        ← Main server
│   │   ├── routes/         ← bookings, contact, payments, admin, auth
│   │   └── services/       ← emailService (Nodemailer + Gmail SMTP)
│   ├── prisma/
│   │   ├── schema.prisma   ← Full database schema
│   │   └── seed.sql        ← MySQL seed data with all camps & pricing
│   ├── .env.example        ← Environment template
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MySQL 8+ installed and running
- Gmail account with 2-Step Verification enabled

### Step 1 — Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

→ Opens at **http://localhost:5173**

### Step 2 — Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
node src/index.js
```

→ API runs at **http://localhost:5000**

### Step 3 — Database

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE swift_crest_safaris;"

# Run seed (creates all tables + data)
mysql -u root -p swift_crest_safaris < backend/prisma/seed.sql
```

---

## 💳 Payment Integration

### M-Pesa (Safaricom Daraja API)
1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an app → get **Consumer Key**, **Consumer Secret**, **Passkey**
3. Add to `backend/.env`
4. Sandbox shortcode: `174379` | Test numbers: `254708374149`

### Visa / Mastercard (Stripe)
1. Create account at [stripe.com](https://stripe.com)
2. Get **Secret Key** from Dashboard → API Keys
3. Add `STRIPE_SECRET_KEY` to `backend/.env`
4. Test cards: Visa `4242 4242 4242 4242` · Mastercard `5555 5555 5555 4444`

---

## 📧 Gmail SMTP Setup

1. Go to **myaccount.google.com**
2. Security → 2-Step Verification → **App Passwords**
3. Select app: **Mail** → Generate
4. Copy the 16-character password to `GMAIL_APP_PASSWORD` in `backend/.env`

---

## 🌍 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, wildlife seasons, packages, camps, facts, testimonials, FAQ |
| `/events` | Events | Wildlife calendar 2025/26 with seasonal calendar strip |
| `/bookings` | Bookings | 3-step booking: details → payment (M-Pesa/Card) → confirmation |
| `/about` | About | Company story, values, team |
| `/contact` | Contact | Contact form + WhatsApp integration |
| `/admin` | Admin | Dashboard: stats, bookings, customers |
| `*` | 404 | Custom "Lost in the Savanna" page |

---

## 💰 Pricing Logic

| Season | Months | Description |
|--------|--------|-------------|
| 🟢 Low | April – June | Best deals, lush parks, fewer crowds |
| 🟡 Shoulder | Jan–Mar, November | Good wildlife, moderate pricing |
| 🔴 Peak | July–October, December | Great Migration, highest demand |

**Age Rules:**
- Adults (13+): Full adult rate
- Children (under 12): ~50% of adult rate
- Infants (under 2): Free

---

## 🏗️ API Endpoints

```
POST /api/bookings          Create booking + send email alerts
GET  /api/bookings          List all bookings
GET  /api/bookings/:ref     Get booking by reference
PUT  /api/bookings/:id      Update booking
DELETE /api/bookings/:id    Delete booking

POST /api/contact           Submit contact form
GET  /api/contact           List contacts (admin)

POST /api/payments/mpesa/stk     M-Pesa STK push
POST /api/payments/mpesa/callback M-Pesa Daraja callback

GET  /api/admin/stats       Dashboard statistics
GET  /api/admin/customers   Customer list

POST /api/auth/login        Admin login
POST /api/auth/verify       Verify JWT token

GET  /api/health            Health check
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```
Set environment variable: `VITE_API_URL=https://your-backend.railway.app/api`

### Backend (Railway/Render)
```bash
cd backend
# Set all .env variables in your hosting dashboard
npm start
```

---

## 📞 Contact

- **Email:** thairukibe2798@gmail.com
- **Phone:** +254 700 000 000
- **Location:** Kenyatta Avenue, Nairobi, Kenya

---

*Built with ❤️ in Kenya — Swift Crest Safaris © 2025*
