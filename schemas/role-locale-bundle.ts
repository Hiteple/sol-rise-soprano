import { z } from 'zod'

export const roleAppearanceTranslationSchema = z.object({
  notes: z.string().optional(),
  venue: z.string().optional(),
})

export const roleItemTranslationSchema = z.object({
  characterName: z.string().optional(),
  operaTitle: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  appearances: z.array(roleAppearanceTranslationSchema).optional(),
  content: z.string().optional(),
})

export const roleLocaleBundleSchema = z.object({
  locale: z.enum(['es', 'de', 'it']),
  page: z
    .object({
      heroEyebrow: z.string().optional(),
      heroTitle: z.string().optional(),
      heroDescription: z.string().optional(),
    })
    .optional(),
  items: z.record(z.string(), roleItemTranslationSchema).default({}),
  content: z.string().default(''),
})

export type RoleLocaleBundle = z.infer<typeof roleLocaleBundleSchema>
