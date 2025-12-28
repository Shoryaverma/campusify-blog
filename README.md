# Campusify Blog - Full Stack Developer Assignment

A dynamic, SEO-optimized blog landing page built with Next.js 14 that fetches content from WordPress API, cleans CSS/junk content, and renders it with excellent performance and SEO.

## 🚀 Features

- **Dynamic Blog Pages**: SEO-friendly URLs using slugs (e.g., `/data-driven-decisions-made-easy-with-campusify`)
- **Content Cleaning**: Removes inline CSS, style tags, and unnecessary classes while preserving semantic HTML
- **SEO Optimized**: Dynamic meta tags, Open Graph tags, canonical URLs for each page
- **Performance First**: Static Site Generation (SSG), lazy-loaded images, optimized assets
- **Fully Responsive**: Mobile-first design that works on all devices
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm

## 🛠️ Setup Instructions

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd Blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
Blog/
├── app/                      # Next.js 14 App Router
│   ├── [slug]/              # Dynamic blog page route
│   │   └── page.tsx         # Individual blog post page
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home page (blog listing)
├── lib/
│   ├── api.ts               # WordPress API utilities
│   └── contentCleaner.ts    # Content sanitization logic
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🧹 Content Cleaning Logic Explanation

The content cleaning process is implemented in `lib/contentCleaner.ts` and follows a two-pass approach:

### Approach

1. **DOMPurify Sanitization (First Pass)**
   - Uses `isomorphic-dompurify` library for robust HTML sanitization
   - Removes `<style>` tags and inline `style` attributes
   - Removes `class` attributes (unnecessary CSS classes)
   - Removes `<script>` tags for security
   - Allows only semantic HTML elements (headings, paragraphs, lists, images, links, tables, etc.)
   - Preserves essential attributes (`href`, `src`, `alt`, `title`, `id`)

2. **Regex Cleanup (Second Pass - Safety Net)**
   - Removes any remaining `<style>` tags using regex
   - Removes any remaining inline `style` attributes
   - Removes `class` attributes
   - Converts relative image URLs to absolute URLs (for proper image loading)
   - Adds `loading="lazy"` attribute to all images for performance
   - Removes data attributes that might contain junk
   - Cleans up whitespace and empty paragraphs

### Why This Approach?

- **DOMPurify**: Industry-standard library that handles edge cases and security concerns
- **Regex Fallback**: Ensures nothing is missed, especially for edge cases
- **Semantic Preservation**: Keeps meaningful HTML structure (h1-h6, p, ul, ol, img, a, etc.)
- **Security**: Prevents XSS attacks by removing script tags and dangerous attributes

### Example Transformation

**Before (from WordPress API):**
```html
<div class="wp-block-group" style="margin: 20px; padding: 10px;">
  <p class="has-large-font-size" style="color: #333;">
    Content here
  </p>
  <style>
    .custom-class { color: red; }
  </style>
</div>
```

**After (cleaned):**
```html
<div>
  <p>Content here</p>
</div>
```

## ⚡ Performance Optimization Approach

### 1. Static Site Generation (SSG)
- Uses Next.js `generateStaticParams()` to pre-render all blog pages at build time
- Pages are served as static HTML, resulting in instant load times
- API data is revalidated every hour (`revalidate: 3600`)

### 2. Image Optimization
- All images use `loading="lazy"` attribute for lazy loading
- Images are served from the original domain (campusify.io) with proper sizing
- Next.js Image optimization can be added for further optimization if needed

### 3. Code Optimization
- Minimal JavaScript bundle size
- Server-side rendering for initial page load
- No client-side JavaScript required for content rendering
- Efficient API calls with proper caching headers

### 4. CSS Optimization
- Tailwind CSS with purging unused styles
- Minimal custom CSS
- Inline critical CSS (handled by Next.js)

### 5. Asset Optimization
- Font optimization with `next/font` (Inter font)
- Proper caching strategies
- Gzip/Brotli compression (handled by hosting platform)

## 🔍 SEO Implementation Details

### Dynamic Meta Tags
Each blog page includes:
- **Title Tag**: `{Page Title} | Campusify Blog`
- **Meta Description**: Extracted from excerpt or first 160 characters of content
- **Canonical URL**: `https://github.com/Shoryaverma/campusify-blog/{slug}`
- **Open Graph Tags**:
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image` (if available from Yoast)
  - `og:type`: article
  - `og:site_name`: Campusify Blog
- **Twitter Card Tags**: Summary with large image

### Implementation
SEO metadata is generated dynamically in `app/[slug]/page.tsx` using Next.js `generateMetadata()` function. This ensures:
- Each page has unique, relevant metadata
- Metadata is generated at build time (SSG)
- Proper semantic HTML structure (h1, h2, etc.)

### URL Structure
- Uses slug-based URLs: `/{slug}`
- Example: `/data-driven-decisions-made-easy-with-campusify`
- SEO-friendly, readable URLs
- No query parameters or IDs in URLs

## 🎨 UI/UX Implementation

### Design Principles
- Clean, modern design matching the reference page
- Mobile-first responsive design
- Consistent typography and spacing
- Accessible color contrasts
- Semantic HTML structure

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Components
- **Header**: Sticky navigation with logo and link to main site
- **Blog Listing Page**: Grid layout with blog post cards
- **Blog Post Page**: Single column layout with breadcrumb, title, meta info, and content
- **Footer**: Simple footer with copyright information

## 🔧 Configuration

### API Endpoint
The application fetches data from:
```
https://campusify.io/wp-json/wp/v2/pages
```

### Environment Variables
No environment variables are required for basic functionality. If deploying to production, you may want to add:
- `NEXT_PUBLIC_SITE_URL`: Your domain URL (for canonical URLs)

### Build Configuration
- `next.config.js`: Configured for image optimization from campusify.io domain
- `tailwind.config.js`: Custom typography settings for blog content

## 📊 Performance Targets

- **Mobile Page Load**: < 3 seconds ✅
- **Lighthouse Score**: Target 90+ (can be verified with `npm run build && npm start`)
- **First Contentful Paint**: Optimized with SSG
- **Time to Interactive**: Minimal JavaScript for fast TTI

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy (automatic builds on push)

### Other Platforms
Build the application:
```bash
npm run build
```

The `out` directory (for static export) or `.next` directory (for Node.js server) contains the production build.

## 📝 Assumptions & Limitations

### Assumptions
1. All pages from the API should be displayed as blog posts
2. Image URLs from campusify.io are accessible (no CORS issues)
3. The API returns consistent data structure
4. Slugs are unique and URL-safe

### Limitations
1. Comments functionality is not implemented (could be added)
2. Author pages are not implemented
3. Category/tag filtering is not implemented
4. Search functionality is not implemented
5. Pagination is not implemented (all posts shown on home page)
6. No image optimization service configured (images load directly from source)

### Future Enhancements
- Add pagination for blog listing
- Implement search functionality
- Add category/tag filtering
- Add author pages
- Implement comments system
- Add image optimization service
- Add analytics integration
- Add RSS feed generation

## 🔒 Security Note

- **Production Dependencies**: 0 vulnerabilities ✅
- **Development Dependencies**: 3 high severity vulnerabilities in ESLint's glob dependency
  - These are development-only and do not affect the production application
  - The vulnerabilities are in the glob CLI tool, not used in production code
  - To fix: Update to Next.js 15+ (breaking changes may apply)

## 🧪 Testing

To test the application:
1. Run `npm run dev`
2. Navigate to home page to see all blog posts
3. Click on any blog post to view individual page
4. Check browser DevTools for:
   - Network tab: Page load time
   - Lighthouse: Performance and SEO scores
   - Console: No errors

## 📚 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **DOMPurify**: HTML sanitization library
- **React 18**: UI library

## 📄 License

This project is created as an assignment submission.

## 👤 Author

Full Stack Developer Assignment Submission



