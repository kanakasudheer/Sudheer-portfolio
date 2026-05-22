# Kanaka Sudheer — Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/img/          # Static assets (avatar SVG, etc.)
├── components/          # React components
│   ├── Navbar.tsx       # Fixed navigation with smooth scroll
│   ├── HeroSection.tsx  # Full-viewport hero with avatar & social
│   ├── AboutSection.tsx # Bio & personal info cards
│   ├── SkillsSection.tsx# Tech stack categories
│   ├── ExperienceSection.tsx  # Work experience (numbered)
│   ├── ServicesSection.tsx    # Services offered (hardcoded)
│   ├── ProjectsSection.tsx    # Featured projects (sorted)
│   ├── ProjectCard.tsx  # Sticky project card component
│   ├── TestimonialsSection.tsx # Infinite marquee testimonials
│   ├── SocialLinks.tsx  # Reusable social link pills
│   └── Footer.tsx       # 3-column footer with contact
├── data/
│   └── portfolio.json   # All site content (edit this!)
├── hooks/
│   └── usePortfolio.ts  # Typed data hook
├── types/
│   └── portfolio.ts     # TypeScript interfaces
├── App.tsx              # Main layout
├── main.tsx             # Entry point
└── index.css            # Tailwind + custom styles
```

## ✏️ Editing Content

All content is managed through `src/data/portfolio.json`. Edit this file to update:

- **Profile**: Name, tagline, bio, social links, avatar path
- **Skills**: Add/remove categories and tech items
- **Experience**: Add work history entries with highlights
- **Projects**: Add project entries (supports optional image paths)
- **Education**: List your academic background
- **Testimonials**: Add quotes with avatar colors

### Adding Images

1. Place project images in `public/projects/` (referenced as `/projects/your-image.png`)
2. Place avatar SVG in `src/assets/img/` (or update `avatarSvg` path in JSON)
3. The site automatically falls back to a dark placeholder when images are missing

### Styling

- **Colors**: Edit `@theme` in `src/index.css` for brand colors
- **Font**: Kanit from Google Fonts (loaded in `index.html`)
- **Animations**: Framer Motion variants in each component

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## 🎨 Design

- Dark theme (#0C0C0C background)
- Chrome/silver gradient headlines
- Purple-magenta-orange accent gradients
- Dark-on-dark cards with subtle borders
- Sticky project cards with hover effects
- CSS-only testimonial marquee
- Fully responsive (mobile-first)
