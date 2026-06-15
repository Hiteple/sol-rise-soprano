import { z } from 'zod'

import {
  scheduleCastMemberSchema,
  scheduleProductionCreditSchema,
} from './schedule-event'

export const scheduleCastMemberTranslationSchema = scheduleCastMemberSchema.partial()

export const scheduleProductionCreditTranslationSchema =
  scheduleProductionCreditSchema.partial()

export const scheduleItemTranslationSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  plot: z.string().optional(),
  composer: z.string().optional(),
  venue: z.string().optional(),
  city: z.string().optional(),
  imageAlt: z.string().optional(),
  badges: z.array(z.string()).optional(),
  cast: z.array(scheduleCastMemberTranslationSchema).optional(),
  productionCredits: z.array(scheduleProductionCreditTranslationSchema).optional(),
  content: z.string().optional(),
})

export const scheduleLocaleBundleSchema = z.object({
  locale: z.enum(['es', 'de', 'it']),
  page: z
    .object({
      heroEyebrow: z.string().optional(),
      heroTitle: z.string().optional(),
      heroDescription: z.string().optional(),
    })
    .optional(),
  items: z.record(z.string(), scheduleItemTranslationSchema).default({}),
  content: z.string().default(''),
})

export type ScheduleLocaleBundle = z.infer<typeof scheduleLocaleBundleSchema>
