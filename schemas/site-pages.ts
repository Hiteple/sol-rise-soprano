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

const fullBioParagraphSchema = z
  .union([
    z.string(),
    z.object({
      content: z.string(),
      addBorderBottom: z.boolean().optional(),
    }),
  ])
  .transform((v) => {
    if (typeof v === 'string') {
      return { content: v, addBorderBottom: false }
    }
    return { content: v.content, addBorderBottom: v.addBorderBottom ?? false }
  })

export const aboutPageSchema = z.object({
  type: z.literal('CareerPage'),
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
  heroSlideIn: z.boolean().default(true),
  statsSurface: sectionColorSchemeSchema.default('soft'),
  statsSlideIn: z.boolean().default(true),
  highlights: z.array(highlightSchema),
  timelineSectionEyebrow: z.string(),
  timelineSectionTitle: z.string(),
  timelineColorScheme: sectionColorSchemeSchema.default('soft'),
  timelineSlideIn: z.boolean().default(true),
  timeline: z.array(timelineItemSchema),
  ctaTitleLine1: z.string(),
  ctaTitleLine2: z.string(),
  ctaPrimaryLabel: z.string(),
  ctaPrimaryHref: z.string(),
  ctaSecondaryLabel: z.string(),
  ctaSecondaryHref: z.string(),
  ctaColorScheme: sectionColorSchemeSchema.default('soft'),
  ctaSlideIn: z.boolean().default(true),
  content: z.string(),
})

export const galleryPageSchema = z.object({
  type: z.literal('GalleryPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  tabItemsColorScheme: sectionColorSchemeSchema.default('soft'),
  tabItemsSlideIn: z.boolean().default(true),
  filterCategories: z.array(z.string()),
  content: z.string(),
})

export const contactPageSchema = z.object({
  type: z.literal('ContactPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  contactFormColorScheme: sectionColorSchemeSchema.default('soft'),
  contactFormSlideIn: z.boolean().default(true),
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
  muvacUrl: z.string(),
  muvacHandle: z.string(),
  formSubjectOptions: z.array(z.string()).default([
    'Artistic Engagements',
    'Voice Lessons',
    'Vocal Coaching & Audition Preparation',
    'Private Events',
    'Press & Media Inquiries',
    'Artistic Collaborations',
    'General Inquiries',
  ]),
  successTitle: z.string(),
  successMessage: z.string(),
  successResetLabel: z.string(),
  content: z.string(),
})

export const rolesPageSchema = z.object({
  type: z.literal('RolesPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string(),
  rolesListColorScheme: sectionColorSchemeSchema.default('soft'),
  rolesListSlideIn: z.boolean().default(true),
  content: z.string(),
})

export const organizationsPageSchema = z.object({
  type: z.literal('OrganizationsPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string(),
  organizationsListColorScheme: sectionColorSchemeSchema.default('soft'),
  organizationsListSlideIn: z.boolean().default(true),
  content: z.string(),
})

export const schedulePageSchema = z.object({
  type: z.literal('SchedulePage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string(),
  upcomingColorScheme: sectionColorSchemeSchema.default('wine'),
  upcomingSlideIn: z.boolean().default(true),
  pastColorScheme: sectionColorSchemeSchema.default('soft'),
  pastSlideIn: z.boolean().default(true),
  content: z.string(),
})

export const bioPageSchema = z.object({
  type: z.literal('BioPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string().optional(),
  fullBioColorScheme: sectionColorSchemeSchema.default('soft'),
  fullBioSlideIn: z.boolean().default(true),
  fullBioEyebrow: z.string(),
  fullBioParagraphs: z.array(fullBioParagraphSchema),
  fullBioImage: z.string().optional(),
  fullBioImageAlt: z.string().optional(),
  /** Photo credit — shown on the portrait when set (e.g. Diego Israelit). */
  fullBioImagePhotography: z.string().optional(),
  fullBioImagePosition: z.enum(['left', 'right']).default('right'),
  content: z.string(),
})

export type AboutPage = z.infer<typeof aboutPageSchema>
export type GalleryPage = z.infer<typeof galleryPageSchema>
export type ContactPage = z.infer<typeof contactPageSchema>
export type RolesPage = z.infer<typeof rolesPageSchema>
export type OrganizationsPage = z.infer<typeof organizationsPageSchema>
export type SchedulePage = z.infer<typeof schedulePageSchema>
export type BioPage = z.infer<typeof bioPageSchema>
