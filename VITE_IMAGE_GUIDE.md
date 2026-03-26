# Vite Image Handling Guide

## Complete Guide to Images in Vite + React + TypeScript

---

## 📁 Method 1: Public Folder (Static Assets)

### When to Use

- Simple logos, favicons
- Third-party scripts/assets
- Files that must keep exact names
- Assets referenced in `index.html`
- Files that don't need optimization

### How It Works

```
project/
├── public/
│   ├── logo.png          ← Source location
│   ├── favicon.ico
│   └── robots.txt
└── dist/
    ├── logo.png          ← Copied as-is to dist root
    └── favicon.ico
```

### ✅ Correct Usage

```tsx
// In any component
<img src="/logo.png" alt="Logo" />
<img src="/images/hero.jpg" alt="Hero" />
<img src="/icons/arrow.svg" alt="Arrow" />

// Dynamic paths
const iconName = "user";
<img src={`/icons/${iconName}.svg`} alt="Icon" />

// In CSS/Tailwind
<div style={{ backgroundImage: "url('/hero.jpg')" }} />
<div className="bg-[url('/hero.jpg')]" />
```

### ❌ Common Mistakes

```tsx
// DON'T include "public" in the path
<img src="/public/logo.png" />        // ❌ Wrong
<img src="public/logo.png" />         // ❌ Wrong

// DON'T use relative paths
<img src="./logo.png" />              // ❌ Wrong
<img src="../public/logo.png" />      // ❌ Wrong

// DON'T try to import
import logo from "/logo.png";         // ❌ Wrong
```

---

## 🎨 Method 2: src/assets Folder (RECOMMENDED)

### When to Use

- Most images in your project
- Images that need optimization
- Assets used in components
- Better tree-shaking
- Automatic cache-busting

### How It Works

```
project/
├── src/
│   └── assets/
│       ├── logo.png          ← Source
│       └── hero.jpg
└── dist/
    └── assets/
        ├── logo-a3f2b1c9.png ← Hashed filename
        └── hero-d8e4f5a2.jpg
```

### ✅ Correct Usage

```tsx
// Import the image
import logo from "@/assets/logo.png";
import hero from "../assets/hero.jpg";

function Component() {
  return (
    <>
      {/* Use imported variable */}
      <img src={logo} alt="Logo" />

      {/* Background image */}
      <div style={{ backgroundImage: `url(${hero})` }} />

      {/* With srcset for responsive images */}
      <img src={logo} srcSet={`${logo} 1x, ${logo} 2x`} alt="Logo" />
    </>
  );
}
```

### TypeScript Support

Vite already includes type definitions for image imports. If you get errors:

```typescript
// vite-env.d.ts (already exists in your project)
/// <reference types="vite/client" />

// This enables TS support for importing images:
// import logo from './logo.png' will have type string
```

---

## ⚡ Performance Optimization

### Image Attributes

```tsx
// For above-the-fold images (logos, hero)
<img
  src="/logo.png"
  alt="Logo"
  loading="eager"      // Load immediately
  fetchpriority="high" // High priority
  width={200}          // Explicit dimensions prevent layout shift
  height={50}
/>

// For below-the-fold images
<img
  src="/gallery-1.jpg"
  alt="Gallery"
  loading="lazy"       // Lazy load
  fetchpriority="low"
  decoding="async"     // Non-blocking decode
/>

// Responsive images
<img
  src="/hero-mobile.jpg"
  srcSet="/hero-mobile.jpg 640w, /hero-tablet.jpg 1024w, /hero-desktop.jpg 1920w"
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  alt="Hero"
/>
```

### Modern Formats

```tsx
// Use <picture> for modern format support
<picture>
  <source srcSet="/hero.avif" type="image/avif" />
  <source srcSet="/hero.webp" type="image/webp" />
  <img src="/hero.jpg" alt="Hero" />
</picture>
```

---

## 🚨 Common Mistakes & Solutions

### 1. Case Sensitivity

```bash
# ❌ File: public/Logo.png
<img src="/logo.png" />  # Won't work on Linux/macOS

# ✅ Use exact case
<img src="/Logo.png" />

# 💡 Best practice: use lowercase filenames
# Rename: Logo.png → logo.png
```

### 2. Import Path Issues

```tsx
// ❌ Wrong
import logo from "assets/logo.png"; // Missing @/ or ../
import logo from "@assets/logo.png"; // Missing /
import logo from "src/assets/logo.png"; // Don't use src/ in imports

// ✅ Correct
import logo from "@/assets/logo.png"; // With path alias
import logo from "../assets/logo.png"; // Relative path
import logo from "../../assets/logo.png"; // From nested component
```

### 3. Dynamic Public Assets

```tsx
// ❌ This won't work (Vite can't analyze)
const imageName = "hero";
import(`/images/${imageName}.jpg`);

// ✅ Use direct public path
const imageName = "hero";
<img src={`/images/${imageName}.jpg`} />;

// ✅ Or use import.meta.glob for assets
const images = import.meta.glob("@/assets/*.jpg", { eager: true });
```

### 4. Build Issues

```bash
# ❌ Image not found after build
# Check: Did you reference it correctly?

# ✅ Test build locally
npm run build
npm run preview
```

### 5. Missing Images

```tsx
// ❌ No fallback
<img src="/logo.png" alt="Logo" />

// ✅ With error handling
<img
  src="/logo.png"
  alt="Logo"
  onError={(e) => {
    e.currentTarget.src = '/fallback.png';
  }}
/>
```

---

## 📊 Comparison Table

| Feature                | public/                    | src/assets/                            |
| ---------------------- | -------------------------- | -------------------------------------- |
| **Path Reference**     | `/logo.png`                | `import logo from '@/assets/logo.png'` |
| **Build Processing**   | No                         | Yes (optimized)                        |
| **Cache Busting**      | Manual                     | Automatic (hashed filenames)           |
| **Tree Shaking**       | No                         | Yes                                    |
| **TypeScript Support** | N/A                        | Yes                                    |
| **Use Cases**          | Static assets, exact names | Component images, optimized assets     |
| **Performance**        | Good                       | Better (optimized)                     |

---

## 🎯 Best Practices

### 1. Choose the Right Method

```tsx
// Use public/ for:
- favicon.ico
- robots.txt
- manifest.json
- Third-party scripts
- Assets in index.html

// Use src/assets/ for:
- Component images
- Hero images
- Gallery images
- Icons (if not using icon library)
- Any image used in React components
```

### 2. Organize Assets

```
src/
└── assets/
    ├── images/
    │   ├── hero.jpg
    │   ├── about.jpg
    │   └── gallery/
    │       ├── project-1.jpg
    │       └── project-2.jpg
    ├── icons/
    │   ├── arrow.svg
    │   └── menu.svg
    └── logos/
        ├── logo.png
        ├── logo-white.png
        └── logo.svg
```

### 3. Naming Conventions

```bash
# ✅ Good
hero-image.jpg
about-section-bg.png
project-thumbnail-1.webp

# ❌ Avoid
Hero Image.jpg          # Spaces
ABOUT_SECTION.PNG       # ALL CAPS
project (1).jpg         # Special chars
```

### 4. Optimize Images Before Adding

```bash
# Use tools like:
- TinyPNG / TinyJPG
- Squoosh (squoosh.app)
- ImageOptim
- Sharp (for automated optimization)

# Target sizes:
- Logos: < 50KB
- Hero images: < 300KB
- Thumbnails: < 100KB
- Use WebP/AVIF when possible
```

---

## 💡 Pro Tips

### 1. Environment-Specific Images

```tsx
// Use different images per environment
const logoSrc = import.meta.env.PROD ? "/logo-prod.png" : "/logo-dev.png";

<img src={logoSrc} alt="Logo" />;
```

### 2. Base URL Configuration

```typescript
// vite.config.ts
export default defineConfig({
  base: '/my-app/', // For deployment to subdirectory
});

// Then use:
<img src="/logo.png" /> // → /my-app/logo.png
```

### 3. Image Component Wrapper

```tsx
// components/Image.tsx
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function Image({
  src,
  alt,
  fallback = "/fallback.png",
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={props.loading || "lazy"}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
      {...props}
    />
  );
}

// Usage
<Image src="/logo.png" alt="Logo" className="h-10" />;
```

---

## ✅ Your Current Setup

Your Navbar is now using the **public folder method**:

```tsx
<img
  src="/logo.png" // ← References public/logo.png
  alt="BSA Architecture Logo"
  className="h-8 md:h-10 w-auto object-contain"
/>
```

### To Use src/assets Method Instead:

1. Move `public/logo.png` → `src/assets/logo.png`
2. Use the alternative Navbar component (`Navbar.alternative.tsx`)
3. It imports and uses the optimized asset

---

## 🔍 Debugging Checklist

If your image doesn't display:

- [ ] Check file exists in correct folder (`public/` or `src/assets/`)
- [ ] Verify exact filename (case-sensitive)
- [ ] Check path starts with `/` for public assets
- [ ] Ensure proper import syntax for src/assets
- [ ] Check browser console for 404 errors
- [ ] Test in production build (`npm run build && npm run preview`)
- [ ] Verify file extension (.jpg vs .jpeg vs .png)
- [ ] Check if path alias `@/` is configured in `vite.config.ts`

---

This guide covers everything you need to handle images professionally in your Vite + React + TypeScript project!
