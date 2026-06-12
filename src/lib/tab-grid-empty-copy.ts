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

export function galleryCategoryEmptyCopy(category: string): {
  title: string
  description: string
} {
  if (category === 'All') {
    return {
      title: 'Gallery coming soon',
      description:
        'Photography from stage and backstage will be added here shortly!',
    }
  }
  if (category === 'Photobook') {
    return {
      title: 'Photobook coming soon',
      description: 'Portrait and editorial photography will be added here soon.',
    }
  }
  return {
    title: `Nothing in ${category} yet`,
    description: 'New images in this category will be added here soon!',
  }
}
