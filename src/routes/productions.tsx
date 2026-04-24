import { createFileRoute } from '@tanstack/react-router'
import { allProductions, allProductionsPages } from 'content-collections'

import { ImageTextCardsSection } from '@/sections/ImageTextCardsSection'
import { PageHeroSection } from '@/sections/PageHeroSection'

export const Route = createFileRoute('/productions')({
  component: ProductionsPage,
})

function ProductionsPage() {
  const landing = allProductionsPages[0]
  const productions = [...allProductions].sort((a, b) =>
    Number(b.year) - Number(a.year),
  )

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/productions-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme}
        heroEyebrow={landing?.heroEyebrow ?? 'Repertoire'}
        heroTitle={landing?.heroTitle ?? 'Productions'}
        heroDescription={
          landing?.heroDescription ??
          "A curated selection of performances that have defined a career spanning three continents and the world's greatest opera houses."
        }
      />
      <ImageTextCardsSection
        productions={productions}
        listColorScheme={landing?.productionsListColorScheme}
      />
    </div>
  )
}
