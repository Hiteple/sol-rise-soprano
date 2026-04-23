# Sol Risé — Opera Singer Portfolio

Professional portfolio site: TanStack Start, React 19, and Netlify. Content is markdown frontmatter validated with **Content Collections** + **Zod**, and edited in production with the **Netlify Visual Editor** (Stackbit config).

## Routes (public UI)

| Path | Purpose |
|------|---------|
| `/` | Home — hero, image+text blocks, media grid, quote |
| `/bio` | Long-form biography (richtext) |
| `/about` | Career page — hero, stats, timeline, CTA |
| `/productions` | Productions landing + cards from `content/productions/` |
| `/gallery` | Filterable gallery from `content/gallery/` |
| `/contact` | Contact hero + Netlify form + socials |
| `/resume` | Education / CV style page (not linked in main nav by default) |

Navigation labels in the header/footer are **editable** (see below); “Career” points to `/about`, “Bio” to `/bio`.

## Key features

- **Section color schemes** — Per-section `soft` / `bright` / `wine` in Stackbit (labels “Color Scheme”), backed by shared helpers in `src/lib/section-color-scheme.ts`.
- **Reusable sections** — `src/sections/*` composed from route files under `src/routes/`.
- **Global chrome** — Header brand + nav links and footer brand + nav + social URLs live on **`content/home/data.md`** (same `HomePage` model as the homepage body). `Nav` / `Footer` use `data-sb-object-id="content/home/data.md"` so the visual editor can bind inline clicks to that document on any page.
- **Contact** — Netlify Forms (`ContactFormSection`).
- **Visual editor** — `stackbit.config.ts` + `data-sb-field-path` / `data-sb-object-id` on sections and key layout text.

## Tech stack

| Layer | Technology |
|-------|------------|
| App | TanStack Start, TanStack Router v1 |
| UI | React 19, Vite 7 |
| Styles | Tailwind CSS 4, tokens in `src/styles.css` (Cormorant Garant + Nunito Sans) |
| Content | `@content-collections/*`, schemas in `schemas/` + `content-collections.ts` |
| Images | Netlify Image CDN (`netlifyImg` helper) |
| Forms | Netlify Forms |
| Deploy | Netlify (`vite build`, publish `dist/client`) |
| CMS UI | Netlify Visual Editor — `stackbit.config.ts`, `sudo stackbit dev` locally |

## Content layout

```
content/
  home/data.md              # Homepage sections + global header/footer fields
  about/page.md             # Career (/about) + biography copy used on /bio (no separate bio file yet)
  contact/page.md
  gallery-landing/page.md
  gallery/*.md
  media/*.md
  productions/*.md
  productions-landing/page.md
  education/*.md            # Used by /resume
schemas/
  site-pages.ts             # About, contact, gallery landing, productions landing
  color-scheme.ts           # Shared soft | bright | wine enum + Zod preprocess
src/
  components/Nav.tsx, Footer.tsx
  routes/*.tsx              # File-based routes
  sections/*.tsx            # Page sections
  lib/section-color-scheme.ts, nav-links.ts
stackbit.config.ts          # Field models + HomePage field list (Content tab groups hero/sections; header/footer fields use "Header -" / "Footer -" labels)
```

**Note:** Biography UI lives at `/bio` but still reads `fullBio*` fields from `content/about/page.md` until a dedicated `BioPage` collection is added.

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

Uses `stackbit.config.ts` and the git content source. After changing models/fields, restart Stackbit so the UI picks up config changes.

## Editing content

- **Markdown + frontmatter** under `content/` — types enforced when the Vite/content-collections plugin runs.
- **Visual Editor** — click annotated regions; header/footer fields appear under the **Content** tab on `HomePage` with labels prefixed `Header -` and `Footer -`.
- **Nav link list format** — Each line: `Label | /path` (or a bare path; see `src/lib/nav-links.ts`).

## Images

Replace placeholder URLs in the relevant `content/**/*.md` frontmatter. Images are transformed through the Netlify image pipeline where configured.

## Deployment

Push to Git; Netlify runs `vite build` and publishes `dist/client`.
