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
  timelineClosureMessage: z.string().default('The journey continues…'),
  /** Label for the contact link below the timeline closure message. */
  ctaPrimaryLabel: z.string().default('Get in Touch'),
  ctaPrimaryHref: z.string().default('/contact'),
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
  formNameLabel: z.string().optional(),
  formNamePlaceholder: z.string().optional(),
  formEmailLabel: z.string().optional(),
  formEmailPlaceholder: z.string().optional(),
  formSubjectLabel: z.string().optional(),
  formSubjectPlaceholder: z.string().optional(),
  formMessageLabel: z.string().optional(),
  formMessagePlaceholder: z.string().optional(),
  formSubmitLabel: z.string().optional(),
  formSubmitLoadingLabel: z.string().optional(),
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
const privacySectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
})

export const privacyPageSchema = z.object({
  type: z.literal('PrivacyPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('soft'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string().optional(),
  bodyColorScheme: sectionColorSchemeSchema.default('soft'),
  bodySlideIn: z.boolean().default(false),
  lastUpdated: z.string(),
  sections: z.array(privacySectionSchema),
  content: z.string(),
})

const pressKitAssetSchema = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
  fileType: z.enum(['pdf', 'jpg', 'zip']),
  category: z.enum(['documents', 'photos']),
  /** Optional badge, e.g. EN or ES */
  language: z.string().optional(),
})

export const pressKitPageSchema = z.object({
  type: z.literal('PressKitPage'),
  pageHeroColorScheme: sectionColorSchemeSchema.default('wine'),
  heroEyebrow: z.string(),
  heroTitle: z.string(),
  heroDescription: z.string().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  introHeading: z.string(),
  introBody: z.string(),
  introImage: z.string().optional(),
  introImageAlt: z.string().optional(),
  documentsSectionTitle: z.string(),
  photosSectionTitle: z.string(),
  downloadLabel: z.string().default('Download'),
  muvacNote: z.string().optional(),
  muvacUrl: z.string().optional(),
  sectionColorScheme: sectionColorSchemeSchema.default('bright'),
  sectionSlideIn: z.boolean().default(true),
  assets: z.array(pressKitAssetSchema),
  content: z.string(),
})

export type BioPage = z.infer<typeof bioPageSchema>
export type PrivacyPage = z.infer<typeof privacyPageSchema>
export type PressKitPage = z.infer<typeof pressKitPageSchema>
