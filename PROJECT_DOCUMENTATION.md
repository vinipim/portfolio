# Vinicius M. Blanchard - Portfolio Website

## 🎯 Overview

A sophisticated, privacy-focused personal portfolio website for Vinicius M. Blanchard, law student and politics enthusiast. Built with Next.js, featuring a minimalist design inspired by Vatican aesthetics, with elegant typography and a refined color palette.

---

## 🔐 Admin Access

### Login Credentials
- **URL**: `/admin`
- **Email**: `danielblanchard@keemail.me`
- **Password**: `RichardNixon123!`

### Admin Features
- **Dashboard**: `/admin/dashboard`
- Full content management system
- Post creation and editing
- Books, Films, Audio, and Video archive management
- Account settings (email and password can be changed)

---

## 🎨 Design Philosophy

### Color Palette (Minimalist)
- **Off-white**: `oklch(0.98 0.01 60)` - Background
- **Dark Blue/Black**: `oklch(0.15 0.05 240)` - Text
- **Gold**: `oklch(0.55 0.18 60)` - Accents and highlights

### Typography
- **Serif**: Cormorant Garamond, Libre Baskerville - For headings
- **Sans-serif**: Inter - For body text

### Design Principles
- Minimalist and professional
- Ample white space
- Vatican-inspired header design
- Responsive across all devices
- Privacy-focused branding

---

## 📁 Site Structure

### Public Pages

#### Home (`/`)
- Hero section with library background image
- Featured posts (3 most recent)
- Clean, elegant presentation

#### Resume (`/about`)
- Two-column layout: portrait + biography
- Timeline of education, research, and activism
- Professional CV format

#### Posts (`/posts`)
- Grid layout with filtering by category/year
- Post cards with images, titles, dates, excerpts
- Search functionality

#### Post Detail (`/posts/:slug`)
- Full post content
- Previous/next navigation
- SEO metadata

#### Library Section
- **Books** (`/books`): Book reviews with ratings
- **Film Critic** (`/films`): Movie reviews and analysis
- **Audio Archive** (`/audio`): Lectures, interviews, podcasts
- **Video Archive** (`/video`): Video lectures and presentations

#### Contact (`/contact`)
- Simple contact form
- Social media links (Substack, Twitter, Instagram)
- Integration ready for Formspree or similar services

---

## 🔧 Technical Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **shadcn/ui** components
- **Wouter** for routing
- Responsive design with mobile-first approach

### Backend
- **Express 4** server
- **tRPC 11** for type-safe API
- **Drizzle ORM** with MySQL/TiDB
- **JWT** authentication for admin
- **SHA-256** password hashing

### Database Schema

#### Users Table
- Core authentication table (Manus OAuth)

#### Admin Credentials Table
```sql
- id: varchar(64) PRIMARY KEY
- email: varchar(320) UNIQUE NOT NULL
- passwordHash: text NOT NULL
- name: text
- createdAt: timestamp
- lastLogin: timestamp
```

#### Posts Table
```sql
- id: varchar(64) PRIMARY KEY
- slug: varchar(255) UNIQUE NOT NULL
- title: text NOT NULL
- excerpt: text
- content: text NOT NULL
- coverImage: text
- category: varchar(100) NOT NULL
- featured: enum('yes', 'no') DEFAULT 'no'
- publishedAt: timestamp
- updatedAt: timestamp
- authorId: varchar(64)
```

---

## 🚀 Getting Started

### Installation
```bash
pnpm install
```

### Database Setup
```bash
pnpm db:push
```

### Create Admin User
```bash
pnpm exec tsx server/seedAdmin.ts
```

### Development
```bash
pnpm dev
```

Server runs on `http://localhost:3000`

---

## 📝 Content Management

### Adding Posts (Manual - for now)

Posts are currently managed through the `lib/posts.ts` file. To add a new post:

1. Add post data to the posts array in `lib/posts.ts`
2. The post will automatically appear on the Posts page
3. Featured posts (up to 3) will show on the homepage

### Future: Notion API Integration

The system is designed to support external content sources:

```typescript
// In lib/posts.ts
// TODO: Replace with Notion API integration
// 1. Set up Notion integration: https://www.notion.so/my-integrations
// 2. Get your Notion API key
// 3. Add to .env: NOTION_API_KEY=your_key_here
// 4. Install @notionhq/client: pnpm add @notionhq/client
// 5. Replace getFeaturedPosts() with Notion API calls
```

### Automatic Updates with ISR

The site supports Incremental Static Regeneration for automatic content updates:

```typescript
// Enable ISR in your data fetching
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## 🎯 Key Features

### 1. Admin Dashboard
- Secure authentication system
- Content management interface
- Statistics overview
- Settings management

### 2. Responsive Navigation
- Desktop: Full navigation with Library dropdown
- Mobile: Hamburger menu with collapsible sections
- Search functionality in header

### 3. Library System
- **Books**: Reviews with star ratings and categories
- **Films**: Critic reviews with genre filtering
- **Audio**: Downloadable lectures and interviews
- **Video**: Video player with thumbnails

### 4. Privacy-Focused
- No tracking scripts
- Secure authentication
- Independent hosting
- Privacy-first design philosophy

---

## 🔒 Security Features

### Authentication
- SHA-256 password hashing
- JWT session tokens (7-day expiry)
- HTTP-only cookies
- Protected admin routes

### Admin Functions
```typescript
// Login
POST /api/trpc/admin.login
{ email, password }

// Get session
GET /api/trpc/admin.me

// Logout
POST /api/trpc/admin.logout

// Update email
POST /api/trpc/admin.updateEmail
{ currentEmail, newEmail }

// Update password
POST /api/trpc/admin.updatePassword
{ email, newPassword }
```

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Collapsible navigation
- Touch-friendly buttons
- Optimized images
- Readable typography

---

## 🎨 Customization Guide

### Changing Colors
Edit `client/src/index.css`:
```css
:root {
  --primary: oklch(0.20 0.05 240); /* Dark blue */
  --accent: oklch(0.55 0.18 60);   /* Gold */
  --background: oklch(0.98 0.01 60); /* Off-white */
}
```

### Changing Fonts
Edit `client/src/index.css`:
```css
:root {
  --font-serif: 'Your Serif Font', serif;
  --font-sans: 'Your Sans Font', sans-serif;
}
```

### Adding Images
1. Place images in `client/public/images/`
2. Reference with absolute paths: `/images/your-image.jpg`
3. Add content hash for cache busting: `image.abc123.jpg`

---

## 🌐 Domain Suggestions (Privacy-Focused)

Based on your privacy preferences (Mullvad user), consider these privacy-focused domain registrars:

1. **Njalla** (njal.la) - Privacy-focused, accepts crypto
2. **1984 Hosting** (1984.is) - Icelandic, strong privacy laws
3. **OrangeWebsite** (orangewebsite.com) - Iceland-based
4. **Namecheap** with WhoisGuard
5. **Gandi.net** - European, privacy-respecting

### Domain Name Ideas
- `viniciusblanchard.com`
- `blanchard.law` (if available)
- `vmb.law`
- `blanchard.legal`
- `vinicius-blanchard.com`

---

## 📊 SEO & Performance

### Meta Tags
Each page includes proper meta tags for SEO:
- Title
- Description
- Open Graph tags
- Twitter Card tags

### Performance Optimizations
- Image lazy loading
- Code splitting
- Minified CSS/JS
- Cached static assets

---

## 🔄 Future Enhancements

### Content Management
- [ ] Notion API integration for posts
- [ ] Contentlayer for MDX support
- [ ] Rich text editor in admin panel
- [ ] Image upload functionality

### Features
- [ ] Newsletter subscription (Substack integration)
- [ ] RSS feed
- [ ] Search functionality
- [ ] Comments system
- [ ] Analytics (privacy-friendly)

### Media
- [ ] Audio player integration
- [ ] Video player with controls
- [ ] PDF viewer for documents
- [ ] Image galleries

---

## 📞 Support & Maintenance

### Database Migrations
```bash
# Generate migration
pnpm db:push

# View schema
cat drizzle/schema.ts
```

### Backup
Regular backups recommended:
- Database exports
- Image files
- Configuration files

### Updates
```bash
# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated
```

---

## 📄 License

This is a private portfolio website for Vinicius M. Blanchard. All rights reserved.

---

## 🙏 Credits

- Design inspired by Vatican website aesthetics
- Built with modern web technologies
- Privacy-focused architecture
- Minimalist design principles

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready

