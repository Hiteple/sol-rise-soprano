import { z } from 'zod'

export const roleCategorySchema = z.enum(['lead', 'supporting', 'ensemble'])

export type RoleCategory = z.infer<typeof roleCategorySchema>

export const ROLE_CATEGORY_LABEL: Record<RoleCategory, string> = {
  lead: 'Lead',
  supporting: 'Supporting',
  ensemble: 'Ensemble',
}

export const ROLE_CATEGORY_ORDER: Record<RoleCategory, number> = {
  lead: 0,
  supporting: 1,
  ensemble: 2,
}

export type RoleCategoryFilter = 'all' | RoleCategory
