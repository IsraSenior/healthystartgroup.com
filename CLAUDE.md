# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 4** application for HealthyStart Group, a bilingual (English/Spanish) healthcare services website. The site uses:
- **Nuxt Content** for managing services, articles, testimonials, and staff profiles
- **@nuxtjs/i18n** for internationalization (English as default, Spanish with `/es` prefix)
- **@nuxtjs/seo** for SEO optimization
- **Tailwind CSS 4** (via @tailwindcss/vite) for styling

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Architecture

### Content Management System

Content is organized by **locale** and **collection type** in the `content/` directory:

```
content/
├── en/                    # English content
│   ├── index.md          # Home page data (hero, stats, values)
│   ├── services/         # Service pages
│   ├── articles/         # Blog posts
│   ├── testimonials/     # Client testimonials
│   └── staff/            # Team member profiles
└── es/                   # Spanish content (same structure)
```

Content collections are defined in [content.config.ts](content.config.ts) with SEO optimization:
- `services_{locale}`, `testimonials_{locale}`, `articles_{locale}`, `staff_{locale}`
- Each collection integrates with @nuxtjs/seo via `asSeoCollection()`

### Internationalization Strategy

The site uses a **dual-source i18n approach**:

1. **UI Strings & Navigation** → TypeScript files in `i18n/locales/{locale}.ts`
   - Section components (header, footer, contact form)
   - Navigation menus and labels
   - Home page structured data (stats, services intro, etc.)

2. **Page Content** → Markdown files in `content/{locale}/`
   - Services, articles, testimonials, staff
   - Managed via Nuxt Content

**Locale Configuration** ([nuxt.config.ts:34-51](nuxt.config.ts#L34-L51)):
- English (`en`): Default locale, no prefix
- Spanish (`es`): Prefix strategy (`/es/*`)
- Browser detection enabled with cookie persistence

### Custom Composables

**Core composables for localized content access:**

1. **`useI18nResource<T>(path)`** ([composables/useI18nResource.ts](composables/useI18nResource.ts))
   - Fetches data from i18n locale files (e.g., `i18n/locales/en.ts`)
   - Returns unwrapped message data (strips Intlify metadata)
   - Auto-syncs when locale changes
   - Usage: `const { data: page } = useI18nResource('home')`

2. **`useLocalizedCollection<T>(baseName, options)`** ([composables/useLocalizedCollection.ts](composables/useLocalizedCollection.ts))
   - Queries Nuxt Content collections with automatic locale suffix (`{baseName}_{locale}`)
   - Falls back to English if current locale has no entries
   - Supports limiting, custom queries, and transformations
   - Usage: `const { data: services } = await useLocalizedCollection('services', { limit: 3 })`

3. **`useContentEntry<T>(key, path, options)`** ([composables/useContentEntry.ts](composables/useContentEntry.ts))
   - Fetches a single content entry by path with locale awareness
   - Fallback to English if entry not found in current locale

### Page Structure

**Pages** ([pages/](pages/)):
- Dynamic routes use `[id].vue` for content-driven pages (services, articles)
- Pages fetch data via `useI18nResource` (UI/navigation) + `useLocalizedCollection` (content items)
- Example: [pages/index.vue](pages/index.vue) combines home page i18n data with services/articles collections

**Layout** ([layouts/default.vue](layouts/default.vue)):
- Simple wrapper with `<Header />`, `<slot />`, `<SectionContact />`, `<Footer />`

### Components

**Organized by function:**
- `Section/*` - Reusable page sections (ServicesSlider, TestimonialsSlider, Values, CTA, Contact)
- `Form/*` - Form components (Contact form)
- `Blog/*`, `Services/*`, `Staff/*`, `Testimonials/*` - Domain-specific card components
- `Header.vue`, `Footer.vue`, `LangSwitcher.vue` - Layout/navigation

### Custom Directives

**`v-scroll-property`** ([plugins/scroll-property.ts](plugins/scroll-property.ts)):
- Animates CSS properties based on scroll position
- Used for parallax/scale effects on images
- Example: `v-scroll-property="{ property: 'transform', template: 'scale({value})', from: 1, to: 1.08 }"`

## Key Patterns

### Adding New Content

**To add a new service/article/testimonial:**
1. Create markdown file in `content/{locale}/{type}/` (e.g., `content/en/services/new-service.md`)
2. Include frontmatter with `title`, `description`, and any custom fields
3. File is automatically available via `useLocalizedCollection('{type}')`

**To add new UI strings:**
1. Add to `i18n/locales/en.ts` and `i18n/locales/es.ts`
2. Access via `useI18nResource('{path}')`

### SEO Configuration

- Global SEO settings in [nuxt.config.ts:13-18](nuxt.config.ts#L13-L18)
- Per-page SEO via `useSeoMeta(page?.value?.seo)` (data from i18n or content)
- Content collections auto-integrate SEO metadata via `asSeoCollection()`

### Content Preview

Content preview API configured for Vercel deployment ([nuxt.config.ts:29-31](nuxt.config.ts#L29-L31)):
```typescript
preview: {
  api: 'https://healthystartgroup-com.vercel.app',
}
```

## Important Notes

- **Locale strategy**: English has no prefix, Spanish uses `/es` prefix
- **Content fallback**: Always falls back to English (`en`) if translation missing
- **Markdown TOC**: Configured for depth 3, search depth 2
- **Tailwind**: Uses new v4 Vite plugin, CSS in `assets/css/tailwind.css`
- **Fonts**: Custom fonts loaded via `assets/css/fonts.css`
