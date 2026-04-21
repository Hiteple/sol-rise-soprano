# Isabella Cavalcanti — Opera Singer Portfolio

A professional portfolio website for internationally acclaimed soprano Isabella Cavalcanti. Built with TanStack Start and deployed on Netlify.

## Key Features

- **Full-page Hero** — cinematic full-viewport hero with animated typography
- **Homepage Sections** — image & text pairings, filterable media grid, full-width quote banner
- **Media Grid** — video and photo browser with playable YouTube embeds via a modal
- **Gallery** — filterable photo gallery with Netlify Image CDN optimisation and lightbox
- **Productions** — alternating showcase of opera roles, venues, and years
- **About** — biography, career stats, and a milestone timeline
- **Contact** — Netlify Forms-powered contact form with social links
- **Visual Editor Ready** — every editable element annotated with `data-sb-object-id` / `data-sb-field-path` attributes for Netlify Visual Editor

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4, Google Fonts (Cormorant Garant + Nunito Sans) |
| Content | Content Collections (type-safe markdown frontmatter) |
| Images | Netlify Image CDN (`/.netlify/images`) |
| Forms | Netlify Forms |
| Deployment | Netlify |
| Visual Editing | Netlify Visual Editor (Stackbit) — `stackbit.config.ts` |

## Project Structure

```
content/
  home/data.md          # All homepage copy & image URLs (editable in Visual Editor)
  gallery/*.md          # Gallery photo entries
  media/*.md            # Media grid items (videos & photos)
  productions/*.md      # Opera production showcase entries
src/
  components/
    Nav.tsx             # Fixed navigation with scroll detection
    Footer.tsx          # Footer with social links
  routes/
    index.tsx           # Homepage (hero, about teaser, media grid, quote)
    about.tsx           # Full biography + career timeline
    gallery.tsx         # Filterable photo gallery with lightbox
    productions.tsx     # Opera productions showcase
    contact.tsx         # Contact form + social channels
stackbit.config.ts      # Netlify Visual Editor configuration
```

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on `http://localhost:3000`. Use the Netlify CLI for a more complete local environment (Netlify Forms, Image CDN):

```bash
netlify dev
```

This starts the full Netlify environment on `http://localhost:8888`.

## Editing Content

All site content lives in markdown files under `content/`. Each file has a YAML frontmatter block with editable fields — images, text, URLs, and metadata.

**With the Netlify Visual Editor**, click any element on the published site to edit it directly. The `stackbit.config.ts` maps every field to the correct content file and the React components carry `data-sb-field-path` annotations so edits are context-aware.

**Without the Visual Editor**, open any `.md` file in `content/`, edit the frontmatter values, and commit the change to trigger a new deploy.

## Replacing Placeholder Images

All images currently use `picsum.photos` as a placeholder service. To replace them:

1. Upload the image to your preferred storage (e.g., Netlify Blobs, Cloudinary, or a CDN).
2. Copy the public URL.
3. Open the relevant content file in `content/` and replace the `image:` or `thumbnail:` URL.
4. The Netlify Image CDN (`/.netlify/images`) will automatically optimise the new image on the next request.

## Deployment

The site deploys automatically from `git push` via Netlify. The build command is `vite build` and the publish directory is `dist/client`.
