export type HomeSurface = 'soft' | 'bright'

export type HomeHeroSection = {
  heroTitle: string
  heroSubtitle: string
  heroTagline: string
  heroImage: string
  heroImageAlt: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export type HomeAboutSection = {
  surface?: HomeSurface
  eyebrow?: string
  aboutTitle: string
  aboutText: string
  aboutImage: string
  aboutImageAlt: string
  aboutLinkText: string
  aboutHref?: string
}

export type HomeMediaSection = {
  eyebrow: string
  title: string
}

export type HomeFeatureSection = {
  surface?: HomeSurface
  eyebrow: string
  featureTitle: string
  featureText: string
  featureImage: string
  featureImageAlt: string
  ctaLabel?: string
  ctaHref?: string
}

export type HomeQuoteSection = {
  quoteText: string
  quoteAuthor: string
  quoteImage: string
  quoteImageAlt?: string
}

export type MediaItem = {
  _meta: { path: string }
  title: string
  type: 'video' | 'image'
  videoUrl?: string
  thumbnail: string
  description: string
}

export type MediaFilter = 'all' | 'video' | 'image'
