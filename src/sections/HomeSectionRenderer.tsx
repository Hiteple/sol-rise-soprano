import type { HomeSection } from '../../schemas/home-sections'

import { AboutTeaserSection } from './AboutTeaserSection'
import { HeroSection } from './HeroSection'
import { MediaGridSection } from './MediaGridSection'
import { QuoteBannerSection } from './QuoteBannerSection'
import { SplitSection } from './SplitSection'
import type { MediaFilter, MediaItem } from './types'

export type { MediaFilter, MediaItem } from './types'

export type HomeSectionRendererProps = {
  section: HomeSection
  mediaItems: MediaItem[]
  filter: MediaFilter
  setFilter: (f: MediaFilter) => void
  onOpenVideo: (url: string) => void
}

export function HomeSectionRenderer(props: HomeSectionRendererProps) {
  const { section, mediaItems, filter, setFilter, onOpenVideo } = props

  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} />
    case 'about_teaser':
      return <AboutTeaserSection section={section} />
    case 'media_grid':
      return (
        <MediaGridSection
          section={section}
          mediaItems={mediaItems}
          filter={filter}
          onFilterChange={setFilter}
          onOpenVideo={onOpenVideo}
        />
      )
    case 'feature_split':
      return <SplitSection section={section} />
    case 'quote_banner':
      return <QuoteBannerSection section={section} />
  }
}
