export type MediaItem = {
  _meta: { path: string }
  title: string
  type: 'video' | 'image'
  videoUrl?: string
  thumbnail: string
  description: string
}

export type MediaFilter = 'all' | 'video' | 'image'
