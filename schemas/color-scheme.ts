import { z } from 'zod'

export const SECTION_COLOR_SCHEMES = ['soft', 'bright', 'wine'] as const
export type SectionColorScheme = (typeof SECTION_COLOR_SCHEMES)[number]

/** Coerces empty / cleared CMS values and typos so the site never receives an invalid scheme. */
export const sectionColorSchemeSchema = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return 'soft'
  const s = String(val).trim().toLowerCase()
  if (s === 'bright' || s === 'wine' || s === 'soft') return s
  return 'soft'
}, z.enum(SECTION_COLOR_SCHEMES))
