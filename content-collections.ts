import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const I18N_LOCALES = ['es', 'de', 'it'] as const

/** Mirror content/ paths under content/i18n/{es,de,it}/ for optional translations. */
function localizedIncludes(relativePath: string): string[] {
  return [relativePath, ...I18N_LOCALES.map((loc) => `i18n/${loc}/${relativePath}`)]
}

/** All markdown files in a subfolder plus optional locale mirrors (roles, schedule, …). */
function localizedGlob(subpath: string): string[] {
  return [`${subpath}/**/*.md`, ...I18N_LOCALES.map((loc) => `i18n/${loc}/${subpath}/**/*.md`)]
}

import { sectionColorSchemeSchema } from './schemas/color-scheme'
import { imageCreditFieldsSchema } from './schemas/image-credit'
import { organizationLocaleBundleSchema } from './schemas/organization-locale-bundle'
import { roleLocaleBundleSchema } from './schemas/role-locale-bundle'
import { scheduleLocaleBundleSchema } from './schemas/schedule-locale-bundle'
import { roleCategorySchema } from './schemas/role-category'
import { scheduleEventSchema } from './schemas/schedule-event'
import {
  aboutPageSchema,
  bioPageSchema,
  contactPageSchema,
  privacyPageSchema,
  galleryPageSchema,
  organizationsPageSchema,
  rolesPageSchema,
  schedulePageSchema,
} from './schemas/site-pages'

const roleAppearanceSchema = z.object({
  year: z.string(),
  venue: z.string(),
  organizationSlug: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
})

const homeHeroColorSchemeSchema = z.preprocess((val) => {
  if (val === 'wine') return 'wine'
  if (val === 'clear' || val === 'bright' || val === 'soft' || val === '' || val === null || val === undefined) {
    return 'clear'
  }
  return 'wine'
}, z.enum(['clear', 'wine']))

const home = defineCollection({
  name: 'home',
  directory: 'content',
  include: localizedIncludes('home/data.md'),
  schema: z.object({
    type: z.literal('HomePage'),
    headerBrandLine1: z.string().default('Sol Risé'),
    headerBrandLine2: z.string().default('Soprano'),
    /** Optional image under public/ — replaces header text brand when set. */
    headerBrandLogo: z.string().optional(),
    headerNavLinks: z
      .array(
        z.union([
          z.string(),
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        ]),
      )
      .default([
        { label: 'Home', href: '/' },
        { label: 'Bio', href: '/bio' },
        { label: 'Career', href: '/career' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
      ]),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    heroTagline: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    primaryCtaLabel: z.string().optional(),
    primaryCtaHref: z.string().optional(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaHref: z.string().optional(),
    heroColorScheme: homeHeroColorSchemeSchema.default('wine'),
    aboutSurface: sectionColorSchemeSchema.default('soft'),
    aboutSlideIn: z.boolean().default(true),
    aboutEyebrow: z.string().optional(),
    aboutTitle: z.string(),
    aboutText: z.string(),
    aboutImage: z.string(),
    aboutImageAlt: z.string(),
    aboutLinkText: z.string(),
    aboutHref: z.string().optional(),
    organizationsStripEyebrow: z.string().optional(),
    organizationsStripTitle: z.string().optional(),
    organizationsStripDescription: z.string().optional(),
    organizationsStripLinkText: z.string().optional(),
    organizationsStripItems: z.array(z.string()).max(8).optional(),
    organizationsStripColorScheme: sectionColorSchemeSchema.default('bright'),
    organizationsStripSlideIn: z.boolean().default(true),
    mediaEyebrow: z.string(),
    mediaTitle: z.string(),
    /** @deprecated Home shows the 8 most recent past events automatically. */
    lastEventsItems: z.array(z.string()).max(24).optional(),
    mediaLinkText: z.string().optional(),
    mediaGridColorScheme: sectionColorSchemeSchema.default('soft'),
    mediaGridSlideIn: z.boolean().default(true),
    featuredEventsLayout: z.enum(['splitGrid', 'scheduleCards']).default('splitGrid'),
    splitGridTitle: z.string().optional(),
    splitGridDescription: z.string().optional(),
    splitGridItems: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
          image: z.string(),
          badges: z.array(z.string()).max(4).optional(),
          /** @deprecated Use `badges` — kept for existing content. */
          decorativeEyebrow: z.string().optional(),
          subtitle: z.string().optional(),
        }),
      )
      .max(3)
      .optional(),
    splitGridColorScheme: sectionColorSchemeSchema.default('soft'),
    splitGridSlideIn: z.boolean().default(true),
    quoteBannerColorScheme: sectionColorSchemeSchema.default('soft'),
    quoteBannerSlideIn: z.boolean().default(true),
    quoteText: z.string(),
    quoteAuthor: z.string().optional(),
    quoteImage: z.string(),
    quoteImageAlt: z.string().optional(),
    quoteImageCredit: imageCreditFieldsSchema.optional(),
    footerBrandLine1: z.string().default('Sol Risé'),
    footerBrandLine2: z.string().default('Soprano'),
    /** Optional image under public/ — replaces footer text brand when set. */
    footerBrandLogo: z.string().optional(),
    footerNavLinks: z
      .array(
        z.union([
          z.string(),
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        ]),
      )
      .default([
        { label: 'Home', href: '/' },
        { label: 'Bio', href: '/bio' },
        { label: 'Career', href: '/career' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
      ]),
    instagramUrl: z.string(),
    youtubeUrl: z.string(),
    facebookUrl: z.string(),
    muvacUrl: z.string(),
    email: z.string(),
    content: z.string(),
  }),
})

const gallery = defineCollection({
  name: 'gallery',
  directory: 'content/gallery',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    alt: z.string(),
    category: z.string().optional(),
    /** Photo credit — shown on hover and in the lightbox when set. Omit for own photos. */
    photographer: z.string().optional(),
    order: z.number().optional(),
    featuredImg: z.boolean().default(false),
    /** Links this image to a role detail page (`content/roles` filename without extension). */
    roleSlug: z.string().optional(),
    /** Links this image to a past schedule event when there is no operatic role. */
    gallerySlug: z.string().optional(),
    content: z.string(),
  }),
})

const roleLocaleBundles = defineCollection({
  name: 'roleLocaleBundles',
  directory: 'content',
  include: I18N_LOCALES.map((loc) => `i18n/${loc}/roles-bundle.md`),
  schema: roleLocaleBundleSchema,
})

const roles = defineCollection({
  name: 'roles',
  directory: 'content',
  include: 'roles/**/*.md',
  schema: z.object({
    characterName: z.string(),
    operaTitle: z.string(),
    composer: z.string(),
    category: roleCategorySchema,
    heroImage: z.string(),
    featureImage: z.string(),
    featureImagePhotography: z.string().optional(),
    summary: z.string(),
    appearances: z.array(roleAppearanceSchema).default([]),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    content: z.string(),
  }),
})

const organizationLocaleBundles = defineCollection({
  name: 'organizationLocaleBundles',
  directory: 'content',
  include: I18N_LOCALES.map((loc) => `i18n/${loc}/organizations-bundle.md`),
  schema: organizationLocaleBundleSchema,
})

const organizations = defineCollection({
  name: 'organizations',
  directory: 'content',
  include: 'organizations/**/*.md',
  schema: z.object({
    name: z.string(),
    city: z.string(),
    country: z.string().optional(),
    image: z.string().optional(),
    summary: z.string(),
    website: z.string().optional(),
    order: z.number().optional(),
    content: z.string(),
  }),
})

const scheduleLocaleBundles = defineCollection({
  name: 'scheduleLocaleBundles',
  directory: 'content',
  include: I18N_LOCALES.map((loc) => `i18n/${loc}/schedule-bundle.md`),
  schema: scheduleLocaleBundleSchema,
})

const scheduleEvents = defineCollection({
  name: 'scheduleEvents',
  directory: 'content',
  include: 'schedule/**/*.md',
  schema: scheduleEventSchema,
})

const careerPage = defineCollection({
  name: 'careerPage',
  directory: 'content',
  include: localizedIncludes('career/page.md'),
  schema: aboutPageSchema,
})

const galleryPage = defineCollection({
  name: 'galleryPage',
  directory: 'content',
  include: localizedIncludes('gallery-landing/page.md'),
  schema: galleryPageSchema,
})

const contactPage = defineCollection({
  name: 'contactPage',
  directory: 'content',
  include: localizedIncludes('contact/page.md'),
  schema: contactPageSchema,
})

const rolesPage = defineCollection({
  name: 'rolesPage',
  directory: 'content',
  include: 'roles-landing/page.md',
  schema: rolesPageSchema,
})

const organizationsPage = defineCollection({
  name: 'organizationsPage',
  directory: 'content',
  include: 'organizations-landing/page.md',
  schema: organizationsPageSchema,
})

const schedulePage = defineCollection({
  name: 'schedulePage',
  directory: 'content',
  include: 'schedule-landing/page.md',
  schema: schedulePageSchema,
})

const bioPage = defineCollection({
  name: 'bioPage',
  directory: 'content',
  include: localizedIncludes('bio/page.md'),
  schema: bioPageSchema,
})

const privacyPage = defineCollection({
  name: 'privacyPage',
  directory: 'content',
  include: localizedIncludes('privacy/page.md'),
  schema: privacyPageSchema,
})

export default defineConfig({
  collections: [
    home,
    gallery,
    roleLocaleBundles,
    roles,
    organizationLocaleBundles,
    organizations,
    scheduleLocaleBundles,
    scheduleEvents,
    careerPage,
    galleryPage,
    bioPage,
    privacyPage,
    contactPage,
    rolesPage,
    organizationsPage,
    schedulePage,
  ],
})
