import { createFileRoute } from '@tanstack/react-router'
import { allAboutPages } from 'content-collections'

import { ImageBigTextSection } from '@/sections/ImageBigTextSection'
import { StatsRowSection } from '@/sections/StatsRowSection'
import { TextButtonsSection } from '@/sections/TextButtonsSection'
import { TimelineSection } from '@/sections/TimelineSection'

export const Route = createFileRoute('/career')({
  component: CareerPage,
})

function CareerPage() {
  const page = allAboutPages[0]
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/about/page.md">
      <ImageBigTextSection page={page} />
      <StatsRowSection page={page} />
      <TimelineSection page={page} />
      <TextButtonsSection page={page} />
    </div>
  )
}
