import { z } from 'zod'

export const scheduleCastMemberSchema = z.object({
  character: z.string(),
  performer: z.string(),
})

export const scheduleProductionCreditPositionSchema = z.enum([
  'conductor',
  'production',
  'setDesigner',
  'costumes',
  'lighting',
])

export const scheduleProductionCreditSchema = z.object({
  position: scheduleProductionCreditPositionSchema,
  name: z.string(),
})

/** Ordered credits — array order is display order. Object map in YAML is converted in key order. */
export const scheduleProductionCreditsSchema = z.preprocess((val) => {
  if (!val || typeof val !== 'object') return val
  if (Array.isArray(val)) {
    return val.map((entry) => {
      if (!entry || typeof entry !== 'object') return entry
      const record = entry as { position?: string; role?: string; name?: string }
      return {
        position: record.position ?? record.role,
        name: record.name,
      }
    })
  }
  return Object.entries(val as Record<string, unknown>)
    .filter(([, name]) => typeof name === 'string' && name.trim())
    .map(([position, name]) => ({ position, name: (name as string).trim() }))
}, z.array(scheduleProductionCreditSchema).optional())

export const scheduleEventSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  /** Brief, spoiler-free synopsis shown on the event detail page. */
  plot: z.string().optional(),
  composer: z.string().optional(),
  venue: z.string().optional(),
  city: z.string().optional(),
  /** YouTube URL — first item in Photography (past events); opens in the lightbox carousel. */
  videoUrl: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  organizationSlug: z.string().optional(),
  /** Operatic role (`content/roles` slug). Links past-event photography by role. */
  roleSlug: z.string().optional(),
  /** Shared tag for concerts / non-role events. Match `gallerySlug` on gallery items. */
  gallerySlug: z.string().optional(),
  ticketHref: z.string().optional(),
  /** Optional external link (program page, press, etc.) — opens in a new tab on the detail page. */
  externalUrl: z.string().optional(),
  badges: z.array(z.string()).max(8).optional(),
  cast: z.array(scheduleCastMemberSchema).optional(),
  productionCredits: scheduleProductionCreditsSchema.optional(),
  status: z.enum(['upcoming', 'past']),
  year: z.string().optional(),
  order: z.number().optional(),
  content: z.string().optional().default(''),
})

export type ScheduleProductionCredit = z.infer<typeof scheduleProductionCreditSchema>
export type ScheduleProductionCredits = z.infer<typeof scheduleProductionCreditsSchema>
