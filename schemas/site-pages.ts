import { z } from 'zod'

const highlightSchema = z.object({
  number: z.string(),
  label: z.string(),
})

const timelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
})

export const aboutPageSchema = z.object({
  type: z.literal('AboutPage'),
  heroEyebrow: z.string(),
  heroTitleLine1: z.string(),
  heroTitleAccent: z.string(),
  heroTitleLine2: z.string(),
  heroIntro: z.string(),
  /** If empty, falls back to the about_teaser image from home sections. */
  heroImage: z.string().optional(),
  heroImageAlt: z.string(),
  heroQuote: z.string(),
  heroQuoteAttribution: z.string(),
  highlights: z.array(highlightSchema),
  fullBioEyebrow: z.string(),
  fullBioParagraphs: z.array(z.string()),
  timelineSectionEyebrow: z.string(),
  timelineSectionTitle: z.string(),
  timeline: z.array(timelineItemSchema),
  ctaTitleLine1: z.string(),
  ctaTitleLine2: z.string(),
  ctaPrimaryLabel: z.string(),
  ctaPrimaryHref: z.string(),
  ctaSecondaryLabel: z.string(),
  ctaSecondaryHref: z.string(),
  content: z.string(),
})

export const galleryPageSchema = z.object({
  type: z.literal('GalleryPage'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  filterCategories: z.array(z.string()),
  content: z.string(),
})

export const contactPageSchema = z.object({
  type: z.literal('ContactPage'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  introHeading: z.string(),
  introBody: z.string(),
  directEmailLabel: z.string(),
  socialChannelsLabel: z.string(),
  instagramHandle: z.string(),
  youtubeHandle: z.string(),
  facebookHandle: z.string(),
  successTitle: z.string(),
  successMessage: z.string(),
  successResetLabel: z.string(),
  content: z.string(),
})

export const productionsPageSchema = z.object({
  type: z.literal('ProductionsPage'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroIntro: z.string(),
  content: z.string(),
})

export type AboutPage = z.infer<typeof aboutPageSchema>
export type GalleryPage = z.infer<typeof galleryPageSchema>
export type ContactPage = z.infer<typeof contactPageSchema>
export type ProductionsPage = z.infer<typeof productionsPageSchema>
