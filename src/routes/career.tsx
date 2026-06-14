import { createFileRoute } from '@tanstack/react-router'
import { allCareerPages } from 'content-collections'

import { pageHead } from '@/lib/seo'
import { ImageBigTextSection } from '@/sections/ImageBigTextSection'
import { StatsRowSection } from '@/sections/StatsRowSection'
import { TimelineSection } from '@/sections/TimelineSection'

export const Route = createFileRoute('/career')({
  head: () =>
    pageHead({
      title: 'Career',
      description:
        'Opera and concert career of Sol Risé Soprano — milestones, repertoire, Teatro Colón, Juventus Lyrica and international appearances.',
      path: '/career',
      imagePath: '/images/salon-dorado/IMG_5954.webp',
    }),
  component: CareerPage,
})

function CareerPage() {
  const page = allCareerPages[0]
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/career/page.md">
      <ImageBigTextSection page={page} />
      <StatsRowSection page={page} />
      <TimelineSection page={page} />
    </div>
  )
}
