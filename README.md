# Aina Productions — Full-Stack Film Production Website

A production-level short film showcase and community filmmaking platform built with Next.js 14, Tailwind CSS, Framer Motion, and Sanity CMS.

## 🎬 Features

- **Cinematic Hero**: Full-viewport Spline 3D scene with animated scroll indicator
- **Film Gallery**: Responsive grid with tag filtering and hover animations
- **Team Showcase**: Circular member cards with social links and bio sections
- **Blog Section**: Masonry layout for behind-the-scenes stories
- **Recruitment**: Open roles showcase with application form powered by React Hook Form
- **Contact Form**: Minimalist two-column layout with email integration via Resend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: ISR (Incremental Static Regeneration) with Sanity CMS
- **Animations**: Staggered reveals, scroll-triggered animations, and hover effects with Framer Motion

## 🏗️ Tech Stack

| Layer              | Technology                     |
| ------------------ | ------------------------------ |
| Framework          | Next.js 14 (App Router)        |
| Language           | TypeScript                     |
| Styling            | Tailwind CSS v3                |
| Animation          | Framer Motion v11              |
| 3D Graphics        | Spline via @splinetool/react   |
| Headless CMS       | Sanity v3                      |
| Forms              | React Hook Form                |
| Email API          | Resend                         |
| Icons              | Lucide React                   |
| Fonts              | Google Fonts (via next/font)   |
| Deployment         | Vercel                         |

## 📁 Project Structure

```
aina-productions/
├── app/
│   ├── layout.tsx              # Root layout with fonts + navbar + footer
│   ├── globals.css             # CSS variables, grain overlay, scrollbar
│   ├── page.tsx                # Landing page
│   ├── films/page.tsx          # Films gallery with filtering
│   ├── team/page.tsx           # Team/about section
│   ├── blog/page.tsx           # Blog masonry layout
│   ├── join/page.tsx           # Recruitment page with form
│   ├── contact/page.tsx        # Contact form page
│   └── api/contact/route.ts    # Email sending endpoint
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed navbar with mobile menu
│   │   └── Footer.tsx          # 3-column footer
│   ├── home/
│   │   ├── SplineHero.tsx      # 3D hero section
│   │   ├── FeaturedFilms.tsx   # Horizontal film scroll
│   │   ├── StatsBanner.tsx     # Animated stats counter
│   │   └── LatestBlog.tsx      # Featured posts grid
│   ├── films/
│   │   └── FilmCard.tsx        # Film card with play overlay
│   ├── blog/
│   │   └── BlogCard.tsx        # Blog post card
│   ├── team/
│   │   └── MemberCard.tsx      # Team member profile card
│   └── ui/
│       ├── GoldButton.tsx      # CTA button with shimmer
│       ├── SectionLabel.tsx    # Uppercase section label
│       ├── AnimatedHeading.tsx # Word-by-word reveal heading
│       └── PageTransition.tsx  # Page entry animation wrapper
├── sanity/
│   ├── sanity.config.ts        # Sanity studio config
│   ├── client.ts               # Sanity client instance
│   └── schemas/
│       ├── film.ts             # Film document schema
│       ├── post.ts             # Blog post schema
│       └── member.ts           # Team member schema
├── lib/
│   └── variants.ts             # Framer Motion animation variants
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.local                  # Environment variables template
```

## 🎨 Design System

### Color Palette (CSS Variables)

```css
--bg:         #0a0a0a;    /* near-black background */
--surface:    #111111;    /* card/panel surfaces */
--border:     #1f1f1f;    /* subtle borders */
--text:       #f0ede6;    /* warm off-white primary text */
--muted:      #6b6b6b;    /* secondary/metadata text */
--accent:     #e8c547;    /* cinematic gold accent */
--accent-dim: #a88a2a;    /* dimmed gold for hovers */
--red:        #c0392b;    /* dramatic red for tags/labels */
```

### Typography

- **Headings**: Bebas Neue (tracked wide, 0.05em letter-spacing)
- **Body**: DM Sans (16px, 1.7 line-height)
- **Labels**: Space Mono (12px, 0.12em tracking, uppercase)

### Atmospheric Effects

1. SVG noise grain overlay (0.035 opacity)
2. Subtle vignette gradients on hero sections
3. Custom scrollbar (gold thumb, dark track)
4. Smooth focus rings on interactive elements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity account and project
- Resend account (for email)
- Spline account (for 3D scenes)

### Installation

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Configure Environment** (`.env.local`)
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   RESEND_API_KEY=your_resend_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Access Sanity Studio**
   Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## 📚 Key Components

### SplineHero.tsx
- Full-viewport 3D scene with Spline
- Animated title, subtitle, and CTA buttons
- Scroll indicator with infinite loop animation
- Suspense fallback with shimmer skeleton

### FeaturedFilms.tsx
- Horizontal scroll container (desktop)
- Responsive grid (mobile)
- Mock data (replace with Sanity queries)
- Staggered reveal animation on scroll

### StatsBanner.tsx
- Animated counter hooks
- Triggers when section enters viewport
- 4-column stats grid with gold numbers

### Navbar.tsx
- Fixed positioning with blur backdrop
- Sticky scroll behavior (shrinks on scroll)
- Mobile hamburger with staggered menu reveal
- Active link underline animation

### GoldButton.tsx
- Gold border with shimmer hover effect
- Supports `href` (Link) or `onClick` (button)
- Accessible with aria-labels
- Scale animations on hover/tap

## 🔌 API Routes

### POST /api/contact

Sends contact form emails via Resend.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Director",
  "message": "I'd like to collaborate..."
}
```

**Response**:
```json
{ "success": true }
```

## 🎬 Animations

All animations use Framer Motion with these core variants:

- **fadeUp**: Opacity fade + upward slide (0.6s)
- **staggerContainer**: Staggered children with 0.12s delay
- **scaleIn**: Opacity + scale (0.5s ease-out)

Animations trigger on scroll using `useInView` with `once: true` for performance.

## 📊 Performance Optimizations

- Image optimization with `next/image` + `sizes` prop
- Sanity queries use ISR with `revalidate: 60`
- No client-side data fetching in pages (Server Components by default)
- Code splitting with dynamic imports
- Font display set to `swap` for web fonts
- Tailwind CSS purged to production bundle

## 🌐 Deployment to Vercel

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   In Vercel dashboard: Settings → Environment Variables
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Configure Custom Domain**
   Vercel dashboard: Settings → Domains

5. **Enable Sanity Studio** (optional)
   Create `app/studio/[[...tool]]/page.tsx` with embedded Studio widget

## 📝 Sanity Schemas

### Film
```ts
- title: string
- slug: slug
- thumbnail: image
- youtubeUrl: url
- description: text
- releaseDate: date
- duration: string
- tags: array[string]
- featured: boolean
```

### Post
```ts
- title: string
- slug: slug
- coverImage: image
- publishedAt: datetime
- excerpt: text
- body: array[block] (Portable Text)
- author: reference → member
```

### Member
```ts
- name: string
- slug: slug
- role: string
- avatar: image
- bio: text
- instagramUrl: url
- order: number
```

## ✅ Accessibility

- Semantic HTML throughout
- ARIA labels on all interactive elements
- Focus rings with gold color accent
- Keyboard navigation support
- Color contrast meets WCAG AA standards

## 📱 Responsive Breakpoints

Uses Tailwind's default breakpoints:
- Mobile: default
- Tablet: `sm` (640px), `md` (768px)
- Desktop: `lg` (1024px), `xl` (1280px)

## 🤝 Contributing

To contribute:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes with descriptive messages
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary to Aina Productions. All rights reserved.

## 🙋 Support

For questions or issues, reach out to: **hello@aina-productions.com**

---

**Built with ❤️ by Aina Productions**
