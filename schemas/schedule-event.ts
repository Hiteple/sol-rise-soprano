import { z } from 'zod'

export const scheduleCastMemberSchema = z.object({
  character: z.string(),
  performer: z.string(),
})

/** Stage director, design, and musical leadership for this specific run. */
export const scheduleProductionCreditsSchema = z.object({
  conductor: z.string().optional(),
  production: z.string().optional(),
  setDesigner: z.string().optional(),
  costumes: z.string().optional(),
  lighting: z.string().optional(),
})

export const scheduleEventSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  /** Brief, spoiler-free synopsis shown on the event detail page. */
  plot: z.string().optional(),
  composer: z.string().optional(),
  venue: z.string().optional(),
  city: z.string().optional(),
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

export type ScheduleProductionCredits = z.infer<typeof scheduleProductionCreditsSchema>
