import { createFileRoute } from '@tanstack/react-router'
import { allGalleries, allGalleryPages, allRoles, allScheduleEvents } from 'content-collections'

import { filterPublishedContent } from '@/lib/content-order'
import { sortGalleryChronologically } from '@/lib/gallery-sort'
import { PageHeroSection } from '@/sections/PageHeroSection'
import { TabItemsSection } from '@/sections/TabItemsSection'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

function GalleryPage() {
  const landing = allGalleryPages[0]
  const categories =
    landing?.filterCategories?.length ? landing.filterCategories : ['All', 'Stage', 'Backstage', 'Photobook']

  const items = sortGalleryChronologically(
    filterPublishedContent(allGalleries),
    allScheduleEvents,
    allRoles,
  )

  return (
    <div
      style={{ background: 'var(--page-background-color)' }}
      data-sb-object-id="content/gallery-landing/page.md"
    >
      <PageHeroSection
        colorScheme={landing?.pageHeroColorScheme}
        heroEyebrow={landing?.heroEyebrow ?? 'Photography'}
        heroTitle={landing?.heroTitle ?? 'Gallery'}
        bottomSpacing="compact"
      />
      <TabItemsSection
        categories={categories}
        items={items}
        tabItemsColorScheme={landing?.tabItemsColorScheme}
        slideIn={landing?.tabItemsSlideIn}
      />
    </div>
  )
}
