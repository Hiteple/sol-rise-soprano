import type { MediaFilter } from '@/sections/types'

export function mediaFilterEmptyCopy(filter: MediaFilter): {
  title: string
  description: string
} {
  if (filter === 'video') {
    return {
      title: 'Nothing to watch yet',
      description:
        'New performances and recordings will be shared here soon. In the meantime, feel free to explore recent events.',
    }
  }
  if (filter === 'image') {
    return {
      title: 'Nothing to explore yet',
      description:
        'Past events with links to reviews, programs, and coverage will appear here as they become available.',
    }
  }
  return {
    title: 'Nothing to show yet',
    description: 'Media from recent events will be added here soon!',
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
        'Photography from performances and behind the scenes will be added here shortly!',
    }
  }
  return {
    title: `Nothing in ${category} yet`,
    description: 'New images in this category will be added here soon!',
  }
}
