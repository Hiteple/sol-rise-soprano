# Content guide

Reference for editing markdown in this folder. Edit files here directly in the IDE (no Netlify preview credits needed).

## Rules that apply everywhere

### `order` — publish or hide

| Value | Meaning |
|-------|---------|
| `0` | **Hidden (draft).** Not listed on the site; direct URLs return 404. |
| `1`, `2`, `3`… | **Published.** Lower numbers sort first (within each section). |
| *(omitted)* | Published; sorts as if `0` among visible items. |

Applies to: **roles**, **schedule**, **organizations**, **gallery**, **media**.

### Image paths

- Prefer files under `public/images/…`
- In frontmatter use paths **without** `public/`, e.g. `images/don-giovanni/IMG_1371.jpg`
- Placeholders: `images/general/placeholder-portrait.svg` (4:5), `images/general/placeholder-landscape.svg` (16:10)
- Avoid spaces in filenames

### Slugs

A **slug** is the filename without `.md`: `don-giovanni-2023.md` → `don-giovanni-2023`.

Use the same slug when linking collections (e.g. `roleSlug`, `organizationSlug`, `gallerySlug`).

---

## `content/schedule/` — performances & events

**File:** one event per `.md` (canonical English). **URL:** `/schedule/{slug}`

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `title` | yes | Card, hero, detail | Event or work name |
| `subtitle` | no | Card, detail | English default; override per locale in bundle |
| `status` | yes | Index sections | `upcoming` or `past` — shared |
| `year` | past only | Card badge if no `badges` | Shared |
| `order` | no | Sort order | `0` = hidden |
| `image` | no | Card background, detail hero | Shared |
| `imageAlt` | no | Accessibility | Override per locale in bundle |
| `venue` | no | Detail | Usually shared |
| `city` | no | Detail | Usually shared |
| `organizationSlug` | no | Detail “Presented by” | Slug from `content/organizations/` |
| `composer` | no | Detail “Music by” | Override in bundle if needed |
| `plot` | no | Detail paragraph | Override per locale in bundle |
| `badges` | no | Upcoming cards | Override per locale in bundle (e.g. date labels) |
| `roleSlug` | no | Detail link to role | Shared |
| `gallerySlug` | no | Past detail photography | Shared |
| `ticketHref` | no | Detail CTA | Shared |
| `externalUrl` | no | Detail CTA (new tab) | Shared |
| `cast` | no | Past detail table | Override per locale in bundle if used |
| `productionCredits` | no | Event detail | Usually shared; override in bundle if needed |
| Body markdown | no | *(not shown on site today)* | Optional editor notes |

**Translations (ES / DE / IT):** one bundle per locale — `content/i18n/{es,de,it}/schedule-bundle.md`. Each file overlays translatable fields keyed by event slug. Missing keys fall back to English.

**Opera vs concert**

- **Opera:** `composer`, `plot`, `roleSlug` usually set.
- **Concert / Lied / mixed:** omit `composer` or use `Various composers`; use `plot` as event description; use `gallerySlug` instead of `roleSlug` for photos.

**Landing:** `content/schedule-landing/page.md` (English). Hero copy for other locales is in the same bundle under `page:`.

---

## `content/roles/` — operatic roles

**File:** one role per `.md` (canonical English). **URL:** `/roles/{slug}`

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `characterName` | yes | Index, detail | English default; override per locale in bundle |
| `operaTitle` | yes | Index, detail | Usually shared; override in bundle if needed |
| `composer` | yes | Index, detail | Shared across locales |
| `heroImage` | yes | Detail hero | Shared across locales |
| `summary` | yes | Index card | English default; override per locale in bundle |
| `order` | no | Index sort | `0` = hidden |
| `tags` | no | *(reserved)* | Override per locale in bundle |
| `appearances` | no | Detail list | `year`, `venue`, `organizationSlug`, `city` shared; `notes` per locale in bundle |
| Body markdown | yes | Detail | English default; override per locale in bundle |

**Translations (ES / DE / IT):** one bundle per locale — `content/i18n/{es,de,it}/roles-bundle.md`. Each file overlays translatable fields keyed by role slug. Missing keys fall back to English.

**Photos on role page:** add gallery items with `roleSlug` matching this file’s slug.

**Landing:** `content/roles-landing/page.md` (English). Hero copy for other locales is in the same bundle under `page:`.

---

## `content/gallery/` — photography

**File:** one photo per `.md`. **URL:** `/gallery` (grid only)

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `title` | yes | Hover, lightbox | |
| `image` | yes | Grid | Path under `public/` |
| `alt` | yes | Accessibility | |
| `category` | no | Filter tabs only | e.g. `Performance`, `Behind the Scenes` — must match `filterCategories` on gallery landing |
| `photographer` | no | Hover, lightbox | Name only; site shows `PH: {name}`. Omit for own photos |
| `order` | no | Grid sort | `0` = hidden |
| `featuredImg` | no | Grid layout | `true` = spans 2 columns on desktop |
| `roleSlug` | no | Role detail photography | Links to `/roles/{slug}` section |
| `gallerySlug` | no | Past schedule photography | Same string as event `gallerySlug` |
| Body markdown | no | *(not shown)* | Optional editor notes |

**`roleSlug` vs `gallerySlug`:** use one or neither. Omit both for gallery-only images.

---

## `content/organizations/` — opera houses & companies

**File:** one org per `.md` (canonical English). **URL:** `/organizations` (index only)

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `name` | yes | Index, home strip | Shared across locales |
| `city` | yes | Index, home strip | Shared across locales |
| `country` | no | Index | Shared across locales |
| `summary` | yes | Index card | English default; override per locale in bundle |
| `image` | no | Index, home strip | Shared across locales |
| `website` | no | Index link | External URL |
| `order` | no | Sort | `0` = hidden |
| Body markdown | no | *(not shown)* | Optional notes |

**Translations (ES / DE / IT):** one bundle per locale — `content/i18n/{es,de,it}/organizations-bundle.md`. Each file overlays `summary` (and optional body) keyed by org slug. Missing keys fall back to English.

**Landing:** `content/organizations-landing/page.md` (English). Hero copy for other locales is in the same bundle under `page:`.

**Home strip:** slugs listed in `content/home/data.md` → `organizationsStripItems`

---

## `content/media/` — home media grid (video / image)

**File:** one item per `.md`. **URL:** home page media section

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Card title |
| `type` | yes | `video` or `image` |
| `description` | yes | Subtitle on card |
| `order` | no | `0` = hidden |
| `videoUrl` | video | YouTube URL |
| `imageUrl` | image link | Internal path (e.g. `/schedule/my-event`) navigates in-site; full URLs open in a new tab |
| `thumbnail` | image: yes | Image path; for video optional (YouTube poster used if omitted) |

**Home selection:** list paths in `content/home/data.md` → `mediaItems`, or leave empty to show all published items by `order`.

---

## `content/home/data.md` — homepage

Single file for hero, sections, footer, nav.

Notable fields:

| Field | Purpose |
|-------|---------|
| `featuredEventsLayout` | `splitGrid` (large panels) or `scheduleCards` (schedule-style cards) |
| `splitGridItems` | Up to 3 featured events/links: `title`, `href`, `image`, `badges`, `subtitle` |
| `organizationsStripItems` | Org slugs for home strip (max 8) |
| `mediaItems` | References to `content/media/*.md` |

Color schemes: `soft`, `bright`, `wine` on section fields.

---

## Landing pages (`page.md`)

| Path | Route |
|------|-------|
| `content/schedule-landing/page.md` | `/schedule` |
| `content/roles-landing/page.md` | `/roles` |
| `content/organizations-landing/page.md` | `/organizations` |
| `content/gallery-landing/page.md` | `/gallery` |
| `content/career/page.md` | `/career` |
| `content/bio/page.md` | `/bio` |
| `content/contact/page.md` | `/contact` |

These control page heroes, section colors, and labels—not individual items.

---

## Netlify visual editor (Stackbit)

The same fields appear in the Netlify preview editor with short **descriptions** on each field. Logic lives in code (`content-collections.ts`, `schemas/`); Stackbit only documents it for visual editing.

When in doubt, prefer this README for full context and edit `.md` files directly in the repo.
