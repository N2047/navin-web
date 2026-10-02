# Personal Professional Website & Digital Identity Platform

An advanced, elegant, ultra-fast, mobile-first, bilingual (Nepali 🇳🇵 & English 🇬🇧), WCAG-accessible, full-stack personal digital identity platform powered by **Node.js, Express, React, and Prisma ORM**.

---

## 🌟 Key Features

### 1. Modern Human-Centered Aesthetic & Accessibility (WCAG 2.1 AA/AAA)
* **Bilingual Switcher**: Seamless instant toggle between **नेपाली (Nepali)** and **English** with localized translations and database content.
* **Dark / Light Mode**: Tailored HSL color palette, sleek dark mode with ambient glows and crisp light mode.
* **Accessibility Suite**:
  * Multi-step font size control (Normal, Large, Extra Large).
  * High-Contrast mode for low-vision visitors.
  * Reduced-motion query detection.
  * **Text-to-Speech (TTS)**: Web Speech API synthesis supporting spoken Nepali and English text audio playback for articles, biographies, and headings.
  * Accessible focus indicators, semantic HTML landmarks, and "Skip to main content" link.
* **Global Search (`Ctrl+K`)**: Instant categorized search across Blog posts, Portfolio projects, Experience, Education, and Achievements.

### 2. Intelligent AI Assistant ("Ask About Me")
* Floating AI Assistant that answers visitor questions about Navin's background, technical skills, featured projects, career timeline, education, and contact options.
* Answers strictly based on verified database information.
* Supports optional Google Gemini or OpenAI LLM API integration via `.env` with fallback to a built-in deterministic contextual synthesis engine.

### 3. Comprehensive Content & Portfolio Presentation
* **Hero Section**: Profile presentation, bio tagline, statistics counters, direct CV download, and social media channels.
* **About Me**: Detailed biography, personal journey, career objectives, and areas of expertise.
* **Skills**: Attractive proficiency progress bars and category matrix with proficiency levels (Beginner, Intermediate, Advanced, Expert).
* **Portfolio**: Project cards with hover effects, technology tags, live demo links, GitHub repositories, and image lightbox.
* **Experience & Education**: Interactive chronological timeline with key responsibilities, accomplishments, and degree verification.
* **Honors & Achievements**: Prestigious awards and verifiable digital certificates.
* **Full-Featured Blog**: SEO-friendly slugs, markdown reading, estimated reading times, categories, tags, social sharing (Facebook, LinkedIn, WhatsApp, X, Copy Link), and audio playback.
* **Moments Gallery**: Photo and video albums with fullscreen lightbox viewer and carousel navigation.
* **Contact Hub**: Accessible contact form with validation, anti-spam honeypot protection, database inbox, and direct contact details.
* **CV Manager**: PDF download counter and admin upload management.

### 4. Secure Administration Dashboard (`/admin`)
* **Overview & Analytics**: Live visitor metrics, daily traffic graph, device distribution (Desktop, Mobile, Tablet), browser breakdowns, and top visited pages.
* **Content Management (CRUD)**:
  * Profile, Hero & Statistics Counters
  * Skills & Categories
  * Portfolio Projects & Screenshots
  * Career Experience & Responsibilities
  * Academic Education & Degrees
  * Achievements & Certificate Documents
  * Blog Composer with Draft/Published toggles
  * Gallery Albums & Media
  * Visitor Inquiries Inbox (Mark read, mark replied, reply via email)
  * Central Media Library (upload, preview, copy CDN/local URL)
  * Curriculum Vitae (CV) PDF Manager
  * Site Settings & Custom AI Directives

---

## 🛠️ Architecture & Tech Stack

```text
personal-website/
├── backend/
│   ├── controllers/         # REST API business logic
│   ├── middleware/          # JWT Auth, Multer, Rate Limiting, Analytics
│   ├── prisma/
│   │   ├── schema.prisma    # 16 Relational Models
│   │   └── seed.js          # Realistic bilingual demo seed script
│   ├── routes/              # Express API endpoints
│   ├── uploads/             # Static file storage (PDFs, images)
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components, modals, navbar, chatbot
│   │   ├── contexts/        # Theme, Language, Accessibility, Auth, Toast
│   │   ├── layouts/         # Main public & admin dashboard layouts
│   │   ├── pages/           # Public pages & Admin management screens
│   │   ├── index.css        # Master design system & CSS variables
│   │   ├── App.jsx          # Route declarations
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .env.example
├── package.json             # Root monorepo scripts
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
* **Node.js** v18+ or v20+ or v24+
* **npm** v9+

### 2. Installation
Install all root, backend, and frontend dependencies:
```bash
npm run install:all
```
*(Or install manually in each folder: `npm install && cd backend && npm install && cd ../frontend && npm install`)*

### 3. Initialize Database & Seed Content
```bash
npm run prisma:push
npm run seed
```
This syncs the database schema and seeds realistic, authentic professional data for Navin Sharma in both English and Nepali.

### 4. Run Both Backend & Frontend Concurrently
From the root workspace directory:
```bash
npm run dev
```

* **Frontend Website**: `http://localhost:5173`
* **Backend REST API**: `http://localhost:5000`
* **Admin Portal**: `http://localhost:5173/admin/login`

---

## 🔐 Default Administrator Login

| Field | Value |
|---|---|
| **URL** | `http://localhost:5173/admin/login` |
| **Email** | `admin@example.com` |
| **Username** | `navin_admin` |
| **Password** | `Admin@12345` |

*(You can also click the **"Auto-fill Default Demo Credentials"** button on the login screen for instant one-click login).*

---

## 📡 REST API Reference

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/health` | `GET` | Public | Server uptime and health verification |
| `/api/profile` | `GET` | Public | Retrieve personal profile & social links |
| `/api/profile` | `PUT` | Admin | Update profile biography & metadata |
| `/api/skills` | `GET` | Public | List skill categories and skills |
| `/api/portfolio` | `GET` | Public | List projects with filters (category, search) |
| `/api/portfolio/:slug` | `GET` | Public | Retrieve project details & increment view count |
| `/api/experience` | `GET` | Public | List career timeline milestones |
| `/api/education` | `GET` | Public | List academic qualifications |
| `/api/achievements`| `GET` | Public | List honors and certifications |
| `/api/blog` | `GET` | Public | List published articles with pagination & search |
| `/api/blog/:slug` | `GET` | Public | Read full article with reading time |
| `/api/gallery/albums` | `GET` | Public | List media albums |
| `/api/gallery/items` | `GET` | Public | List photos and videos |
| `/api/contact` | `POST` | Public | Submit visitor inquiry (with rate limiting & honeypot) |
| `/api/cv/info` | `GET` | Public | Get CV filename and total download count |
| `/api/cv/download` | `GET` | Public | Track and download active CV PDF |
| `/api/search` | `GET` | Public | Multi-category global search |
| `/api/chatbot/ask` | `POST` | Public | Ask About Me AI grounded assistant |
| `/api/auth/login` | `POST` | Public | Admin login, returns JWT token |
| `/api/analytics/overview` | `GET` | Admin | Live visitor stats, metrics, and counters |
| `/api/media/upload`| `POST` | Admin | Upload images or documents to media manager |
| `/api/settings` | `GET` | Admin | Manage site configurations & SEO |

---

## 🌐 Production Deployment

### Database Migration from SQLite to PostgreSQL
In production, you can point to a managed PostgreSQL database (e.g. Supabase, Neon, AWS RDS, Railway):
1. In `backend/prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `DATABASE_URL` in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://username:password@db-host:5432/navin_personal_db?schema=public"
   ```
3. Run `npx prisma db push` and `node prisma/seed.js`.

### Production Build
```bash
# Build frontend static bundle into frontend/dist
npm run build:frontend

# Start backend in production
cd backend
NODE_ENV=production node server.js
```
The application is fully deployment-ready for platforms such as Render, Railway, DigitalOcean, VPS, or Vercel.
