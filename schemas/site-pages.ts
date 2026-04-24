import { z } from 'zod'

import { sectionColorSchemeSchema } from './color-scheme'

const highlightSchema = z.object({
  number: z.string(),
  label: z.string(),
})

/** Markdown body; YAML may still be a legacy string array (joined with blank lines). */
const timelineDescriptionSchema = z
  .union([z.string(), z.array(z.string())])
  .transform((v) => {
    if (Array.isArray(v)) return v.map((s) => s.trim()).filter((s) => s.length > 0).join('\n\n')
    return v
  })

const timelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: timelineDescriptionSchema,
})

export const aboutPageSchema = z.object({
  type: z.literal('AboutPage'),
  heroEyebrow: z.string(),
  heroTitleLine1: z.string(),
  heroTitleAccent: z.string(),
  heroTitleLine2: z.string(),
  heroIntro: z.string(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string(),
  heroQuote: z.string(),
  heroQuoteAttribution: z.string(),
  heroColorScheme: sectionColorSchemeSchema.default('soft'),
  statsSurface: sectionColorSchemeSchema.default('soft'),
  highlights: z.array(highlightSchema),
  fullBioEyebrow: z.string(),
  fullBioColorScheme: sectionColorSchemeSchema.default('soft'),
  fullBioParagraphs: z.array(z.string()),
  timelineSectionEyebrow: z.string(),
  timelineSectionTitle: z.string(),
  timelineColorScheme: sectionColorSchemeSchema.default('soft'),
  timeline: z.array(timelineItemSchema),
  ctaTitleLine1: z.string(),
  ctaTitleLine2: z.string(),
  ctaPrimaryLabel: z.string(),
  ctaPrimaryHref: z.string(),
  ctaSecondaryLabel: z.string(),
  ctaSecondaryHref: z.string(),
  ctaColorScheme: sectionColorSchemeSchema.default('soft'),
  content: z.string(),
})

export const galleryPageSchema = z.object({
  type: z.literal('GalleryPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  tabItemsColorScheme: sectionColorSchemeSchema.default('soft'),
  filterCategories: z.array(z.string()),
  content: z.string(),
})

export const contactPageSchema = z.object({
  type: z.literal('ContactPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  contactFormColorScheme: sectionColorSchemeSchema.default('soft'),
  introHeading: z.string(),
  introBody: z.string(),
  directEmailLabel: z.string(),
  email: z.string(),
  socialChannelsLabel: z.string(),
  instagramUrl: z.string(),
  instagramHandle: z.string(),
  youtubeUrl: z.string(),
  youtubeHandle: z.string(),
  facebookUrl: z.string(),
  facebookHandle: z.string(),
  successTitle: z.string(),
  successMessage: z.string(),
  successResetLabel: z.string(),
  content: z.string(),
})

export const productionsPageSchema = z.object({
  type: z.literal('ProductionsPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroIntro: z.string(),
  productionsListColorScheme: sectionColorSchemeSchema.default('soft'),
  content: z.string(),
})

export const bioPageSchema = z.object({
  type: z.literal('BioPage'),
  fullBioColorScheme: sectionColorSchemeSchema.default('soft'),
  fullBioEyebrow: z.string(),
  fullBioParagraphs: z.array(z.string()),
  content: z.string(),
})

export type AboutPage = z.infer<typeof aboutPageSchema>
export type GalleryPage = z.infer<typeof galleryPageSchema>
export type ContactPage = z.infer<typeof contactPageSchema>
export type ProductionsPage = z.infer<typeof productionsPageSchema>
export type BioPage = z.infer<typeof bioPageSchema>
