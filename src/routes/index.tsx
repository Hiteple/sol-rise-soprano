import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { allHomes, allOrganizations, allScheduleEvents } from 'content-collections'

import { homeLastEvents } from '@/lib/home-last-events'
import { publishedContentSorted } from '@/lib/content-order'
import { HeroSection } from '@/sections/HeroSection'
import { ImageTextSection } from '@/sections/ImageTextSection'
import { MediaGridSection } from '@/sections/MediaGridSection'
import { QuoteBannerSection } from '@/sections/QuoteBannerSection'
import { OrganizationsStripSection } from '@/sections/OrganizationsStripSection'
import { FeaturedEventsSection } from '@/sections/FeaturedEventsSection'
import type { MediaFilter } from '@/sections/types'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const site = allHomes[0]
  const mediaItems = homeLastEvents(allScheduleEvents, site?.lastEventsItems)
  const publishedOrganizations = publishedContentSorted(allOrganizations)
  const organizationsBySlug = new Map(publishedOrganizations.map((org) => [org._meta.path, org]))
  const featuredOrganizations =
    site.organizationsStripItems
      ?.map((slug) => organizationsBySlug.get(slug.replace(/^content\/organizations\//, '').replace(/\.md$/, '')))
      .filter((org): org is (typeof publishedOrganizations)[number] => Boolean(org)) ?? []
  const organizationsStripItems =
    featuredOrganizations.length > 0 ? featuredOrganizations : publishedOrganizations.slice(0, 4)
  const splitGridItems = site?.splitGridItems ?? [
    {
      title: 'Book a Performance',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-performance/1200/1200',
      badges: [],
      subtitle: '',
    },
    {
      title: 'Artistic Collaborations',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-collab/1200/1200',
      badges: [],
      subtitle: '',
    },
    {
      title: 'Masterclasses & Lessons',
      href: '/contact',
      image: 'https://picsum.photos/seed/split-lessons/1200/1200',
      badges: [],
      subtitle: '',
    },
  ]
  const [filter, setFilter] = useState<MediaFilter>('all')

  if (!site) return null

  return (
    <div style={{ background: 'var(--page-background-color)' }} data-sb-object-id="content/home/data.md">
      <HeroSection
        section={{
          heroTitle: site.heroTitle,
          heroSubtitle: site.heroSubtitle,
          heroTagline: site.heroTagline,
          heroImage: site.heroImage,
          heroImageAlt: site.heroImageAlt,
          primaryCtaLabel: site.primaryCtaLabel,
          primaryCtaHref: site.primaryCtaHref,
          secondaryCtaLabel: site.secondaryCtaLabel,
          secondaryCtaHref: site.secondaryCtaHref,
          colorScheme: site.heroColorScheme,
        }}
      />
      <ImageTextSection
        section={{
          surface: site.aboutSurface,
          slideIn: site.aboutSlideIn,
          eyebrow: site.aboutEyebrow,
          title: site.aboutTitle,
          text: site.aboutText,
          image: site.aboutImage,
          imageAlt: site.aboutImageAlt,
          linkText: site.aboutLinkText,
          linkHref: site.aboutHref,
        }}
      />
      {site.organizationsStripTitle && organizationsStripItems.length > 0 && (
        <OrganizationsStripSection
          eyebrow={site.organizationsStripEyebrow ?? 'Collaborations'}
          title={site.organizationsStripTitle}
          description={site.organizationsStripDescription}
          linkText={site.organizationsStripLinkText}
          organizations={organizationsStripItems}
          colorScheme={site.organizationsStripColorScheme}
          slideIn={site.organizationsStripSlideIn}
        />
      )}
      <FeaturedEventsSection
        items={splitGridItems}
        layout={site.featuredEventsLayout}
        colorScheme={site.splitGridColorScheme}
        slideIn={site.splitGridSlideIn}
        title={site.splitGridTitle}
        description={site.splitGridDescription}
      />
      <MediaGridSection
        section={{
          eyebrow: site.mediaEyebrow,
          title: site.mediaTitle,
          colorScheme: site.mediaGridColorScheme,
          slideIn: site.mediaGridSlideIn,
        }}
        mediaItems={mediaItems}
        filter={filter}
        onFilterChange={setFilter}
      />
      <QuoteBannerSection
        section={{
          quoteText: site.quoteText,
          quoteAuthor: site.quoteAuthor,
          quoteImage: site.quoteImage,
          quoteImageAlt: site.quoteImageAlt,
          quoteImageCredit: site.quoteImageCredit,
          colorScheme: site.quoteBannerColorScheme,
          slideIn: site.quoteBannerSlideIn,
        }}
      />
    </div>
  )
}
