# AGENTS.md

Overview of the Sol Risé Soprano portfolio site for developers and AI agents.

## Project Overview

Opera singer portfolio built with TanStack Start and deployed on Netlify. Content-driven via Content Collections and edited with the Netlify Visual Editor (Stackbit).

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| UI | Radix UI primitives + custom sections |
| Content | Content Collections (type-safe markdown) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Routes

| Path | File | Purpose |
|------|------|---------|
| `/` | `src/routes/index.tsx` | Home |
| `/bio` | `src/routes/bio.tsx` | Biography |
| `/career` | `src/routes/career.tsx` | Career timeline |
| `/about` | `src/routes/about.tsx` | Redirect → `/career` |
| `/roles` | `src/routes/roles.tsx` | Roles index |
| `/roles/$slug` | `src/routes/roles.$slug.tsx` | Role detail |
| `/organizations` | `src/routes/organizations.tsx` | Organizations |
| `/schedule` | `src/routes/schedule.tsx` | Schedule |
| `/schedule/$slug` | `src/routes/schedule.$slug.tsx` | Event detail |
| `/gallery` | `src/routes/gallery.tsx` | Gallery |
| `/contact` | `src/routes/contact.tsx` | Contact |

## Content Collections (`content-collections.ts`)

- `home` — homepage + global header/footer
- `roles` — characterName, operaTitle, composer, appearances, etc.
- `organizations` — name, city, summary, website
- `scheduleEvents` — upcoming/past events with optional cast, ticketHref
- `gallery` — images with optional `roleSlug`
- `mediaItems` — home media grid (YouTube, etc.)
- Landing pages: `careerPage`, `bioPage`, `rolesPage`, `organizationsPage`, `schedulePage`, `galleryPage`, `contactPage`

## Key Components

- `Nav.tsx` — header; Career uses `CareerNavDropdown.tsx`
- `Footer.tsx`
- Sections in `src/sections/` — composed per route

## Configuration

| File | Purpose |
|------|---------|
| `vite.config.ts` | TanStack Start, Netlify, Tailwind, Content Collections |
| `content-collections.ts` | Zod schemas for all collections |
| `schemas/site-pages.ts` | Page landing schemas |
| `stackbit.config.ts` | Visual editor models |
| `netlify.toml` | Build and dev settings |
| `src/styles.css` | Theme tokens and global styles |

## Development

```bash
npm run dev
npm run build
```

## Conventions

- Components: PascalCase
- Routes: kebab-case files; dynamic segments `$slug`
- Styling: Tailwind + `cn()`; color schemes via `section-color-scheme.ts`
- Imports: `@/` alias for `src/*`

## Application branding

Site name **Sol Risé Soprano** appears in `content/home/data.md` (header/footer) and `src/routes/__root.tsx` (document title).
