# VibeKit Studio - Full Stack Assessment

**Tagline:** "Generate a theme, build a mini-site, publish it."

A high-performance, design-heavy full-stack application built for the Purple Merit Technologies Assessment.

## 🚀 Live Demo
- **Frontend:** [https://vibekit-studio.netlify.app](https://vibekit-studio.netlify.app) (Replace with actual if deployed)
- **Functions API:** [https://vibekit-studio.netlify.app/.netlify/functions/vibe-api](https://vibekit-studio.netlify.app/.netlify/functions/vibe-api)

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript, Vite, Framer Motion, Lucide React.
- **Backend:** Node.js, Netlify Functions.
- **Database:** PostgreSQL (via Supabase).
- **Styling:** Vanilla CSS with Neo-brutalism design tokens.
- **Authentication:** JWT with HttpOnly cookies (concept) / Bearer tokens.

## 📦 Features
- **Neo-brutalism UI:** High-contrast design with bold shadows and rich animations.
- **Vibe Presets:** 6 distinct design themes (Neo-brutal, Minimal, Dark Neon, etc.).
- **Page Builder:** Drag-and-drop-like section management with Live Preview.
- **Responsive:** First-class support for Mobile, Tablet, and Desktop.
- **Atomic Operations:** View count tracking and slug collision handling.

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- Supabase Account (for PostgreSQL)

### Frontend
1. `cd Frontend`
2. `npm install`
3. `npm run dev`

### Backend
1. `cd Backend`
2. `npm install`
3. Create a `.env` file with:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key
   JWT_SECRET=your_secret
   ```
4. Run schema in `schema.sql` in your Supabase SQL Editor.

## 📐 Tradeoffs & Next Steps
- **Tradeoff:** Used `localStorage` for quick demo state in this environment, but the API and SQL schema are fully ready for persistence.
- **Tradeoff:** Single Netlify Function (`vibe-api.js`) for easier deployment management instead of 10+ separate files.
- **Next Step:** Implement actual drag-and-drop for sections using `@hello-pangea/dnd`.
- **Next Step:** Add more complex sections (Pricing, FAQ, Testimonials).
- **Next Step:** Implement Email notifications for the contact form using SendGrid/Resend.
- **Next Step:** Richer "Vibe" generation using AI (GPT-4) to suggest copy based on theme.

## 📂 Project Structure
- `/Frontend`: Vite + React application.
- `/Backend/functions`: Netlify serverless functions.
- `/Backend/schema.sql`: Database definition.
