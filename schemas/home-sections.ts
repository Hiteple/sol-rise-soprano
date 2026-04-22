import { z } from 'zod'

export const homeHeroSectionSchema = z.object({
  type: z.literal('hero'),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  heroTagline: z.string(),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  primaryCtaLabel: z.string().optional(),
  primaryCtaHref: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
})

export const homeAboutTeaserSectionSchema = z.object({
  type: z.literal('about_teaser'),
  eyebrow: z.string().optional(),
  aboutTitle: z.string(),
  aboutText: z.string(),
  aboutImage: z.string(),
  aboutImageAlt: z.string(),
  aboutLinkText: z.string(),
  aboutHref: z.string().optional(),
})

export const homeMediaGridSectionSchema = z.object({
  type: z.literal('media_grid'),
  eyebrow: z.string(),
  title: z.string(),
})

export const homeFeatureSplitSectionSchema = z.object({
  type: z.literal('feature_split'),
  eyebrow: z.string(),
  featureTitle: z.string(),
  featureText: z.string(),
  featureImage: z.string(),
  featureImageAlt: z.string(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
})

export const homeQuoteBannerSectionSchema = z.object({
  type: z.literal('quote_banner'),
  quoteText: z.string(),
  quoteAuthor: z.string(),
  quoteImage: z.string(),
  quoteImageAlt: z.string().optional(),
})

export const homeSectionSchema = z.discriminatedUnion('type', [
  homeHeroSectionSchema,
  homeAboutTeaserSectionSchema,
  homeMediaGridSectionSchema,
  homeFeatureSplitSectionSchema,
  homeQuoteBannerSectionSchema,
])

export type HomeSection = z.infer<typeof homeSectionSchema>
export type HomeHeroSection = z.infer<typeof homeHeroSectionSchema>
export type HomeAboutTeaserSection = z.infer<typeof homeAboutTeaserSectionSchema>
export type HomeMediaGridSection = z.infer<typeof homeMediaGridSectionSchema>
export type HomeFeatureSplitSection = z.infer<typeof homeFeatureSplitSectionSchema>
export type HomeQuoteBannerSection = z.infer<typeof homeQuoteBannerSectionSchema>
