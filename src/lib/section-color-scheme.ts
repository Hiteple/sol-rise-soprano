import type { SectionColorScheme } from '../../schemas/color-scheme'

export type { SectionColorScheme } from '../../schemas/color-scheme'

export function resolveColorScheme(value: SectionColorScheme | undefined | null | string): SectionColorScheme {
  if (value === 'soft' || value === 'bright' || value === 'wine') return value
  return 'soft'
}

/** Solid section backgrounds (Image+Text, bio, timeline, page hero, etc.). */
export function schemeSolidBackground(scheme: SectionColorScheme): string {
  if (scheme === 'wine') return 'var(--palette-wine)'
  if (scheme === 'bright') return 'var(--section-surface-bright)'
  return 'var(--section-background-color)'
}

/** Stats row: “soft” is a transparent strip over the page. */
export function schemeStatsBackground(scheme: SectionColorScheme): string {
  if (scheme === 'wine') return 'var(--palette-wine)'
  if (scheme === 'bright') return 'var(--section-surface-bright)'
  return 'transparent'
}

/** Media / gallery-style bands that used to sit on the page background. */
export function schemePageBandBackground(scheme: SectionColorScheme): string {
  if (scheme === 'wine') return 'var(--palette-wine)'
  if (scheme === 'bright') return 'var(--section-surface-bright)'
  return 'var(--page-background-color)'
}

/** Hero / quote image overlays (bottom weight). */
export function schemeHeroImageOverlay(scheme: SectionColorScheme): string {
  if (scheme === 'wine') {
    return 'linear-gradient(to top, color-mix(in srgb, var(--palette-wine) 78%, transparent) 0%, color-mix(in srgb, var(--palette-wine) 28%, transparent) 48%, transparent 100%)'
  }
  if (scheme === 'bright') {
    return 'linear-gradient(to top, color-mix(in srgb, var(--page-background-color) 98%, transparent) 0%, color-mix(in srgb, var(--page-background-color) 68%, transparent) 42%, transparent 100%)'
  }
  return 'linear-gradient(to top, color-mix(in srgb, var(--page-background-color) 96%, transparent) 0%, color-mix(in srgb, var(--page-background-color) 58%, transparent) 42%, transparent 100%)'
}

/** Quote block overlay on top of photography. */
export function schemeQuoteOverlay(scheme: SectionColorScheme): string {
  if (scheme === 'wine') {
    return 'linear-gradient(135deg, color-mix(in srgb, var(--palette-wine) 88%, transparent) 0%, color-mix(in srgb, var(--palette-pine) 55%, transparent) 100%)'
  }
  if (scheme === 'bright') {
    return 'linear-gradient(135deg, color-mix(in srgb, var(--section-surface-bright) 92%, transparent) 0%, color-mix(in srgb, var(--accent-pale-color) 82%, transparent) 100%)'
  }
  return 'linear-gradient(135deg, color-mix(in srgb, var(--section-background-color) 92%, transparent) 0%, color-mix(in srgb, var(--accent-pale-color) 75%, transparent) 100%)'
}

/** Typography tuned for wine bands (pink-on-wine). */
export function schemeForeground(scheme: SectionColorScheme): {
  heading: string
  body: string
  eyebrow: string
  divider: string
} {
  if (scheme === 'wine') {
    return {
      heading: 'var(--media-caption-text-color)',
      body: 'color-mix(in srgb, var(--media-caption-text-color) 90%, transparent)',
      eyebrow: 'var(--media-caption-text-color)',
      divider: 'color-mix(in srgb, var(--media-caption-text-color) 45%, transparent)',
    }
  }
  return {
    heading: 'var(--heading-color)',
    body: 'var(--muted-text-color)',
    eyebrow: 'var(--accent-color)',
    divider: 'var(--accent-color)',
  }
}
