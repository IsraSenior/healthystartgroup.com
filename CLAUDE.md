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
pnpm install

# Start dev server (http://localhost:3000)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Generate static site
pnpm run generate
```

**Note:** This project uses **pnpm** as the package manager. Make sure pnpm is installed globally (`npm install -g pnpm`) before running commands.

## Architecture

### Content Management System

Content is organized by **locale** and **collection type** in the `content/` directory:

```
content/
├── en/                    # English content
│   ├── services/         # Service pages (6 services)
│   ├── articles/         # Blog posts
│   ├── testimonials/     # Client testimonials
│   └── staff/            # Team member profiles
└── es/                   # Spanish content (same structure)
```

**Note:** Home page data (hero, stats, values) is managed through i18n locale files (`i18n/locales/{locale}.ts`), NOT through content markdown files.

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

**Locale Configuration** ([nuxt.config.ts:43-79](nuxt.config.ts#L43-L79)):
- English (`en`): Default locale, no prefix
- Spanish (`es`): Prefix strategy with custom routes
- Browser detection enabled with cookie persistence

**Custom Spanish Routes:**
The site uses localized URLs for better SEO:
- `/about` → `/es/acerca-de`
- `/services` → `/es/servicios`
- `/contact` → `/es/contacto`
- `/articles` → `/es/articulos`

All internal links in `i18n/locales/es.ts` use these custom Spanish paths.

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
3. **IMPORTANT**: For services, always create BOTH English AND Spanish versions with matching content
   - English: `content/en/services/01.service-name.md`
   - Spanish: `content/es/services/01.nombre-del-servicio.md`
4. File is automatically available via `useLocalizedCollection('{type}')`

**To add new UI strings:**
1. Add to `i18n/locales/en.ts` and `i18n/locales/es.ts`
2. **IMPORTANT**: All links in locale files must use **base English routes** (e.g., `/about`, `/services`, `/contact`)
3. Components must wrap all route references with `localePath()` to handle locale-specific routing automatically
4. Access via `useI18nResource('{path}')`

**Example:**
```typescript
// i18n/locales/es.ts
menu: [
  { label: 'Servicios', to: '/services' }, // ✅ Use base route
  { label: 'Contacto', to: '/contacto' },  // ❌ Wrong - don't use localized path
]

// Component.vue
const localePath = useLocalePath();
<NuxtLink :to="localePath(item.to)">  // ✅ Wraps with localePath()
```

**To add custom routes for new pages:**
1. Add the page route configuration to `nuxt.config.ts` under `i18n.pages`:
```typescript
'new-page': {
  en: '/new-page',
  es: '/nueva-pagina',
}
```
2. Update all internal links in `i18n/locales/es.ts` to use the Spanish route

### SEO Configuration

**Site-wide Configuration** ([nuxt.config.ts:20-27](nuxt.config.ts#L20-L27)):
- Site URL: `https://www.healthystartgroup.com`
- Site name: `HealthyStart Group`
- OG Image module enabled for automatic social media previews

**OG Image Settings:**
- Default OG image: `/HealthyStart_Group_og2.webp`
- OG image alt text configured per locale:
  - English: "HealthyStart Group - Healthcare Services"
  - Spanish: "HealthyStart Group - Servicios de Salud"

**Per-page SEO:**
All pages implement `useSeoMeta()` with locale-aware configurations:
- [pages/index.vue](pages/index.vue) - Uses `page?.value?.seo` from i18n
- [pages/about.vue](pages/about.vue) - Dynamic SEO meta tags
- [pages/services/index.vue](pages/services/index.vue) - Dynamic SEO meta tags
- [pages/contact.vue](pages/contact.vue) - Dynamic SEO meta tags
- [pages/articles/index.vue](pages/articles/index.vue) - Dynamic SEO meta tags

**Content Collections:**
- Collections auto-integrate SEO metadata via `asSeoCollection()` in [content.config.ts](content.config.ts)

### Content Preview

Content preview API configured for Vercel deployment ([nuxt.config.ts:38-40](nuxt.config.ts#L38-L40)):
```typescript
preview: {
  api: 'https://healthystartgroup-com.vercel.app',
}
```

## Important Notes

- **Package Manager**: This project uses **pnpm** (not npm or yarn)
- **Locale strategy**: English has no prefix, Spanish uses custom localized routes (`/es/acerca-de`, `/es/servicios`, etc.)
- **Spanish Services**: Must match English services - currently 6 services aligned across both languages
- **Content fallback**: Always falls back to English (`en`) if translation missing
- **Internal Links**: All links in locale files (`i18n/locales/*.ts`) must use **base English routes** and components must use `localePath()` to convert them
- **Markdown TOC**: Configured for depth 3, search depth 2
- **Tailwind**: Uses new v4 Vite plugin, CSS in `assets/css/tailwind.css`
- **Fonts**: Custom fonts loaded via `assets/css/fonts.css`
- **OG Image**: All pages use `/HealthyStart_Group_og2.webp` with locale-specific alt text

## Current Services Configuration

The site currently has **6 aligned services** in both English and Spanish:

**English Services** (`content/en/services/`):
1. `01.medical-operations-management.md` - Medical Operations Management
2. `02.medical-contact-center-bpo.md` - Medical Contact Center BPO
3. `03.patient-lead-management-b2b.md` - Patient Lead Management (B2B)
4. `04.healthcare-strategy-and-compliance-consulting.md` - Healthcare Strategy & Compliance Consulting
5. `05.training-and-workforce-development.md` - Training & Workforce Development
6. `06.digital-platforms-and-crm-solutions.md` - Digital Platforms & CRM Solutions

**Spanish Services** (`content/es/services/`):
1. `01.gestion-de-operaciones-medicas.md` - Gestión de Operaciones Médicas
2. `02.centro-de-contacto-medico-bpo.md` - Centro de Contacto Médico BPO
3. `03.gestion-de-leads-de-pacientes-b2b.md` - Gestión de Leads de Pacientes (B2B)
4. `04.estrategia-sanitaria-y-consultoria-de-cumplimiento.md` - Estrategia Sanitaria y Consultoría de Cumplimiento
5. `05.capacitacion-y-desarrollo-de-personal.md` - Capacitación y Desarrollo de Personal
6. `06.plataformas-digitales-y-soluciones-crm.md` - Plataformas Digitales y Soluciones CRM

**⚠️ CRITICAL**: When adding or removing services, ALWAYS maintain parity between English and Spanish versions. The service collections must match across both languages.
