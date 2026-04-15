# Aina Productions — Setup & Deployment Guide

## ✅ Project Status: COMPLETE

Your production-level Next.js film site has been fully scaffolded with all components, pages, styling, and configurations. The project is ready for development, customization, and deployment.

---

## 🚀 Quick Start

### 1. Installation (Already Done)
Dependencies are installed via npm. If you need to reinstall:
```bash
npm install --legacy-peer-deps
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Environment Setup (`.env.local`)
Create and fill in your `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📦 What's Included

### ✨ Pages (All Built)
- ✅ **Homepage** (`/`) — Spline hero, featured films, stats, blog preview
- ✅ **Films Gallery** (`/films`) — Responsive grid with tag filtering
- ✅ **Team** (`/team`) — Team member cards with social links
- ✅ **Blog** (`/blog`) — Masonry layout for articles
- ✅ **Join** (`/join`) — Recruitment page with application form
- ✅ **Contact** (`/contact`) — Contact form with email integration

### 🧩 Components (All Built)
**Layout**
- Navbar (fixed, responsive, hamburger menu)
- Footer (3-column, social links)

**UI Components**
- GoldButton (with shimmer hover)
- SectionLabel (mono uppercase labels)
- AnimatedHeading (word-by-word reveal)
- PageTransition (fade-in wrapper)

**Home Sections**
- SplineHero (3D scene, full viewport)
- FeaturedFilms (horizontal scroll)
- StatsBanner (animated counters)
- LatestBlog (featured posts)

**Content Cards**
- FilmCard (with play overlay)
- BlogCard (masonry compatible)
- MemberCard (circular avatars)

### 🎨 Design System (Complete)
- CSS variables for colors (gold accent, dark bg, warm text)
- Typography with Bebas Neue, DM Sans, Space Mono fonts
- Grain overlay texture (SVG noise filter)
- Custom scrollbar styling
- Focus rings and accessibility standards

### 🔌 API Routes
- **POST /api/contact** — Sends emails via Resend

### 📂 CMS Setup (Schemas Ready)
- Film schema (title, thumbnail, YouTube URL, tags, etc.)
- Post schema (blog articles with portable text)
- Member schema (team profiles)

---

## 🔗 Integrations Required

### 1. **Sanity CMS Setup**

**Create a Sanity project:**
```bash
npm install -g @sanity/cli
sanity init
```

Configure with your project ID and dataset. Copy schemas from `sanity/schemas/` to your Sanity studio.

**In Vercel environment variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `SANITY_API_TOKEN` (create token in Sanity dashboard)
- `NEXT_PUBLIC_SANITY_DATASET`

### 2. **Resend Email API**

1. Sign up at [https://resend.com](https://resend.com)
2. Create an API key
3. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`
4. Update the recipient email in `app/api/contact/route.ts`:
   ```ts
   to: ['your-team@aina-productions.com'], // Change this
   ```

### 3. **Spline 3D Scene**

1. Create a scene at [https://spline.design](https://spline.design)
2. Publish and get the scene URL
3. Update `components/home/SplineHero.tsx`:
   ```tsx
   <Spline scene="https://prod.spline.design/your-scene-id" />
   ```

### 4. **Google Fonts** (Already Configured)
Fonts load automatically via `next/font/google`:
- Bebas Neue
- DM Sans
- Space Mono

---

## 📋 Customization Checklist

### Content to Replace
- [ ] Replace `/public/film1.jpg`, `/film2.jpg`, etc. with actual film thumbnails
- [ ] Replace `/public/blog*.jpg` with blog cover images
- [ ] Replace `/public/team*.jpg` with team member avatars
- [ ] Replace `/public/join-hero.jpg` with recruitment hero image
- [ ] Update team member names and roles in `app/team/page.tsx`
- [ ] Update film data with actual YouTube links
- [ ] Update social media handles in Footer and Contact page

### Code to Update
- [ ] Change company email in `/api/contact/route.ts` and Contact page
- [ ] Update social media URLs (Instagram, YouTube)
- [ ] Add real Spline scene URL to `SplineHero.tsx`
- [ ] Connect to Sanity CMS (replace mock data with queries)
- [ ] Customize colors in `app/globals.css` if desired
- [ ] Update site URL in `.env.local`

---

## 🎨 Customization Examples

### Change Accent Color (Gold → Cyan)
Edit `app/globals.css`:
```css
:root {
  --accent: #00d9ff;      /* cyan instead of gold */
  --accent-dim: #0099cc;  /* darker cyan */
}
```

### Add More Films
Edit `app/films/page.tsx` mock data array:
```ts
const allFilms = [
  {
    id: '4',
    title: 'New Film',
    thumbnail: '/new-film.jpg',
    youtubeUrl: 'https://youtube.com/watch?v=...',
    // ... other fields
  },
];
```

### Connect to Sanity CMS
Replace mock data with Sanity queries:
```ts
// In app/page.tsx or any page
import { client } from '@/sanity/client';

const films = await client.fetch(`*[_type == "film"] | order(releaseDate desc)`);
```

---

## 🏗️ Project Structure

```
aina-productions/
├── app/                  # All routes and pages
├── components/           # Reusable React components
├── sanity/              # CMS schemas & client config
├── lib/                 # Animation variants, utilities
├── public/              # Images, assets (add here)
├── .env.local           # Environment variables (secret)
├── tailwind.config.ts   # Tailwind CSS config
├── tsconfig.json        # TypeScript config
├── next.config.ts       # Next.js config (Sanity image domain)
└── package.json         # Dependencies
```

---

## 🚀 Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Aina Productions site"
git remote add origin https://github.com/yourusername/aina-productions.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project" and import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Build Command: `npm run build`
5. Output Directory: `.next`

### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_id
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_TOKEN = your_token
RESEND_API_KEY = re_xxxxx
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

### Step 4: Custom Domain
Vercel → Domains → Add custom domain (or use `aina-productions.vercel.app`)

### Step 5: Deploy
Push to `main` branch:
```bash
git push origin main
```
Vercel automatically deploys on push.

---

## 🧪 Testing

### Lint Check
```bash
npm lint
```

### Build Verification
```bash
npm run build
```

### Test Email API
Create a test request:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

---

## 📊 Performance Optimizations

- ✅ Image optimization with `next/image`
- ✅ Lazy loading (Spline uses Suspense)
- ✅ Code splitting with dynamic imports
- ✅ Tailwind CSS purged to production
- ✅ Font loading with `display: swap`
- ✅ No client-side data fetching (Server Components by default)

---

## 🔐 SEO & Metadata

Each page has `metadata` exports for:
- Title tags
- Description
- Open Graph images
- Twitter cards

---

## 🛠️ Troubleshooting

### Dependencies won't install
```bash
npm install --legacy-peer-deps
```

### Next.js commands not found
```bash
npx next --version
npx next dev
```

### TypeScript errors
```bash
npm run build  # Shows all TS errors
```

### Tailwind classes not applying
- Restart dev server: `npm run dev`
- Check `tailwind.config.ts` has correct content paths
- Verify class syntax (use `-` not `_`)

---

## 📚 Resources

- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [https://www.framer.com/motion](https://www.framer.com/motion)
- **Sanity CMS**: [https://www.sanity.io](https://www.sanity.io)
- **Resend Email**: [https://resend.com](https://resend.com)
- **Spline 3D**: [https://spline.design](https://spline.design)

---

## 🤝 Support

For questions on the site build, refer to the detailed README.md in the project root.

**Built with ❤️ by GitHub Copilot as per your specifications**
