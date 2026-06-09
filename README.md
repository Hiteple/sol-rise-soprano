# Sol Risé — Opera Singer Portfolio

Professional portfolio site: TanStack Start, React 19, and Netlify. Content is markdown frontmatter validated with **Content Collections** + **Zod**, and edited in production with the **Netlify Visual Editor** (Stackbit config).

## Routes (public UI)

| Path | Purpose |
|------|---------|
| `/` | Home — hero, about teaser, media grid, upcoming events, quote |
| `/bio` | Long-form biography |
| `/career` | Career overview — hero, stats, timeline, CTA |
| `/about` | Redirect → `/career` |
| `/roles` | Operatic roles index |
| `/roles/$slug` | Role detail |
| `/organizations` | Opera houses and companies |
| `/schedule` | Upcoming and past events |
| `/schedule/$slug` | Event detail |
| `/gallery` | Filterable gallery |
| `/contact` | Contact form + socials |

Navigation labels in the header/footer are **editable** in `content/home/data.md`. Career opens a dropdown: Overview, Roles, Organizations.

## Key features

- **Section color schemes** — Per-section `soft` / `bright` / `wine` in Stackbit, backed by `src/lib/section-color-scheme.ts`.
- **Reusable sections** — `src/sections/*` composed from route files under `src/routes/`.
- **Global chrome** — Header/footer fields on `content/home/data.md`.
- **Contact** — Netlify Forms (`ContactFormSection`).
- **Gallery lightbox** — PhotoSwipe with dynamic captions.
- **Visual editor** — `stackbit.config.ts` + `data-sb-field-path` / `data-sb-object-id`.

## Content layout

```
content/
  home/data.md
  bio/page.md
  career/page.md
  roles/*.md
  roles-landing/page.md
  organizations/*.md
  organizations-landing/page.md
  schedule/*.md
  schedule-landing/page.md
  gallery/*.md
  gallery-landing/page.md
  media/*.md
  contact/page.md
```

## Running locally

```bash
npm install
npm run dev
```

Dev server: `http://localhost:3000`.

Full Netlify parity (forms, image CDN):

```bash
netlify dev
```

Typically `http://localhost:8888`.

### Visual editor (Stackbit)

```bash
sudo stackbit dev
```

## Deployment

Push to Git; Netlify runs `vite build` and publishes `dist/client`.
