import type { SectionColorScheme } from '../../schemas/color-scheme'
import type { ImageCreditFields } from '../../schemas/image-credit'

export type HomeSurface = SectionColorScheme
export type HomeHeroColorScheme = 'clear' | 'wine'

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
  colorScheme: HomeHeroColorScheme
}

/** Shared shape for home “about” and “feature” blocks (see `ImageTextSection`). */
export type HomeImageTextSection = {
  surface: SectionColorScheme
  slideIn?: boolean
  eyebrow?: string
  title: string
  text: string
  image: string
  imageAlt: string
  linkText?: string
  linkHref?: string
}

export type HomeMediaSection = {
  eyebrow: string
  title: string
  colorScheme: SectionColorScheme
  slideIn?: boolean
}

export type HomeQuoteSection = {
  quoteText: string
  quoteAuthor?: string
  quoteImage: string
  quoteImageAlt?: string
  quoteImageCredit?: ImageCreditFields
  colorScheme: SectionColorScheme
  slideIn?: boolean
}

export type MediaItem = {
  _meta: { path: string }
  title: string
  type: 'video' | 'image'
  videoUrl?: string
  imageUrl?: string
  thumbnail?: string
  description: string
}

export type MediaFilter = 'all' | 'video' | 'image'
