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

**File:** one event per `.md`. **URL:** `/schedule/{slug}`

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `title` | yes | Card, hero, detail | Event or work name |
| `subtitle` | no | Card, detail | Role, venue line, or one-liner |
| `status` | yes | Index sections | `upcoming` or `past` |
| `year` | past only | Card badge if no `badges` | e.g. `'2023'` |
| `order` | no | Sort order | `0` = hidden |
| `image` | no | Card background, detail hero | 4:5 for cards |
| `imageAlt` | no | Accessibility | |
| `venue` | no | Detail | |
| `city` | no | Detail | |
| `organizationSlug` | no | Detail “Presented by” | Slug from `content/organizations/` |
| `composer` | no | Detail “Music by” | Single composer; omit or `Various composers` for mixed programs |
| `plot` | no | Detail paragraph | Opera synopsis **or** short concert description |
| `badges` | no | Upcoming cards | Date labels, e.g. `June 12th` |
| `roleSlug` | no | Detail link to role | Operatic roles only; slug from `content/roles/` |
| `gallerySlug` | no | Past detail photography | For concerts without a role; match `gallerySlug` on photos |
| `ticketHref` | no | Detail CTA | URL or `/contact` |
| `externalUrl` | no | Detail CTA (new tab) | Program page, press, venue site |
| `cast` | no | Past detail table | `{ character, performer }` list |
| `productionCredits` | no | Event detail | Ordered list: `position` (conductor, production, setDesigner, costumes, lighting) + `name` |
| Body markdown | no | *(not shown on site today)* | Optional notes for editors |

**Opera vs concert**

- **Opera:** `composer`, `plot`, `roleSlug` usually set.
- **Concert / Lied / mixed:** omit `composer` or use `Various composers`; use `plot` as event description; use `gallerySlug` instead of `roleSlug` for photos.

**Landing:** `content/schedule-landing/page.md` — hero text and section colors.

---

## `content/roles/` — operatic roles

**File:** one role per `.md`. **URL:** `/roles/{slug}`

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `characterName` | yes | Index, detail | e.g. Zerlina |
| `operaTitle` | yes | Index, detail | e.g. Don Giovanni |
| `composer` | yes | Index, detail | |
| `heroImage` | yes | Detail hero | 16:10 landscape |
| `summary` | yes | Index card | Short blurb |
| `order` | no | Index sort | `0` = hidden |
| `tags` | no | *(reserved)* | |
| `appearances` | no | Detail list | `year`, `venue`, `organizationSlug`, `city`, `notes` |
| Body markdown | yes | Detail | Longer role text (markdown) |

**Photos on role page:** add gallery items with `roleSlug` matching this file’s slug.

**Landing:** `content/roles-landing/page.md`

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

**File:** one org per `.md`. **URL:** `/organizations` (index only)

| Field | Required | Where it shows | Notes |
|-------|----------|----------------|-------|
| `name` | yes | Index, home strip | |
| `city` | yes | Index, home strip | |
| `country` | no | Index | |
| `summary` | yes | Index card | |
| `image` | no | Index, home strip | |
| `website` | no | Index link | External URL |
| `order` | no | Sort | `0` = hidden |
| Body markdown | no | *(not shown)* | |

Referenced by `organizationSlug` in roles and schedule.

**Landing:** `content/organizations-landing/page.md`

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
