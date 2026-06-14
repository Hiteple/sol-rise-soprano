import { createFileRoute } from '@tanstack/react-router'
import { allBioPages } from 'content-collections'

import { pageHead } from '@/lib/seo'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { RichtextContentSection } from '@/sections/RichtextContentSection'

export const Route = createFileRoute('/bio')({
  head: () =>
    pageHead({
      title: 'Artistic Path',
      description:
        'Background, training and artistic development of Sol Risé Soprano — Argentine soprano, Teatro Colón, opera repertoire and masterclasses.',
      path: '/bio',
      imagePath: '/images/photo-book/SON05945 1.jpg',
    }),
  component: BioPage,
})

function BioPage() {
  const page = allBioPages[0]
  if (!page) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/bio/page.md">
      <PageHeroSection
        heroEyebrow={page.heroEyebrow}
        heroTitle={page.heroTitle}
        heroDescription={page.heroDescription}
        colorScheme={page.pageHeroColorScheme}
      />
      <RichtextContentSection page={page} />
    </div>
  )
}
