import { createFileRoute } from '@tanstack/react-router'
import { allGalleries, allGalleryPages } from 'content-collections'

import { PageHeroSection } from '@/sections/PageHeroSection'
import { TabItemsSection } from '@/sections/TabItemsSection'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function GalleryPage() {
  const landing = allGalleryPages[0]
  const categories =
    landing?.filterCategories?.length ? landing.filterCategories : ['All', 'Performance', 'Behind the Scenes']

  const items = [...allGalleries].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/gallery-landing/page.md"
    >
      <PageHeroSection
        heroEyebrow={landing?.heroEyebrow ?? 'Photography'}
        heroTitle={landing?.heroTitle ?? 'Gallery'}
        bottomSpacing="compact"
      />
      <TabItemsSection categories={categories} items={items} />
    </div>
  )
}
