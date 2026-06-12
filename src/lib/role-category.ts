import { roleLatestYear, type RoleAppearance } from '@/lib/role-stats'
import { type RoleCategory, type RoleCategoryFilter } from '../../schemas/role-category'

type RoleWithCategory = {
  category: RoleCategory
  appearances: RoleAppearance[]
  order?: number
}

export function sortRolesChronologically<T extends RoleWithCategory>(roles: T[]): T[] {
  return [...roles].sort((a, b) => {
    const yearA = roleLatestYear(a.appearances)
    const yearB = roleLatestYear(b.appearances)
    if (yearA !== null && yearB !== null && yearA !== yearB) return yearB - yearA
    if (yearA !== null && yearB === null) return -1
    if (yearA === null && yearB !== null) return 1
    return (a.order ?? 0) - (b.order ?? 0)
  })
}

export function filterRolesByCategory<T extends RoleWithCategory>(
  roles: T[],
  filter: RoleCategoryFilter,
): T[] {
  const sorted = sortRolesChronologically(roles)
  if (filter === 'all') return sorted
  return sorted.filter((role) => role.category === filter)
}

export function roleFilterEmptyCopy(filter: RoleCategoryFilter): {
  title: string
  description: string
} {
  if (filter === 'lead') {
    return {
      title: 'No lead roles yet',
      description: 'Principal and leading roles will appear here as they are added to the repertoire.',
    }
  }
  if (filter === 'supporting') {
    return {
      title: 'No supporting roles yet',
      description: 'Named secondary roles will appear here as they are added to the repertoire.',
    }
  }
  if (filter === 'ensemble') {
    return {
      title: 'No ensemble roles yet',
      description: 'Ensemble and chorus credits will appear here as they are added to the repertoire.',
    }
  }
  return {
    title: 'No performances yet',
    description: 'Operatic roles will be added to the repertoire soon.',
  }
}
