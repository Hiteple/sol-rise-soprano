import { z } from 'zod'

export const organizationItemTranslationSchema = z.object({
  summary: z.string().optional(),
  content: z.string().optional(),
})

export const organizationLocaleBundleSchema = z.object({
  locale: z.enum(['es', 'de', 'it']),
  page: z
    .object({
      heroEyebrow: z.string().optional(),
      heroTitle: z.string().optional(),
      heroDescription: z.string().optional(),
    })
    .optional(),
  items: z.record(z.string(), organizationItemTranslationSchema).default({}),
  content: z.string().default(''),
})

export type OrganizationLocaleBundle = z.infer<typeof organizationLocaleBundleSchema>
