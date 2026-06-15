import type { MediaFilter } from '@/sections/types'

export function mediaFilterEmptyCopy(filter: MediaFilter): {
  title: string
  description: string
} {
  if (filter === 'opera') {
    return {
      title: 'No operatic events yet',
      description: 'Past stage roles and opera productions will appear here as they are added.',
    }
  }
  if (filter === 'concert') {
    return {
      title: 'No concerts yet',
      description: 'Past concerts, galas, and concert repertoire will appear here as they are added.',
    }
  }
  return {
    title: 'Nothing to show yet',
    description: 'Past performances will be added here soon.',
  }
}
