# HealthyStart Group Website

Official website for HealthyStart Group - A global healthcare management and enterprise medical development solutions company.

🌐 **Live Site:** [www.healthystartgroup.com](https://www.healthystartgroup.com)

## 🚀 Features

- **Bilingual Support** - Full English and Spanish translations with custom localized URLs
- **SEO Optimized** - Complete meta tags, OG images, and schema markup
- **Content Management** - Markdown-based content for services, articles, testimonials, and staff
- **Responsive Design** - Mobile-first approach with Tailwind CSS 4
- **Performance Focused** - Built with Nuxt 4 for optimal loading speeds

## 🛠️ Tech Stack

- **[Nuxt 4](https://nuxt.com/)** - Vue.js framework
- **[Nuxt Content](https://content.nuxt.com/)** - File-based CMS
- **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** - Internationalization
- **[@nuxtjs/seo](https://nuxtseo.com/)** - SEO optimization
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling (via @tailwindcss/vite)
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 9.x or higher (install globally: `npm install -g pnpm`)

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/IsraSenior/healthystartgroup.com.git

# Navigate to project directory
cd healthystartgroup.com

# Install dependencies
pnpm install
```

## 💻 Development

```bash
# Start development server at http://localhost:3000
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Generate static site
pnpm run generate
```

## 🌍 Internationalization

The site supports two languages with custom routes:

### English (Default)
- No prefix
- Routes: `/about`, `/services`, `/contact`, `/articles`

### Spanish
- Prefix: `/es`
- Custom routes: `/es/acerca-de`, `/es/servicios`, `/es/contacto`, `/es/articulos`

### Adding Translations

1. Add content in both languages:
   - English: `content/en/services/01.service-name.md`
   - Spanish: `content/es/services/01.nombre-del-servicio.md`

2. Update locale files:
   - `i18n/locales/en.ts`
   - `i18n/locales/es.ts`

3. Use base routes in locale files, wrap with `localePath()` in components:
   ```vue
   <script setup>
   const localePath = useLocalePath();
   </script>

   <template>
     <NuxtLink :to="localePath('/about')">About</NuxtLink>
   </template>
   ```

## 📁 Project Structure

```
healthystartgroup.com/
├── assets/
│   └── css/              # Global styles and fonts
├── components/
│   ├── Blog/             # Blog-related components
│   ├── Form/             # Form components
│   ├── Section/          # Page sections
│   ├── Services/         # Service cards
│   ├── Staff/            # Staff profiles
│   ├── Testimonials/     # Testimonials
│   ├── Footer.vue
│   ├── Header.vue
│   └── LangSwitcher.vue
├── composables/          # Vue composables
│   ├── useContentEntry.ts
│   ├── useI18nResource.ts
│   └── useLocalizedCollection.ts
├── content/              # Markdown content
│   ├── en/              # English content
│   │   ├── articles/
│   │   ├── services/    # 6 services
│   │   ├── staff/
│   │   └── testimonials/
│   └── es/              # Spanish content (same structure)
├── i18n/
│   └── locales/
│       ├── en.ts        # English translations
│       └── es.ts        # Spanish translations
├── pages/               # Routes
│   ├── about.vue
│   ├── articles/
│   ├── contact.vue
│   ├── index.vue        # Home page
│   └── services/
├── plugins/             # Nuxt plugins
├── public/              # Static assets
├── content.config.ts    # Content collections
├── nuxt.config.ts       # Nuxt configuration
└── tailwind.config.ts   # Tailwind configuration
```

## 📦 Content Collections

The site uses Nuxt Content with the following collections:

- **Services** (`services_{locale}`) - 6 aligned services in EN/ES
- **Articles** (`articles_{locale}`) - Blog posts
- **Testimonials** (`testimonials_{locale}`) - Client testimonials
- **Staff** (`staff_{locale}`) - Team member profiles

## 🎨 Styling

The project uses **Tailwind CSS 4** with custom configuration:

- Custom fonts loaded via `assets/css/fonts.css`
- Global styles in `assets/css/tailwind.css`
- Vite plugin for processing

## 🔍 SEO

### Site-wide Configuration
- Site URL: `https://www.healthystartgroup.com`
- Site name: `HealthyStart Group`
- Default OG image: `/HealthyStart_Group_og2.webp`

### Per-page SEO
All pages implement `useSeoMeta()` with:
- Dynamic titles and descriptions
- OG images with locale-specific alt text
- Twitter card metadata

## 🚢 Deployment

The site is deployed on **Vercel**. Push to the `main` branch triggers automatic deployment.

```bash
# Commit and push changes
git add .
git commit -m "Your commit message"
git push origin main
```

## 📝 Content Guidelines

### Adding a New Service

1. Create English version: `content/en/services/07.new-service.md`
   ```yaml
   ---
   title: Service Name
   description: Service description
   icon: |
     <svg>...</svg>
   link: /services/new-service
   ---
   ```

2. Create Spanish version: `content/es/services/07.nuevo-servicio.md`
   ```yaml
   ---
   title: Nombre del Servicio
   description: Descripción del servicio
   icon: |
     <svg>...</svg>
   link: /services/nuevo-servicio
   ---
   ```

**⚠️ Important:** Always maintain parity between English and Spanish services.

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly in both languages
4. Commit with descriptive messages
5. Push and create a pull request

## 📄 License

Copyright © 2025 HealthyStart Group. All rights reserved.

## 🙋 Support

For questions or support, contact:
- **Website:** [www.healthystartgroup.com](https://www.healthystartgroup.com)
- **Email:** info@healthystartgroup.com

---

**Developed by** [Zunami](https://zunamicorp.com)
