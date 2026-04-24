import { createFileRoute } from '@tanstack/react-router'
import { allBioPages } from 'content-collections'

import { PageHeroSection } from '@/sections/PageHeroSection'
import { RichtextContentSection } from '@/sections/RichtextContentSection'

export const Route = createFileRoute('/bio')({
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
