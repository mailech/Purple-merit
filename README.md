# VibeKit Studio - Full Stack Assessment

**VibeKit Studio** is a high-performance, design-heavy landing page builder designed for the "Vibe Coder" era. Build, customize, and publish vibrant mini-sites in seconds with zero code.

**Live Deployment:** [https://0kitstudio.netlify.app/](https://0kitstudio.netlify.app/)

---

## 🚀 Requirement Satisfaction Mapping

This project was built strictly according to the **Full Stack Vibe Coder Intern Assessment** guidelines.

### 1. Web Design & "Vibe" (Design-Heavy)
- **6 Vibe Presets**: Implemented Terminal Pro, Anime Cyber, Cinema Noir, Glassmorphism, Neo-Brutalist, and Modern Minimal.
- **Design Tokens**: Centralized CSS variable system (`index.css`) for consistent typography, spacing, and radius styling across all themes.
- **Micro-interactions**: Subtle hover translations, animated "typewriter" hero titles, and reactive button states.

### 2. Responsiveness (Non-Negotiable)
- **Multi-Device Preview**: The editor features a real-time width-shifting preview for Desktop (1280px), Tablet (768px), and Mobile (375px).
- **Responsive Layouts**: 1-column mobile fallbacks and grid-shifting for tablet/desktop are implemented across all 4 core block types.

### 3. Full-Stack Execution
- **Deployment**: Unified deployment on **Netlify** using a monorepo-aware `netlify.toml`.
- **Serverless API**: Backend implemented via **Netlify Functions** (`Backend/functions/vibe-api.js`).
- **Persistence**: PostgreSQL integration for Users, Pages, and View Tracking.
- **Authentication**: JWT-based session management with secure login/signup flows.

### 4. Page Builder Functionality
- **Core Sections**: Hero (with effects), Marquee, Showcase (Gallery), and Pricing tiers.
- **Editor Features**: Reordering sections, live theme switching, and auto-save indicators.
- **Slug Management**: Handles unique URL generation for published sites.

---

## 🛠️ Local Setup

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/mailech/Purple-merit.git
   cd Purple-merit
   ```

2. **Frontend Setup:**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

3. **Backend Configuration:**
   - Configure your `.env` in the `Backend` folder with your `DATABASE_URL` and `JWT_SECRET`.

---

## 🛡️ Security & Environment Variables
The following environment variables are required for full functionality in production (Netlify):
- `DATABASE_URL`: PostgreSQL connection string.
- `JWT_SECRET`: Secret key for token-based authentication.

---

## 💡 Tradeoffs & Future Improvements (Brief)
- **Tradeoff**: Used a single "Vibe API" function to keep serverless cold-starts minimal across all endpoints.
- **Improvement 1**: Add a drag-and-drop interface for section reordering.
- **Improvement 2**: Implement real image uploads to AWS S3/Cloudinary instead of URL-only inputs.
- **Improvement 3**: Expand the Theme Engine to support custom user-defined CSS tokens.
- **Improvement 4**: Add A/B testing insights to the Analytics dashboard.
- **Improvement 5**: SEO optimization for published slugs (dynamic Meta tags).

---

**Built with 💜 for Purple Merit Technologies.**
